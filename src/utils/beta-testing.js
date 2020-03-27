export const isBetaTester = () => {
  const storedIsBetaTester = sessionStorage.getItem('isBetaTester');
  return storedIsBetaTester === 'true' || storedIsBetaTester === true;
};
