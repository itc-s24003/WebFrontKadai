import { getGames, type Game } from "../lib/microcms";
import GameCard from "../components/GameCard";

export default async function Home() {
  const games: Game[] = await getGames();

  return (
    <main style={{ maxWidth: 900, margin: "2rem auto", padding: "0 1rem" }}>
      <h1 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>ゲーム紹介サイト</h1>
      <p style={{ color: "#374151", marginBottom: "1.5rem" }}>
        microCMS に保存したゲーム情報（またはローカルのサンプルデータ）を表示します。
      </p>
      <div style={{ display: "grid", gap: "1rem" }}>
        {games.map((g) => (
          <GameCard
            key={g.id}
            id={g.id}
            title={g.title}
            description={g.description}
            thumbnail={g.thumbnail}
          />
        ))}
      </div>
      <footer style={{ marginTop: "2rem", color: "#6b7280" }}>
        <small>Let&apos;s deploy to Vercel and connect microCMS for real content.</small>
      </footer>
    </main>
  );
}
