import express from "express";
import postsRouter from "./router/posts.mjs";
import authRouter from "./router/auth.mjs";
import { config } from "./config.mjs";
import { connectDB } from "./db/database.mjs";

const app = express();

app.use(express.json());

app.use("/posts", postsRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

connectDB()
  .then(() => {
    console.log("DB 연결 성공");
    app.listen(config.host.port);
  })
  .catch((err) => {
    console.error("DB 연결 실패", err);
  });
