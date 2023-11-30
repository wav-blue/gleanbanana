import jwt from "jsonwebtoken";

exports.loginRequired = (req, res, next) => {
  try {
    const userToken = req.headers["authorization"]?.split(" ")[1] ?? "null";

    const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
    const user_id = jwt.verify(userToken, secretKey).user_id;

    req.currentUserId = user_id;

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      // 유효기간 만료
      next(err);
    }
    // 유효하지 않은 토큰
    next(err);
  }
};
