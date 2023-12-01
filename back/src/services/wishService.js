import { NotFoundError } from "../../libraries/custom-error";
import db from "../db/index_multi";

class wishService {
  static async getWishlist({ user_id }) {
    const query1 = `SELECT * FROM user WHERE user_id = ? ;`;
    const query2 = `SELECT * FROM wishlist WHERE user_id = ? ;`;
    return new Promise((resolve, reject) => {
      db.query(
        query1 + query2,
        [user_id, user_id],
        function (error, results, fields) {
          if (results[0].length === 0) {
            reject(new NotFoundError("해당하는 유저가 없습니다."));
          } else {
            if (error) {
              reject(error);
            } else {
              resolve(results[1]);
            }
          }
        }
      );
    });
  }

  // 존재하지 않는 user id를 받았다
  // 존재하지 않는 item id를 받았다
  static async createWishlist({ user_id, item_id }) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO wishlist VALUES (null, ?, ?);`;
      db.query(query, [user_id, item_id], function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  // 특정 유저가 없다(에러)
  // 특정 유저의 찜목록에 해당 아이템이 없다(에러)

  // 특정 유저의 특정 아이템 삭제
  static async deleteWishlist({ user_id, item_id }) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM wishlist WHERE user_id = ?  AND item_id = ?;`;
      db.query(query, [user_id, item_id], function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  // 특정 유저가 없다 (에러)
  // 특정 유저가 있지만 삭제할 아이템이 없다(에러 아님)

  // 특정 유저의 전체 아이템 삭제
  static async deleteAllWishlist({ user_id }) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM wishlist WHERE user_id = ?;`;
      db.query(query, user_id, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
}
export { wishService };
