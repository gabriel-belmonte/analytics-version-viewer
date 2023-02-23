import Card from '../Card';
import styles from './styles.module.css';

export default function CardGroup({
  urlMapping,
}: {
  urlMapping: [string, string[]];
}) {
  const groupName = urlMapping[0];
  const urlList = urlMapping[1];

  return (
    <div class={styles.container}>
      <div class={styles.title}>{groupName}</div>
      <div class={styles.group}>
        {urlList.map((url) => (
          <Card fileURL={url} />
        ))}
      </div>
    </div>
  );
}
