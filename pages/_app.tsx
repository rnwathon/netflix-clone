import '../styles/globals.css';

import type { AppProps } from 'next/app';

import GenreProvider from '../context/genre';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GenreProvider>
      <Component {...pageProps} />
    </GenreProvider>
  );
}

export default MyApp;
