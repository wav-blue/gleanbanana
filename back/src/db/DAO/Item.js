import db from "..";
import { ConflictError } from "../../../libraries/custom-error";

class Item {
  // Read
  // 바나나 지수가 1 이하인 값중에서 랜덤으로 불러옴
  static async readRandomItem() {
    const sql = `SELECT item_id, item_name, price, banana_index, image_url FROM item WHERE banana_index <= 100 ORDER BY RAND() LIMIT 4; `;

    return new Promise((resolve, reject) => {
      db.query(sql, function (error, results) {
        if (error) {
          reject(error);
        } else {
          console.log(results);
          resolve(results);
        }
      });
    });
  }
}

export { Item };
