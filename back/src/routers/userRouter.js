import { Router } from "express";
import {} from "../../libraries/custom-error";

const userRouter = Router();

// 아직 작성하지 않은 라우터
// 프론트팀과 일정을 맞춰서 나중에 작성하려 합니다

// 회원가입
userRouter.post("/user/register", async function (req, res, next) {
  res.status(201).send("회원가입 API");
});

// 로그인
userRouter.post("/user/login", async function (req, res, next) {
  res.status(201).send("로그인 API");
});

// 유저 본인의 정보 조회
userRouter.get("/user/current", async function (req, res, next) {
  res.status(201).send("로그인 API");
});

// 유저 정보 수정
userRouter.put("/user/:id", async function (req, res, next) {
  res.status(201).send("회원 정보 수정 API");
});

// id에 해당하는 유저의 페이지 조회
userRouter.delete("/user/:id", async function (req, res, next) {
  res.status(201).send("회원탈퇴 API");
});

export { userRouter };
