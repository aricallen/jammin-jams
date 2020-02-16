import { combineReducers } from 'redux';
import { Type } from './actions';
import { MetaStatus } from '../../constants/meta-status';

const initialMeta = { status: MetaStatus.INITIAL, error: null };

const meta = (state = initialMeta, action) => {
  switch (action.type) {
    case Type.FETCH_ALL_MEDIA_REQUESTED:
    case Type.UPLOAD_ALL_MEDIA_REQUESTED:
    case Type.FETCH_MEDIA_REQUESTED:
    case Type.UPDATE_MEDIA_REQUESTED:
    case Type.DELETE_MEDIA_REQUESTED:
      return { ...state, status: MetaStatus.BUSY };
    case Type.FETCH_ALL_MEDIA_FAILED:
    case Type.UPLOAD_ALL_MEDIA_FAILED:
    case Type.FETCH_MEDIA_FAILED:
    case Type.UPDATE_MEDIA_FAILED:
    case Type.DELETE_MEDIA_FAILED:
      return { ...state, error: action.error, status: MetaStatus.ERRORED };
    case Type.FETCH_ALL_MEDIA_SUCCEEDED:
    case Type.UPLOAD_ALL_MEDIA_SUCCEEDED:
    case Type.FETCH_MEDIA_SUCCEEDED:
    case Type.UPDATE_MEDIA_SUCCEEDED:
    case Type.DELETE_MEDIA_SUCCEEDED:
      return { ...state, status: MetaStatus.RESOLVED };
    default:
      return { ...state };
  }
};

const initialData = [];

const replacePost = (allMedia, newMedia) => {
  if (allMedia.length === 0) {
    return [newMedia];
  }
  return allMedia.map((media) => (media.id === newMedia.id ? newMedia : media));
};

const data = (state = initialData, action) => {
  switch (action.type) {
    case Type.FETCH_ALL_MEDIA_SUCCEEDED:
      return action.media;
    case Type.FETCH_MEDIA_SUCCEEDED:
    case Type.UPDATE_MEDIA_SUCCEEDED:
      return replacePost(state, action.media);
    case Type.DELETE_MEDIA_SUCCEEDED:
      return state.filter((item) => item.id !== action.id);
    case Type.UPLOAD_ALL_MEDIA_SUCCEEDED:
      return [state, ...action.media];
    default:
      return state;
  }
};

export const media = combineReducers({ meta, data });
