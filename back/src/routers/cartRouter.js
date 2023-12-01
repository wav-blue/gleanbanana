import { Router } from "express";
import { cartService } from "../services/cartService";

const cartRouter = Router();

// 장바구니 전체 조회
cartRouter.get("/:userId/carts", async function (req, res, next) {
  const { userId : userId } = req.params;
  try {
    const carts = await cartService.getCarts({ userId });
    res.status(200).json(carts);
  } catch (error) {
    next(error);
  }
});

// 장바구니 아이템 추가
cartRouter.post("/:userId/carts", async function (req, res, next) {
  const { userId : userId } = req.params;
  const { itemId, quantity } = req.body;

  try {
    await cartService.createCart({ userId, itemId, quantity });

    res.status(200).send("아이템이 장바구니에 추가되었습니다.");
  } catch (error) {
    next(error);
  }
});

// 장바구니에서 물품 삭제
cartRouter.delete("/:userId/cart/:cartId", async function (req, res, next) {
  const { userId : userId, cartId } = req.params;

  try {
    await cartService.deleteCart({ userId, cartId });
    res.status(200).send("장바구니에서 아이템이 삭제되었습니다.");
  } catch (error) {
    next(error);
  }
});

export { cartRouter };
