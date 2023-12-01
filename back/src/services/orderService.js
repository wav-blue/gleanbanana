import db from "../db/index_multi";
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
      //     console.log("1111111111111111111111111111111111111111");
      //   } else {
      //     for (var i = 0; i < row.length; i++) {
      //       console.log("222222222222222222222222222222222222222222222");
      //       console.log("row[0].order_id 확인 == ", row[i].order_id);
      //       order_id_arr.push(row[i].order_id);
      //       console.log("order_id_arr.push() == ", order_id_arr[i]);
      //     }
      //     console.log(
      //       "000000000000000000(order_id_arr.length) : ",
      //       order_id_arr.length
      //     );
      //     for (var j = 0; j < order_id_arr.length; j++) {
      //       console.log("333333333333333333333333333333333333");
      //       console.log("order_id_arr[j] == ", order_id_arr[j]);
      //     }
      //     const testquery = `SELECT expected_delievery from item`;
      //     console.log("testquery : ", testquery);
      //     const query2 = `SELECT ${table_name}.*,order_item.item_id,order_item.quantity FROM ${table_name} inner join order_item on ${table_name}.order_id = order_item.order_id where ${table_name}.user_id = '${userId}'`;
      //     console.log("query2 : ", query2);
      //     db.query(query2, function (error, results) {
      //       if (error) {
      //         reject(error);
      //       } else {
      //         if (results.length > 0) {
      //           console.log("getOrders results값 확인 == ", results);
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

    console.log(" items.length  ", items.length);
    // items: Order_item 테이블에 삽입할 객체들
    // 배열 내의 값 확인하는 코드
    for (let i = 0; i < items.length; i++) {
      // order_item에 "order_id" 추가
      // 추가 전: { item_id: '10', quantity: 90 }
      // 추가 후: { item_id: '10', quantity: 90, order_id: '01HGJA0YZE8EQSJPXMPQXHXY27' }
      items[i].order_id = order_id;

      console.log(" item >>  ", items[i]);
      console.log(
        " query_result에 해당 query가 추가됨 >> ",
        mysql.format(insertquery2, items[i])
      );

      query_result += mysql.format(insertquery2, items[i]);
    }

    console.log("query_result: ", query_result);
    // 최종적으로 query_result의 값(예시)
    // INSERT INTO orders SET `order_id` = '01HGJ8X37165G70ET34V5BWWRG', `user_id` = ':userId',
    // `order_date_createdAt` = '2023-12-01 17:46:11', `order_date_updatedAt` = '2023-12-01 17:46:11',
    // `order_date_deletedAt` = NULL, `pay_method` = 'bitcoin', `delivery_fee` = NULL ;
    // INSERT INTO order_item SET `id` = '10', `quantity` = 90 ;
    // INSERT INTO order_item SET `id` = '20', `quantity` = 80 ;
    // INSERT INTO order_item SET `id` = '30', `quantity` = 70 ;
    // INSERT INTO order_item SET `id` = '40', `quantity` = 60 ;

    // ----------------------------------
    // db.query(query_result,  <--- 여기서 query_result내의 쿼리들이 모두 실행됩니다!

    // ** 참고사항:  db 폴더의 index_multi.js 파일의 추가된 설정 확인!
    //              index_multi.js에서 connection의 multipleStatements: true, <- 이 설정이 없으면 오류가 나요

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
