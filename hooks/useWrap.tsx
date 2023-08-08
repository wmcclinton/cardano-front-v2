import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../components/GlobalContext";
import { useTryCatch } from "./useTryCatch";
import { formatAmount } from "../utils/fortmat";
import useBitcoinFees from "./useBitcoinFees";

export enum WrapStage {
  NotStarted,
  Pending,
  Sent,
}

export default function useWrap() {
  const { config, walletApi } = useContext(GlobalContext);
  const wrapFeeBtc = config.wrapFeeBtc;
  const wrapDepositAddress = config.btcWrapAddress;

  const feesRecommended: number | undefined = useBitcoinFees();
  
  const [networkFee, setNetworkFee] = useState("")

  useEffect(() => {
    if(feesRecommended){
      setNetworkFee(formatAmount((feesRecommended*350)/100000000));
    }
  }, [feesRecommended]);

  const { tryWithErrorHandler } = useTryCatch();

  const [amount, setAmount] = useState<string>("");
  const [bridgeFee, setBridgeFee] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [wrapStage, setWrapStage] = useState<WrapStage>(WrapStage.NotStarted);
  const [btcToBeReceived, setBtcToBeReceived] = useState(0);




  useEffect(() => {
    const fee = (wrapFeeBtc / 100 * Number(amount) + 0.0005 + Number(networkFee));
    if(amount === ""){
      setBridgeFee(0)
      setBtcToBeReceived(0);
    } else{
      setBridgeFee(fee);
      setBtcToBeReceived(Number(amount) - fee);
    }
    
  }, [wrapFeeBtc, amount, networkFee]);

  const wrap = async () => {
    await tryWithErrorHandler(() => {
      setIsLoading(true);  
      setTimeout(()=>{
        setWrapStage(WrapStage.Pending);
        setIsLoading(false);
      },2000);
    });
  };

  return {
    amount,
    setAmount,
    wrapFeeBtc,
    bridgeFee,
    btcToBeReceived,
    wrapDepositAddress,
    wrap,
    isLoading,
    wrapStage,
    setWrapStage,
    networkFee,
    feesRecommended,
  };
}
