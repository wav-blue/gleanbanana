import { Cart } from "../db/DAO/Cart";

class cartService {
  static async createCartForUser({ userId }) {
    return Cart.createCartForUser({ userId });
  }

  static async getCarts({ userId }) {
    return Cart.getCarts({ userId });
  }

  static async getCartIdForUser(userId) {
    return Cart.getCartIdForUser(userId);
  }

  static async getCartItem({ cartId, item_id }) {
    return Cart.getCartItem({ cartId, item_id });
  }

  static async updateCartItem({ cartId, item_id, checked, quantity }) {
    return Cart.updateCartItem({ cartId, item_id, checked, quantity });
  }

  static async insertCartItem({ cartId, item_id, quantity }) {
    return Cart.insertCartItem({ cartId, item_id, quantity });
  }

  static async deleteCart({ userId, itemIdList }) {
    return Cart.deleteCart({ userId, itemIdList });
  }

  static async deleteCartItem(cartId, itemId) {
    return Cart.deleteCartItem(cartId, itemId);
  }
}
export { cartService };
