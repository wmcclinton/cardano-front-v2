import { useState, useEffect, useCallback} from "react";

const useBitcoinFees = () => {
  const [feesRecommended, setFeesRecommended] = useState();

  const fetchBitcoinFees = useCallback(async () => {
    try {
      const res = await fetch("/api/bitcoinfees");
      const data = await res.json();
      setFeesRecommended(data.hourFee);
    } catch (error) {
      console.error("Error fetching Bitcoin fees:", error);
    }
  }, []);

  useEffect(() => {
    fetchBitcoinFees();
  }, [fetchBitcoinFees]);

  return feesRecommended;
};

export default useBitcoinFees;