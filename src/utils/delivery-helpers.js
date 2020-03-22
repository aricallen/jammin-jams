import { format } from 'date-fns';

export const DeliveryType = {
  BICYCLE: 'BICYCLE',
  OTHER: 'OTHER',
};

export const CALENDAR_DATA = [
  { month: 'April', num: 3, [DeliveryType.BICYCLE]: 22, [DeliveryType.OTHER]: 25 },
  { month: 'May', num: 4, [DeliveryType.BICYCLE]: 20, [DeliveryType.OTHER]: 23 },
  { month: 'June', num: 5, [DeliveryType.BICYCLE]: 20, [DeliveryType.OTHER]: 23 },
  { month: 'July', num: 6, [DeliveryType.BICYCLE]: 20, [DeliveryType.OTHER]: 23 },
];

const configToString = (config, type = DeliveryType.BICYCLE) => {
  const currYear = new Date().getFullYear();
  const configDate = new Date(`${config.month} ${config[type]} ${currYear}`);
  return `${format(configDate, 'MMMM do')}`.replace(' ', '\u00A0');
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
