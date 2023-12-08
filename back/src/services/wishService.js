import { ConflictError, NotFoundError } from "../../libraries/custom-error";
import { Wishlist } from "../db/DAO/Wishlist";
import { Item } from "../db/DAO/Item";

class wishService {
  // 유저가 찜한 목록을 상세 정보를 포함하여 조회
  static async getWishlist({ user_id }) {
    const wishlists = await Wishlist.findWishlistItemInfo({ user_id });
    return wishlists;
  }

  // 유저가 찜한 목록을 item id로 조회
  static async getWishlistId({ user_id }) {
    const wishlists = await Wishlist.findWishlistItemsId({ user_id });

    // 배열 형태로 변환
    const wish_id_list = [];
    for (let i = 0; i < wishlists?.length; i++) {
      wish_id_list.push(wishlists[i].item_id);
    }
    return wish_id_list;
  }

  // 새로운 찜하기 아이템 생성
  static async createWishlist({ user_id, item_id }) {
    // 상품이 존재하지 않음
    const check_item = await Item.checkItem({ item_id });
    if (!check_item[0].check) {
      throw new NotFoundError("존재하지 않는 상품입니다.");
    }
    // 이미 찜한 물품
    const check_wishlist = await Wishlist.checkAlreadyWishlist({
      user_id,
      item_id,
    });
    if (check_wishlist[0].check) {
      throw new ConflictError("이미 찜하기 된 상품입니다.");
    }

    const results = await Wishlist.createWishlist({ user_id, item_id });
    return results;
  }

  // 특정 유저의 특정 아이템 삭제
  static async deleteWishlist({ user_id, item_id }) {
    const check_wishlist = await Wishlist.checkAlreadyWishlist({
      user_id,
      item_id,
    });
    if (!check_wishlist[0].check) {
      throw new ConflictError("해당하는 물품이 찜 목록에 없습니다.");
    }
    const results = await Wishlist.deleteWishlist({ user_id, item_id });
    return results;
  }

  // 특정 유저의 전체 아이템 삭제
  static async deleteAllWishlist({ user_id }) {
    const results = await Wishlist.deleteAllWishlist({ user_id });
    return results;
  }
}
export { wishService };
