import db from "..";

class User {
  // Create
  static async createUser({ newUser }) {
    const sql = `INSERT INTO user SET ?; `;

    return new Promise((resolve, reject) => {
      db.query(sql, newUser, function (error, results) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
  // Read
  // return => 조회한 user 정보 전체
  static async findUser({ user_id }) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT user_id, createdAt, email, username, address, phone_number FROM user WHERE user_id = ? ;`;
      db.query(sql, user_id, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  // Email로 User 정보 확인 => user_id/email/password
  static async findUserByEmail({ email }) {
    const query = `SELECT user_id, email, password FROM user WHERE email = ?`;
    return new Promise((resolve, reject) => {
      db.query(query, email, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  //
  static async findUserOrderInfo({ last_month, user_id }) {
    const query = `SELECT COUNT(order_id) AS count_one_month FROM orders WHERE order_date_createdAt > ? && user_id = ? ;`;
    return new Promise((resolve, reject) => {
      db.query(query, [last_month, user_id], function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  // 이미 가입된 이메일인지 확인
  static async checkEmail({ email }) {
    const query = "SELECT COUNT(email) FROM user WHERE email = ? ;";
    return new Promise((resolve, reject) => {
      db.query(query, email, function (error, results, fields) {
        if (error) {
          reject();
        } else {
          resolve(results);
        }
      });
    });
  }

  // 탈퇴한 유저인지 확인
  static async checkDeletedAt({ user_id }) {
    const query = `SELECT deletedAt FROM user WHERE user_id = ? ;`;
    return new Promise((resolve, reject) => {
      db.query(query, user_id, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
  static async updateUserInfo({ user_id, newData }) {
    var query = `UPDATE user SET ? WHERE user_id = ?;`;
    return new Promise((resolve, reject) => {
      db.query(query, [newData, user_id], function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
  static async updateDeletedAt({ user_id }) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE user SET deletedAt = ? WHERE user_id = ? ;`;
      const today = new Date();
      db.query(query, [today, user_id], function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
  static async getUseDatas(order_id) {
    return new Promise((resolve, reject) => {
      const query = `SELECT SUM((t2.banana_index)*t1.quantity) AS sum_banana_idx,SUM(t1.quantity) AS sum_quantity FROM order_item t1 LEFT JOIN item t2 ON t1.item_id = t2.item_id WHERE t1.order_id = ? ;`;
      db.query(query, order_id, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  }
  static async getOrderIds({ user_id, max_count }) {
    return new Promise((resolve, reject) => {
      console.log("userId: ", user_id);
      const query = `SELECT orders.order_id, orders.order_date_createdAt FROM orders WHERE user_id = ? ORDER BY orders.order_date_createdAt LIMIT ${max_count};`;
      db.query(query, user_id, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          console.log("results : ", results);
          resolve(results);
        }
      });
    });
  }
}
export { User };
