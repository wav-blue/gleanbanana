import db from "..";
import { ulid } from "ulidx";
import mysql from "mysql2";
import moment from "moment";
import { NotFoundError } from "../../../libraries/custom-error";

class Order {
  //주문내역 전체 조회
  static async getOrders({ userId }) {
    return new Promise((resolve, reject) => {
      const query = `SELECT orders.order_id,date_format(orders.order_date_createdAt, '%Y-%m-%d') as order_date_createdAt,orders.pay_method,orders.delivery_fee
        ,item.item_name,item.price,item.image_url,item.banana_index,order_item.item_id,order_item.quantity
        ,date_format(date_add(now(), interval item.expected_delivery day), '%Y-%m-%d') as expected_delivery,item.expected_delivery as expected_delivery_days
        FROM orders inner join order_item 
        on orders.order_id = order_item.order_id
        inner join item
        on order_item.item_id = item.item_id
        where orders.user_id = ?
        order by orders.order_date_createdAt desc;`;

      db.query(query, userId, function (error, results) {
        if (error) {
          reject(error);
        } else {
          if (results.length > 0) {
            let item_array_length = 0;
            let temp_order_id = "ulid"; //동일 주문번호 비교를 위한 임시변수
            let max_delivery_days = 0;
            let final_results = []; //전체 조회에서 주문번호가 같은 중복된 row가 제거된 최종 결과 데이터 담는 변수
            let final_idx = 0;
            let temp_idx = 0;
            for (var i = 0; i < results.length; i++) {
              // 배송비 2500 고정값
              results[i]["delivery_fee"] = 2500;

              delete results[i]["item_id"];

              if (results[i].order_id != temp_order_id) {
                //주문번호가 다를때
                results[i].total_price = results[i].price * results[i].quantity;
                results[i].total_banana_index =
                  results[i].banana_index * results[i].quantity;

                final_results.push(results[i]);
                final_idx++;
                temp_idx = final_idx;
                temp_order_id = results[i].order_id;
                item_array_length = 1;
                results[i].item_array_length = item_array_length;
                max_delivery_days = results[i].expected_delivery_days;

                final_results[final_idx - 1].max_delivery_days =
                  max_delivery_days;
              } else {
                //주문번호가 같을때
                //총 가격 계산
                results[i].total_price = results[i].price * results[i].quantity;
                //총 바나나지수 계산
                results[i].total_banana_index =
                  results[i].banana_index * results[i].quantity;
                //총 누적가격 계산
                results[i].total_price =
                  results[i].total_price + results[i - 1].total_price;
                //총 누적 바나나지수 계산
                results[i].total_banana_index =
                  results[i].total_banana_index +
                  results[i - 1].total_banana_index;

                final_results[final_idx - 1].total_price =
                  results[i].total_price;
                final_results[final_idx - 1].total_banana_index =
                  results[i].total_banana_index;

                item_array_length++;
                results[i].item_array_length = item_array_length;
                final_results[final_idx - 1].item_array_length =
                  item_array_length;
                if (max_delivery_days < results[i].expected_delivery_days) {
                  //배달이 가장 오래 걸리는 항목 찾는 로직
                  max_delivery_days = results[i].expected_delivery_days;
                }
                //console.log("max_delivery_days: ", max_delivery_days);
                final_results[final_idx - 1].max_delivery_days =
                  max_delivery_days;
              }
            }

            for (let j = 0; j < final_results.length; j++) {
              let time = moment()
                .add(final_results[j].max_delivery_days, "days")
                .format("YYYY-MM-DD");
              final_results[j].expected_delivery_date = time;
              delete final_results[j]["max_delivery_days"];
              delete final_results[j]["expected_delivery_days"];
              final_results[j].expected_delivery =
                final_results[j].expected_delivery_date;
              delete final_results[j]["expected_delivery_date"];
              delete final_results[j]["quantity"];
              delete final_results[j]["price"];
              delete final_results[j]["banana_index"];
            }
            resolve(final_results);
          } else {
            reject(new Error(null));
          }
        }
      });
    });
  }

  // 주문내역 상세조회
  static async getOrderDetail(userId, order_id) {
    return new Promise((resolve, reject) => {
      // select order_id 없는 주문아이디면 바로 에러 반환시켜라????????
      // if => throw new NotFoundError

      const query = `SELECT orders.*,item.banana_index,item.item_name,item.price
      ,order_item.item_id,order_item.quantity
      ,date_format(date_add(now(), interval item.expected_delivery day), '%Y-%m-%d') as expected_delivery
        FROM orders inner join order_item 
        on orders.order_id = order_item.order_id
        inner join item
        on order_item.item_id = item.item_id
        where orders.user_id = ?
        and orders.order_id = ?`;

      console.log("query(innerjoin) : ", query);
      var params = [userId, order_id];
      db.query(query, params, function (error, results) {
        if (error) {
          reject(error);
        } else {
          if (results.length > 0) {
            let test_arr = [];
            //const test_result = { items: test_arr };
            //let test_result = [];
            let total_price = 0;
            for (var i = 0; i < results.length; i++) {
              const test_dic = {};
              total_price += results[i].price * results[i].quantity;

              test_dic["item_name"] = results[i].item_name;
              test_dic["item_id"] = results[i].item_id;
              test_dic["quantity"] = results[i].quantity;
              //console.log("test_dic : ", test_dic);
              test_dic["banana_index"] = results[i].banana_index;
              test_arr.push(test_dic);
            }
            results[0].delivery_fee = 2500;
            results[0].total_price = total_price;
            //console.log(" total_price값 확인 == ", total_price);
            console.log("results[0]값 확인 == ", results[0]);
            results[0]["items"] = test_arr;
            delete results[0]["order_id"];
            delete results[0]["user_id"];
            const isdeleted = delete results[0]["order_date_createdAt"];
            console.log("isdeleted : ", isdeleted);
            delete results[0]["order_date_updatedAt"];
            delete results[0]["order_date_deletedAt"];
            delete results[0]["item_id"];
            delete results[0]["item_name"];
            delete results[0]["quantity"];
            delete results[0]["banana_index"];
            delete results[0]["price"];
            const final_result = results[0];

            console.log("getOrderDetail final_result값 확인 == ", final_result);
            resolve(final_result);
          } else {
            reject(new Error(null));
          }
        }
      });
    });
  }

  // 추가
  static async createOrder({ userId, pay_method, items }) {
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
          resolve("새로운 주문 항목이 추가되었습니다.");
        }
      });
    });
  }

  //삭제
  static async deleteOrder(order_id) {
    return new Promise((resolve, reject) => {
      const deletequery1 = `DELETE FROM orders WHERE order_id = ?`; // orders 데이터삭제
      const deletequery2 = "DELETE FROM order_item WHERE order_id = ? "; // 주문내역물품정보

      db.query(deletequery2, order_id, function (error, results) {
        if (error) {
          console.log("delete error deletequery2 : ", deletequery2);
          reject(error);
        } else {
          console.log("delete success deletequery2 : ", deletequery2);
        }
      });

      db.query(deletequery1, order_id, function (error, results) {
        if (error) {
          console.log("delete error deletequery1 : ", deletequery1);

          reject(error);
        } else {
          console.log("delete success deletequery1 : ", deletequery1);
          resolve("해당 주문 내역이 삭제 되었습니다.");
        }
      });
    });
  }
}
export { Order };
