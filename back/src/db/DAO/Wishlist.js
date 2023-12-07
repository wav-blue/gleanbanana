import db from "..";

class Wishlist {
  // Create
  static async createWishlist({ user_id, item_id }) {
    const sql = `INSERT INTO wishlist VALUES (?, ?);`;
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

  // Read
  static async findWishlistItemInfo({ user_id }) {
    const sql = `SELECT i.item_id, i.item_name, i.price, i.banana_index, i.image_url FROM wishlist AS w INNER JOIN item AS i ON i.item_id = w.item_id WHERE user_id= ?;`;
    return new Promise((resolve, reject) => {
      db.query(sql, user_id, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  static async findWishlistItemsId({ user_id }) {
    const sql = `SELECT item_id FROM wishlist WHERE user_id = ? ;`;
    return new Promise((resolve, reject) => {
      db.query(sql, user_id, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  // Check
  static async checkAlreadyWishlist({ user_id, item_id }) {
    const sql = `SELECT EXISTS ( SELECT 1 FROM wishlist WHERE user_id = ? and item_id = ? ) AS 'check';`;
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

  static async deleteAllWishlist({ user_id }) {
    const query = `DELETE FROM wishlist WHERE user_id = ?;`;
    return new Promise((resolve, reject) => {
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

export { Wishlist };
