var db = require("../db/db.js");
const table_name = "item";
console.log("itemService.js start");
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
  static async createItem({
    item_id,
    item_name,
    category,
    price,
    description,
    banana_index,
    image_url,
  }) {
    console.log("itemService.createItem 메서드 진입");
    var sql = `INSERT INTO item (item_id,item_name,category,price,description,banana_index,image_url) VALUES (${item_id}, '${item_name}','${category}',${price},'${description}',${banana_index},'${image_url}')`;
    return new Promise((resolve, reject) => {
      db.query(
        // 받아온 값을 VALUES에 넣는 작업 필요
        // (변수명 필요에 따라 자유롭게 변경해주셔도 됩니다)
        //`INSERT INTO item VALUES ${values};`,
        sql,
        function (error, results, fields) {
          if (error) {
            console.log(
              "itemService.createItem : 데이터 입력 에러발생 sql : " + sql
            );
            console.log("itemService.createItem : 데이터 입력 에러발생");

            reject(error);
          } else {
            console.log("itemService.createItem : 1 record inserted");
            console.log("insert query sql : " + sql);
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

  // 카테고리별 상품 조회
  static async getItemsByCategory({ category }) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM ${table_name} WHERE category = '${category}'`,
        function (error, results, fields) {
          if (error) {
            reject(error);
          } else {
            if (results.length > 0) {
              console.log("getItemsByCategory results 값 확인 == ", results);
              resolve(results);
            } else {
              reject(new Error("해당 카테고리에 상품이 없습니다."));
            }
          }
        }
      );
    });
  }

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
