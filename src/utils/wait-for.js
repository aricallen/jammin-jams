export const waitFor = (selector, cb, maxAttempts = 10) => {
  const _waitFor = (attempt) => {
    const elem = document.querySelector(selector);
    if (elem) {
      return cb(elem);
    }
    if (attempt < maxAttempts) {
      setTimeout(() => _waitFor(attempt + 1), 500);
    }
    cb(null);
  };
  _waitFor(0);
};
