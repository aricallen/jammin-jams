const Screen = {
  PHONE: 'PHONE',
  TABLET: 'TABLET',
  DESKTOP: 'DESKTOP',
};

const ScreenSize = {
  [Screen.PHONE]: 768,
  [Screen.TABLET]: 1024,
  [Screen.DESKTOP]: 1440,
};

const defaultToPixels = (sizeVal) => {
  const numVal = parseFloat(sizeVal);
  const unit = `${sizeVal}`.replace(numVal, '');
  if (!unit) {
    return `${sizeVal}px`;
  }
  return sizeVal;
};

/**
 * @param {Number|String} size
 */
const min = (size) => {
  return `@media (min-width: ${defaultToPixels(size)})`;
};

/**
 * @param {Number|String} minSize
 * @param {Number|String} maxSize
 */
const include = (minSize, maxSize) => {
  return `@media (min-width: ${defaultToPixels(minSize)} and max-width: ${defaultToPixels(
    maxSize
  )})`;
};

/**
 * @param {Number|String} size
 */
const max = (size) => {
  return `@media (max-width: ${defaultToPixels(size)})`;
};

const desktop = () => min(ScreenSize[Screen.TABLET]);
const mobile = () => max(ScreenSize[Screen.TABLET]);

export const media = { max, min, include, desktop, mobile };
