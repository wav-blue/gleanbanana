import bcrypt from "bcrypt";
import { ulid } from "ulidx";
import {
  NotFoundError,
  ConflictError,
  UnauthorizedError,
} from "../../libraries/custom-error";
import { User } from "../db/DAO/User";
import { Order } from "../db/DAO/Order";
import { createAccessToken, createRefreshToken } from "../utils/createToken";
import { bcryptPassword } from "../utils/bcryptPassword";
import { parseDate, lastMonth } from "../utils/dateFunction";

class userService {
  static async addUser({ email, password, ...userInfo }) {
    const user_id = ulid();
    const today = new Date();

    // Email이 중복되는 경우
    const conflict = await User.checkEmail({ email });
    if (conflict[0]["COUNT(email)"]) {
      throw new ConflictError("이미 가입된 이메일입니다.");
    }

    // password 암호화
    const encryptPassword = await bcryptPassword(password, 10);

    const newUser = {
      user_id,
      ...userInfo, // username, address, phone_number
      email,
      password: encryptPassword,
      createdAt: today,
      updatedAt: today,
      deletedAt: null,
    };

    const results = await User.createUser({ newUser });

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
      accessToken,
      refreshToken,
      user_id: findUser[0]["user_id"],
    };

    return loginUser;
  }

  // 중복 이메일이 있는지 체크
  static async getEmail({ email }) {
    const result = await User.checkEmail({ email });
    // {"isDuplicated": true /false}
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
    const userData = {
      user_id: findUser[0].user_id,
      createdAt: findUser[0].createdAt,
      userInfo: {
        이메일: findUser[0].email,
        닉네임: findUser[0].username,
        주소: findUser[0].address,
        휴대전화번호: findUser[0].phone_number,
      },
    };
    return userData;
  }

  // 유저 정보 수정
  static async updateUser({ user_id, ...data }) {
    const newData = {
      ...data,
      updatedAt: new Date(),
    };

    const result = await User.updateUserInfo({ user_id, newData });
    return result;
  }
  // 이미 회원탈퇴한 유저 확인하는 작업 필요
  // 회원 탈퇴
  static async deleteUser({ user_id }) {
    const checked = await User.checkDeletedAt({ user_id });
    if (checked[0]["deletedAt"]) {
      throw new ConflictError("이미 탈퇴한 유저입니다.");
    }
    const result = await User.updateDeletedAt({ user_id });
    return result;
  }
  // 마이페이지 조회
  static async getUseData({ user_id }) {
    const max_count = 6;
    const orderArr = await Order.getOrderIds({ user_id, max_count });
    const last_month = lastMonth();
    const user_data = {
      // 그래프를 위한 데이터
      x: [],
      y: [],
    };

    for (let i = 0; i < orderArr.length; i++) {
      const item = await Order.getUseDatas(orderArr[i].order_id);
      const data = parseInt(item.sum_banana_idx / item.sum_quantity);
      if (data) {
        user_data["x"].push(parseDate(orderArr[i].order_date_createdAt));
        user_data["y"].push(data);
      }
    }

    const recent = await Order.getRecentOrderCount({ last_month, user_id });

    // 한달 간 구매 횟수
    user_data["recent_count"] = recent[0]["count_one_month"];

    user_data["max_value"] = Math.max(...user_data["y"]);
    user_data["min_value"] = Math.min(...user_data["y"]);
    return user_data;
  }
}

export { userService };
