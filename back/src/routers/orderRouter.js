import { Router } from "express";
import { orderService } from "../services/orderService";
const orderRouter = Router();

//현재 로그인중인 회원의 주문내역 전체조회
orderRouter.get("/:userId/orders", async function (req, res, next) {
  const { userId } = req.params;
  console.log("orderRouter 주문내역 조회 userid = ", userId);
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
    //const { pay_method, item } = req.body;
    const { pay_method, id, quantity } = req.body;
    console.log("orderRouter.post데이터추가(userId) : ", userId);
    console.log("orderRouter.post데이터추가(pay_method) : ", pay_method);
    //console.log("orderRouter.post데이터추가(item) : ", item);
    console.log("orderRouter.post데이터추가(id) : ", id);
    console.log("orderRouter.post데이터추가(quantity) : ", quantity);
    //console.log("orderRouter.post데이터추가(deliveryDate) : ", deliveryDate);
    //아이템식별자와 수량값 추가 전달 필요
    // DB에 데이터 추가(uuid,datetime)
    const newOrders = await orderService.createOrder({
      userId,
      pay_method,
      id,
      quantity,
      // deliveryDate,
    });

    if (newOrders.errorMessage) {
      throw new Error(newOrders.errorMessage);
    }
    res.status(201).json(newOrders);
  } catch (error) {
    next(error);
  }
});

// 주문내역 수정

// 주문내역 삭제
orderRouter.delete(
  "/:userId/orders/:id",
  //   login_required,
  //   check_permission,

  async (req, res, next) => {
    try {
      const userId = req.params.userId;
      console.log("userId: ", userId);

      const order_id = req.params.id;
      console.log("order_id: ", order_id);
      const deletedOrder = await orderService.deleteOrder(order_id);
      //const deletedOrder = await orderService.deleteOrder({ _id: id });
      res.status(204).json(deletedOrder);
    } catch (err) {
      next(err);
    }
  }
);
export { orderRouter };
