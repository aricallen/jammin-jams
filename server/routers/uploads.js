const express = require('express');
const path = require('path');
const fs = require('fs');
const Jimp = require('jimp');
const multer = require('multer');
const {
  createGetController,
  createGetOneController,
  createUpdateController,
} = require('../utils/api-helpers');
const { sizes } = require('../../src/constants/style-guide');
const { getConnection, insertRecord } = require('../utils/db-helpers');

const router = express.Router();

const UPLOADS_DIR = path.resolve(__dirname, '..', 'uploads');
const TEMP_DIR = path.resolve(__dirname, '..', '.tmp.uploads');
const uploader = multer({ dest: UPLOADS_DIR });
const SMALL_DIR = path.join(UPLOADS_DIR, 'small');
const MEDIUM_DIR = path.join(UPLOADS_DIR, 'medium');
const LARGE_DIR = path.join(UPLOADS_DIR, 'large');
const RAW_DIR = path.join(UPLOADS_DIR, 'raw');

const safeMakeDir = (dirPath) => {
  try {
    fs.statSync(dirPath);
  } catch (err) {
    fs.mkdirSync(dirPath);
  }
};

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
  safeMakeDir(SMALL_DIR);
  safeMakeDir(MEDIUM_DIR);
  safeMakeDir(LARGE_DIR);
  safeMakeDir(RAW_DIR);
};
makeDirStructure();

const processFile = async (options) => {
  const { src, dest, width, height = Jimp.AUTO, quality = 0.75 } = options;
  const image = await Jimp.read(src);
  await image.resize(width, height);
  await image.quality(quality);
  await image.writeAsync(dest);
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
 * - create small, medium, large versions
 * - move each version to respective dirs
 * - update DB with new metadata
 */
const processFileUpload = async (file) => {
  const baseOptions = { src: file.path, height: Jimp.AUTO, quality: 0.75 };
  const promises = configs.map((config) => {
    return processFile({
      ...baseOptions,
      dest: `${config.dir}/${file.filename}`,
      width: config.width,
    });
  });
  await Promise.all(promises);
  // remove file from tmp
  fs.unlinkSync(file.filename);
  // update db
  const conn = await getConnection();
  const record = await insertRecord(conn, 'uploads', {
    fileName: file.filename,
    title: file.filename,
    altText: file.filename,
    caption: file.filename,
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
router.put('/:id', createUpdateController('uploads'));

router.delete('/', (req, res) => {
  // ... remove file
});

module.exports = { router };
