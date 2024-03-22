export function useGlobalConfig() {
  const minAmount = 10;
  const platformFee = 0.005;

  return {
    minAmount,
    platformFee,
  };
}
