import { camelCase } from 'lodash';

export const deserialize = (payload) => {
  return Object.entries(payload).reduce((acc, curr) => {
    const [key, val] = curr;
    acc[camelCase(key)] = val;
    return acc;
  }, {});
};
