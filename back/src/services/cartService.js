import db from "../db";
import { ulid } from "ulidx";

class cartService {
  // 장바구니 전체 조회
  static async getCarts({ userId }) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT c.cart_id, c.user_id, ci.item_id, i.item_name, i.price, i.expected_delivery, i.banana_index, quantity
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

// 장바구니 추가
static async createCart({ userId, itemId, quantity }) {
  return new Promise((resolve, reject) => {
    // 사용자의 현재 장바구니 정보 확인
    db.query(`SELECT cart_id FROM cart WHERE user_id = ?`, [userId], (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        // 이미 쇼핑 카트가 존재하는 경우
        if (results.length > 0) {
          // 기존 cart_id 가져오기
          const cartId = results.map(result => result.cart_id);
          const cartIdMap = cartId.map(() => '?').join(', ');
          const newCartId = ulid();
          // cart_item 테이블에 상품이 이미 있는지 확인
          db.query(
            `SELECT * FROM cart_item WHERE cart_id IN (${cartIdMap}) AND item_id = ?`,
            [...cartId, itemId],
            (error, itemResults, fields) => {
              if (error) {
                reject(error);
              } else {
                // 상품이 이미 장바구니에 있는 경우 수량 증가
                if (itemResults.length > 0) {
                  db.query(
                    `UPDATE cart_item SET quantity = quantity + ? WHERE cart_id IN (${cartIdMap}) AND item_id = ?`,
                    [quantity, ...cartId, itemId],
                    (error, results, fields) => {
                      if (error) {
                        reject(error);
                      } else {
                        resolve("장바구니에 상품 수량이 업데이트되었습니다.");
                      }
                    }
                  );
                } else {
                  // 상품이 장바구니에 없으면 cart_item 테이블에 새로운 행 추가
                  db.query(`INSERT INTO cart (cart_id, user_id) VALUES (?, ?)`, [newCartId, userId], (error, results, fields) => {
                    if (error) {
                      reject(error);
                    } else {
                      // 생성된 cart_id를 사용하여 cart_item 테이블에 추가
                      db.query(
                        `INSERT INTO cart_item (cart_id, item_id, quantity) VALUES (?, ?, ?)`,
                        [newCartId, itemId, quantity],
                        (error, results, fields) => {
                          if (error) {
                            reject(error);
                          } else {
                            resolve("장바구니에 항목이 추가되었습니다.");
                          }
                        }
                      );
                    }
                  });
                }
              }
            }
          );
        } else {
          // 쇼핑 카트가 없는 경우
          // 새로운 cart_id 생성
          const newCartId = ulid();

          // 장바구니 생성 코드
          db.query(`INSERT INTO cart (cart_id, user_id) VALUES (?, ?)`, [newCartId, userId], (error, results, fields) => {
            if (error) {
              reject(error);
            } else {
              // 생성된 cart_id를 사용하여 cart_item 테이블에 추가
              db.query(
                `INSERT INTO cart_item (cart_id, item_id, quantity) VALUES (?, ?, ?)`,
                [newCartId, itemId, quantity],
                (error, results, fields) => {
                  if (error) {
                    reject(error);
                  } else {
                    resolve("장바구니에 항목이 추가되었습니다.");
                  }
                }
              );
            }
          });
        }
      }
    });
  });
}

  // 장바구니에서 선택 물품 삭제
  static async deleteCart({ userId, cartId }) {
    return new Promise((resolve, reject) => {
      // 사용자 cart_id 확인
      db.query(`SELECT cart_id FROM cart WHERE user_id = ?`, [userId], (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          if (results.length > 0) {
            // 장바구니(cart_item) 테이블에서 품목 삭제
            db.query(`DELETE FROM cart_item WHERE cart_id = ?`, [cartId], (error, itemResults, fields) => {
              if (error) {
                reject(new Error("장바구니에서 항목을 삭제하지 못했습니다."));
              } else {
                // cart_item 테이블에 영향을 받는 행 확인
                if (itemResults.affectedRows === 0) {
                  reject(new Error("장바구니에서 지정한 항목을 찾을 수 없습니다."));
                } else {
                  // cart 테이블에서 사용자의 cart 삭제
                  db.query(`DELETE FROM cart WHERE cart_id = ?`, [cartId], (error, cartResults, fields) => {
                    if (error) {
                      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
                        reject(new Error("지정한 항목이 이미 장바구니에서 제거되었습니다."));
                      } else {
                        reject(new Error("장바구니를 삭제하지 못했습니다."));
                      }
                    } else {
                      resolve("선택하신 상품이 장바구니에서 제거되었습니다.");
                    }
                  });
                }
              }
            });
          } else {
            // 사용자의 cart_id가 없는 경우 오류를 반환
            reject(new Error("사용자의 장바구니가 존재하지 않습니다."));
          }
        }
      });
    });
  }
}

export { cartService };
