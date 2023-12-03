import db from "../db";
import { ulid } from "ulidx";
import mysql from "mysql2";
import moment from "moment";

const table_name = "orders";

class orderService {
  //주문내역 전체 조회
  static async getOrders({ userId }) {
    return new Promise((resolve, reject) => {
      //주문테이블 조회 쿼리
      //const query = `SELECT * FROM ${table_name} WHERE user_id = '${userId}'`;

      //order_item테이블 테스트쿼리
      //const query = `SELECT item_id,quantity FROM order_item WHERE order_id in (select order_id from orders where user_id = '${userId}')`;

      //주문테이블과 order_item테이블 조인 쿼리
      const query = `SELECT ${table_name}.*,order_item.item_id,order_item.quantity,date_add(now(), interval item.expected_delivery day) as expected_delivery
      FROM ${table_name} inner join order_item 
      on ${table_name}.order_id = order_item.order_id
      inner join item
      on order_item.item_id = item.item_id
      where ${table_name}.user_id = '${userId}'`;

      console.log("query(innerjoin) : ", query);

      db.query(query, function (error, results) {
        if (error) {
          reject(error);
        } else {
          if (results.length > 0) {
            console.log("getOrders results값 확인 == ", results);
            resolve(results);
          } else {
            reject(new Error("주문내역이 없습니다."));
          }
        }
      });

      //test query
      // var order_id_arr = [];
      // db.query(query, function (err, row) {
      //   if (err) {
      //     reject(err);
      //   } else {
      //     for (var i = 0; i < row.length; i++) {
      //       order_id_arr.push(row[i].order_id);
      //       console.log("order_id_arr.push() == ", order_id_arr[i]);
      //     }
      //
      //     for (var j = 0; j < order_id_arr.length; j++) {
      //       console.log("333333333333333333333333333333333333");
      //       console.log("order_id_arr[j] == ", order_id_arr[j]);
      //     }
      //     const testquery = `SELECT expected_delievery from item`;
      //     const query2 = `SELECT ${table_name}.*,order_item.item_id,order_item.quantity FROM ${table_name} inner join order_item on ${table_name}.order_id = order_item.order_id where ${table_name}.user_id = '${userId}'`;
      //     db.query(query2, function (error, results) {
      //       if (error) {
      //         reject(error);
      //       } else {
      //         if (results.length > 0) {
      //           resolve(results);
      //         } else {
      //           reject(new Error("주문내역이 없습니다."));
      //         }
      //       }
      //     });
      //   }
      // });
    });
  }
  // 주문내역 상세조회
  static async getOrderDetail(userId, order_id) {
    console.log("orderService.getOrderDetail(userId): ", userId);
    console.log("orderService.getOrderDetail(order_id): ", order_id);

    return new Promise((resolve, reject) => {
      const query = `SELECT ${table_name}.*,order_item.item_id,order_item.quantity,date_add(now(), interval item.expected_delivery day) as expected_delivery
      FROM ${table_name} inner join order_item 
      on ${table_name}.order_id = order_item.order_id
      inner join item
      on order_item.item_id = item.item_id
      where ${table_name}.user_id = '${userId}' and ${table_name}.order_id = '${order_id}'`;

      console.log("query(innerjoin) : ", query);

      db.query(query, function (error, results) {
        if (error) {
          reject(error);
        } else {
          if (results.length > 0) {
            console.log("getOrderDetail results값 확인 == ", results);
            resolve(results);
          } else {
            reject(new Error("주문내역이 없습니다."));
          }
        }
      });
    });
  }

  // 추가
  static async createOrder({ userId, pay_method, items }) {
    console.log(" userId  ", userId);
    console.log(" pay_method  ", pay_method);
    console.log(" items  ", items);

    var time = moment().format("YYYY-MM-DD HH:mm:ss");

    const order_id = ulid();
    console.log("order_id: ", order_id);

    // Orders 테이블에 삽입할 객체
    const insertOrders = {
      order_id,
      user_id: userId,
      order_date_createdAt: time,
      order_date_updatedAt: time,
      order_date_deletedAt: time,
      pay_method: pay_method,
      delivery_fee: null,
    };

    // 주문 내역을 추가하는 쿼리 (Orders 테이블용)
    const insertquery1 = "INSERT INTO orders SET ? ;";
    var query_result = mysql.format(insertquery1, insertOrders);

    // 주문 아이템들을 추가하는 쿼리 (order_item용)
    const insertquery2 = `INSERT INTO order_item SET ? ; `;

    // items: Order_item 테이블에 삽입할 객체들
    // 배열 내의 값 확인하는 코드
    for (let i = 0; i < items.length; i++) {
      // order_item에 "order_id" 추가
      items[i].order_id = order_id;

      // query_result에 해당 query가 추가
      query_result += mysql.format(insertquery2, items[i]);
    }

    console.log("실행되는 쿼리: ", query_result);

    return new Promise((resolve, reject) => {
      db.query(query_result, function (error, results) {
        if (error) {
          console.log("error : ", error);
          reject(error);
        } else {
          console.log("results : ", results);
          resolve(results);
        }
      });
    });
  }

  //삭제
  static async deleteOrder(order_id) {
    console.log("orderService.deleteOrder(order_id): ", order_id);
    return new Promise((resolve, reject) => {
      const deletequery1 = `DELETE FROM ${table_name} WHERE order_id = '${order_id}'`; // orders 데이터삭제
      const deletequery2 = `DELETE FROM order_item WHERE order_id = '${order_id}'`; // order_item 데이터삭제

      //var deletequery2 = "DELETE FROM order_item WHERE order_id = ? "; // 주문내역물품정보

      db.query(deletequery2, function (error, results) {
        if (error) {
          console.log("delete error deletequery2 : ", deletequery2);
          reject(error);
        } else {
          console.log("delete success deletequery2 : ", deletequery2);
          //resolve(results);
        }
      });

      db.query(deletequery1, function (error, results) {
        if (error) {
          console.log("delete error deletequery1 : ", deletequery1);

          reject(error);
        } else {
          console.log("delete success deletequery1 : ", deletequery1);

          resolve(results);
        }
      });
    });
  }
}
export { orderService };
