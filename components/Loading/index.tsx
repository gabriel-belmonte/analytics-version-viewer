import { useEffect, useState } from 'preact/hooks';
import styles from './styles.module.css';

export default function Loading() {
  const [text, setText] = useState('Loading.');

  useEffect(() => {
    const addDotsInterval = setInterval(() => {
      setText((prev) => {
        if (prev.length >= 37) {
          return 'Loading.';
        } else {
          return prev + '.';
        }
      });
    }, 250);

    return () => clearInterval(addDotsInterval);
  }, []);

  return <h3 class={styles.loading}>{text}</h3>;
}
