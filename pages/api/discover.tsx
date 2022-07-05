import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { type = 'movie', genre = '' } = req.query;
  const queryArr = [
    `api_key=${process.env.API_KEY}`,
    genre ? `with_genres=${genre}` : '',
  ];
  const query = queryArr.join('&');

  const response = await fetch(
    `https://api.themoviedb.org/3/discover/${type}?${query}`
  );
  const data = await response.json();

  res.status(200).json(data?.results);
};

export default handler;
