import jwt from "jsonwebtoken";
import { NotFoundError, TokenExpiredError } from "../../libraries/custom-error";

// Access Token을 검증
function validateAccessToken(accessToken) {
  const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
  try {
    const payload = jwt.verify(accessToken.split(" ")[1], secretKey);
    return payload;
  } catch (error) {
    return false;
  }
}

async function loginRequired(req, res, next) {
  try {
    const accessToken = req.signedCookies.accessToken ?? null;
    console.log("loginRequired : ", accessToken);
    if (!accessToken) {
      throw new NotFoundError("Access token이 존재하지 않음");
    }

    // token 유효기간 검증
    const isAccessTokenValidate = validateAccessToken(accessToken);
    console.log(
      "loginRequired isAccessTokenValidate : ",
      isAccessTokenValidate
    );
    // Access Token 만료 => 재발급 요청
    if (!isAccessTokenValidate) {
      throw new TokenExpiredError("Access Token 만료");
    }
    // user_id 추출
    const user_id = validateAccessToken(accessToken).user_id;
    req.currentUserId = user_id;
    next();
  } catch (err) {
    next(err);
  }
}

export { loginRequired };
