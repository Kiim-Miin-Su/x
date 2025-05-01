import express from "express";
import postsRouter from "./router/posts.mjs";
import authRouter from "./router/auth.mjs";
import { config } from "./config.mjs";
import path from "path";

import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/posts", postsRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "./public" });

})

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.listen(config.host.port);
