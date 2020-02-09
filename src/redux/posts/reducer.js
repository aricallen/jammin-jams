import { combineReducers } from 'redux';
import { Type } from './actions';
import { MetaStatus } from '../../constants/meta-status';

const initialMeta = { status: MetaStatus.INITIAL, error: null };

const meta = (state = initialMeta, action) => {
  switch (action.type) {
    case Type.FETCH_POSTS_REQUEST:
    case Type.FETCH_POST_REQUEST:
    case Type.SAVE_POST_REQUEST:
      return { ...state, status: MetaStatus.BUSY };
    case Type.FETCH_POSTS_FAILURE:
    case Type.FETCH_POST_FAILURE:
    case Type.SAVE_POST_FAILURE:
      return { ...state, error: action.error, status: MetaStatus.ERRORED };
    case Type.FETCH_POSTS_SUCCESS:
    case Type.FETCH_POST_SUCCESS:
    case Type.SAVE_POST_SUCCESS:
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
    case Type.FETCH_POSTS_SUCCESS:
      return action.posts;
    case Type.FETCH_POST_SUCCESS:
    case Type.SAVE_POST_SUCCESS:
      return replacePost(state, action.post);
    default:
      return state;
  }
};

export const posts = combineReducers({ meta, data });
