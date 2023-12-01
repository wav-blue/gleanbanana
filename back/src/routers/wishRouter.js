import { Router } from "express";
import { wishService } from "../services/wishService";

const wishRouter = Router();

// 찜한 목록 조회
wishRouter.get("/:userId/wishlist", async function (req, res, next) {
  try {
    const { userId } = req.params;
    const items = await wishService.getWishlist({ user_id: userId });
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
});

// 찜하기 버튼 클릭
wishRouter.post("/:userId/wishlist", async function (req, res, next) {
  const { userId } = req.params;
  const { item_id } = req.body;

  try {
    const items = await wishService.createWishlist({
      user_id: userId,
      item_id,
    });
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
});

//찜한 특정 아이템 삭제
wishRouter.delete("/:userId/wishlist/:itemId", async function (req, res, next) {
  try {
    const { userId, itemId } = req.params;
    await wishService.deleteWishitem({ user_id: userId, item_id: itemId });
    res.status(204).json();
  } catch (error) {
    next(error);
  }
});

//찜한 목록 전체 삭제
wishRouter.delete("/:userId/wishlist", async function (req, res, next) {
  try {
    const { userId } = req.params;
    await wishService.deleteAllWishitem({ user_id: userId });
    res.status(204).json();
  } catch (error) {
    next(error);
  }
});

export { wishRouter };
