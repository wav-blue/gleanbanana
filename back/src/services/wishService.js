import db from "../db";
import { v4 as uuidv4 } from "uuid";

class wishService {
  static async getUserWishlist({ user_id }) {
    //
    return new Promise((resolve, reject) => {
      const query = `SELECT wishlist_id FROM `;
      db.query(query, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  static async createWishItem({ user_id, item_id }) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO wishlist_item VALUES (null, (SELECT wishlist_id FROM wishlist WHERE user_id = ?), ?);
      `;
      db.query(query, [user_id, item_id], function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
  // 회원가입 시 위시리스트 생성
  // 또는 위시리스트가 없다면?
  static async createWishlist({ user_id }) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO wishlist_item VALUES (?, ?)`;
      const wishlist_id = uuidv4();
      db.query(
        query,
        [wishlist_id, user_id],
        function (error, results, fields) {
          if (error) {
            reject(error);
          } else {
            console.log(wishlist_id, user_id);
            resolve(results);
          }
        }
      );
    });
  }

  static async getWishlist() {
    return new Promise((resolve, reject) => {
      const query = ``;

      db.query(query, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
  static async deleteWish() {}
  static async deleteAllWish() {}
}
export { wishService };
