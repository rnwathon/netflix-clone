import clsx from 'clsx';
import type { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  icon?: ReactNode;
  variant: 'primary' | 'secondary' | 'outlined';
  circle?: Boolean;
  [x: string]: any;
}

const Button = ({
  children,
  variant,
  circle = false,
  icon = '',
  ...rest
}: Props) => {
  const padding = circle ? 'p-1 md:p-2' : 'px-4 py-1 md:px-8 md:py-2';
  const style = clsx([
    'transition-all',
    'rounded-md',
    'font-bold',
    'flex items-center gap-2',
    variant === 'primary' &&
      `${padding} bg-white hover:bg-zinc-300 text-zinc-900`,
    variant === 'primary' &&
      circle &&
      `${padding} border-2 md:border-4 border-white hover:border-zinc-300 bg-white hover:bg-zinc-300 text-zinc-900`,
    variant === 'secondary' &&
      `${padding} bg-white/30 hover:bg-white/20 text-white`,
    variant === 'outlined' &&
      `${padding} bg-transparent text-white border-4 border-white/20 hover:border-white`,
    circle && 'rounded-full',
  ]);

  return (
    <button className={style} {...rest}>
      {icon}
      {children}
    </button>
  );
};

export default Button;
