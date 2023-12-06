import jwt from "jsonwebtoken";

async function createAccessToken(payload, secretKey) {
  // 30초
  //const accessToken = jwt.sign(payload, secretKey, { expiresIn: "30s" });
  // 30분
  const accessToken = jwt.sign(payload, secretKey, { expiresIn: "30m" });
  // 유효기간 1시간
  //const accessToken = jwt.sign(payload, secretKey, { expiresIn: "1h" });
  return accessToken;
}

async function createRefreshToken(secretKey) {
  const refreshToken = jwt.sign(
    {},
    secretKey,
    { expiresIn: "7d" } // refreshToken이 7일 뒤에 만료되도록 설정
  );
  return refreshToken;
}

export { createAccessToken, createRefreshToken };
