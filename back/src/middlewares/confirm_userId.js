import { NotFoundError } from "../../libraries/custom-error";
import { User } from "../db/DAO/User";

/*
파라미터에서 userId를 받아와 실제로 존재하는 유저인지 체크하는 미들웨어
- 존재하는 경우 : 오류 없이 다음으로 넘어감
- 존재하지 않는 경우 : NotFoundError 발생
*/

async function confirm_userId(req, res, next) {
  try {
    const { userId } = req.params;
    const user = await User.findUser({ user_id: userId });

    if (user.length === 0) {
      throw new NotFoundError("해당하는 유저가 없습니다.");
    }
    next();
  } catch (error) {
    next(error);
  }
}

export { confirm_userId };
