// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

type Data = {
    data: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    res.status(200).json({ data: "Código que usei para separar o JSON de dados, do csv" })
}

// const { appendFileSync, open } = require('fs');

// (async () => {
//     const data = await require('./use.app.json');

//     data.forEach(value => {
//         appendFileSync(`${value.id_estad}.json`, JSON.stringify(value) + ",")
//     })
// })()

// Exemplo: 