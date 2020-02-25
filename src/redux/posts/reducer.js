import { combineReducers } from 'redux';
import { Type } from './actions';
import { MetaStatus } from '../../constants/meta-status';

const initialMeta = { status: MetaStatus.INITIAL, error: null };

const meta = (state = initialMeta, action) => {
  switch (action.type) {
    case Type.FETCH_MANY_REQUESTED:
    case Type.FETCH_ONE_REQUESTED:
    case Type.SAVE_ONE_REQUESTED:
      return { ...state, status: MetaStatus.BUSY };
    case Type.FETCH_MANY_FAILED:
    case Type.FETCH_ONE_FAILED:
    case Type.SAVE_ONE_FAILED:
      return { ...state, error: action.error, status: MetaStatus.ERRORED };
    case Type.FETCH_MANY_SUCCEEDED:
    case Type.FETCH_ONE_SUCCEEDED:
    case Type.SAVE_ONE_SUCCEEDED:
      return { ...state, status: MetaStatus.RESOLVED };
    default:
      return { ...state };
  }
};

const initialData = [];

const replacePost = (posts, newPost) => {
  if (posts.length === 0) {
    return [newPost];
  }
  return posts.map((post) => (post.id === newPost.id ? newPost : post));
};

const data = (state = initialData, action) => {
  switch (action.type) {
    case Type.FETCH_MANY_SUCCEEDED:
      return action.posts;
    case Type.FETCH_ONE_SUCCEEDED:
    case Type.UPDATE_ONE_SUCCEEDED:
      return replacePost(state, action.post);
    case Type.CREATE_ONE_SUCCEEDED:
      return [...state, action.post];
    default:
      return state;
  }
};

export const posts = combineReducers({ meta, data });
