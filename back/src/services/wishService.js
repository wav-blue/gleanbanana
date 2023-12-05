import { NotFoundError } from "../../libraries/custom-error";
import { User } from "../db/DAO/User";
import { Wishlist } from "../db/DAO/Wishlist";
import db from "../db";

class wishService {
  static async getWishlist({ user_id }) {
    const wishlists = await Wishlist.findWishlistWithItems({ user_id });
    return wishlists;
  }

  static async getWishlistId({ user_id }) {
    const wishlists = await Wishlist.findWishlistByUser({ user_id });
    return wishlists;
  }

  // 존재하지 않는 item id를 받았다
  static async createWishlist({ user_id, item_id }) {
    const results = await Wishlist.createWishlist({ user_id, item_id });
    return results;
  }

  // 특정 유저의 특정 아이템 삭제
  static async deleteWishlist({ user_id, item_id }) {
    try {
      const results = await Wishlist.deleteWishlist({ user_id, item_id });
      if (results.affectedRows === 0) {
        return {
          errorType: "NotFoundError",
          errorMessage: "해당하는 물품이 찜 목록에 없습니다.",
        };
      }
      return results;
    } catch (error) {
      return error;
    }
  }

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
