import axios from 'axios';
import { parseAxiosError } from '../utils/error';

export const Type = {
  FETCH_SCHEMA_REQUESTED: 'schemas/FETCH_SCHEMA_REQUESTED',
  FETCH_SCHEMA_SUCCEEDED: 'schemas/FETCH_SCHEMA_SUCCEEDED',
  FETCH_SCHEMA_FAILED: 'schemas/FETCH_SCHEMA_FAILED',
};

export const fetchSchema = (schemaName) => {
  return async (dispatch, getState) => {
    const cached = getState().schemas[schemaName];
    if (cached) {
      return cached;
    }
    dispatch({ type: Type.FETCH_SCHEMA_REQUESTED });
    try {
      const response = await axios.get(`/api/schemas/${schemaName}`);
      const schema = response.data.data;
      dispatch({ type: Type.FETCH_SCHEMA_SUCCEEDED, schema });
      return schema;
    } catch (err) {
      dispatch({ type: Type.FETCH_SCHEMA_FAILED, error: parseAxiosError(err) });
      throw err;
    }
  };
};
