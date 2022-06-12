import type { NextPage } from 'next';
import Head from 'next/head';

import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Rakhmat N. Wathon</title>
        <meta
          name="description"
          content="Personal site of Rakhmat Nashrul Wathon"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Rakhmat N. Wathon</h1>
      </main>
    </div>
  );
};

export default Home;
