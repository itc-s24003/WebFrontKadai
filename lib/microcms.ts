type Game = {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
};

const SERVICE_DOMAIN = process.env.MICROCMS_SERVICE_DOMAIN;
const API_KEY = process.env.MICROCMS_API_KEY;

const headers = API_KEY
  ? {
      'X-API-KEY': API_KEY,
    }
  : undefined;

async function fetchFromMicroCMS(path: string) {
  if (!SERVICE_DOMAIN || !API_KEY) {
    // Running in local fallback mode — load local JSON
    const data = await import('../data/games.json');
    if (path === '/games') return data.default;
    const id = path.replace('/games/', '');
    return data.default.find((g: Game) => g.id === id) ?? null;
  }

  const url = `https://${SERVICE_DOMAIN}.microcms.io/api/v1${path}`;
  const res = await fetch(url, { headers, next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`microCMS request failed: ${res.status}`);
  return res.json();
}

export async function getGames(): Promise<Game[]> {
  const data = await fetchFromMicroCMS('/games');
  // microCMS returns an object with contents when using collections
  if (Array.isArray(data)) return data;
  return data.contents ?? data;
}

export async function getGame(id: string): Promise<Game | null> {
  const data = await fetchFromMicroCMS(`/games/${id}`);
  return data ?? null;
}

export type { Game };
