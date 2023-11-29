import db from "../db";
const table_name = "item";

class itemService {
  // 전체 조회
  static async getItems() {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM ${table_name}`;
      db.query(query, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          if (results.length > 0) {
            console.log("getItems results값 확인 == ", results);
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
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM ${table_name} WHERE item_id = ${itemId}`;
      db.query(query, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          if (results.length > 0) {
            console.log("getItem results값 확인 == ", results);
            resolve(results);
          } else {
            reject(new Error("상품이 없습니다."));
          }
        }
      });
    });
  }
  // 추가
  static async createItem({
    item_id,
    item_name,
    category,
    price,
    description,
    banana_index,
    image_url,
  }) {
    var query = `INSERT INTO ${table_name} (item_id,item_name,category,price,description,banana_index,image_url) VALUES (${item_id}, '${item_name}','${category}',${price},'${description}',${banana_index},'${image_url}')`;
    return new Promise((resolve, reject) => {
      db.query(query, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
  // 수정
  static async updateItem(
    item_id,
    { item_name, category, price, description, banana_index, image_url }
  ) {
    return new Promise((resolve, reject) => {
      const itemObj = {
        item_name,
        category,
        price,
        description,
        banana_index,
        image_url,
      };
      const query = `UPDATE ${table_name} SET ? WHERE item_id = ?;`;
      db.query(query, [itemObj, item_id], function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
  // 삭제
  static async deleteItem({ item_id }) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM ${table_name} WHERE item_id = ?`;
      db.query(query, [item_id], function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  // 카테고리별 상품 조회
  static async getItemsByCategory({ category }) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM ${table_name} WHERE category = '${category}'`;

      db.query(query, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          if (results.length > 0) {
            resolve(results);
          } else {
            reject(new Error("해당 카테고리에 상품이 없습니다."));
          }
        }
      });
    });
  }

  // 검색 조회
  static async searchItems({ search }) {
    return new Promise((resolve, reject) => {
      // 검색어를 이용한 SQL 쿼리 작성
      const query = `SELECT * FROM ${table_name} WHERE item_name LIKE '%${search}%'`;

      db.query(query, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          if (results.length > 0) {
            console.log("searchItems 결과:", results);
            resolve(results);
          } else {
            reject(new Error("검색 결과가 없습니다."));
          }
        }
      });
    });
  }
}
export { itemService };
