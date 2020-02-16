import axios from 'axios';
import { toUpper } from 'lodash';
import { combineReducers } from 'redux';
import { parseAxiosError } from './error';
import { MetaStatus } from '../../constants/meta-status';
import { deserialize } from './deserialize';

const DEFAULT_VERBS = ['fetch', 'update', 'create', 'delete'];
const DEFAULT_VARIATIONS = ['one', 'many'];
const DEFAULT_EVENTS = ['requested', 'succeeded', 'failed'];
const DEFAULT_INITIAL_META = { status: MetaStatus.INITIAL, error: null };
const DEFAULT_INITIAL_DATA = [];

export const createTypeConstants = (
  resourceName,
  { verbs = DEFAULT_VERBS, variations = DEFAULT_VARIATIONS, events = DEFAULT_EVENTS } = {}
) => {
  const typeCombos = verbs.flatMap((verb) => {
    return variations.flatMap((variation) => {
      return events.map((event) => `${verb}_${variation}_${event}`);
    });
  });
  return typeCombos.reduce((acc, curr) => {
    const key = toUpper(curr);
    acc[key] = `${resourceName}/${key}`;
    return acc;
  }, {});
};

export const createDefaultActions = (resourceName, endpoint, overrides = {}) => {
  const Type = createTypeConstants(resourceName);

  const fetchMany = () => {
    return async (dispatch) => {
      dispatch({ type: Type.FETCH_MANY_REQUESTED });
      try {
        const response = await axios.get(endpoint);
        const resources = response.data.data;
        dispatch({ type: Type.FETCH_MANY_SUCCEEDED, [resourceName]: resources });
        return resources;
      } catch (err) {
        dispatch({ type: Type.FETCH_MANY_FAILED, error: parseAxiosError(err) });
        throw err;
      }
    };
  };

  const fetchOne = (resourceId) => {
    return async (dispatch) => {
      dispatch({ type: Type.FETCH_ONE_REQUESTED });
      try {
        const response = await axios.get(`${endpoint}/${resourceId}`);
        const resources = response.data.data;
        dispatch({ type: Type.FETCH_ONE_SUCCEEDED, [resourceName]: resources });
        return resources;
      } catch (err) {
        dispatch({ type: Type.FETCH_ONE_FAILED, error: parseAxiosError(err) });
        throw err;
      }
    };
  };
  return { fetchMany, fetchOne, ...overrides };
};

export const createDefaultReducers = (
  resourceName,
  initialData = DEFAULT_INITIAL_DATA,
  initialMeta = DEFAULT_INITIAL_META,
  overrides = {}
) => {
  const Type = createTypeConstants(resourceName);

  const meta = (state = initialMeta, action) => {
    switch (action.type) {
      case Type.FETCH_REQUEST:
        return { ...state, status: MetaStatus.BUSY };
      case Type.FETCH_SUCCESS:
        return { ...state, status: MetaStatus.RESOLVED };
      case Type.FETCH_FAILURE:
        return { ...state, error: action.error, status: MetaStatus.ERRORED };
      default:
        return state;
    }
  };

  const data = (state = initialData, action) => {
    switch (action.type) {
      case Type.FETCH_SUCCESS:
        return action[resourceName].map(deserialize);
      default:
        return state;
    }
  };

  return { ...combineReducers({ meta, data }), ...overrides };
};
