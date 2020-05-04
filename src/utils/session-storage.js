const SESSION_KEY = 'jmnjams_session_storage';

const getStorage = () => {
  const currStorage = sessionStorage.getItem(SESSION_KEY);
  if (!currStorage) {
    return null;
  }
  try {
    return JSON.parse(currStorage);
  } catch (err) {
    return null;
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

export const getItem = (key, defaultValue) => {
  const currStorage = getStorage();
  if (currStorage) {
    return currStorage[key] || defaultValue;
  }
  return defaultValue;
};
