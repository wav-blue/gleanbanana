import bcrypt from "bcrypt";

module.exports = async (password) => {
  return await bcrypt.hash(password, 10);
};
