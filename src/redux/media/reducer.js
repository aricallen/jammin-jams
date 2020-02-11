import { combineReducers } from 'redux';
import { Type } from './actions';
import { MetaStatus } from '../../constants/meta-status';

const initialMeta = { status: MetaStatus.INITIAL, error: null };

const meta = (state = initialMeta, action) => {
  switch (action.type) {
    case Type.FETCH_ALL_MEDIA_REQUEST:
    case Type.UPLOAD_ALL_MEDIA_REQUEST:
    case Type.FETCH_MEDIA_REQUEST:
    case Type.UPDATE_MEDIA_REQUEST:
    case Type.DELETE_MEDIA_REQUEST:
      return { ...state, status: MetaStatus.BUSY };
    case Type.FETCH_ALL_MEDIA_FAILURE:
    case Type.UPLOAD_ALL_MEDIA_FAILURE:
    case Type.FETCH_MEDIA_FAILURE:
    case Type.UPDATE_MEDIA_FAILURE:
    case Type.DELETE_MEDIA_FAILURE:
      return { ...state, error: action.error, status: MetaStatus.ERRORED };
    case Type.FETCH_ALL_MEDIA_SUCCESS:
    case Type.UPLOAD_ALL_MEDIA_SUCCESS:
    case Type.FETCH_MEDIA_SUCCESS:
    case Type.UPDATE_MEDIA_SUCCESS:
    case Type.DELETE_MEDIA_SUCCESS:
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
    case Type.FETCH_ALL_MEDIA_SUCCESS:
      return action.media;
    case Type.FETCH_MEDIA_SUCCESS:
    case Type.UPDATE_MEDIA_SUCCESS:
      return replacePost(state, action.media);
    case Type.DELETE_MEDIA_SUCCESS:
      return state.filter((item) => item.id !== action.id);
    case Type.UPLOAD_ALL_MEDIA_SUCCESS:
      return [state, ...action.media];
    default:
      return state;
  }
};

export const media = combineReducers({ meta, data });
