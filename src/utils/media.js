import { screenSize } from '../constants/style-guide';

const defaultToPixels = sizeVal => {
  const numVal = parseFloat(sizeVal);
  const unit = `${sizeVal}`.replace(numVal, '');
  if (!unit) {
    return `${sizeVal}px`;
  }
  return sizeVal;
};

const min = size => {
  return `@media (min-width: ${defaultToPixels(screenSize[size])})`;
};

const include = (minSize, maxSize) => {
  return `@media (min-width: ${defaultToPixels(
    screenSize[minSize]
  )} and max-width: ${defaultToPixels(screenSize[maxSize])})`;
};

const max = size => {
  return `@media (max-width: ${defaultToPixels(screenSize[size])})`;
};

export const media = { max, min, include };
