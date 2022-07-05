import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { type = 'movie', time = 'week' } = req.query;
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/${type}/${time}?api_key=${process.env.API_KEY}`
    );
    const data = await response.json();

    res.status(200).json(data?.results);
  } catch (err) {
    res.status(400).json({ error: 'error' });
  }
};

export default handler;
