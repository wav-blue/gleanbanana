import bcrypt from "bcrypt";

async function bcryptPassword(password) {
  return await bcrypt.hash(password, 10);
}

export { bcryptPassword };
