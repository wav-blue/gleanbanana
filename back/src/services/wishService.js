import { NotFoundError } from "../../libraries/custom-error";
import { User } from "../db/DAO/User";
import { Wishlist } from "../db/DAO/Wishlist";
import db from "../db";

class wishService {
  static async getWishlist({ user_id }) {
    try {
      const user = await User.findUser({ user_id });
      if (user.length === 0) {
        throw new NotFoundError("해당하는 유저가 없습니다.");
      }

      const wishlists = await Wishlist.findWishlistByUser({ user_id });

      return wishlists;
    } catch (error) {
      return error;
    }
  }

  // 존재하지 않는 user id를 받았다
  // 존재하지 않는 item id를 받았다
  static async createWishlist({ user_id, item_id }) {
    try {
      const results = await Wishlist.createWishlist({ user_id, item_id });
      console.log(results);
      return results;
    } catch (error) {
      return error;
    }
  }

  // 특정 유저의 특정 아이템 삭제
  static async deleteWishlist({ user_id, item_id }) {
    try {
      const user = await User.findUser({ user_id });
      if (user.length === 0) {
        throw new NotFoundError("해당하는 유저가 없습니다.");
      }
      const results = await Wishlist.deleteWishlist({ user_id, item_id });
      if (results.affectedRows === 0) {
        throw new NotFoundError("해당하는 물품이 찜 목록에 없습니다.");
      }
      return results;
    } catch (error) {
      return error;
    }
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
