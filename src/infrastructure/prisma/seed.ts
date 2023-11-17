import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.genre.createMany({
    data: [
      { id: 1, name: "仕事" },
      { id: 2, name: "プライベート" },
      { id: 3, name: "その他" },
    ],
    skipDuplicates: true,
  });

  await prisma.task.createMany({
    data: [
      { genreId: 1, name: "タスク取得API実装", status: 0 },
      { genreId: 1, name: "タスク登録API実装", status: 0 },
    ],
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
