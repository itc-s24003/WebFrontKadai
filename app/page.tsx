import { getGames, type Game } from "../lib/microcms";
import Link from "next/link";
import GameCard from "../components/GameCard";

export default async function Home() {
  const games: Game[] = await getGames();

  const grouped = games.reduce<Record<string, Game[]>>((acc, g) => {
    const key = g.platform ?? "その他";
    if (!acc[key]) acc[key] = [];
    acc[key].push(g);
    return acc;
  }, {});

  return (
    <main style={{ maxWidth: 1000, margin: "0 auto", padding: "2rem 1rem" }}>
      <div style={{ marginBottom: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, margin: "0 0 0.5rem 0" }}>好きなゲーム紹介</h1>
        </div>
        <nav style={{ display: "flex", gap: "0.5rem" }}>
          <Link href="/platform/switch" style={{ padding: "0.5rem 0.75rem", background: "#6366f1", borderRadius: 8, textDecoration: "none", color: "#fff" }}>Switch</Link>
          <Link href="/platform/wii-wiiu" style={{ padding: "0.5rem 0.75rem", background: "#f97316", borderRadius: 8, textDecoration: "none", color: "#fff" }}>Wii / WiiU</Link>
        </nav>
      </div>

      {Object.entries(grouped).map(([platform, list]) => (
        <section key={platform} style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, margin: "0 0 0.75rem 0" }}>{platform}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem" }}>
            {list.map((g) => (
              <GameCard key={g.id} id={g.id} title={g.title} thumbnail={g.thumbnail} />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
