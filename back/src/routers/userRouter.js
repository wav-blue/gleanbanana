import { Router } from "express";
import {} from "../../libraries/custom-error";
import { userService } from "../services/userService";
import { loginRequired } from "../middlewares/loginRequired";

const userRouter = Router();

// 회원가입
userRouter.post("/users/register", async function (req, res, next) {
  try {
    const { email, password, username, address, phone_number } = req.body;
    if (!email || !password || !username || !address || !phone_number) {
      throw new BadRequestError("필수 정보가 입력되지 않았습니다");
    }
    // db에 데이터 추가
    const results = await userService.addUser({
      email,
      password,
      username,
      address,
      phone_number,
    });
    res.status(201).json("회원가입 완료");
  } catch (error) {
    next(error);
  }
});

// 로그인
userRouter.post("/users/login", async function (req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await userService.loginUser({ email, password });
    res.cookie("token", user.token, {
      httpOnly: true,
      signed: true,
    });
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

// 유저 본인의 정보 조회
userRouter.get(
  "/users/current",
  loginRequired,
  async function (req, res, next) {
    try {
      const user_id = req.currentUserId;
      console.log("current : ", req.currentUserId);
      const user = await userService.getUser({ user_id });
      console.log("user : ", user);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

// 회원 정보 수정
userRouter.post("/users/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    const { password, username, address, phone_number } = req.body;
    const user = await userService.updateUser({
      user_id: id,
      password,
      username,
      address,
      phone_number,
    });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

// 로그아웃
userRouter.get("/users/logout", async function (req, res, next) {
  try {
    res.cookie("token", null, {
      maxAge: 0,
    });
    res.send("완료");
  } catch (error) {
    next(error);
  }
});

// 회원탈퇴
userRouter.delete("/users/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    await userService.deleteUser({ user_id: id });
    res.status(200).json("회원탈퇴가 완료되었습니다.");
  } catch (error) {
    next(error);
  }
});

export { userRouter };
