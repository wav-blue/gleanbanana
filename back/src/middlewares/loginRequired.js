import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../../libraries/custom-error";

exports.loginRequired = (req, res, next) => {
  try {
    const userToken = req.headers["authorization"]?.split(" ")[1] ?? "null";

    const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
    const user_id = jwt.verify(userToken, secretKey).user_id;

    req.currentUserId = user_id;

    next();
  } catch (err) {
    // 유효하지 않은 토큰
    next(new UnauthorizedError("유효하지 않은 토큰입니다."));
  }
};
