export function useGlobalConfig() {
  const minAmount = 10;
  const platformFee = 0.005;
  const referralBaseRate = 30;

  return {
    minAmount,
    platformFee,
    referralBaseRate
  };
}
