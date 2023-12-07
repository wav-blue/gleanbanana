import { Order } from "../db/DAO/Order";

class orderService {
  //주문내역 전체 조회
  static async getOrders({ userId }) {
    return Order.getOrders({ userId });
  }
  // 주문내역 상세조회
  static async getOrderDetail(userId, order_id) {
    console.log("orderService.getOrderDetail(userId): ", userId);
    console.log("orderService.getOrderDetail(order_id): ", order_id);
    return Order.getOrderDetail(userId, order_id);
  }

  // 추가
  static async createOrder({ userId, pay_method, items }) {
    console.log(" userId  ", userId);
    console.log(" pay_method  ", pay_method);
    console.log(" items  ", items);
    return Order.createOrder({ userId, pay_method, items });
  }

  //삭제
  static async deleteOrder(order_id) {
    console.log("orderService.deleteOrder(order_id): ", order_id);
    return Order.deleteOrder(order_id);
  }
}
export { orderService };
