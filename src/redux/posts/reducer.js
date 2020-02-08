import { combineReducers } from 'redux';
import { Type } from './actions';
import { MetaStatus } from '../../constants/meta-status';

const initialMeta = { status: MetaStatus.INITIAL, error: null };

const meta = (state = initialMeta, action) => {
  switch (action.type) {
    case Type.FETCH_POSTS_REQUEST:
      return { ...state, status: MetaStatus.BUSY };
    case Type.FETCH_POSTS_FAILURE:
      return { ...state, error: action.error, status: MetaStatus.ERRORED };
    case Type.FETCH_POSTS_SUCCESS:
      return { ...state, status: MetaStatus.RESOLVED };
    default:
      return { ...state, status: MetaStatus.INITIAL };
  }
};

const initialData = null;

const data = (state = initialData, action) => {
  switch (action.type) {
    case Type.FETCH_POSTS_SUCCESS:
      return { ...state, posts: action.posts };
    default:
      return { ...state };
  }
};

export const posts = combineReducers({ meta, data });
