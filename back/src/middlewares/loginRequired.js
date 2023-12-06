import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../../libraries/custom-error";

// Access Token을 검증
function validateAccessToken(accessToken) {
  const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
  try {
    const payload = jwt.verify(accessToken, secretKey);
    return payload;
  } catch (error) {
    return false;
  }
}

async function loginRequired(req, res, next) {
  try {
    const accessToken = req.signedCookies.accessToken ?? null;
    if (!accessToken) console.log("accessToken이 존재하지 않습니다");

    // token 유효기간 검증
    const isAccessTokenValidate = validateAccessToken(accessToken);

    // Access Token 만료 => 재발급 요청
    if (!isAccessTokenValidate) {
      throw new UnauthorizedError(
        "Access Token의 정보가 서버에 존재하지 않습니다."
      );
    }

    // user_id 추출
    const user_id = validateAccessToken(accessToken).user_id;

    req.currentUserId = user_id;
    console.log("추출된 user_id :  ", user_id);

    next();
  } catch (err) {
    next(err);
  }
}

export { loginRequired };
