import { Item } from "../db/DAO/Item";
import db from "../db";

class itemService {
  // 전체 조회
  static async getItems({ contentSize, skipSize }) {
      return await Item.getItems({ contentSize, skipSize });
  }
  // 자동완성
  static async autocomplete({ search }) {
      return await Item.autocomplete({ search });
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
  static async getItemsByCategory({ category, contentSize, skipSize }) {
    const items = await Item.readItemsByCategory({
      category,
      contentSize,
      skipSize,
    });
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
    const graph_data = { x: [], y: [] };
    for (let i = 0; i < 3; i++) {
      graph_data["x"].push(items[0][i].item_name);
      graph_data["y"].push(items[0][i].banana_index);
    }
    graph_data["x"].push("바나나");
    graph_data["y"].push(100);
    for (let i = 0; i < 3; i++) {
      graph_data["x"].push(items[1][i].item_name);
      graph_data["y"].push(items[1][i].banana_index);
    }
    return graph_data;
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
