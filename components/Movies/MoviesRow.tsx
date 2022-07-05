import clsx from 'clsx';
import type { ReactNode } from 'react';

import MoviesItem from './MoviesItem';

interface Props {
  children: ReactNode;
  className?: String;
  title: String;
}

const MoviesRow = ({ children, className, title, ...rest }: Props) => {
  const wrapperStyle = clsx(['flex flex-col space-y-2', className]);
  const titleStyle = clsx(['text-2xl font-bold text-white', 'ml-8']);
  const itemStyle = clsx([
    'hide-scrollbar',
    'flex overflow-x-auto overflow-y-hidden',
    'pl-14 pt-6 pb-40',
    '-ml-6 -mt-48',
  ]);

  return (
    <div className={wrapperStyle}>
      <h2 className={titleStyle}>{title}</h2>
      <div className={itemStyle}>{children}</div>
    </div>
  );
};

MoviesRow.Item = MoviesItem;

export default MoviesRow;
