import { Router } from "express";
import { cartService } from "../services/cartService";

const cartRouter = Router();

// 장바구니 전체 조회
cartRouter.get("/carts", async function (req, res, next) {
  const userId = req.currentUserId;
  try {
    const carts = await cartService.getCarts({ userId });
    res.status(200).json(carts);
  } catch (error) {
    next(error);
  }
});

// 장바구니에 아이템 추가
cartRouter.post("/carts", async function (req, res, next) {
  const userId = req.currentUserId;
  const { item_id, quantity } = req.body;

  try {
    // 사용자의 cart_id 가져오기
    let cartId = await cartService.getCartIdForUser(userId);

    if (!cartId) {
      cartId = await cartService.createCartForUser({ userId });
    }

    // 이미 해당 제품이 장바구니에 있는지 확인
    const existingItem = await cartService.getCartItem({ cartId, item_id });

    if (existingItem) {
      // 이미 장바구니에 있는 경우 수량 증가
      await cartService.updateCartItem({
        cartId,
        item_id,
        quantity: quantity,
      });
    } else {
      // 장바구니에 없는 경우 새로운 데이터 추가
      await cartService.insertCartItem({ cartId, item_id, quantity });
    }

    res.status(200).send("장바구니에 상품이 추가되었습니다.");
  } catch (error) {
    next(error);
  }
});

// 장바구니 안에서 수량 변경
cartRouter.put("/carts", async function (req, res, next) {
  const userId = req.currentUserId;
  const { item_id, quantity, checked } = req.body;

  try {
    // 사용자의 cart_id 가져오기
    const cartId = await cartService.getCartIdForUser(userId);

    // 장바구니에서 상품 수량 갱신
    await cartService.updateCartItem({ cartId, item_id, checked, quantity });
    res.status(200).send("장바구니 상품 수량이 갱신되었습니다.");
  } catch (error) {
    next(error);
  }
});

// 장바구니에서 물품 삭제
cartRouter.delete("/cart", async function (req, res, next) {
  const userId = req.currentUserId;
  const { itemIdList } = req.query;
  try {
    await cartService.deleteCart({ userId, itemIdList });
    res.status(200).send("장바구니에서 상품이 삭제되었습니다.");
  } catch (error) {
    next(error);
  }
});

export { cartRouter };
