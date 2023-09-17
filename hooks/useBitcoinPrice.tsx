import { useState, useEffect, useCallback} from "react";

const useBitcoinPrice = () => {
  const [usdBtc, setUsdBtc] = useState<string | undefined>();

  const fetchBitcoinPrice = useCallback(async () => {
    try {
      const res = await fetch("/api/bitcoinprice");
      const data = await res.json();

      setUsdBtc(data.price);
    } catch (error) {
      console.error("Error fetching Bitcoin Price:", error);
    }
  }, []);

  useEffect(() => {
    fetchBitcoinPrice();
  }, [fetchBitcoinPrice]);

  return usdBtc;
};

export default useBitcoinPrice;