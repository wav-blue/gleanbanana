import { Router } from "express";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../../libraries/custom-error";
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
    await userService.addUser({
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

// Email 중복 확인
userRouter.get("/users/email", async function (req, res, next) {
  try {
    const { email } = req.query;
    const findEmail = await userService.getEmail({ email });
    // "isDuplicated": false, "text": "중복되지 않은 이메일 주소
    const result = findEmail[0]["COUNT(email)"] ? true : false;
    const result_text = findEmail[0]["COUNT(email)"]
      ? "중복 된 이메일 주소"
      : "중복되지 않은 이메일 주소";
    res.status(200).json({
      isDuplicated: result,
      text: result_text,
    });
  } catch (error) {
    next(error);
  }
});

// 로그인
userRouter.post("/users/login", async function (req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await userService.loginUser({ email, password });

    console.log("/users/login 발급된 accessToken >> ", user.accessToken);
    console.log("/users/login 발급된 refreshToken >> ", user.refreshToken);

    res.cookie("accessToken", user.accessToken, {
      httpOnly: true,
      signed: true,
      maxAge: 1 * 60 * 60 * 1000,
    });

    const user_data = {
      user_id: user.user_id,
      Authorization: user.refreshToken,
    };
    res.status(200).send(user_data);
  } catch (error) {
    next(error);
  }
});

// Access Token 재발급
userRouter.post("/accessToken", async function (req, res, next) {
  try {
    const secretKey = process.env.JWT_SECRET_KEY || "secret-key";

    const accessToken = req.signedCookies.accessToken?.split(" ")[1] ?? null;
    const refreshToken = req.body.Authorization?.split(" ")[1] ?? null;
    console.log("/access token 재요청");
    console.log("Access: ", accessToken, "refresh: ", refreshToken);

    // cookie가 만료된 경우 => 로그인부터 다시
    if (!accessToken || !refreshToken) {
      throw new NotFoundError("필요한 Token이 존재하지 않음");
    }

    // token 유효기간 검증
    const isRefreshTokenValidate = validateRefreshToken(refreshToken);

    const accessTokenId = jwt.decode(accessToken, secretKey);
    const user_data = { user_id: accessTokenId.user_id };

    // Refresh Token 만료 => 로그인부터 다시
    if (!isRefreshTokenValidate) {
      throw new UnauthorizedError("Refresh Token 만료");
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

// 유저 본인의 정보 조회
userRouter.get("/current", loginRequired, async function (req, res, next) {
  try {
    const user_id = req.currentUserId;
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
    const findUser = await userService.getUser({ user_id: userId });
    if (findUser?.length === 0) {
      // id에 해당되는 유저가 없는 경우
      throw new NotFoundError("해당하는 유저를 찾을 수 없습니다.");
    }
    if (findUser[0]?.deletedAt) {
      // 탈퇴한 유저인 경우: 보안을 위해 같은 메시지 출력
      throw new NotFoundError("해당하는 유저를 찾을 수 없습니다(탈퇴한 유저).");
    }
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
// userRouter.post("/users/:userId", async function (req, res, next) {
//   try {
//     const { userId } = req.params;
//     const { password, username, address, phone_number } = req.body;
//     const result = await userService.updateUser({
//       user_id: userId,
//       password,
//       username,
//       address,
//       phone_number,
//     });
//     if (result.affectedRows === 0) {
//       throw new NotFoundError("해당하는 유저를 찾을 수 없습니다.");
//     }
//     res.status(200).json("회원 정보 수정에 성공했습니다.");
//   } catch (error) {
//     next(error);
//   }
// });

// 로그아웃
userRouter.get("/:userId/logout", async function (req, res, next) {
  try {
    // 토큰 파기
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
      const result = await userService.deleteUser({ user_id });

      console.log("result: ", result);
      // 이미 탈퇴한 회원
      res.status(200).json("회원탈퇴가 완료되었습니다.");
    } catch (error) {
      next(error);
    }
  }
);

export { userRouter };
