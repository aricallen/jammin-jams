import axios from 'axios';
import { toUpper, camelCase } from 'lodash';
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
      case `${toUpper(action.type)}_REQUESTED`:
        return { ...state, status: { ...state.status, [camelCase(action.type)]: MetaStatus.BUSY } };
      case `${toUpper(action.type)}_SUCCEEDED`:
        return {
          ...state,
          status: { ...state.status, [camelCase(action.type)]: MetaStatus.RESOLVED },
        };
      case `${toUpper(action.type)}_FAILED`:
        return {
          ...state,
          error: action.error,
          status: { ...state.status, [camelCase(action.type)]: MetaStatus.ERRORED },
        };
      default:
        return state;
    }
  };

  const replaceOne = (newResource, state) => {
    return state.map((oldResource) =>
      newResource.id === oldResource.id ? newResource : oldResource
    );
  };

  const replaceMany = (newResources, state) => {
    return state.map((oldResource) => {
      const toReplace = newResources.find((resource) => resource.id === oldResource.id);
      return toReplace || oldResource;
    });
  };

  const removeOne = (deleted, state) => state.filter((resource) => resource.id !== deleted.id);

  const removeMany = (deleted, state) =>
    state.filter(
      (resource) => !deleted.some((deletedResource) => deletedResource.id === resource.id)
    );

  const data = (state = initialData, action) => {
    switch (action.type) {
      case Type.FETCH_ONE_SUCCEEDED:
      case Type.UPDATE_ONE_SUCCEEDED:
        return replaceOne(deserialize(action[resourceName], state));
      case Type.FETCH_MANY_SUCCEEDED:
        return action[resourceName].map(deserialize);
      case Type.UPDATE_MANY_SUCCEEDED:
        return replaceMany(action[resourceName].map(deserialize), state);
      case Type.CREATE_ONE_SUCCEEDED:
        return [...state, action[resourceName]];
      case Type.CREATE_MANY_SUCCEEDED:
        return [...state, ...action[resourceName]];
      case Type.DELETE_ONE_SUCCEEDED:
        return removeOne(action[resourceName], state);
      case Type.DELETE_MANY_SUCCEEDED:
        return removeMany(action[resourceName], state);
      default:
        return state;
    }
  };

  return combineReducers({
    meta: { ...meta, ...overrides.meta },
    data: { ...data, ...overrides.data },
  });
};
