const express = require('express');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const fileUpload = require('express-fileupload');
const {
  createGetController,
  createGetOneController,
  createUpdateController,
} = require('../utils/api-helpers');

const router = express.Router();
const uploader = fileUpload({ debug: true, useTempFiles: true, createParentPath: true });

const MEDIA_DIR = path.resolve(__dirname, '..', '..', 'media');

/**
 * check if media dir exists
 */
try {
  fs.statSync(MEDIA_DIR);
} catch (err) {
  fs.mkdirSync(MEDIA_DIR);
}

router.post('/', uploader, async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // files are mapped by filename
  const files = Object.keys(req.files).map((key) => req.files[key]);

  const movedPromises = files.map((file) => {
    const pmv = promisify(file.mv);
    return pmv(`${MEDIA_DIR}/${file.name}`);
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
