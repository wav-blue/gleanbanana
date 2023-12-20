/** 회원정보 조회 */

class userInfoDto {
  /** @type {string} */
  user_id;
  /** @type {Date} */
  createdAt;
  /** @type {string} */
  email;
  /** @type {string} */
  username;
  /** @type {string} */
  address;
  /** @type {string} */
  phone_number;

  constructor(data, today) {
    this.user_id = String(data?.user_id);
    this.createdAt = String(data?.createdAt);
    this.email = String(data?.email);
    this.username = String(data?.username);
    this.address = String(data?.address);
    this.phone_number = String(data?.phone_number);
  }
}
