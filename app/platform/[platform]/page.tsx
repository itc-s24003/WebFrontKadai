import { getGames, type Game } from "../../../lib/microcms";
import GameCard from "../../../components/GameCard";
import Link from "next/link";

function slugify(s?: string) {
  if (!s) return "other";
  return s.toLowerCase().replace(/\s+/g, "-").replace(/\//g, "-").replace(/[^a-z0-9\-]/g, "");
}

type Props = { params: { platform: string } };

export default async function PlatformPage({ params }: Props) {
  const p = await params as any;
  const slug = p.platform as string;
  const games: Game[] = await getGames();
  const filtered = games.filter((g) => {
    const sp = slugify(g.platform);
    if (slug === "wii-wiiu") {
      return sp === "wii" || sp === "wiiu"; // combine Wii + WiiU
    }
    return sp === slug;
  });

  // Try to find display name for platform
  const displayName = slug === "wii-wiiu" ? "Wii / WiiU" : (filtered.length > 0 ? filtered[0].platform ?? "その他" : (p.platform as string).replace(/-/g, " "));

  return (
    <main style={{ maxWidth: 1000, margin: "0 auto", padding: "2rem 1rem" }}>
      <Link href="/" style={{ color: "#6366f1", textDecoration: "none" }}>
        ← トップページへ戻る
      </Link>
      <h1 style={{ fontSize: "2rem", margin: "1rem 0 0.75rem 0" }}>{displayName}</h1>
      {filtered.length === 0 ? (
        <p style={{ color: "#666" }}>該当するソフトはありません。</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem", marginTop: "1rem" }}>
          {filtered.map((g) => (
            <GameCard key={g.id} id={g.id} title={g.title} thumbnail={g.thumbnail} />
          ))}
        </div>
      )}
    </main>
  );
}
