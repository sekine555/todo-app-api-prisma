# Prisma キャッチアップ

このプロジェクトでは、Prisma を使用してデータベースの管理と操作を行います。Prisma は、Node.js と TypeScript のための次世代の ORM（オブジェクトリレーショナルマッピング）です。

## マイグレーション

データベースのマイグレーションを行うためには、以下のコマンドを使用します。

マイグレーションの実行:

```bash
npx prisma migrate dev --name init --schema src/infrastructure/prisma/schema.prisma
```

このコマンドは、Prisma スキーマの変更に基づいてデータベースのテーブルを作成または更新します。

## Seeding

データベースに初期データを挿入するためには、Seeding を行います。

Seeding の実行:

```bash
npx prisma db seed
```

このコマンドは、src/infrastructure/prisma/seed.ts ファイルに定義されたシードデータをデータベースに挿入します。

## API の動作確認

API の動作を確認するためには、以下の curl コマンドを使用します。

API サーバーの起動:

```bash
npm run dev
```

新しいタスクを作成:

```bash

curl -X POST http://localhost:8091/tasks \
-H "Content-Type: application/json" \
-d '{"name": "新しいタスク", "genreId": 1}'
```

すべてのタスクを取得:

```bash
curl http://localhost:8091/tasks
```

特定のタスクを取得（例: ID が 1 のタスク）:

```bash
curl http://localhost:8091/tasks/1
```

特定のタスクを更新（例: ID が 1 のタスク）:

```bash
curl -X PUT http://localhost:8091/tasks/1 \
-H "Content-Type: application/json" \
-d '{"name": "更新されたタスク", "status": 1}'
```

特定のタスクを削除（例: ID が 1 のタスク）:

```bash
curl -X DELETE http://localhost:8091/tasks/1
```
