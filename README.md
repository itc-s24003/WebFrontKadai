githubcopilitの学生無料申請してました
プラットフォーム一覧を削除しました












# ゲーム紹介サイト (Next.js + TypeScript + microCMS)

このリポジトリは、Next.js (App Router) と TypeScript を使ったシンプルなゲーム紹介サイトのサンプルです。

主な技術要件

- Next.js (App Router)
- TypeScript
- ESLint (プロジェクトに含まれています)
- グローバルスタイル: `app/globals.css`
- コンポーネント固有スタイル: CSS Modules (`components/*.module.css`)
- ルーティング: トップページと下層（/games/[id]）ページ
- microCMS をデータ保存に使用（環境変数で接続）
- GitHub でソース管理
- Vercel でのデプロイを想定

機能仕様

1. トップページ（/）
   - microCMS のコレクション `games` からゲーム一覧を取得して表示する。
   - microCMS の接続情報が設定されていない場合は、リポジトリ内の `data/games.json` をローカルのフォールバックデータとして使用する。
   - 各ゲームはカード表示で、タイトル・説明・サムネイル（あれば）を表示する。

2. 詳細ページ（/games/[id]）
   - 指定した ID のゲームの詳細を表示する。
   - 見つからない場合は適切なメッセージを表示する。

3. microCMS 統合
   - サーバー側のフェッチ（App Router のサーバーコンポーネント）で microCMS REST API を叩く。
   - 必要な環境変数:
     - `MICROCMS_SERVICE_DOMAIN` — microCMS のサービスドメイン（例: your-service）
     - `MICROCMS_API_KEY` — 読み取り用 API キー
   - Vercel にデプロイする際は、上記 2 つを Vercel の環境変数にセットしてください。

構成ファイルと主なファイル

- `app/page.tsx` — トップページ（ゲーム一覧）
- `app/games/[id]/page.tsx` — ゲーム詳細ページ
- `components/GameCard.tsx` — ゲームカード（CSS モジュール利用）
- `components/GameCard.module.css` — カード用スタイル
- `lib/microcms.ts` — microCMS とローカルフォールバックを扱うヘルパー
- `data/games.json` — microCMS 未設定時のサンプルデータ
- `.env.example` — 必要な環境変数の例

セットアップ手順（ローカル）

1. 依存関係をインストール

```bash
npm install
```

2. 必要に応じて環境変数を設定（開発時は `.env.local` を使う）

```text
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-read-api-key
```

3. 開発サーバー起動

```bash
npm run dev
```

ローカルで環境変数をセットしない場合、`data/games.json` のデータが表示されます。microCMS を使う場合は、microCMS 側で `games` コレクション（各エントリは `id`, `title`, `description`, `thumbnail` を持つ）を作成してください。

ゲーム情報の追加・編集方法

**方法1: ローカル JSON（`data/games.json`）で管理する場合**

`data/games.json` を編集してゲーム情報を追加・削除・編集します。複数のゲーム（何個でも可）を JSON 配列形式で記述します。

例（複数ゲーム）:
```json
[
  {
    "id": "game-one",
    "title": "ゲーム1のタイトル",
    "description": "ゲーム1の説明文",
    "thumbnail": "https://example.com/game1.jpg"
  },
  {
    "id": "game-two",
    "title": "ゲーム2のタイトル",
    "description": "ゲーム2の説明文",
    "thumbnail": "https://example.com/game2.jpg"
  },
  {
    "id": "game-three",
    "title": "ゲーム3のタイトル",
    "description": "ゲーム3の説明文",
    "thumbnail": "https://example.com/game3.jpg"
  }
]
```

編集後、開発サーバー（`npm run dev`）を再起動すれば、トップページに反映されます。

**方法2: microCMS で管理する場合**

1. microCMS にログインして、`games` という名前のコレクションを作成します。
2. 各エントリに以下のフィールドを定義します:
   - `id` （テキスト、または別途 API キーとして使用）
   - `title` （テキスト）
   - `description` （テキスト、または長いテキスト）
   - `thumbnail` （画像 URL またはメディアフィールド）
3. 好きなだけエントリ（ゲーム）を追加します。
4. Vercel（またはローカルの `.env.local`）に環境変数を設定すれば、自動で microCMS のデータが使われます。

デプロイ（Vercel）

1. GitHub に push
2. Vercel にリポジトリを連携
3. Vercel の環境変数に `MICROCMS_SERVICE_DOMAIN` と `MICROCMS_API_KEY` を設定（ローカル JSON を使う場合は不要）
4. 自動デプロイが走る

補足

- microCMS の API レスポンスの形に応じて `lib/microcms.ts` のパース処理を調整してください（コレクションを使う場合は `contents` を返します）。
- 将来的な改善案: イメージの最適化（`next/image` 利用）、検索・ページネーション機能、より詳細なメタ情報（リリース日・ジャンル等）の追加。
