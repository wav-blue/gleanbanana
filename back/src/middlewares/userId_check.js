import { NotFoundError } from "../../libraries/custom-error";
import { User } from "../db/DAO/User";

async function userId_check(req, res, next) {
  try {
    const userId = req.currentUserId;
    const user = await User.findUser({ user_id: userId });
    if (user.length === 0) {
      throw new NotFoundError("해당하는 유저가 없습니다.");
    }
    next();
  } catch (error) {
    next(error);
  }
}

export { userId_check };
