import { getGames, type Game } from "../lib/microcms";
import GameCard from "../components/GameCard";

export default async function Home() {
  const games: Game[] = await getGames();

  return (
    <main style={{ maxWidth: 1000, margin: "0 auto", padding: "2rem 1rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, margin: "0 0 0.5rem 0" }}>好きなパーティーゲーム紹介</h1>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
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
    </main>
  );
}
