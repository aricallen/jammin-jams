export const isBetaTester = () => {
  console.log('checking beta test');
  console.log(`process.env.TARGET_ENV:`, process.env.TARGET_ENV);
  if (process.env.TARGET_ENV === 'development') {
    return true;
  }
  const storedIsBetaTester = sessionStorage.getItem('isBetaTester');
  return storedIsBetaTester === 'true' || storedIsBetaTester === true;
};
