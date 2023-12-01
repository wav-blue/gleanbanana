// user에 Salt 추가 저장 필요

async function createSalt() {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      if (err) reject(err);
      resolve(buf.toString("base64"));
    });
  });
}

module.exports = async (password) => {
  const salt = createSalt();
  password = await crypto.pbkdf2(password, salt, 9999, 64, "sha512");
  console.log("password >> ", password);
  password.toString("base64");
  return password;
};
