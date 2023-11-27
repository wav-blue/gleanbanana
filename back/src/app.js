import cors from "cors";
import express from "express";
import path from "path";
import { errorMiddleware } from "./middlewares/errorMiddleware";

// router import
import { itemRouter } from "./routers/itemRouter";
import { wishRouter } from "./routers/wishRouter";

const app = express();

// CORS 에러 방지
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// 기본 페이지
app.get("/", (req, res) => {
  res.send("기본 페이지");
});

app.use(itemRouter);
app.use(wishRouter);

// 에러 핸들링
app.use(errorMiddleware);
export { app };
