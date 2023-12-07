import { Router } from "express";
import { NotFoundError, UnauthorizedError } from "../../libraries/custom-error";
import { userService } from "../services/userService";
import { loginRequired } from "../middlewares/loginRequired";
import { checkPermission } from "../middlewares/checkPermission";
import { createAccessToken } from "../utils/createToken";
import { validateRefreshToken } from "../utils/validateToken";

import jwt from "jsonwebtoken";

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

// Email 중복 확인
userRouter.get("/users/email", async function (req, res, next) {
  try {
    const { email } = req.query;
    const findEmail = await userService.getEmail({ email });
    res.status(200).json(findEmail[0]["COUNT(email)"]);
  } catch (error) {
    next(error);
  }
});

// 시험용 : 엑세스 토큰만 파기
userRouter.delete("/accessToken", async function (req, res, next) {
  try {
    res.cookie("accessToken", null, {
      maxAge: 0,
    });
    res.send("완료");
  } catch (error) {
    next(error);
  }
});

// Access Token 재발급
userRouter.post("/accessToken", async function (req, res, next) {
  try {
    const secretKey = process.env.JWT_SECRET_KEY || "secret-key";

    const accessToken = req.signedCookies.accessToken.split(" ")[1] ?? null;
    const refreshToken = req.body.Authorization.split(" ")[1] ?? null;
    console.log("Access: ", accessToken, "refresh: ", refreshToken);
    // cookie가 만료된 경우 => 로그인부터 다시
    if (!accessToken || !refreshToken) {
      throw new NotFoundError("로그인 필요");
    }
    // token 유효기간 검증
    const isRefreshTokenValidate = validateRefreshToken(refreshToken);

    const accessTokenId = jwt.decode(accessToken, secretKey);
    const user_data = { user_id: accessTokenId.user_id };

    // Refresh Token 만료 => 로그인부터 다시
    if (!isRefreshTokenValidate) {
      throw new UnauthorizedError("로그인 필요");
    }
    const newAccessToken = await createAccessToken(user_data, secretKey);
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      signed: true,
      maxAge: 1 * 60 * 60 * 1000,
    });

    res.status(201).json("Access Token 재발급이 완료되었습니다");
  } catch (err) {
    next(err);
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

    console.log("/users/login 발급된 accessToken >> ", user.accessToken);
    console.log("/users/login 발급된 refreshToken >> ", user.refreshToken);

    res.cookie("accessToken", user.accessToken, {
      httpOnly: true,
      signed: true,
      maxAge: 1 * 60 * 60 * 1000,
    });

    const response = {
      user_id: user.user_id,
      Authorization: user.refreshToken,
    };
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
});

// 유저 본인의 정보 조회
userRouter.get("/current", loginRequired, async function (req, res, next) {
  try {
    const user_id = req.currentUserId;
    //const { userId } = req.params;
    const user = await userService.getUser({ user_id });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

// 유저 본인의 정보 조회
userRouter.get("/:userId", async function (req, res, next) {
  try {
    //const user_id = req.currentUserId;
    const { userId } = req.params;
    const user = await userService.getUser({ user_id: userId });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

// 유저 본인의 정보 조회
userRouter.get(
  "/:userId/login",
  loginRequired,
  async function (req, res, next) {
    try {
      const user_id = req.currentUserId;
      //const { userId } = req.params;
      const user = await userService.getUser({ user_id });
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

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
