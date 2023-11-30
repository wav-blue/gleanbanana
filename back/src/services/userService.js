//import bcrypt from "bcrypt";
//import hashPassword from "../utils/hash-password";
//import comparePassword from "../utils/compare-password";
import { ulid } from "ulidx";
import db from "../db";
import { BadRequestError } from "../../libraries/custom-error";
import jwt from "jsonwebtoken";

class userService {
  static async addUser({ email, password, username, address, phone_number }) {
    // 비밀번호 해쉬화
    // const hashedPassword = await hashPassword(password, 10);

    const user_id = ulid(); // 01F7DKCVCVDZN1Z5Q4FWANHHCC
    const today = new Date();
    const newUser = {
      user_id,
      email,
      password,
      username,
      address,
      phone_number,
      my_carbon: 0,
      createdAt: today,
      updatedAt: today,
      deletedAt: null,
    };

    var query = `INSERT INTO user SET ?  `;
    return new Promise((resolve, reject) => {
      db.query(query, newUser, function (error, results, fields) {
        if (error) {
          console.log("error : ", error);
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  // 유저 로그인
  static async loginUser({ email, password }) {
    const query = `SELECT user_id, email, password FROM user WHERE email = ?`;
    return new Promise((resolve, reject) => {
      db.query(query, email, function (error, results, fields) {
        if (error) {
          // 유저가 존재하지 않음
          console.log("error : ", error);
          reject(error);
        } else {
          // 로그인 성공 -> JWT 웹 토큰 생성
          const secretKey = process.env.JWT_SECRET_KEY || "secret-key";

          // 토큰의 내용, 토큰의 비밀 키, 토큰의 설정
          const token = jwt.sign({ user_id: results[0]["user_id"] }, secretKey);

          // 반환할 loginuser 객체
          const loginUser = {
            token,
            email,
            errorMessage: null,
          };
          resolve(loginUser);
        }
      });
    });
  }

  // 유저 정보 조회
  static async getUser({ user_id }) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM user WHERE user_id = ?`;

      db.query(query, user_id, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  // 유저 정보 수정
  static async updateUser({
    user_id,
    password,
    username,
    address,
    phone_number,
  }) {
    const updatedUser = {
      password,
      username,
      address,
      phone_number,
      updatedAt: new Date(),
    };
    var query = `UPDATE user SET ? WHERE user_id = ?;`;
    return new Promise((resolve, reject) => {
      db.query(
        query,
        [updatedUser, user_id],
        function (error, results, fields) {
          if (error) {
            console.log("error : ", error);
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
  }

  // 회원 탈퇴
  static async deleteUser({ user_id }) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE user SET deletedAt = ? WHERE user_id = ? ;`;
      const today = new Date();
      db.query(query, [today, user_id], function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
}
export { userService };
