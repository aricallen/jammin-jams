import { font } from '../constants/style-guide';
import { media } from './media';

export const fontSizes = (key) => `
  font-size: ${font.size[key]}px;
  ${media.maxTablet()} {
    font-size: ${font.mobileSize[key]}px;
  }
`;
