import db from "..";

class Item {
  // Read All Items
  static async readAllItems() {
    const query = `SELECT * FROM item;`;
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
  // Read All Items With Pagination
  static async readAllItemsByPage({ contentSize, skipSize }) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM item order by item_id DESC LIMIT ?, ?`;
      db.query(
        query,
        [skipSize, contentSize],
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

  // Read Item Detail
  static async readItemDetail({ itemId }) {
    const query = `SELECT * FROM item WHERE item_id = ${itemId}`;
    return new Promise((resolve, reject) => {
      db.query(query, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          if (results.length > 0) {
            resolve(results);
          } else {
            reject(new NotFoundError("상품이 없습니다."));
          }
        }
      });
    });
  }

  // Read Random Items 바나나 지수가 1 이하인 값중에서 랜덤으로 불러옴
  static async readItemsRandom() {
    const sql = `SELECT item_id, item_name, price, banana_index, image_url FROM item WHERE banana_index <= 100 ORDER BY RAND() LIMIT 4; `;
    return new Promise((resolve, reject) => {
      db.query(sql, function (error, results) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  // Read By Category
  static async readItemsByCategory({ category }) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM item WHERE category_id = (SELECT category_id FROM category WHERE category_name = ?);`;

      db.query(sql, category, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  // Read By Search
  static async readItemsBySearch({ search }) {
    const sql = `SELECT * FROM item WHERE item_name LIKE '%${search}%'`;
    return new Promise((resolve, reject) => {
      // 검색어를 이용한 SQL 쿼리 작성
      db.query(sql, search, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  // Read For Graph : banana_index
  static async readItemsforGraph() {
    const sql = `SELECT GROUP_CONCAT(banana_index) AS 'y' FROM item;`;

    return new Promise((resolve, reject) => {
      db.query(sql, function (error, results) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  // Check Item Id : 해당 번호의 상품이 존재하는지 확인
  static async checkItem({ item_id }) {
    const sql = `SELECT EXISTS ( SELECT 1 FROM item WHERE item_id = ? ) AS 'check';`;
    return new Promise((resolve, reject) => {
      db.query(sql, item_id, function (error, results) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
  // Create
  static async createItem({
    item_id,
    item_name,
    price,
    description,
    banana_index,
    category_id,
    image_url,
  }) {
    const newItem = {
      item_id,
      item_name,
      price,
      description,
      banana_index,
      category_id,
      image_url,
    };
    const sql = `INSERT INTO item SET ? `;
    return new Promise((resolve, reject) => {
      db.query(sql, newItem, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  // Update
  static async updateItem(
    item_id,
    { item_name, price, description, banana_index, category_id, image_url }
  ) {
    return new Promise((resolve, reject) => {
      const itemObj = {
        item_name,
        price,
        description,
        banana_index,
        category_id,
        image_url,
      };
      const query = `UPDATE item SET ? WHERE item_id = ?;`;
      db.query(query, [itemObj, item_id], function (error, results, fields) {
        if (error) {
          reject("수정 요청을 실패했습니다.");
        } else {
          resolve(results);
        }
      });
    });
  }

  // Delete Item
  static async deleteItem({ item_id }) {
    const sql = `DELETE FROM item WHERE item_id = ?`;
    return new Promise((resolve, reject) => {
      db.query(sql, [item_id], function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
}

export { Item };
