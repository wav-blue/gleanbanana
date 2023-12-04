import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../../libraries/custom-error";

function loginRequired(req, res, next) {
  try {
    const userToken = req.signedCookies.token ?? null;

    const secretKey = process.env.JWT_SECRET_KEY || "secret-key";

    if (!userToken) {
      throw new Error("토큰이 없습니다");
    }

    const user_id = jwt.verify(userToken, secretKey).user_id;

    req.currentUserId = user_id;
    console.log("middle ", user_id);
    //new UnauthorizedError("유효하지 않은 토큰입니다.")
    next();
  } catch (err) {
    // 유효하지 않은 토큰
    next(err);
  }
}

export { loginRequired };
