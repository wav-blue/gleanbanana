import jwt from "jsonwebtoken";

async function createAccessToken(payload, secretKey) {
  // 30분
  const accessToken = jwt.sign(payload, secretKey, { expiresIn: "30m" });
  return `Bearer ${accessToken}`;
}

async function createRefreshToken(secretKey) {
  const refreshToken = jwt.sign(
    {},
    secretKey,
    { expiresIn: "7d" } // refreshToken이 7일 뒤에 만료되도록 설정
  );
  return `Bearer ${refreshToken}`;
}

export { createAccessToken, createRefreshToken };
