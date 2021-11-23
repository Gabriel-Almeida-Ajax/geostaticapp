// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

type Data = {
    data: any
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    axios.get(`https://servicodados.ibge.gov.br/api/v3/malhas/estados/${17}?formato=application/vnd.geo+json&qualidade=intermediaria&intrarregiao=municipio`)
        .then(resp => {
            res.status(200).json({ data: resp.data })
        })
        .catch(err => {
            res.status(500).json({ data: err })
        })
}
