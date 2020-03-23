export const isBetaTester = () => {
  if (process.env.TARGET_ENV === 'development') {
    return true;
  }
  const storedIsBetaTester = sessionStorage.getItem('isBetaTester');
  return storedIsBetaTester === 'true' || storedIsBetaTester === true;
};
