import { font } from '../constants/style-guide';
import { media } from './media';

const keyedFontSizes = (key) => `
  font-size: ${font.size[key]}px;
  line-height: 1.5em;
  ${media.mobile()} {
    font-size: ${font.mobileSize[key]}px;
  }
`;

const numFontSize = (num) => `
  font-size: ${num}px;
  line-height: 1.5em;
  ${media.mobile()} {
    font-size: ${num}px;
  }
`;

export const fontSizes = (keyOrNum) => {
  if (typeof keyOrNum === 'number') {
    return numFontSize(keyOrNum);
  }
  return keyedFontSizes(keyOrNum);
};
