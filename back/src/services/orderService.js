import { NotFoundError } from "../../libraries/custom-error";
import { Order } from "../db/DAO/Order";

class orderService {
  //주문내역 전체 조회
  static async getOrders({ userId }) {
    return Order.getOrders({ userId });
  }
  // 주문내역 상세조회
  static async getOrderDetail(userId, order_id) {
    // 존재하는 order_id인지 확인
    const results = await Order.checkOrderId({ order_id });
    if (results.length == 0) {
      throw new NotFoundError("해당하는 주문 내역이 없습니다.");
    }
    return Order.getOrderDetail(userId, order_id);
  }

  // 추가
  static async createOrder({ userId, pay_method, items }) {
    return Order.createOrder({ userId, pay_method, items });
  }

  //삭제
  static async deleteOrder(order_id) {
    // 존재하는 order_id인지 확인
    const results = await Order.checkOrderId({ order_id });
    if (results.length == 0) {
      throw new NotFoundError("해당하는 주문 내역이 없습니다.");
    }
    return Order.deleteOrder(order_id);
  }
}
export { orderService };
