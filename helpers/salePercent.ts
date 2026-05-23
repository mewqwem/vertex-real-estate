export const getSalePrice = (
  oldPrice: number | null,
  newPrice: number | null,
) => {
  if (oldPrice === null || newPrice === null) {
    return null;
  }
  if (oldPrice === 0) {
    return null;
  }
  const discount = ((oldPrice - newPrice) / oldPrice) * 100;

  return Math.round(discount);
};
