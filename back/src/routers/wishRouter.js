import { Router } from "express";
import { wishService } from "../services/wishService";

const wishRouter = Router();

// 찜한 목록 조회
wishRouter.get("/wishlist", async function (req, res, next) {
  try {
    const userId = req.currentUserId;
    const wishlists = await wishService.getWishlist({ user_id: userId });
    res.status(200).json(wishlists.length > 0 ? wishlists : null);
  } catch (error) {
    next(error);
  }
});

// 찜한 목록 조회 : 상품 아이디만
wishRouter.get("/wishlist/id", async function (req, res, next) {
  try {
    const userId = req.currentUserId;
    const wish_id_list = await wishService.getWishlistId({ user_id: userId });
    res.status(200).json(wish_id_list.length > 0 ? wish_id_list : null);
  } catch (error) {
    next(error);
  }
});

// 찜하기 버튼 클릭
wishRouter.post("/wishlist", async function (req, res, next) {
  try {
    const userId = req.currentUserId;
    const { item_id } = req.body;
    await wishService.createWishlist({
      user_id: userId,
      item_id,
    });
    res.status(201).json("찜 목록에 성공적으로 추가되었습니다.");
  } catch (error) {
    next(error);
  }
});

//찜한 특정 아이템 삭제
wishRouter.delete("/wishlist/:itemId", async function (req, res, next) {
  try {
    const userId = req.currentUserId;
    const { _, itemId } = req.params;
    await wishService.deleteWishlist({
      user_id: userId,
      item_id: itemId,
    });
    res.status(200).json("찜한 내역을 성공적으로 삭제했습니다.");
  } catch (error) {
    next(error);
  }
});

//찜한 목록 전체 삭제
wishRouter.delete("/wishlist", async function (req, res, next) {
  try {
    const userId = req.currentUserId;
    await wishService.deleteAllWishlist({ user_id: userId });
    res.status(200).json("유저의 찜 목록을 성공적으로 삭제했습니다.");
  } catch (error) {
    next(error);
  }
});

export { wishRouter };
