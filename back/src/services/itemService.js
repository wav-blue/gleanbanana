var db = require("../db/db.js");
const table_name = "item";

class itemService {
  // 전체 조회
  static async getItems() {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM ${table_name}`,
        function (error, results, fields) {
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
        }
      );
    });
  }
  // 개별 조회
  static async getItem({ itemId }) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM ${table_name} WHERE item_id = ${itemId};`,
        function (error, results, fields) {
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
        }
      );
    });
  }
  // 추가
  static async createItem() {
    return new Promise((resolve, reject) => {
      db.query(
        // 받아온 값을 VALUES에 넣는 작업 필요
        // (변수명 필요에 따라 자유롭게 변경해주셔도 됩니다)
        `INSERT INTO item VALUES ${values};`,
        function (error, results, fields) {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
  }
  // 수정
  static async updateItem({ update_vaule, item_id }) {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE ${table_name} SET item_name = ${update_vaule} WHERE item_id = ${item_id}};`,
        function (error, results, fields) {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
  }
  // 삭제
  static async deleteItem({ item_id }) {
    return new Promise((resolve, reject) => {
      db.query(
        `DELETE * FROM ${table_name} WHERE item_id = ${item_id}`,
        function (error, results, fields) {
          if (error) {
            reject(error);
          } else {
            if (results.length > 0) {
              console.log("deleteItem results값 확인 == ", results);
              resolve(results);
            } else {
              reject(new Error("상품이 없습니다."));
            }
          }
        }
      );
    });
  }
}
export { itemService };
