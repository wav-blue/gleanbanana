import express from "express";
import path from "path";
import { errorMiddleware } from "./middlewares/errorMiddleware";

import cookieParser from "cookie-parser";

// router import
import { itemRouter } from "./routers/itemRouter";
import { wishRouter } from "./routers/wishRouter";
import { userRouter } from "./routers/userRouter";
import { orderRouter } from "./routers/orderRouter";
import { cartRouter } from "./routers/cartRouter";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser("sercret"));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs') 
// 기본 페이지
app.get("/", (req, res) => {
  res.send("기본 페이지");
});

// 순서 그대로 유지
app.use("/api", userRouter);
app.use("/api", itemRouter);
app.use("/api", cartRouter);
app.use("/api", orderRouter);
app.use("/api", wishRouter);

// 에러 핸들링
app.use(errorMiddleware);

export { app };
