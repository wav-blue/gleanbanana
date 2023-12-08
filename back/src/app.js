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
import { permission_check } from "./middlewares/permission_check";
import { loginRequired } from "./middlewares/loginRequired";
import { userId_check } from "./middlewares/userId_check";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser("sercret"));

// 기본 페이지
app.get("/", (req, res) => {
  res.send("기본 페이지");
});
// 순서 그대로 유지
app.use("/api", itemRouter);
app.use("/api", userRouter);
app.use("/api", cartRouter);
app.use("/api", loginRequired, userId_check, orderRouter);
app.use("/api", loginRequired, userId_check, wishRouter);

// 에러 핸들링
app.use(errorMiddleware);

export { app };
