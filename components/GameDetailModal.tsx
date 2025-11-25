"use client";
import { useEffect } from 'react';

export type GameDetail = {
  id: string;
  title: string;
  thumbnail?: string;
  description?: string;
  players?: string;
  platform?: string;
};

interface ModalProps {
  game: GameDetail | null;
  onClose: () => void;
}

export default function GameDetailModal({ game, onClose }: ModalProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!game) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: '#fff', width: 'min(900px, 100%)', maxHeight: '90vh', overflowY: 'auto', borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.35)', padding: '1.75rem' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 12, background: '#eee', border: 'none', borderRadius: 6, padding: '0.4rem 0.7rem', cursor: 'pointer', fontSize: '0.85rem' }}>閉じる</button>
        <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.8rem' }}>{game.title}</h2>
        {game.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={game.thumbnail} alt={game.title} style={{ width: '100%', height: 'auto', borderRadius: '8px', marginBottom: '1.25rem', objectFit: 'cover', maxHeight: '340px' }} />
        ) : null}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {game.platform && (
            <div style={{ background: '#f7f7f7', padding: '0.75rem 0.9rem', borderRadius: 8 }}>
              <div style={{ fontSize: '0.7rem', letterSpacing: '0.05em', fontWeight: 600, color: '#666' }}>プラットフォーム</div>
              <div style={{ fontSize: '1rem', fontWeight: 600 }}>{game.platform}</div>
            </div>
          )}
          {game.players && (
            <div style={{ background: '#f7f7f7', padding: '0.75rem 0.9rem', borderRadius: 8 }}>
              <div style={{ fontSize: '0.7rem', letterSpacing: '0.05em', fontWeight: 600, color: '#666' }}>プレイ人数</div>
              <div style={{ fontSize: '1rem', fontWeight: 600 }}>{game.players}</div>
            </div>
          )}
        </div>
        {game.description && (
          <p style={{ lineHeight: 1.75, fontSize: '1rem', color: '#444', whiteSpace: 'pre-wrap' }}>{game.description}</p>
        )}
        <div style={{ marginTop: '1.75rem', textAlign: 'right' }}>
          <a href={`/games/${game.id}`} style={{ color: '#6366f1', fontWeight: 600, textDecoration: 'none', fontSize: '0.95rem' }}>詳細ページへ →</a>
        </div>
      </div>
    </div>
  );
}
