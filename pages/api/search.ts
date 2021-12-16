import { searchMovie } from '../../graphql/queries/movies';

import type { NextApiRequest } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: any
) {
    console.log({ query: req.query });
    try {
        const { term, page } = req.query;
        const { results, pagination } = await searchMovie(term as string, page as string);
        console.log({ results });

        res.status(200).json({ results, pagination });
    } catch (error) {
        console.log('===>', { error });
        res.status(500).json({ error });
    }
}
