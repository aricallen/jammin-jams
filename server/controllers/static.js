const DEFAULT_TITLE = `Jammin' Jams`;
const DEFAULT_URL = 'https://jmnjams.com';
const DEFAULT_IMAGE = 'https://jmnjams.com/assets/images/logo-pink.png';

const ogData = {
  ogTitle: DEFAULT_TITLE,
  ogUrl: DEFAULT_URL,
  ogImage: DEFAULT_IMAGE,
};

const compile = (fileStr, data) => {
  let compiled = fileStr;
  Object.entries(data).forEach(([key, value]) => {
    const re = new RegExp(`{{${key}}}`, 'g');
    compiled = compiled.replace(re, value);
  });
  return compiled;
};

const getHydratedIndex = (indexFileStr) => {
  const compiled = compile(indexFileStr, ogData);
  return compiled;
};

module.exports = { getHydratedIndex };
