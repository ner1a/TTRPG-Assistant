import Image, { type ImageProps } from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to TTRPG Assistant!</h1>
      </main>
    </div>
  );
}
