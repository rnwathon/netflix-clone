import Image from 'next/image';
import { BiLike } from 'react-icons/bi';
import { FaInfoCircle, FaPlay } from 'react-icons/fa';

import Button from '../Buttons';

interface Banner {
  backdrop_path: string | undefined;
  overview: string | undefined;
  title: string | undefined;
}

interface Props {
  data: Banner;
}

const Header = ({ data }: Props): JSX.Element => {
  return (
    <header className="relative">
      <div className="flex flex-col justify-start pt-32  h-[600px] md:h-screen md:justify-center md:pt-0 w-screen xl:w-3/4 2xl:w-1/2 text-white px-5 lg:px-20">
        <div className="absolute top-0 left-0 z-0 w-full h-2/3 md:h-3/4 lg:h-full">
          <Image
            src={`https://image.tmdb.org/t/p/original/${data?.backdrop_path}`}
            alt="backdrop image"
            layout="fill"
            objectFit="cover"
            className="image-gradient"
            priority={false}
          />
        </div>
        <h1 className="text-xl md:text-3xl lg:text-5xl font-bold mb-4 z-10">
          {data?.title}
        </h1>
        <p className="mb-4 z-10 hidden md:block">{data?.overview}</p>
        <div className="flex space-x-4 z-10">
          <Button variant="primary" icon={<FaPlay />}>
            Play
          </Button>
          <Button variant="secondary" icon={<FaInfoCircle />}>
            More Info
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
