import { format } from 'date-fns';

export const DeliveryType = {
  LOCAL: 'LOCAL',
  OTHER: 'OTHER',
};

export const CALENDAR_DATA = [
  { month: 'June', num: 5, [DeliveryType.LOCAL]: [26, 27, 28], [DeliveryType.OTHER]: 23 },
  { month: 'July', num: 6, [DeliveryType.LOCAL]: [24, 25, 26], [DeliveryType.OTHER]: 23 },
  { month: 'August', num: 7, [DeliveryType.LOCAL]: [21, 22, 23], [DeliveryType.OTHER]: 23 },
  { month: 'September', num: 8, [DeliveryType.LOCAL]: [25, 26, 27], [DeliveryType.OTHER]: 23 },
  { month: 'October', num: 9, [DeliveryType.LOCAL]: [23, 24, 25], [DeliveryType.OTHER]: 23 },
  { month: 'November', num: 10, [DeliveryType.LOCAL]: [20, 21, 22], [DeliveryType.OTHER]: 23 },
];

const configToString = (config, type = DeliveryType.LOCAL) => {
  const date = new Date();
  const currYear = date.getFullYear();
  const deliveryDays = config[type];
  const begConfigDate = new Date(`${config.month} ${deliveryDays[0]} ${currYear}`);
  const endConfigDate = new Date(`${config.month} ${deliveryDays.pop()} ${currYear}`);
  const combinedStr = `${format(begConfigDate, 'MMMM do')}-${format(endConfigDate, 'do')}`;
  return combinedStr.replace(' ', '\u00A0');
};

export const getNextDeliveryDay = () => {
  const currMonthNum = new Date().getMonth();
  const config = CALENDAR_DATA.find((m) => m.num === currMonthNum);
  if (config) {
    return configToString(config);
  }
  // assume its first month config (pre launch)
  return configToString(CALENDAR_DATA[0]);
};
