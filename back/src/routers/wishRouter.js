import { Router } from "express";
import { wishService } from "../services/wishService";

const wishRouter = Router();

// 찜한 목록 조회
wishRouter.get("/user/:id/wishlist", async function (req, res, next) {
  try {
    const items = await wishService.searchItems({ search });
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
});

// 찜하기 리스트 생성
wishRouter.post("/user/:id/wishlist/list", async function (req, res, next) {
  const { id } = req.params;
  console.log("id : ", id);
  try {
    const items = await wishService.createWishlist({ user_id: id });
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
});

// 찜하기 버튼 클릭
wishRouter.post("/user/:id/wishlist", async function (req, res, next) {
  const { id } = req.params; // user의 id => 통해서 wishlist_id를 찾아냄?
  const { item_id } = req.body; // item_id를 어떻게 받을까

  try {
    const items = await wishService.createWishItem({ user_id: id, item_id });
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
});

//찜한 목록 삭제
wishRouter.delete(
  "/user/:id/wishlist/:itemId",
  async function (req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
);

//찜한 목록 전체 삭제
wishRouter.delete("/user/:id/wishlist", async function (req, res, next) {
  try {
  } catch (error) {
    next(error);
  }
});

export { wishRouter };
