import { useTranslations } from "next-intl";

export default function DelistBtn() {
  const mst = useTranslations("MyStocks");
  return (
    <div>
      <div className="text-sm leading-7 text-black">{mst("Listed")}</div>
    </div>
  );
}
