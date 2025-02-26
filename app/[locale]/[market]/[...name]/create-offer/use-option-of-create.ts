import { useState } from "react";
import { SettleModes } from "./settle-mode-select";

export function useOptionOfCreate() {
  const [collateralRate, setCollateralRate] = useState("");
  const [taxForSub, setTaxForSub] = useState("");
  const [settleMode, setSettleMode] = useState(SettleModes[0]);
  const [note, setNote] = useState("");

  return {
    collateralRate,
    setCollateralRate,
    taxForSub,
    setTaxForSub,
    settleMode,
    setSettleMode,
    note,
    setNote,
  };
}
