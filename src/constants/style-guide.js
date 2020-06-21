import Color from 'color';

// magenta: #ff0e63

export const basePallet = {
  blueberry: '#7A7DB5',
  strawberry: '#f05994',
  peach: '#FFA69E',
  apricot: '#F0941C',
  plum: '#C41EC4',
  sky: '#D2EFF7',
  charcoal: '#323232',
  background: 'white',
  text: 'black',
  isDisabled: `rgba(50, 50, 50, 0.6)`,
};

const makeVar = (pallet, prefix = '') => {
  const asVar = Object.entries(pallet).reduce((acc, curr) => {
    const [key, val] = curr;
    acc[key] = `var(--${prefix}${key}, ${val})`;
    return acc;
  }, {});
  return asVar;
};

const palletLight = Object.entries(basePallet).reduce((acc, curr) => {
  const [key, val] = curr;
  acc[key] = Color(val)
    .lighten(0.2)
    .toString();
  return acc;
}, {});

const palletDark = Object.entries(basePallet).reduce((acc, curr) => {
  const [key, val] = curr;
  acc[key] = Color(val)
    .darken(0.2)
    .toString();
  return acc;
}, {});

export const pallet = {
  ...makeVar(basePallet),
  light: makeVar(palletLight, 'light-'),
  dark: makeVar(palletDark, 'dark-'),
};

export const spacing = {
  regular: 8,
  double: 16,
  triple: 24,
  quadruple: 32,
};

export const sizes = {
  rowHeight: 64,
  logo: 60,
  thumbnailWidth: 200,
  phoneWidth: 768,
  tabletWidth: 1024,
  desktopWidth: 1440,
};

const baseFontSizes = {
  small: 14,
  regular: 16,
  large: 18,
  largest: 30,
  header1: 24,
  header2: 20,
  header3: 18,
  header4: 16,
};

const mobileFontSizes = Object.entries(baseFontSizes).reduce((acc, curr) => {
  const [key, val] = curr;
  acc[key] = val + 2;
  return acc;
}, {});

export const font = {
  family: 'Libre Franklin, sans-serif',
  weight: {
    thin: 100,
    extraLight: 200,
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extraBold: 800,
    black: 900,
  },
  size: baseFontSizes,
  mobileSize: mobileFontSizes,
};

export const animation = '0.3s ease-in-out';

export const border = `1px solid ${Color(basePallet.charcoal)
  .alpha(0.2)
  .toString()}`;
