import { ForbiddenError } from "../../libraries/custom-error";

function permission_check(req, res, next) {
  try {
    console.log(" req: ", req.params.userId);
    console.log(" currentUserId: ", req.currentUserId);
    if (req.params.userId !== req.currentUserId) {
      throw new ForbiddenError("해당 동작에 대한 권한이 없습니다");
    }
    next();
  } catch (err) {
    next(err);
  }
}

export { permission_check };
