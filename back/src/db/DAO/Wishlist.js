import db from "..";

class Wishlist {
  // Create
  static async createWishlist({ user_id, item_id }) {
    const sql = `INSERT INTO wishlist VALUES (?, ?);`;
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
    const sql = `SELECT item_id FROM wishlist WHERE user_id = ? ;`;
    return new Promise((resolve, reject) => {
      db.query(sql, user_id, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          if (results.length === 0) {
            resolve(null);
          }
          resolve(results);
        }
      });
    });
  }
  static async findWishlistWithItems({ user_id }) {
    const sql = `SELECT i.item_id, i.item_name, i.price, i.banana_index, i.image_url FROM wishlist AS w INNER JOIN item AS i ON i.item_id = w.item_id WHERE user_id= ?;`;
    return new Promise((resolve, reject) => {
      db.query(sql, user_id, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          // 찜한 목록이 없는 경우 빈 배열 반환
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
