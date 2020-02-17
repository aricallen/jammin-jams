export const formatAmount = (amount) => {
  const fractional = amount / 100;
  return fractional.toFixed(2);
};
