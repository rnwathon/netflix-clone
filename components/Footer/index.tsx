const Footer = (): JSX.Element => {
  return (
    <footer className="flex items-center justify-center h-24 w-full text-white/50">
      <p>
        Bootstraped with{' '}
        <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
          NextJS
        </a>{' '}
        &{' '}
        <a
          href="https://www.themoviedb.org/documentation/api"
          target="_blank"
          rel="noreferrer"
        >
          TMDB API
        </a>
      </p>
    </footer>
  );
};

export default Footer;
