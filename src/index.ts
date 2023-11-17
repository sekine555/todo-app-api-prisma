import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();
const app = express();
app.use(express.json());

// タスクの作成
app.post("/tasks", async (req: Request, res: Response) => {
  const { name, genreId } = req.body;
  const task = await prisma.task.create({
    data: {
      name,
      genreId: BigInt(genreId),
    },
  });
  if (task) {
    const modifiedTask = {
      ...task,
      id: task.id.toString(),
      genreId: task.genreId.toString(),
    };
    res.json(modifiedTask);
  } else {
    res.status(500).json({ error: "タスクの作成に失敗しました" });
  }
});

// タスクの一覧取得
app.get("/tasks", async (req: Request, res: Response) => {
  const tasks = await prisma.task.findMany();
  const modifiedTasks = tasks.map((task) => ({
    ...task,
    id: task.id.toString(),
    genreId: task.genreId.toString(),
  }));
  res.json(modifiedTasks);
});

// タスクの取得
app.get("/tasks/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const task = await prisma.task.findUnique({
    where: { id: BigInt(id) },
  });
  if (task) {
    const modifiedTask = {
      ...task,
      id: task.id.toString(),
      genreId: task.genreId.toString(),
    };
    res.json(modifiedTask);
  } else {
    res.status(404).json({ error: "タスクが見つかりません" });
  }
});

// タスクの更新
app.put("/tasks/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, status } = req.body;
  const task = await prisma.task.update({
    where: { id: BigInt(id) },
    data: { name, status },
  });
  if (task) {
    const modifiedTask = {
      ...task,
      id: task.id.toString(),
      genreId: task.genreId.toString(),
    };
    res.json(modifiedTask);
  } else {
    res.status(500).json({ error: "タスクの更新に失敗しました" });
  }
});

// タスクの削除
app.delete("/tasks/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const task = await prisma.task.delete({
    where: { id: BigInt(id) },
  });
  if (task) {
    const modifiedTask = {
      ...task,
      id: task.id.toString(),
      genreId: task.genreId.toString(),
    };
    res.json(modifiedTask);
  } else {
    res.status(500).json({ error: "タスクの削除に失敗しました" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
