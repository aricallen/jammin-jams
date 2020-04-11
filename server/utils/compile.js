const injectData = (fileStr, data) => {
  let compiled = fileStr;
  Object.entries(data).forEach(([key, value]) => {
    const re = new RegExp(`{{${key}}}`, 'g');
    compiled = compiled.replace(re, value);
  });
  return compiled;
};

const compile = (indexFileStr, data) => {
  const compiled = injectData(indexFileStr, data);
  return compiled;
};

module.exports = { compile };
