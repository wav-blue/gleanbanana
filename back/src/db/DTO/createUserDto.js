/** 회원가입에서 필요한 정보 */

import { ulid } from "ulidx";
import { bcryptPassword } from "../../utils/bcryptPassword";

class createUserDto {
  /** @type {string} */
  user_id;
  /** @type {string} */
  email;
  /** @type {string} */
  password;
  /** @type {string} */
  username;
  /** @type {string} */
  address;
  /** @type {string} */
  phone_number;
  /** @type {Date} */
  createdAt;
  /** @type {Date} */
  updatedAt;
  /** @type {Date} */
  deletedAt;

  constructor(data, today) {
    this.user_id = ulid();
    this.email = String(data?.email);
    this.password = String(data?.password);
    this.username = String(data?.username);
    this.address = String(data?.address);
    this.phone_number = String(data?.phone_number);
    this.createdAt = today;
    this.updatedAt = today;
    this.deletedAt = null;
  }
  async passwordEncrypt() {
    this.password = await bcryptPassword(this.password, 10);
  }
}

export { createUserDto };
