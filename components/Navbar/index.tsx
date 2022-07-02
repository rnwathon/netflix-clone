import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaBell, FaSearch } from 'react-icons/fa';

import logo from '../../public/logo.svg';
import profile from '../../public/profile.png';

const Navbar = (): JSX.Element => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    // clean up code
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const wrapperStyle = clsx([
    'p-4',
    'fixed top-0 left-0 right-0 z-20',
    'flex items-center justify-between',
    'transition-all',
    offset > 0 && 'bg-black/70',
  ]);

  return (
    <nav className={wrapperStyle}>
      <section className="flex gap-6">
        <Image src={logo} alt="Netflix Logo" />
        <ul className="text-white hidden md:flex items-center gap-6">
          <li className="hover:text-zinc-300 cursor-pointer">Home</li>
          <li className="hover:text-zinc-300 cursor-pointer">TV Shows</li>
          <li className="hover:text-zinc-300 cursor-pointer">Movies</li>
          <li className="hover:text-zinc-300 cursor-pointer">New & Popular</li>
          <li className="hover:text-zinc-300 cursor-pointer">My List</li>
        </ul>
      </section>
      <section className="flex items-center gap-6">
        <FaSearch className="text-white hover:text-zinc-300 cursor-pointer w-6 h-6" />
        <FaBell className="text-white hover:text-zinc-300 cursor-pointer w-6 h-6" />
        <Image className="rounded-sm" src={profile} alt="profile picture" />
      </section>
    </nav>
  );
};

export default Navbar;
