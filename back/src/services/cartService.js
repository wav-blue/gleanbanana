import db from "../db";
import { ulid } from "ulidx";

class cartService {
  // 사용자 등록 시 새로운 Cart 생성
  // 이 함수는 사용자가 새로 가입할 때 한 번만 호출
  static async createCartForUser({ userId }) {
    return new Promise((resolve, reject) => {
      // 새로운 cart_id 생성
      const newCartId = ulid();
      
      // cart 테이블에 새로운 데이터 추가
      db.query(`INSERT INTO cart (cart_id, user_id) VALUES (?, ?)`, [newCartId, userId], (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(newCartId); // 새로 생성된 cart_id 반환
        }
      });
    });
  }

  // 장바구니 전체 조회
  static async getCarts({ userId }) {
    return new Promise((resolve, reject) => {
      // SELECT c.cart_id, c.user_id <- 테스트용
      db.query(
        `SELECT ci.item_id, i.item_name, i.price, i.expected_delivery, i.banana_index, quantity
        FROM cart_item ci
        JOIN cart c ON ci.cart_id = c.cart_id
        JOIN item i ON ci.item_id = i.item_id
        WHERE c.user_id = ?;`,
        [userId],
        function (error, results, fields) {
          if (error) {
            reject(error);
          } else {
            if (results.length > 0) {
              resolve(results);
            } else {
              reject(new Error("장바구니가 비어 있습니다."));
            }
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
          if (results.length > 0) {
            resolve(results[0].cart_id);
          } else {
            resolve(0);
          }
        }
      });
    });
  }

  // 이미 장바구니에 있는지 확인
  static async getCartItem({ cartId, itemId }) {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM cart_item WHERE cart_id = ? AND item_id = ?`, [cartId, itemId], (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0] || null);
        }
      });
    });
  }

  // 장바구니에 아이템 수량 업데이트
  static async updateCartItem({ cartId, itemId, quantity }) {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE cart_item SET quantity = ? WHERE cart_id = ? AND item_id = ?`, [quantity, cartId, itemId], (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve("장바구니의 제품 수량이 갱신되었습니다.");
        }
      });
    });
  }

  // 장바구니에 새로운 아이템 추가
  static async insertCartItem({ cartId, itemId, quantity }) {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO cart_item (cart_id, item_id, quantity) VALUES (?, ?, ?)`, [cartId, itemId, quantity], (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve("장바구니에 항목이 추가되었습니다.");
        }
      });
    });
  }

  // 장바구니 상품 삭제
  static async deleteCart({ userId, itemId }) {
    return new Promise(async (resolve, reject) => {
      try {
        // 사용자의 cart_id 가져오기
        const userCartId = await this.getCartIdForUser(userId);

        // item_id에 대한 cart_id ID 가져오기
        const cartId = await this.getCartIdForItem(itemId);
        if (!userCartId || userCartId !== cartId) {
          // 사용자의 cart_id와 상품에 연관된 cart_id가 일치하지 않을 경우 오류
          reject(new Error("사용자가 추가하지 않은 상품입니다."));
          return;
        }

        // 장바구니에서 상품 삭제
        await this.deleteCartItem(itemId);

        resolve("선택한 상품이 쇼핑 카트에서 제거되었습니다.");
      } catch (error) {
        reject(error);
      }
    });
  }

  // item_id에 대한 cart_id 가져오기
  static async getCartIdForItem(itemId) {
    return new Promise((resolve, reject) => {
      db.query(`SELECT cart_id FROM cart_item WHERE item_id = ? LIMIT 1`, [itemId], (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          const cartId = results[0] ? results[0].cart_id : null;
          resolve(cartId);
        }
      });
    });
  }

  // 쇼핑 카트에서 상품 삭제
  static async deleteCartItem(itemId) {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM cart_item WHERE item_id = ?`, [itemId], (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
}

export { cartService };
