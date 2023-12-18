import { Router } from "express";
import { orderService } from "../services/orderService";
const orderRouter = Router();

//현재 로그인중인 회원의 주문내역 전체조회
orderRouter.get("/orders", async function (req, res, next) {
  const userId = req.currentUserId;

  try {
    // DB에서 데이터 조회
    const orders = await orderService.getOrders({
      userId,
    });

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});

// 주문내역 추가
orderRouter.post("/orders", async function (req, res, next) {
  try {
    const userId = req.currentUserId;
    const { pay_method, items } = req.body;

    const newOrders = await orderService.createOrder({
      userId,
      pay_method,
      items,
    });

    if (newOrders.errorMessage) {
      throw new Error(newOrders.errorMessage);
    }
    res.status(201).json(newOrders);
  } catch (error) {
    next(error);
  }
});

// 주문내역 상세조회
orderRouter.get("/orders/:orderId", async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const order_id = req.params.orderId;
    const getOrderDetail = await orderService.getOrderDetail(userId, order_id);

    res.status(200).json(getOrderDetail);
  } catch (err) {
    next(err);
  }
});

// 주문내역 삭제
orderRouter.delete("/orders/:orderId", async (req, res, next) => {
  try {
    const order_id = req.params.orderId;
    await orderService.deleteOrder(order_id);
    res.status(204).json();
  } catch (err) {
    next(err);
  }
});
export { orderRouter };
