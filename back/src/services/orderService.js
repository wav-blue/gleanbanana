import db from "../db";
const table_name = "orders";
const { uuid } = require("uuidv4");
class orderService {
  //주문내역 전체 조회
  static async getOrders({ userId }) {
    console.log("orderService getOrders userid = ", userId);
    return new Promise((resolve, reject) => {
      //주문테이블 조회 쿼리
      //const query = `SELECT * FROM ${table_name} WHERE user_id = '${userId}'`;
      //order_item테이블 테스트쿼리
      //const query = `SELECT item_id,quantity FROM order_item WHERE order_id in (select order_id from orders where user_id = '${userId}')`;
      //주문테이블과 order_item테이블 조인 쿼리
      const query = `SELECT ${table_name}.*,order_item.item_id,order_item.quantity FROM ${table_name} inner join order_item on ${table_name}.order_id = order_item.order_id where ${table_name}.user_id = '${userId}'`;
      console.log("query(innerjoin) : ", query);
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
      //       order_id_arr.push();
      //     }
      //   }
      // });
      // console.log(
      //   "000000000000000000(order_id_arr.length) : ",
      //   order_id_arr.length
      // );
      // for (var j = 0; j < order_id_arr.length; i++) {
      //   console.log("333333333333333333333333333333333333");
      //   console.log("order_id_arr[j] == ", order_id_arr[j]);
      // }
      // const testquery = `SELECT expected_delievery from item`;
      // console.log("testquery : ", testquery);
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
    });
  }

  // 추가
  static async createOrder({ userId, pay_method, id, quantity }) {
    var order_id = 4;
    var moment = require("moment");
    console.log("moment() : ", moment());
    //var time = moment().format("yyyy-mm-dd:hh:mm:ss");
    var time = moment().format("YYYY-MM-DD HH:mm:ss");
    //var time = moment().format("YYYY-MM-DD:hh:mm:ss");
    console.log("time : ", time);
    console.log("orderservice데이터추가 값확인(id) : ", id);
    console.log("orderservice데이터추가 값확인(quantity) : ", quantity);
    //console.log("orderservice데이터추가 값확인(index) : ", index);
    console.log("orderservice데이터추가 값확인(userId) : ", userId);
    console.log("orderservice데이터추가 값확인(CURRENT_TIMESTAMP) : ", time);
    console.log("orderservice데이터추가 값확인(paymentmethod) : ", pay_method);
    //console.log("orderservice데이터추가 값확인(deliveryDate) : ", deliveryDate);
    console.log("uuid()111111111 : " + uuid());
    var insertValArr1 = {
      order_id: uuid(),
      user_id: userId,
      order_date_createdAt: time,
      pay_method: pay_method,
    };
    console.log("uuid() 222222222222222 : " + uuid());
    console.log("insertValArr1.order_id : " + insertValArr1.order_id);
    var insertValArr2 = {
      order_id: insertValArr1.order_id,
      item_id: id,
      quantity: quantity,
    };
    var insertquery1 = "INSERT INTO orders SET ?"; // 주문내역
    var insertquery2 = "INSERT INTO order_item SET ? "; // 주문내역물품정보
    return new Promise((resolve, reject) => {
      db.query(insertquery1, insertValArr1, function (error, results) {
        if (error) {
          console.log("insert error insertquery1 : ", insertquery1);

          reject(error);
        } else {
          console.log("insert success insertquery1 : ", insertquery1);

          //resolve(results);
        }
      });
      db.query(insertquery2, insertValArr2, function (error, results) {
        if (error) {
          console.log("insert error insertquery2 : ", insertquery2);
          reject(error);
        } else {
          console.log("insert success insertquery2 : ", insertquery2);
          resolve(results);
        }
      });
    });
  }

  //수정

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
