import { useEffect, useState, useCallback } from "react";
import { BlockfrostAssets } from "../types/blockfrost";

const useAssetsApi = () => {

  const [data, setData] = useState<BlockfrostAssets>();
  const [loading, setLoading] = useState(false);


const fectchAssetApi = useCallback(async () => {

  try {
    setLoading(true);
    const res = await fetch("/api/assets");
    const data = await res.json();
    setData(data);
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    setLoading(false);
  }
}, []);

useEffect(() => {
  fectchAssetApi();
}, [fectchAssetApi]);

return {data, loading};
};

export default useAssetsApi;

