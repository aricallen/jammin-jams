const SESSION_KEY = 'jmnjams_session_storage';

const getStorage = () => {
  const currStorage = sessionStorage.getItem(SESSION_KEY);
  if (currStorage) {
    return JSON.parse(currStorage);
  }
};

const setStorage = (newState) => sessionStorage.setItem(SESSION_KEY, JSON.stringify(newState));

export const setItem = (key, value) => {
  const currStorage = getStorage() || {};
  const newState = {
    ...currStorage,
    [key]: value,
  };
  setStorage(newState);
};

export const getItem = (key) => {
  const currStorage = getStorage();
  if (currStorage) {
    return currStorage[key];
  }
  return null;
};
