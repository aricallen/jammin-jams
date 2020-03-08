const express = require('express');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const multer = require('multer');
const {
  createGetController,
  createGetOneController,
  createUpdateController,
} = require('../utils/api-helpers');

const router = express.Router();

const UPLOADS_DIR = path.resolve(__dirname, '..', 'uploads');
const TEMP_DIR = path.resolve(__dirname, '..', '.tmp.uploads');
const uploader = multer({ dest: UPLOADS_DIR });

/**
 * check if upload dir exists
 */
try {
  fs.statSync(UPLOADS_DIR);
} catch (err) {
  fs.mkdirSync(UPLOADS_DIR);
}

/**
 * check if tmp dir exists
 */
try {
  fs.statSync(TEMP_DIR);
} catch (err) {
  fs.mkdirSync(TEMP_DIR);
}

router.post('/', uploader.array('uploads', { dest: TEMP_DIR }), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // files are mapped by filename
  const files = Object.keys(req.files).map((key) => req.files[key]);

  const movedPromises = files.map((file) => {
    const pmv = promisify(file.mv);
    return pmv(`${UPLOADS_DIR}/${file.name}`);
  });
  try {
    await Promise.all(movedPromises);
    res.send({
      files: files.map((file) => file.name),
    });
  } catch (err) {
    res.status(400).send({
      error: err,
      message: 'error while attempting to upload files',
    });
  }
});

router.get('/:id', createGetOneController('media'));
router.get('/', createGetController('media'));
router.put('/:id', createUpdateController('media'));

router.delete('/', (req, res) => {
  // ... remove file
});

module.exports = { router };
