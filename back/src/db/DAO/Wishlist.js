import db from "..";

class Wishlist {
  // Create
  static async createWishlist({ user_id, item_id }) {
    const sql = `INSERT INTO wishlist VALUES (null, ?, ?);`;
    return new Promise((resolve, reject) => {
      db.query(sql, [user_id, item_id], function (error, results, fields) {
        if (error) {
          console.log("error: ", error);
          reject(error);
        } else {
          console.log("results : ", results);
          resolve(results);
        }
      });
    });
  }

  // Read
  static async findWishlistByUser({ user_id }) {
    const sql = `SELECT * FROM wishlist WHERE user_id = ? ;`;
    return new Promise((resolve, reject) => {
      db.query(sql, user_id, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          if (results.length === 0) {
            resolve("찜 목록이 없습니다.");
          }
          resolve(results);
        }
      });
    });
  }

  // Delete
  static async deleteWishlist({ user_id, item_id }) {
    const sql = `DELETE FROM wishlist WHERE user_id = ?  AND item_id = ?;`;
    return new Promise((resolve, reject) => {
      db.query(sql, [user_id, item_id], function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
}

export { Wishlist };
