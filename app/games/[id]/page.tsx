import { getGameDetail } from "@/lib/microcms";
import type { Game } from "@/lib/microcms/type";
import Image from "next/image";
import Link from "next/link";

type Props = { params: { id: string } };

export default async function GamePage({ params }: Props) {
  const p: { id: string } = await params; // unwrap Promise provided by App Router
  const game = await getGameDetail(p.id);

  if (!game) {
    return (
      <main style={{ padding: "2rem", maxWidth: 800, margin: "0 auto" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 700 }}>ゲームが見つかりません</h1>
        <p style={{ color: "#333", marginTop: "1rem" }}>指定されたゲームは存在しないか、読み込めませんでした。</p>
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
      <h1 style={{ fontSize: "2rem", fontWeight: 700, margin: "1rem 0 1.5rem 0", color: "#fff" }}>{game.title}</h1>
      {game.thumbnail ? (
        <Image
          src={game.thumbnail.url}
          alt={game.title}
          width={game.thumbnail.width}
          height={game.thumbnail.height}
          style={{ width: "100%", height: "auto", maxHeight: 400, objectFit: "cover", borderRadius: "12px", marginBottom: "2rem" }}
        />
      ) : null}
      <section style={{ color: "#fff", lineHeight: "1.8", fontSize: "1.05rem", marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.3rem", fontWeight: 600, marginBottom: "0.75rem", color: "#fff" }}>ゲーム紹介</h2>
        <p>{game.description}</p>
      </section>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
        {game.platform && (
          <div style={{ padding: "1rem", background: "#f0f0f0", borderRadius: "8px" }}>
            <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "0.9rem", fontWeight: 600, color: "#333" }}>プラットフォーム</h3>
            <p style={{ margin: 0, fontSize: "1.1rem", fontWeight: 600, color: "#111" }}>{game.platform}</p>
          </div>
        )}
        {game.players && (
          <div style={{ padding: "1rem", background: "#f0f0f0", borderRadius: "8px" }}>
            <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "0.9rem", fontWeight: 600, color: "#333" }}>プレイ人数</h3>
            <p style={{ margin: 0, fontSize: "1.1rem", fontWeight: 600, color: "#111" }}>{game.players}</p>
          </div>
        )}
      </div>
    </main>
  );
}
