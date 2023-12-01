import db from "../db";

// Database에 접근할 수 없다

class wishService {
  // 존재하지 않는 user id를 조회했다(에러)
  // 존재하는 user id를 조회했지만 표시할 내역이 없다(에러 아님)
  static async getWishlist({ user_id }) {
    const query = `SELECT * FROM wishlist WHERE user_id = ?`;
    const [wishlists, fields] = await db.execute(query, user_id);
    console.log("wishlists > ", wishlists);
    return wishlists;
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

  // 특정 유저의 아이템이 없다(에러인가?)
  // 특정 유저가 없다(에러)
  // 특정 유저의 찜목록에 해당 아이템이 없다(에러)

  // 특정 유저의 특정 아이템 삭제
  static async deleteWishitem({ user_id, item_id }) {
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
  static async deleteAllWishitem({ user_id }) {
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
