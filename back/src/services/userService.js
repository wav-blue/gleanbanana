import bcrypt from "bcrypt";
//import hashPassword from "../utils/hash-password";
import { ulid } from "ulidx";
import db from "../db";
import { NotFoundError, UnauthorizedError } from "../../libraries/custom-error";
import { User } from "../db/DAO/User";
import { createAccessToken, createRefreshToken } from "../utils/createToken";
import { bcryptPassword } from "../utils/bcryptPassword";

class userService {
  static async addUser({ email, password, username, address, phone_number }) {
    const user_id = ulid();
    const today = new Date();

    // password 암호화
    const encryptPassword = await bcryptPassword(password, 10);

    const newUser = {
      user_id,
      email,
      password: encryptPassword,
      username,
      address,
      phone_number,
      my_carbon: 0,
      createdAt: today,
      updatedAt: today,
      deletedAt: null,
    };

    const results = await User.createUser({ newUser });
    if (results.affectedRows === 0) {
      return {
        errorMessage: "회원가입 중 예기치 못한 에러가 발생했습니다.",
      };
    }
    return results;
  }

  // 비밀번호 추가 작성 필요
  // 유저 로그인
  static async loginUser({ email, password }) {
    // 이메일로 유저 정보 조회
    const findUser = await User.findUserByEmail({ email });

    if (findUser.length === 0) {
      throw new NotFoundError("가입 이력이 없습니다.");
    }

    // 비밀번호 확인
    const correctPasswordHash = findUser[0].password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );

    if (!isPasswordCorrect) {
      throw new UnauthorizedError("비밀번호가 일치하지 않습니다.");
    }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || "secret-key";

    const user_data = { user_id: findUser[0]["user_id"] };

    // access token, refresh token 발급
    const accessToken = await createAccessToken(user_data, secretKey);
    const refreshToken = await createRefreshToken(secretKey);
    // 반환할 loginuser 객체
    const loginUser = {
      accessToken: `Bearer ${accessToken}`,
      refreshToken: `Bearer ${refreshToken}`,
      user_id: findUser[0]["user_id"],
    };

    return loginUser;
  }

  // 중복 이메일이 있는지 체크
  static async getEmail({ email }) {
    const result = await User.checkEmail({ email });
    return result;
  }

  // 유저 정보 조회
  static async getUser({ user_id }) {
    const findUser = await User.findUser({ user_id });

    if (findUser?.length === 0) {
      // id에 해당되는 유저가 없는 경우
      throw new NotFoundError("해당하는 유저를 찾을 수 없습니다.");
    }
    if (findUser[0]?.deletedAt) {
      // 탈퇴한 유저인 경우
      // 보안을 위해 같은 메시지 출력
      throw new NotFoundError("해당하는 유저를 찾을 수 없습니다.");
    }

    return findUser;
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
            if (results.affectedRows === 0) {
              reject(new NotFoundError("해당하는 유저를 찾을 수 없습니다."));
            }
            resolve(results);
          }
        }
      );
    });
  }
  // 이미 회원탈퇴한 유저 확인하는 작업 필요
  // 회원 탈퇴
  static async deleteUser({ user_id }) {
    const results = await User.updateDeletedAt({ user_id });
    return results;
  }
}
export { userService };
