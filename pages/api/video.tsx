import type { NextApiRequest, NextApiResponse } from 'next';

interface Video {
  type: string;
  [x: string]: any;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id, type = 'movie' } = req.query;

    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${process.env.API_KEY}`
    );
    const data = await response.json();

    let trailers: Video[] = [];
    if (data?.results && data?.results?.length) {
      trailers = data.results.filter(
        (video: Video) => video?.type === 'Trailer'
      );
    }

    res.status(200).json(trailers);
  } catch (err) {
    res.status(404).json({ error: 'error' });
  }
};

export default handler;
