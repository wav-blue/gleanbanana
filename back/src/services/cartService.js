import db from "../db";

class cartService {
  // 장바구니 전체 조회
  static async getCarts({ userId }) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT c.cart_id, ci.item_id, i.item_name, i.price, i.expected_delivery, i.banana_index, quantity
      FROM cart_item ci
      JOIN cart c ON ci.cart_id = c.cart_id
      JOIN item i ON ci.item_id = i.item_id
      WHERE c.user_id = ${userId};`,
        function (error, results, fields) {
          if (error) {
            reject(error);
          } else {
            if (results.length > 0) {
              console.log("getCarts results값 확인 == ", results);
              resolve(results);
            } else {
              reject(new Error("장바구니가 비어 있습니다."));
            }
          }
        }
      );
    });
  }

  // 장바구니에 아이템 추가
  static async addItemToCart({ userId, itemId, quantity }) {
    return new Promise((resolve, reject) => {
      // 먼저 사용자의 현재 장바구니 정보를 조회
      db.query(
        `SELECT cart_id FROM cart WHERE user_id = ${userId}`,
        (error, results, fields) => {
          if (error) {
            reject(error);
          } else {
            let cartId;

            // 이미 장바구니가 존재하는 경우
            if (results.length > 0) {
              // 이미 존재하는 장바구니에서 cart_id를 사용하지 않고
              // 새로운 장바구니를 생성하도록 수정
              db.query(
                `INSERT INTO cart (user_id) VALUES (${userId})`,
                (error, results, fields) => {
                  if (error) {
                    reject(error);
                  } else {
                    // 새로 생성된 장바구니의 cart_id를 가져옴
                    cartId = results.insertId;

                    // 새로운 아이템을 cart_item 테이블에 추가
                    db.query(
                      `INSERT INTO cart_item (cart_id, item_id, quantity) VALUES (${cartId}, ${itemId}, ${quantity})`,
                      (error, results, fields) => {
                        if (error) {
                          reject(error);
                        } else {
                          resolve("아이템이 장바구니에 추가되었습니다.");
                        }
                      }
                    );
                  }
                }
              );
            } else {
              // 장바구니가 존재하지 않는 경우, 새로운 장바구니 생성
              db.query(
                `INSERT INTO cart (user_id) VALUES (${userId})`,
                (error, results, fields) => {
                  if (error) {
                    reject(error);
                  } else {
                    // 새로 생성된 장바구니의 cart_id를 가져옴
                    cartId = results.insertId;

                    // 새로운 아이템을 cart_item 테이블에 추가
                    db.query(
                      `INSERT INTO cart_item (cart_id, item_id, quantity) VALUES (${cartId}, ${itemId}, ${quantity})`,
                      (error, results, fields) => {
                        if (error) {
                          reject(error);
                        } else {
                          resolve("아이템이 장바구니에 추가되었습니다.");
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        }
      );
    });
  }

  // 장바구니에서 선택 물품 삭제
  static async deleteCart({ userId, cartId }) {
    return new Promise((resolve, reject) => {
      // 사용자의 cart_id를 확인
      db.query(
        `SELECT cart_id FROM cart WHERE user_id = ${userId}`,
        (error, results, fields) => {
          if (error) {
            reject(error);
          } else {
            if (results.length > 0) {
              const userCartId = results[0].cart_id;

              // 장바구니(cart_item) 테이블에서 해당 아이템을 삭제
              db.query(
                `DELETE FROM cart_item WHERE cart_id = ${cartId}`,
                (error, results, fields) => {
                  if (error) {
                    reject(error);
                  } else {
                    // 사용자의 cart_id를 사용하여 (cart) 테이블에서 카트를 삭제
                    db.query(
                      `DELETE FROM cart WHERE cart_id = ${userCartId}`,
                      (error, results, fields) => {
                        if (error) {
                          if (error.code === "ER_ROW_IS_REFERENCED_2") {
                            reject(
                              new Error("이미 제거된 장바구니 상품입니다.")
                            );
                          } else {
                            reject(error);
                          }
                        } else {
                          resolve("장바구니에서 선택한 항목이 제거되었습니다.");
                        }
                      }
                    );
                  }
                }
              );
            } else {
              // 사용자의 cart_id가 없는 경우 에러를 반환
              reject(new Error("해당 사용자의 장바구니가 존재하지 않습니다."));
            }
          }
        }
      );
    });
  }
}

export { cartService };
