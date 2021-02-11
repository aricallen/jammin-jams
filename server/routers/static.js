const fs = require('fs');
const path = require('path');
const express = require('express');
const { compile } = require('../utils/compile');
const { getConnection, getRecord, getRecords } = require('../utils/db-helpers');
const { parseError } = require('../utils/api-helpers');
const { HOST, PORT, TARGET_ENV } = require('../utils/environment');

const router = express.Router();

const staticDir = TARGET_ENV === 'local' ? 'dist' : 'src';
const staticDirPath = path.resolve(__dirname, '..', '..', staticDir);

const DEFAULT_TITLE = `Jmn Jams | Jam. Music. Delivered | Jam Subscription Service`;
const DEFAULT_URL = 'https://jmnjams.com';
const DEFAULT_IMAGE = 'https://jmnjams.com/assets/images/logo-pink.png';
const DEFAULT_DESCRIPTION =
  'Oakland based Jam Subscription Service. We transform the best seasonal fruits into sweet & tasty jam through the power of high heat and bass.';

const DEFAULT_DATA = {
  title: DEFAULT_TITLE,
  url: DEFAULT_URL,
  image: DEFAULT_IMAGE,
  description: DEFAULT_DESCRIPTION,
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

const cleanPath = (p) => p.replace(/^https:\/\/jmnjams.com\//, '').replace(/\/$/, '');

const getPageData = async (reqUrl) => {
  try {
    const conn = await getConnection();
    const pageRows = await getRecords(conn, 'pages');
    const cleaned = cleanPath(reqUrl);
    const matchingPage = pageRows.find((row) => row.url && row.url === cleaned);
    if (matchingPage) {
      return matchingPage;
    }
  } catch (err) {
    return {};
  }
};

const staticPageServer = async (req, res, next) => {
  const { originalUrl } = req;
  if (/\.[a-zA-Z0-9]{1,5}$/.test(originalUrl)) {
    return next();
  }

  const pageData = await getPageData(originalUrl);
  const data = {
    ...DEFAULT_DATA,
    ...pageData,
  };
  return res.send(getCompiledIndex(data));
};

const getExcerpt = (post) => {
  const { content = '', excerpt = '' } = post;
  if (excerpt !== '') {
    return excerpt;
  }
  const paragraphs = content.split('\n').filter((str) => str !== '');
  const contentParagraphs = paragraphs.filter((str) => /^\w/.test(str));
  return contentParagraphs[0].trim();
};

const staticPostServer = async (req, res) => {
  const { postId } = req.params;
  const conn = await getConnection();
  try {
    const post = await getRecord(conn, 'posts', postId);
    const ogData = {
      title: post.title,
      url: getUrl(`/jam-journeys/${postId}`),
      image: await getImageUrl(conn, post.uploadsId),
      description: getExcerpt(post),
    };
    res.send(getCompiledIndex(ogData));
  } catch (err) {
    if (err.fatal) {
      await getConnection();
    }
    res.status(400).send(parseError(err, req));
  }
};

/**
 * pages with meta data associated
 */
router.use('/jam-journeys/:postId', staticPostServer);
router.use('/p/*', staticPageServer);
router.use('/', staticPageServer);
router.use('/index.html', staticPageServer);

/**
 * default file server for assets etc
 */
const staticServer = express.static(staticDirPath);
router.use(staticServer);

module.exports = { router };
