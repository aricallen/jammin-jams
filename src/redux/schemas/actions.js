import axios from 'axios';
import { parseAxiosError } from '../utils/error';

export const Type = {
  FETCH_SCHEMA_REQUEST: 'schemas/FETCH_SCHEMA_REQUEST',
  FETCH_SCHEMA_SUCCESS: 'schemas/FETCH_SCHEMA_SUCCESS',
  FETCH_SCHEMA_FAILURE: 'schemas/FETCH_SCHEMA_FAILURE',
};

export const fetchSchema = (schemaName) => {
  return async (dispatch) => {
    dispatch({ type: Type.FETCH_SCHEMA_REQUEST });
    try {
      const response = await axios.get(`/api/schemas/${schemaName}`);
      const schema = response.data.data;
      dispatch({ type: Type.FETCH_SCHEMA_SUCCESS, schema });
      return schema;
    } catch (err) {
      dispatch({ type: Type.FETCH_SCHEMA_FAILURE, error: parseAxiosError(err) });
      throw err;
    }
  };
};
