import clsx from 'clsx';
import Image from 'next/image';
import { ReactNode, useMemo } from 'react';
import { AiOutlineDown, AiOutlinePlus } from 'react-icons/ai';
import { FaPlay } from 'react-icons/fa';

import { useGenre } from '../../context/genre';
import Button from '../Buttons';

interface Film {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title?: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface Tv {
  adult: boolean;
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

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
}

interface MoviesItemProps {
  variant?: 'landscape' | 'potrait';
  data: Movie;
  onClickDetail: Function;
}

const MoviesItem = ({ variant, data, onClickDetail }: MoviesItemProps) => {
  const { genreMovie, genreTv } = useGenre();

  const isLandscape = variant === 'landscape';
  const isPotrait = variant === 'potrait';
  const isMovie = data?.media_type ? data?.media_type === 'movie' : true;

  const wrapperStyle = clsx([
    'transition-all',
    'shrink-0',
    'group',
    'mr-2',
    isLandscape && 'h-24 w-48 md:h-48 md:w-96',
    isLandscape &&
      'hover:scale-110 hover:z-10 hover:-translate-y-4 hover:shadow-lg',
    isPotrait && 'h-48 w-32 md:h-96 md:w-60',
    isPotrait && 'relative',
  ]);

  const detailStyle = clsx([
    'w-full p-3',
    'transition-all',
    'flex flex-col space-y-3',
    'opacity-0 group-hover:opacity-100',
    isLandscape && 'bg-zinc-800',
    isPotrait &&
      'absolute left-0 bottom-0 bg-gradient-to-t from-black to-transparent',
  ]);

  const imgSrc = useMemo(() => {
    if (isLandscape)
      return `https://image.tmdb.org/t/p/w500/${data?.backdrop_path}`;
    return `https://image.tmdb.org/t/p/w500/${data?.poster_path}`;
  }, [data, isLandscape]);

  return (
    <div className={wrapperStyle}>
      <div className="relative w-full h-full">
        <Image
          src={imgSrc}
          alt="thumbnail"
          layout="fill"
          objectFit="cover"
          priority={false}
          placeholder="blur"
          blurDataURL="https://via.placeholder.com/100"
        />
      </div>
      <div className={detailStyle}>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button variant="primary" icon={<FaPlay />} circle></Button>
            <Button variant="outlined" icon={<AiOutlinePlus />} circle></Button>
          </div>
          <div>
            <Button
              variant="outlined"
              icon={<AiOutlineDown />}
              circle
              onClick={() => onClickDetail(data)}
            ></Button>
          </div>
        </div>
        {isLandscape && (
          <>
            <h3 className="text-white font-bold">
              {data?.title || data?.name}
            </h3>
            <div className="text-zinc-300">
              {data?.genre_ids?.map(
                (id: number, idx: number, arr: number[]) => (
                  <span key={`genre-${data?.id}-${idx}`}>
                    {isMovie
                      ? genreMovie
                        ? genreMovie[id]
                        : ''
                      : genreTv
                      ? genreTv[id]
                      : ''}
                    {idx !== arr.length - 1 && <> &bull; </>}
                  </span>
                )
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MoviesItem;
