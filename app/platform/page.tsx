import { getGames, type Game } from "../../lib/microcms";
import Link from "next/link";

function slugify(s?: string) {
  if (!s) return "other";
  return s.toLowerCase().replace(/\s+/g, "-").replace(/\//g, "-").replace(/[^a-z0-9\-]/g, "");
}

export default async function PlatformIndex() {
  const games: Game[] = await getGames();
  const map = new Map<string, number>();
  for (const g of games) {
    const key = g.platform ?? "その他";
    map.set(key, (map.get(key) ?? 0) + 1);
  }

  const items = Array.from(map.entries());

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "2rem 1rem" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>プラットフォーム一覧</h1>
      <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: "0.75rem" }}>
        {items.map(([platform, count]) => (
          <li key={platform}>
            <Link
              href={`/platform/${slugify(platform)}`}
              style={{ display: "inline-block", padding: "0.75rem 1rem", background: "#fff", borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", textDecoration: "none", color: "#111" }}
            >
              {platform} — {count} 件
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
