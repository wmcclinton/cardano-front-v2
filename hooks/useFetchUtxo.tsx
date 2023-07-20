import { useState, useEffect, useCallback } from 'react';
import { Utxo } from '../types/blockfrost';

const useFetchUtxo = (address: string) => {
  const [utxos, setUtxos] = useState<Utxo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  

  const fectchUtxo = useCallback(async () => {

    if (address === '') {
      return;
    }


    try {
      const res = await fetch(`/api/balance?address=${encodeURIComponent(address)}`);
      const data = await res.json();
      setUtxos(data);
      setLoading(false);
    } catch (error) {
      setError('An error occurred while fetching UTXOs');
      console.error("An error occurred:", error);
      setLoading(true);
    }
  }, [address]);
  
  useEffect(() => {
    fectchUtxo();
  }, [fectchUtxo]);
  
  return {utxos, error, loading};
  };
  
  export default useFetchUtxo;