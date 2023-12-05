import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../../libraries/custom-error";
import { createAccessToken } from "../utils/createToken";

// Access Token을 검증
function validateAccessToken(accessToken) {
  try {
    const payload = jwt.verify(accessToken, secretKey); // JWT를 검증합니다.
    console.log("payload>> ", payload);
    return payload;
  } catch (error) {
    return false;
  }
}

// Refresh Token을 검증
function validateRefreshToken(refreshToken) {
  try {
    jwt.verify(refreshToken, secretKey); // JWT를 검증합니다.
    return true;
  } catch (error) {
    return false;
  }
}

const secretKey = process.env.JWT_SECRET_KEY || "secret-key";

async function loginRequired(req, res, next) {
  try {
    const accessToken = req.signedCookies.accessToken ?? null;
    const refreshToken = req.signedCookies.refreshToken ?? null;

    if (!accessToken) console.log("accessToken이 존재하지 않습니다");
    if (!refreshToken) console.log("Refresh Token이 존재하지 않습니다");

    // token 유효기간 검증
    const isAccessTokenValidate = validateAccessToken(accessToken);
    const isRefreshTokenValidate = validateRefreshToken(refreshToken);

    // Access Token, Refresh Token 만료 => 로그인부터 다시
    if (!isAccessTokenValidate && !isRefreshTokenValidate) {
      throw new UnauthorizedError(
        "Refresh Token의 정보가 서버에 존재하지 않습니다."
      );
    }

    // Access Token 만료 => 새로 Access Token 발급
    if (!isAccessTokenValidate) {
      const accessTokenId = jwt.decode(accessToken, secretKey);
      const user_data = { user_id: accessTokenId.user_id };
      console.log(
        "해당 user_id로 accessToken 다시 발급: ",
        accessTokenId.user_id
      );
      const newAccessToken = await createAccessToken(user_data, secretKey);
      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        signed: true,
        maxAge: 1 * 60 * 60 * 1000,
      });
      res.status(201).send("Access Token을 발급하였습니다.");
    } else {
      // user_id 추출
      const user_id = validateAccessToken(accessToken).user_id;

      req.currentUserId = user_id;
      console.log("추출된 user_id :  ", user_id);
    }

    next();
  } catch (err) {
    // 유효하지 않은 토큰
    next(err);
  }
}

export { loginRequired };
