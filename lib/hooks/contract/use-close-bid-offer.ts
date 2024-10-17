export function useCloseBidOffer() {
  return {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: null,
    error: null,
    write: async () => {
      return null;
    },
  };
}
