// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  dados: any
}

import * as data from '../../assets/11.json'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const fileName = `../../assets/${req.query.file}.json`;
  // const dados = JSON.stringify(await import(fileName));


  console.log(await import(fileName))

  res.status(200).json({ dados: [] });
}
