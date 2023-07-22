import type { NextApiRequest, NextApiResponse } from "next";
import { BLOCKFROST_URL, CardanoNetwork } from "../../utils/api";


const CARDANO_NETWORK = process.env.CARDANO_NETWORK;
const BLOCKFROST_PROJECT_ID = process.env.BLOCKFROST_PROJECT_ID;
const CBTC_ASSET_ID = process.env.CBTC_ASSET_ID;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
){

  const { address } = req.query;

  if (typeof address !== 'string') {
    return res.status(400).json({ error: 'Invalid address' });
  }
  
  if (!CARDANO_NETWORK || !BLOCKFROST_PROJECT_ID || !address) {
    return res
      .status(500)
      .send("Server is not setup properly. Missing .env file");
  }

  const url = `${BLOCKFROST_URL[CARDANO_NETWORK as CardanoNetwork]}/addresses/${address}/utxos/${CBTC_ASSET_ID}`;

  const headers = {
    project_id: BLOCKFROST_PROJECT_ID
  }

  try {
    const response = await fetch(url, { headers });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
}
