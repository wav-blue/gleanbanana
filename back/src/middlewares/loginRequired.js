import jwt from "jsonwebtoken";
import { NotFoundError, UnauthorizedError } from "../../libraries/custom-error";

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
    if (!accessToken)
      throw new NotFoundError("Access Token이 존재하지 않습니다.");

    // token 유효기간 검증
    const isAccessTokenValidate = validateAccessToken(accessToken);

    // Access Token 만료 => 재발급 요청
    if (!isAccessTokenValidate) {
      throw new UnauthorizedError("Access Token의 기한이 만료되었습니다.");
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
