"use client";
import Link from 'next/link';
import styles from './GameCard.module.css';
import { MicroCMSImage } from 'microcms-js-sdk';
import Image from 'next/image';

type Props = {
  id: string;
  title: string;
  thumbnail?: MicroCMSImage;
  onClick?: () => void; // If provided, render as interactive div instead of link
};

export default function GameCard({ id, title, thumbnail, onClick }: Props) {
  if (onClick) {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { onClick(); } }}
        className={styles.card}
        style={{ cursor: 'pointer' }}
      >
        {thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <Image
            src={thumbnail.url}
            alt={title}
            width={thumbnail.width}
            height={thumbnail.height}
            className={styles.thumb}
          />
        ) : null}
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
        </div>
      </div>
    );
  }
  return (
    <Link href={`/games/${id}`} className={styles.card}>
      {thumbnail ? (
        // eslint-disable-next-line @next/next/no-img-element
          <Image
            src={thumbnail.url}
            alt={title}
            width={thumbnail.width}
            height={thumbnail.height}
            className={styles.thumb}
          />
      ) : null}
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
      </div>
    </Link>
  );
}
