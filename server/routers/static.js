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
const DEFAULT_DESCRIPTION =
  'Jam. Music. Delivered. Celebrating all that is happy in life by doing what we love: transform the best seasonal fruits into sweet-tart-oh-so-tasty jam through the power of high heat and bass.';

const DEFAULT_OG_DATA = {
  ogTitle: DEFAULT_TITLE,
  ogUrl: DEFAULT_URL,
  ogImage: DEFAULT_IMAGE,
  ogDescription: DEFAULT_DESCRIPTION,
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

const getAssetData = () => {
  const rootFiles = fs.readdirSync(staticDirPath);
  const staticJsSrc = rootFiles.find((fileName) => /.js$/.test(fileName));
  const staticStyleHref = path.join(staticDirPath, 'styles', 'index.scss');
  return {
    staticJsSrc,
    staticStyleHref,
  };
};

const indexMiddleware = async (req, res, next) => {
  const { originalUrl } = req;
  if (/\.[a-z0-9]{1,5}$/.test(originalUrl) === false) {
    const data = {
      ...DEFAULT_OG_DATA,
      ...getAssetData(),
    };
    return res.send(getCompiledIndex(data));
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
      ogDescription: post.excerpt,
      ...getAssetData(),
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
router.use('/', indexMiddleware);

/**
 * default file server for assets etc
 */
const staticServer = express.static(staticDirPath);
router.use(staticServer);

module.exports = { router };
