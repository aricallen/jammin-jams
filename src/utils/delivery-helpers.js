import { format } from 'date-fns';

export const DeliveryType = {
  LOCAL: 'LOCAL',
  OTHER: 'OTHER',
};

export const CALENDAR_DATA = [
  { month: 'January 2021', num: 1, [DeliveryType.LOCAL]: [18], [DeliveryType.OTHER]: [23] },
];

const configToString = (config, type = DeliveryType.LOCAL) => {
  const date = new Date();
  const currYear = date.getFullYear();
  const deliveryDays = config[type];
  const begConfigDate = new Date(`${config.month} ${deliveryDays[0]} ${currYear}`);
  const endConfigDate = new Date(`${config.month} ${deliveryDays[1]} ${currYear}`);
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
