const express = require('express');
const path = require('path');
const fs = require('fs');
const Jimp = require('jimp');
const multer = require('multer');
const { promisify } = require('util');
const { createGetController, createGetOneController } = require('../utils/api-helpers');
const { sizes } = require('../constants');
const {
  getConnection,
  insertRecord,
  updateRecord,
  getRecord,
  deleteRecord,
} = require('../utils/db-helpers');

const router = express.Router();

const UPLOADS_DIR = path.resolve(__dirname, '..', 'uploads');
const TEMP_DIR = path.resolve(__dirname, '..', '.tmp.uploads');
const uploader = multer({ dest: UPLOADS_DIR });
const SMALL_DIR = path.join(UPLOADS_DIR, 'small');
const MEDIUM_DIR = path.join(UPLOADS_DIR, 'medium');
const LARGE_DIR = path.join(UPLOADS_DIR, 'large');
const RAW_DIR = path.join(UPLOADS_DIR, 'raw');

const pUnlink = promisify(fs.unlink);
const pRename = promisify(fs.rename);

const safeMakeDir = (dirPath) => {
  try {
    fs.statSync(dirPath);
  } catch (err) {
    fs.mkdirSync(dirPath);
  }
};

const configs = [
  {
    dir: SMALL_DIR,
    width: sizes.thumbnailWidth,
  },
  {
    dir: MEDIUM_DIR,
    width: sizes.phoneWidth,
  },
  {
    dir: LARGE_DIR,
    width: sizes.tabletWidth,
  },
  {
    dir: RAW_DIR,
    width: null,
  },
];

/**
 * folder structure
 * server/uploads
 * |- small
 * |- medium
 * |- large
 * |- raw
 */
const makeDirStructure = () => {
  safeMakeDir(UPLOADS_DIR);
  safeMakeDir(TEMP_DIR);
  configs.forEach((config) => safeMakeDir(config.dir));
};
makeDirStructure();

const processFile = async (options) => {
  const { src, dest, width, height = Jimp.AUTO } = options;
  const image = await Jimp.read(src);
  if (width) {
    await image.resize(width, height);
  }
  await image.writeAsync(dest);
};

/**
 * - create small, medium, large versions
 * - move each version to respective dirs
 * - update DB with new metadata
 */
const processFileUpload = async (file) => {
  const baseOptions = { src: file.path, height: Jimp.AUTO, quality: 0.75 };
  const promises = configs.map((config) => {
    return processFile({
      ...baseOptions,
      dest: path.join(config.dir, file.originalname),
      width: config.width,
    });
  });
  await Promise.all(promises);

  // remove file from tmp
  fs.unlinkSync(file.path);

  // update db
  const conn = await getConnection();
  const record = await insertRecord(conn, 'uploads', {
    fileName: file.originalname,
    title: file.originalname,
    altText: file.originalname,
    caption: file.originalname,
  });
  return record;
};

router.post('/', uploader.array('uploads', { dest: TEMP_DIR }), async (req, res) => {
  const { files } = req;
  if (!files || files.length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const processedPromises = files.map(processFileUpload);
  try {
    const fileRecords = await Promise.all(processedPromises);
    res.send({
      uploads: fileRecords,
    });
  } catch (err) {
    res.status(400).send({
      error: err,
      message: 'error while attempting to upload files',
    });
  }
});

router.get('/:id', createGetOneController('uploads'));
router.get('/', createGetController('uploads'));

/**
 * update db record
 * rename files in each dir
 */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const values = req.body;
  const conn = await getConnection();
  const oldRecord = await getRecord(conn, 'uploads', id);
  const updatedRecord = await updateRecord(conn, 'uploads', id, values);

  // update file names
  const promises = configs.map((config) => {
    const oldPath = path.join(config.dir, oldRecord.fileName);
    const newPath = path.join(config.dir, values.fileName);
    if (fs.existsSync(newPath)) {
      throw new Error(`A file with name ${values.fileName} already exists`);
    }
    return pRename(oldPath, newPath);
  });

  try {
    await Promise.all(promises);
    res.send({ data: updatedRecord });
  } catch (err) {
    res.status(400).send({
      error: err,
      message: `Error while trying to update ${oldRecord.fileName}`,
    });
  }
});

/**
 * remove file from each dir
 * remove record from db
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const conn = await getConnection();
  const oldRecord = await getRecord(conn, 'uploads', id);

  if (!oldRecord) {
    res.status(404).send();
  }

  try {
    // remove record from db
    const deletedRecord = await deleteRecord(conn, 'uploads', id);

    // remove files
    const promises = configs.map((config) => {
      return pUnlink(path.join(config.dir, oldRecord.fileName));
    });

    await Promise.all(promises);
    res.send({ data: deletedRecord });
  } catch (err) {
    res.status(400).send({
      error: err,
      message: `Error while trying to delete ${oldRecord.fileName}`,
    });
  }
});

module.exports = { router };
