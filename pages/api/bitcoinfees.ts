import { NextApiRequest, NextApiResponse  } from "next";
import mempoolJS from "@mempool/mempool.js";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const { bitcoin: { fees } } = mempoolJS({
    hostname: 'mempool.space'
  });

  const feesRecommended = await fees.getFeesRecommended();
  res.status(200).json(feesRecommended);

}