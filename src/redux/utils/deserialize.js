import { camelCase } from 'lodash';

export const deserialize = (payload) => {
  return Object.entries(payload).reduce((acc, curr) => {
    const [key, val] = curr;
    if (val && typeof val === 'object' && Object.keys(val).length > 0) {
      acc[camelCase(key)] = deserialize(val);
    } else {
      acc[camelCase(key)] = val;
    }
    return acc;
  }, {});
};
