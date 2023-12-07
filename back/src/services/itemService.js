import { Item } from "../db/DAO/Item";
import db from "../db";

class itemService {
  // 전체 조회
  static async getItems({ contentSize, skipSize }) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM item order by item_id desc LIMIT ${skipSize},${contentSize}`;
      db.query(query, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          if (results.length > 0) {
            resolve(results);
          } else {
            reject(new Error("상품이 없습니다."));
          }
        }
      });
    });
  }
  // 개별 조회
  static async getItem({ itemId }) {
    const item = await Item.readItemDetail({ itemId });
    return item;
  }
  // 추천 상품 조회
  static async getRandomItem() {
    const items = await Item.readItemsRandom();
    return items;
  }
  // 카테고리별 상품 조회
  static async getItemsByCategory({ category }) {
    const items = await Item.readItemsByCategory({ category });
    return items;
  }

  // 검색 조회
  static async searchItems({ search }) {
    const items = await Item.readItemsBySearch({ search });
    return items;
  }

  // 그래프를 위한 데이터 조회
  static async graphItems() {
    const items = await Item.readItemsforGraph();
    const y_data = items[0]["y"].split(",").map(Number);
    const x_data = Array.from(Array(y_data.length)).map((e, i) => i + 1);

    return { x: x_data, y: y_data };
  }
  // 추가
  static async createItem({
    item_id,
    item_name,
    price,
    description,
    banana_index,
    category_id,
    image_url,
  }) {
    const result = Item.createItem({
      item_id,
      item_name,
      price,
      description,
      banana_index,
      category_id,
      image_url,
    });
    return result;
  }
  // 수정
  static async updateItem(
    item_id,
    { item_name, price, description, banana_index, category_id, image_url }
  ) {
    const result = Item.updateItem(item_id, {
      item_name,
      price,
      description,
      banana_index,
      category_id,
      image_url,
    });
    return result;
  }
  // 삭제
  static async deleteItem({ item_id }) {
    const result = Item.deleteItem({ item_id });
    return result;
  }
}
export { itemService };
