import { Dialog } from '@headlessui/react';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { FaPlay } from 'react-icons/fa';
import ReactPlayer from 'react-player/youtube';

import { useGenre } from '../../context/genre';
import { useModal } from '../../hooks';
import Button from '../Buttons';

interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  original_language: string;
  overview: string;
  original_title?: string;
  original_name?: string;
  title?: string;
  name?: string;
  popularity: number;
  poster_path: string;
  video?: boolean;
  vote_average: number;
  release_date: string;
  vote_count: number;
}

interface MovieModalProps {
  data?: Movie;
  isOpen: boolean;
  onClose: () => void;
}

interface Trailer {
  key?: string;
  [x: string]: any;
}

const MovieModal = ({ data, isOpen, onClose }: MovieModalProps) => {
  const { genreMovie, genreTv } = useGenre();
  const [trailer, setTrailer] = useState<Trailer>({});
  const [play, setPlay] = useState<boolean>(false);

  const isMovie = data?.media_type ? data?.media_type === 'movie' : true;

  const imgSrc = useMemo(() => {
    return `https://image.tmdb.org/t/p/w1280/${data?.backdrop_path}`;
  }, [data]);

  useEffect(() => {
    const getMovies = async () => {
      return fetch(
        `http://localhost:3000/api/video?id=${data?.id}&type=${
          data?.media_type || 'movie'
        }`
      )
        .then((res) => res.json())
        .then((data) => {
          setTrailer(data[0]);
        });
    };

    getMovies();

    return () => {
      setTrailer({});
      setPlay(false);
    };
  }, [data]);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="flex min-h-full items-center justify-center">
          <Dialog.Panel className="mx-auto max-w-5xl h-[84vh] bg-zinc-900 text-white">
            <div className="relative w-full h-4/6">
              {trailer?.key && play ? (
                <ReactPlayer
                  width="100%"
                  height="100%"
                  url={`https://www.youtube.com/watch?v=${trailer?.key}`}
                  className="image-gradient"
                  playing
                  onEnded={() => setPlay(false)}
                />
              ) : (
                <Image
                  src={imgSrc}
                  alt="thumbnail"
                  layout="fill"
                  objectFit="cover"
                  priority={false}
                  className="image-gradient"
                />
              )}

              {!play && (
                <div className="absolute left-0 bottom-0 z-10 p-3 md:p-12">
                  <div className="flex flex-col space-y-4">
                    <Dialog.Title className="text-white font-bold text-xl md:text-5xl">
                      {data?.title || data?.name}
                    </Dialog.Title>
                    <div className="flex space-x-2">
                      <Button
                        variant="primary"
                        icon={<FaPlay />}
                        onClick={() => setPlay(true)}
                      >
                        {' '}
                        Play{' '}
                      </Button>
                      <Button
                        variant="outlined"
                        icon={<AiOutlinePlus />}
                        circle
                      />
                    </div>
                    <p className="text-lg font-bold text-green-500">
                      {`${
                        data?.vote_average
                          ? Number(data.vote_average * 10).toFixed(2)
                          : '0'
                      }% Match`}
                    </p>
                  </div>
                </div>
              )}
              <Button
                variant="secondary"
                circle
                className="absolute right-0 top-0 z-10 p-6"
                onClick={onClose}
              >
                <AiOutlineClose />
              </Button>
            </div>
            <Dialog.Description className="w-full h-2/6 p-3 md:p-12 flex items-start md:items-center space-x-3 md:space-x-8 bg-zinc-900">
              <div className="w-2/3">{data?.overview}</div>
              <div className="w-1/3 flex flex-col space-y-4">
                <p>
                  <span className="text-zinc-500">Genre:</span>{' '}
                  {data?.genre_ids
                    ?.map((id: number, idx: number, arr: number[]) =>
                      isMovie
                        ? genreMovie
                          ? genreMovie[id]
                          : ''
                        : genreTv
                        ? genreTv[id]
                        : ''
                    )
                    .join(', ')}
                </p>
                <p>
                  <span className="text-zinc-500">Release Date:</span>{' '}
                  {data?.release_date}
                </p>
                <p>
                  <span className="text-zinc-500">Total Vote:</span>{' '}
                  {data?.vote_count}
                </p>
              </div>
            </Dialog.Description>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default MovieModal;
