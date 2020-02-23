export const PRODUCTS_ID = [
  {
    id: null,
    label: 'Frequency / Quantity',
    text: '1 Jar',
  },
  {
    id: 1,
    label: 'Every month',
    text: '$11.99',
  },
  {
    id: 2,
    label: 'Every 2 months',
    text: '$12.99',
  },
  {
    id: 3,
    label: 'Every 3 months',
    text: '$12.99',
  },
];

export const StoreStep = {
  PRODUCTS_ID: 'products',
  DELIVERY_METHOD: 'delivery-method',
  SHIPPING: 'shipping',
  PAYMENT: 'payment',
};

const OAK = [
  '94601',
  '94602',
  '94606',
  '94607',
  '94608',
  '94609',
  '94610',
  '94611',
  '94612',
  '94618',
];

const BERK = [
  '94702',
  '94703',
  '94704',
  '94705',
  '94706',
  '94707',
  '94708',
  '94709',
  '94710',
  '94720',
];

const SF = ['94105'];

export const VALID_ZIPCODES = [...OAK, ...BERK, ...SF];

export const Method = {
  PROMO: 'promo',
  BICYCLE: 'bicycle',
};
