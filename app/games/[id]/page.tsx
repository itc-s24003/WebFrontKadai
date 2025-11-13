import { getGame, type Game } from "../../../lib/microcms";
import Link from "next/link";

type Props = { params: { id: string } };

export default async function GamePage({ params }: Props) {
  const game: Game | null = await getGame(params.id);

  if (!game) {
    return (
      <main style={{ padding: "2rem", maxWidth: 800, margin: "0 auto" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 700 }}>ゲームが見つかりません</h1>
        <p style={{ color: "#666", marginTop: "1rem" }}>指定されたゲームは存在しないか、読み込めませんでした。</p>
        <Link href="/" style={{ display: "inline-block", marginTop: "1.5rem", padding: "0.75rem 1.5rem", background: "#6366f1", color: "white", borderRadius: "8px", textDecoration: "none", fontWeight: 600 }}>
          トップに戻る
        </Link>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: "2rem 1rem" }}>
      <Link href="/" style={{ color: "#6366f1", textDecoration: "none", marginBottom: "1.5rem", display: "inline-block" }}>
        ← 戻る
      </Link>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, margin: "1rem 0 1.5rem 0" }}>{game.title}</h1>
      {game.thumbnail ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={game.thumbnail} alt={game.title} style={{ width: "100%", height: "auto", maxHeight: 400, objectFit: "cover", borderRadius: "12px", marginBottom: "2rem" }} />
      ) : null}
      <section style={{ color: "#444", lineHeight: "1.8", fontSize: "1.05rem" }}>
        <p>{game.description}</p>
      </section>
    </main>
  );
}
