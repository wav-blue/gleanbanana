import { Router } from "express";
import {} from "../../libraries/custom-error";
import { userService } from "../services/userService";
import { loginRequired } from "../middlewares/loginRequired";
import { ulid } from "ulidx";

const userRouter = Router();

// 회원가입
userRouter.post("/users/register", async function (req, res, next) {
  try {
    const { email, password, username, address, phone_number } = req.body;
    if (!email || !password || !username || !address || !phone_number) {
      throw new BadRequestError("필수 정보가 입력되지 않았습니다");
    }
    // db에 데이터 추가
    const newUser = await userService.addUser({
      email,
      password,
      username,
      address,
      phone_number,
    });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

// 로그인
userRouter.post("/users/login", async function (req, res, next) {
  const { email, password } = req.body;
  const user = await userService.loginUser({ email, password });

  res.setHeader(
    "Set-Cookie",
    `jwtToken=${user.token};max-age=3600;same-site=Lax;path=/;httpOnly;secure=false;`
  );
  res.status(200).send(user);
});

// 유저 본인의 정보 조회
userRouter.get(
  "/users/current",
  loginRequired,
  async function (req, res, next) {
    try {
      console.log(">> ", ulid());
      const { id } = req.body;
      const user = await userService.getUser({ user_id: id });
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
);

// 회원 정보 수정
userRouter.post("/users/:id", async function (req, res, next) {
  const { id } = req.params;
  const { password, username, address, phone_number } = req.body;
  const user = await userService.updateUser({
    user_id: id,
    password,
    username,
    address,
    phone_number,
  });
  res.status(201).json(user);
});

// 회원탈퇴
userRouter.delete("/users/:id", async function (req, res, next) {
  const { id } = req.params;
  const user = await userService.deleteUser({ user_id: id });
  res.status(201).json(user);
});

export { userRouter };
