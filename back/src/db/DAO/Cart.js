import db from "..";
import { ulid } from "ulidx";

class Cart {
  // 사용자 등록 시 새로운 cart_id 생성
  static async createCartForUser({ userId }) {
    return new Promise((resolve, reject) => {
      // 새로운 cart_id 생성
      const newCartId = ulid();

      db.query(
        `INSERT INTO cart (cart_id, user_id) VALUES (?, ?)`,
        [newCartId, userId],
        (error, results, fields) => {
          if (error) {
            reject(error);
          } else {
            resolve(newCartId);
          }
        }
      );
    });
  }

  // 장바구니 전체 조회
  static async getCarts({ userId }) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT ci.item_id, i.item_name, i.price, i.expected_delivery, i.banana_index, quantity, i.image_url, checked
        FROM cart_item ci
        JOIN cart c ON ci.cart_id = c.cart_id
        JOIN item i ON ci.item_id = i.item_id
        WHERE c.user_id = ?;`,
        [userId],
        (error, results, fields) => {
          if (error) {
            reject(error);
          } else {
            resolve(results.length > 0 ? results : null);
          }
        }
      );
    });
  }

  // 사용자의 cart_id 가져오기
  static async getCartIdForUser(userId) {
    return new Promise((resolve, reject) => {
      db.query(`SELECT cart_id FROM cart WHERE user_id = ?`, [userId], (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.length > 0 ? results[0].cart_id : 0);
        }
      });
    });
  }

  // 이미 장바구니에 있는지 확인
  static async getCartItem({ cartId, item_id }) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM cart_item WHERE cart_id = ? AND item_id = ?`,
        [cartId, item_id],
        (error, results, fields) => {
          if (error) {
            reject(error);
          } else {
            resolve(results.length > 0 ? results[0] : null);
          }
        }
      );
    });
  }

  // 장바구니 아이템 수량 갱신
  static async updateCartItem({ cartId, item_id, checked, quantity }) {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE cart_item SET quantity = ?, checked = ? WHERE cart_id = ? AND item_id = ?`,
        [quantity, checked, cartId, item_id],
        (error, results, fields) => {
          if (error) {
            reject(error);
          } else {
            resolve("The product quantity in the shopping cart has been updated.");
          }
        }
      );
    });
  }

  // 장바구니에 새로운 아이템 추가
  static async insertCartItem({ cartId, item_id, quantity }) {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO cart_item (cart_id, item_id, quantity, checked) VALUES (?, ?, ?, false)`,
        [cartId, item_id, quantity],
        (error, results, fields) => {
          if (error) {
            reject(error);
          } else {
            resolve("Item has been added to your shopping cart.");
          }
        }
      );
    });
  }

  // 장바구니에서 상품 삭제
  static async deleteCart({ userId, itemIdList }) {
    return new Promise(async (resolve, reject) => {
      try {
        const userCartId = await this.getCartIdForUser(userId);
        itemIdList = itemIdList.sort((a, b) => a - b);

        for (const itemId of itemIdList) {
          await this.deleteCartItem(userCartId, itemId);
        }
        resolve("The selected product has been removed from your shopping cart.");
      } catch (error) {
        reject(error);
      }
    });
  }

  // cart 테이블에서 상품 삭제
  static async deleteCartItem(cartId, itemId) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM cart_item WHERE cart_id = ? AND item_id = ?";

      db.query(query, [cartId, itemId], (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
}

export { Cart };