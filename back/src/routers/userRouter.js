import { Router } from "express";
import { NotFoundError, UnauthorizedError } from "../../libraries/custom-error";
import { userService } from "../services/userService";
import { loginRequired } from "../middlewares/loginRequired";
import { checkPermission } from "../middlewares/checkPermission";

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

    if (results?.errorMessage) {
      if (results?.errorType === "UnauthorizedError") {
        throw new UnauthorizedError(results.errorMessage);
      } else if (results?.errorType === "NotFoundError") {
        throw new NotFoundError(results.errorMessage);
      }
      throw new Error(results.errorMessage);
    }

    res.status(201).json(results);
  } catch (error) {
    next(error);
  }
});

userRouter.get("/users/email", async function (req, res, next) {
  try {
    const { email } = req.body;
    const findEmail = await userService.getEmail({ email });
    res.status(200).json(findEmail[0]["COUNT(email)"]);
  } catch (error) {
    next(error);
  }
});

// 로그인
userRouter.post("/users/login", async function (req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await userService.loginUser({ email, password });

    if (user?.errorMessage) {
      if (user?.errorType === "UnauthorizedError") {
        throw new UnauthorizedError(user.errorMessage);
      } else if (user?.errorType === "NotFoundError") {
        throw new NotFoundError(user.errorMessage);
      }
      throw new Error(user.errorMessage);
    }

    res.cookie("accessToken", user.accessToken, {
      httpOnly: true,
      signed: true,
      maxAge: 1 * 60 * 60 * 1000,
    });
    res.cookie("refreshToken", user.refreshToken, {
      httpOnly: true,
      signed: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

// 유저 본인의 정보 조회
userRouter.get("/:userId", loginRequired, async function (req, res, next) {
  try {
    const user_id = req.currentUserId;
    const user = await userService.getUser({ user_id });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

// 회원 정보 수정
userRouter.post(
  "/users/:userId",
  loginRequired,
  checkPermission,
  async function (req, res, next) {
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
  }
);

// 로그아웃
userRouter.get("/:userId/logout", async function (req, res, next) {
  try {
    res.cookie("accessToken", null, {
      maxAge: 0,
    });

    res.cookie("refreshToken", null, {
      maxAge: 0,
    });
    res.send("로그아웃 완료");
  } catch (error) {
    next(error);
  }
});

// 회원탈퇴
userRouter.delete(
  "/users/:userId",
  loginRequired,
  checkPermission,
  async function (req, res, next) {
    try {
      const user_id = req.currentUserId;
      await userService.deleteUser({ user_id });
      res.status(200).json("회원탈퇴가 완료되었습니다.");
    } catch (error) {
      next(error);
    }
  }
);

export { userRouter };
