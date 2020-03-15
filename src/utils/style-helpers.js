import { font } from '../constants/style-guide';
import { media } from './media';

export const fontSizes = (key) => `
  font-size: ${font.size[key]}px;
  line-height: 1.5em;
  ${media.mobile()} {
    font-size: ${font.mobileSize[key]}px;
  }
`;
