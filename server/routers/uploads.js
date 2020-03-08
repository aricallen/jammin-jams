const express = require('express');
const path = require('path');
const fs = require('fs');
const Jimp = require('jimp');
const multer = require('multer');
const { promisify } = require('util');
const { createGetController, createGetOneController } = require('../utils/api-helpers');
const { sizes } = require('../constants');
const { getConnection, insertRecord, updateRecord, getRecord } = require('../utils/db-helpers');

const router = express.Router();

const UPLOADS_DIR = path.resolve(__dirname, '..', 'uploads');
const TEMP_DIR = path.resolve(__dirname, '..', '.tmp.uploads');
const uploader = multer({ dest: UPLOADS_DIR });
const SMALL_DIR = path.join(UPLOADS_DIR, 'small');
const MEDIUM_DIR = path.join(UPLOADS_DIR, 'medium');
const LARGE_DIR = path.join(UPLOADS_DIR, 'large');
const RAW_DIR = path.join(UPLOADS_DIR, 'raw');

const pUnlink = promisify(fs.unlink);

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
    width: sizes.desktopWidth,
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
  await image.resize(width, height);
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
  // remove files
  const promises = configs.map((config) => {
    return pUnlink(path.join(config.dir, oldRecord.fileName));
  });
  await Promise.all(promises);
  res.send({ data: updatedRecord });
});

/**
 * remove file from each dir
 * remove record from db
 */
router.delete('/:id', (req, res) => {});

module.exports = { router };
