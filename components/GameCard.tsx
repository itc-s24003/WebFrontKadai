import Link from 'next/link';
import styles from './GameCard.module.css';

type Props = {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
};

export default function GameCard({ id, title, description, thumbnail }: Props) {
  return (
    <Link href={`/games/${id}`} className={styles.card}>
      {thumbnail ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={thumbnail} alt={title} className={styles.thumb} />
      ) : null}
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </Link>
  );
}
