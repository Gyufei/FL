export default function NewestItemCard() {
  return (
    <div className="mt-20">
      <div className="flex justify-between space-x-[250px] text-xl leading-[30px] text-gray">
        <div>Item ID</div>
        <div>Asset</div>
        <div>Value</div>
      </div>
      <div
        className="flex h-[88px] items-center justify-between space-x-[250px] rounded-[20px] bg-white px-8"
        style={{
          boxShadow: "4px 8px 40px 0px rgba(45, 46, 51, 0.04)",
        }}
      >
        <div>79818182</div>
        <div></div>
        <div>Value</div>
      </div>
    </div>
  );
}
