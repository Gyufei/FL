export function useCreateOfferMinPrice() {
  function checkMinPrice(
    price: number | string,
    minPrice: number,
    isSell: boolean,
  ) {
    return isSell
      ? Number(price) > Number(minPrice * 1.2)
      : Number(price) < Number(minPrice * 0.8);
  }

  return {
    checkMinPrice,
  };
}
