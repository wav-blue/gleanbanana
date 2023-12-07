import jwt from "jsonwebtoken";

// Refresh Token을 검증
function validateRefreshToken(refreshToken) {
  try {
    const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
    jwt.verify(refreshToken, secretKey);
    return true;
  } catch (error) {
    return false;
  }
}

export { validateRefreshToken };
