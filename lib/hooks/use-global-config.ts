export function useGlobalConfig() {
  const minAmount = 10;
  const platFormFee = 0.005;

  return {
    minAmount,
    platFormFee,
  };
}
