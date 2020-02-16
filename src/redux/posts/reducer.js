import { combineReducers } from 'redux';
import { Type } from './actions';
import { MetaStatus } from '../../constants/meta-status';

const initialMeta = { status: MetaStatus.INITIAL, error: null };

const meta = (state = initialMeta, action) => {
  switch (action.type) {
    case Type.FETCH_POSTS_REQUESTED:
    case Type.FETCH_POST_REQUESTED:
    case Type.SAVE_POST_REQUESTED:
      return { ...state, status: MetaStatus.BUSY };
    case Type.FETCH_POSTS_FAILED:
    case Type.FETCH_POST_FAILED:
    case Type.SAVE_POST_FAILED:
      return { ...state, error: action.error, status: MetaStatus.ERRORED };
    case Type.FETCH_POSTS_SUCCEEDED:
    case Type.FETCH_POST_SUCCEEDED:
    case Type.SAVE_POST_SUCCEEDED:
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
    case Type.FETCH_POSTS_SUCCEEDED:
      return action.posts;
    case Type.FETCH_POST_SUCCEEDED:
    case Type.SAVE_POST_SUCCEEDED:
      return replacePost(state, action.post);
    default:
      return state;
  }
};

export const posts = combineReducers({ meta, data });
