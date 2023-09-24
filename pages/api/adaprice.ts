import type { NextApiRequest, NextApiResponse } from "next";

const URL = "https://api.poloniex.com/markets/ADA_USDT/price";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
   const fetchResponse = await (
    await fetch(`${URL}`, {})
  ).json();

  res.status(200).send(fetchResponse);
}
