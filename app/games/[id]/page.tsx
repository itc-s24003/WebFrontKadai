import { getGame, type Game } from "../../../lib/microcms";

type Props = { params: { id: string } };

export default async function GamePage({ params }: Props) {
  const game: Game | null = await getGame(params.id);

  if (!game) {
    return (
      <main style={{ padding: "2rem" }}>
        <h1>ゲームが見つかりません</h1>
        <p>指定されたゲームは存在しないか、読み込めませんでした。</p>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 800, margin: "2rem auto", padding: "0 1rem" }}>
      <h1 style={{ fontSize: "1.6rem" }}>{game.title}</h1>
      {game.thumbnail ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={game.thumbnail} alt={game.title} style={{ width: "100%", maxHeight: 360, objectFit: "cover", borderRadius: 8 }} />
      ) : null}
      <section style={{ marginTop: "1rem", color: "#374151" }}>
        <p>{game.description}</p>
      </section>
    </main>
  );
}
