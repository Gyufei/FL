export default function FeeDisplay() {
  const minAmount = 10;
  const fee = 0.005;

  return (
    <div className="mt-3">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm leading-5 text-gray">Minimum Order Amount</div>
        <div className="text-sm leading-5 text-black">${minAmount}</div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-sm leading-5 text-gray">Platform Trading Fee</div>
        <div className="text-sm leading-5 text-black">{fee * 100}%</div>
      </div>
    </div>
  );
}
