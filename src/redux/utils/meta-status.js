import { MetaStatus } from '../../constants/meta-status';

export const isResolved = (metaState) => {
  return metaState.status === MetaStatus.RESOLVED;
};

export const isInitial = (metaState) => {
  return metaState.status === MetaStatus.INITIAL;
};

export const isErrored = (metaState) => {
  return metaState.status === MetaStatus.ERRORED;
};

export const isBusy = (metaState) => {
  return metaState.status === MetaStatus.BUSY;
};
