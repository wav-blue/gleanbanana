import jwt from "jsonwebtoken";

async function createAccessToken(payload, secretKey) {
  const accessToken = jwt.sign(payload, secretKey, { expiresIn: "30s" });
  // 유효기간 1시간
  // const accessToken = jwt.sign(payload, secretKey, { expiresIn: "1h" });
  return accessToken;
}

async function createRefreshToken(secretKey) {
  const refreshToken = jwt.sign(
    {},
    secretKey,
    { expiresIn: "7d" } // Access Token이 7일 뒤에 만료되도록 설정
  );
  return refreshToken;
}

export { createAccessToken, createRefreshToken };
