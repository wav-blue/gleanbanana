import { Router } from "express";
import { orderService } from "../services/orderService";
const orderRouter = Router();

//현재 로그인중인 회원의 주문내역 전체조회
orderRouter.get("/:userId/orders", async function (req, res, next) {
  const { userId } = req.params;
  //console.log("orderRouter 주문내역 조회 userid = ", userId);

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
orderRouter.post("/:userId/orders", async function (req, res, next) {
  try {
    const { userId } = req.params;

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
orderRouter.get("/:userId/orders/:orderId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    console.log("userId: ", userId);

    const order_id = req.params.orderId;
    console.log("order_id: ", order_id);
    const getOrderDetail = await orderService.getOrderDetail(userId, order_id);

    res.status(200).json(getOrderDetail);
  } catch (err) {
    next(err);
  }
});

// 주문내역 삭제
orderRouter.delete(
  "/:userId/orders/:orderId",
  //   login_required,
  //   check_permission,

  async (req, res, next) => {
    try {
      const userId = req.params.userId;
      console.log("userId: ", userId);

      const order_id = req.params.orderId;
      console.log("order_id: ", order_id);
      await orderService.deleteOrder(order_id);
      //const deletedOrder = await orderService.deleteOrder({ _id: id });
      res.status(204).json();
    } catch (err) {
      next(err);
    }
  }
);
export { orderRouter };
