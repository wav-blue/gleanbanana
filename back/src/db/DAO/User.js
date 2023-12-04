import db from "..";
import { ConflictError } from "../../../libraries/custom-error";

class User {
  // Create
  static async createUser({ newUser }) {
    const sql = `INSERT INTO user SET ?; `;

    return new Promise((resolve, reject) => {
      db.query(sql, newUser, function (error, results) {
        if (error) {
          if (error.errno === 1062) {
            reject(new ConflictError("이미 가입된 이메일입니다."));
          }
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
  // Read
  // return => 조회한 user 정보 전체
  static async findUser({ user_id }) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM user WHERE user_id = ? ;`;
      db.query(sql, user_id, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
  // Read
  // Email로 User 정보 확인 => user_id/email/password
  static async findUserByEmail({ email }) {
    const query = `SELECT user_id, email, password FROM user WHERE email = ?`;
    return new Promise((resolve, reject) => {
      db.query(query, email, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
}

export { User };
