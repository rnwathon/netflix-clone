import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { type = 'movie' } = req.query;

  const response = await fetch(
    `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.API_KEY}`
  );
  const data = await response.json();

  res.status(200).json(data?.genres);
};

export default handler;
