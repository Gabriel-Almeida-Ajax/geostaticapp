// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  dados: any
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const fileName = `${req.query.file}.json`;
  const dados = JSON.stringify(require(fileName));

  res.status(200).json({ dados });
}
