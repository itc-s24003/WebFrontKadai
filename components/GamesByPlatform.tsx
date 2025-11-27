"use client";
import React from "react";
import GameCard from "./GameCard";
import GameDetailModal from "./GameDetailModal";
import type { Game } from "../lib/microcms/type";

interface Props {
  grouped: Record<string, Game[]>;
}

export default function GamesByPlatform({ grouped }: Props) {
  const [selected, setSelected] = React.useState<Game | null>(null);
  const platforms = React.useMemo(() => {
    const order = ["Switch", "Wii/WiiU", "その他"];
    return Array.from(new Set([...order, ...Object.keys(grouped)])).filter(Boolean);
  }, [grouped]);

  return (
    <>
      {platforms.map((platform) => {
        const list = grouped[platform] ?? [];
        if (list.length === 0) return null;
        return (
          <section key={platform} style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, margin: "0 0 0.75rem 0" }}>{platform}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem" }}>
              {list.map((g) => (
                <GameCard
                  key={g.id}
                  id={g.id}
                  title={g.title}
                  thumbnail={g.thumbnail}
                  onClick={() => setSelected(g)}
                />
              ))}
            </div>
          </section>
        );
      })}
      <GameDetailModal
        game={selected ? {
          id: selected.id,
          title: selected.title,
          thumbnail: selected.thumbnail,
          description: selected.description,
          players: selected.players,
          platform: selected.platform,
        } : null}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
