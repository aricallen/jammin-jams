const fs = require('fs');
const path = require('path');
const express = require('express');
const { compile } = require('../utils/compile');
const { getConnection, getRecord } = require('../utils/db-helpers');
const { parseError } = require('../utils/api-helpers');

const router = express.Router();

const { HOST, PORT, TARGET_ENV } = process.env;

const staticDir = TARGET_ENV === 'local' ? 'dist' : 'src';
const staticDirPath = path.resolve(__dirname, '..', '..', staticDir);

const DEFAULT_TITLE = `Jammin' Jams | Jam. Music. Delivered | Jam Subscription Service`;
const DEFAULT_URL = 'https://jmnjams.com';
const DEFAULT_IMAGE = 'https://jmnjams.com/assets/images/logo-pink.png';

const DEFAULT_OG_DATA = {
  ogTitle: DEFAULT_TITLE,
  ogUrl: DEFAULT_URL,
  ogImage: DEFAULT_IMAGE,
};

const getCompiledIndex = (data) => {
  const indexFileStr = fs.readFileSync(path.join(staticDirPath, 'index.html'), 'utf8');
  const compiled = compile(indexFileStr, data);
  return compiled;
};

const getUrl = (pagePath) => {
  if (PORT && TARGET_ENV !== 'production') {
    return `${HOST}:${PORT}${pagePath}`;
  }
  return `${HOST}${pagePath}`;
};

const getImageUrl = async (conn, uploadsId) => {
  if (!uploadsId) {
    return DEFAULT_IMAGE;
  }
  const upload = await getRecord(conn, 'uploads', uploadsId);
  const url = getUrl(`/assets/uploads/medium/${upload.filename}`);
  return url;
};

const indexMiddleware = async (req, res, next) => {
  const { originalUrl } = req;
  if (originalUrl === '/' || originalUrl === 'index.html') {
    return res.send(getCompiledIndex(DEFAULT_OG_DATA));
  }
  next();
};

const staticPostServer = async (req, res, next) => {
  const { postId } = req.params;
  const conn = await getConnection();
  try {
    const post = await getRecord(conn, 'posts', postId);
    const ogData = {
      ogTitle: post.title,
      ogUrl: getUrl(`/jam-journeys/${postId}`),
      ogImage: await getImageUrl(conn, post.uploadsId),
    };
    res.send(getCompiledIndex(ogData));
  } catch (err) {
    res.status(400).send(parseError(err, req));
  }
  conn.end();
  next();
};

/**
 * root or index.html
 */
router.use('/jam-journeys/:postId', staticPostServer);
router.use(indexMiddleware);

/**
 * default file server for assets etc
 */
const staticServer = express.static(staticDirPath);
router.use(staticServer);

module.exports = { router };
