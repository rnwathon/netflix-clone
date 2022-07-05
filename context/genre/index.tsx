import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

interface Genre {
  id: number;
  name: string;
}

interface GenreTable {
  [key: number]: string;
}

interface GenreProviderInterface {
  children: ReactNode;
}

interface GenreProviderValueInterface {
  genreMovie?: GenreTable;
  genreTv?: GenreTable;
}

const GenreContext = createContext<GenreProviderValueInterface>({});

const GenreProvider = ({ children }: GenreProviderInterface) => {
  const [genreMovie, setGenreMovie] = useState<GenreTable>({});
  const [genreTv, setGenreTv] = useState<GenreTable>({});

  const getGenreMovie = useCallback(async () => {
    const res = await fetch('http://localhost:3000/api/genre?type=movie');
    const data = await res.json();

    return data;
  }, []);

  const getGenreTv = useCallback(async () => {
    const response = await fetch('http://localhost:3000/api/genre?type=tv');
    const data = await response.json();

    return data;
  }, []);

  const getAllGenre = useCallback(async () => {
    const arrGenreMovie = await getGenreMovie();
    const arrGenreTv = await getGenreTv();

    const dataGenreMovie: GenreTable = {};
    const dataGenreTv: GenreTable = {};

    arrGenreMovie.forEach((item: Genre) => {
      dataGenreMovie[item?.id] = item?.name;
    });

    arrGenreTv.forEach((item: Genre) => {
      dataGenreTv[item?.id] = item?.name;
    });

    setGenreMovie(dataGenreMovie);
    setGenreTv(dataGenreTv);
  }, [getGenreMovie, getGenreTv]);

  useEffect(() => {
    getAllGenre();
  }, [getAllGenre]);

  return (
    <GenreContext.Provider value={{ genreMovie, genreTv }}>
      {children}
    </GenreContext.Provider>
  );
};

export const useGenre = () => {
  return useContext(GenreContext);
};

export default GenreProvider;
