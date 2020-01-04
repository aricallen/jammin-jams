export const pallet = {
  blueberry: '#7A7DB5',
  strawberry: '#FA5C66',
  peach: '#FFC0CB',
  apricot: '#F0941C',
  plum: '#C41EC4',
  babyBlue: '#D2EFF7',
  charcoal: '#323232',
};

export const spacing = {
  regular: 8,
  double: 16,
  triple: 24,
  quadruple: 32,
};

export const ScreenSizes = {
  PHONE: 'PHONE',
  TABLET: 'TABLET',
  DESKTOP: 'DESKTOP',
};

export const screenSize = {
  [ScreenSizes.PHONE]: 768,
  [ScreenSizes.TABLET]: 1024,
  [ScreenSizes.DESKTOP]: 1440,
};

export const sizes = {
  rowHeight: 64,
};

const baseFontSizes = {
  small: 12,
  regular: 16,
  large: 24,
  largest: 32,
  header1: 24,
  header2: 20,
  header3: 18,
  header4: 16,
};

const mobileFontSizes = Object.entries(baseFontSizes).reduce((acc, curr) => {
  const [key, val] = curr;
  acc[key] = val * 2;
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
