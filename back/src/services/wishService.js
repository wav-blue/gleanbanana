import db from "../db";
import { v4 as uuidv4 } from "uuid";

class wishService {
  static async getWishlist({ user_id }) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM wishlist WHERE user_id = ?;`;

      db.query(query, user_id, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

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
  // 특정 유저의 전체 아이템 삭제
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
  // 특정 유저의 특정 아이템 삭제
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
