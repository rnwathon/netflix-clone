import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';

import { Footer, Header, MoviesRow, Navbar } from '../components';
import MovieModal from '../components/MovieModal';
import { useModal } from '../hooks';

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

interface HomeProps {
  trendingMovies: Movie[];
  trendingTvs: Movie[];
  moviesHorrors: Movie[];
  moviesScifis: Movie[];
}

const Home: NextPage<HomeProps> = ({
  trendingMovies,
  trendingTvs,
  moviesHorrors,
  moviesScifis,
}) => {
  const { isOpen, closeModal, openModal } = useModal();
  const [movieDetail, setMovieDetail] = useState<Movie>();

  const handleClickDetail = (movie: Movie) => {
    setMovieDetail(movie);
    openModal();
  };

  return (
    <div className="bg-zinc-900 min-h-screen">
      <Head>
        <title>Netflix Clone</title>
        <meta name="description" content="Netflix clone built with NextJs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <Header
        data={{
          title: trendingMovies[0]?.title,
          backdrop_path: trendingMovies[0]?.backdrop_path,
          overview: trendingMovies[0]?.overview,
        }}
      />
      <main>
        <MoviesRow title="Popular on Netflix" className="-mt-72">
          {trendingMovies?.map((trendingMovie, idx) => {
            return (
              <MoviesRow.Item
                key={`trendingMovie-${idx}`}
                data={trendingMovie}
                variant="landscape"
                onClickDetail={handleClickDetail}
              />
            );
          })}
        </MoviesRow>
        <MoviesRow title="TV Shows" className="-mt-32">
          {trendingTvs?.map((trendingTv, idx) => {
            return (
              <MoviesRow.Item
                key={`trendingTv-${idx}`}
                data={trendingTv}
                variant="potrait"
                onClickDetail={handleClickDetail}
              />
            );
          })}
        </MoviesRow>
        <MoviesRow title="Horrors" className="-mt-32">
          {moviesHorrors?.map((moviesHorror, idx) => {
            return (
              <MoviesRow.Item
                key={`moviesHorror-${idx}`}
                data={moviesHorror}
                variant="landscape"
                onClickDetail={handleClickDetail}
              />
            );
          })}
        </MoviesRow>
        <MoviesRow title="TV Shows" className="-mt-32">
          {moviesScifis?.map((moviesScifi, idx) => {
            return (
              <MoviesRow.Item
                key={`moviesScifi-${idx}`}
                data={moviesScifi}
                variant="landscape"
                onClickDetail={handleClickDetail}
              />
            );
          })}
        </MoviesRow>
      </main>
      <MovieModal isOpen={isOpen} onClose={closeModal} data={movieDetail} />
      <Footer />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const resTrendingMovies = await fetch(
    'http://localhost:3000/api/trending?type=movie&time=week'
  );
  let dataTrendingMovies = await resTrendingMovies.json();

  const resTrendingTvs = await fetch(
    'http://localhost:3000/api/trending?type=tv&time=week'
  );
  const dataTrendingTvs = await resTrendingTvs.json();

  const resMoviesHorrors = await fetch(
    'http://localhost:3000/api/discover?type=movie&genre=27'
  );
  const dataMoviesHorrors = await resMoviesHorrors.json();

  const resMoviesScifis = await fetch(
    'http://localhost:3000/api/discover?type=movie&genre=878'
  );
  const dataMoviesScifis = await resMoviesScifis.json();

  return {
    props: {
      trendingMovies: dataTrendingMovies,
      trendingTvs: dataTrendingTvs,
      moviesHorrors: dataMoviesHorrors,
      moviesScifis: dataMoviesScifis,
    },
  };
};

export default Home;
