export const formatPrice = (price: number) => {
  return Math.floor(price).toLocaleString('en-US');
};
