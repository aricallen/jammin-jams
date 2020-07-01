import { useState } from 'react';
import axios from 'axios';
import { MetaStatus } from '../constants/meta-status';

export const useCrudState = (defaultState = {}) => {
  const [state, setState] = useState({
    meta: { status: MetaStatus.INITIAL },
    data: defaultState,
    error: null,
  });

  const fetch = async (fetchUrl) => {
    setState({ ...state, meta: { status: MetaStatus.BUSY } });
    try {
      const response = await axios.get(fetchUrl);
      const fetchedState = response.data.data || response.data;
      setState({ data: fetchedState, meta: { status: MetaStatus.RESOLVED } });
      return fetchedState;
    } catch (error) {
      setState({ ...state, meta: { status: MetaStatus.ERRORED }, error });
    }
  };

  const update = async (updateUrl, values) => {
    setState({ ...state, meta: { status: MetaStatus.BUSY } });
    try {
      const response = await axios.put(updateUrl, values);
      const updatedState = response.data.data || response.data;
      setState({ data: updatedState, meta: { status: MetaStatus.RESOLVED } });
      return updatedState;
    } catch (error) {
      setState({ ...state, meta: { status: MetaStatus.ERRORED }, error });
    }
  };

  const create = async (createUrl, values) => {
    setState({ ...state, meta: { status: MetaStatus.BUSY } });
    try {
      const response = await axios.post(createUrl, values);
      const updatedState = response.data.data || response.data;
      setState({ data: updatedState, meta: { status: MetaStatus.RESOLVED } });
      return updatedState;
    } catch (error) {
      setState({ ...state, meta: { status: MetaStatus.ERRORED }, error });
    }
  };

  return { fetch, update, create, state };
};
