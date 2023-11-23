var db = require("../db/db.js");
console.log("productService 111111111111111");
class productService {
  static async getProducts() {
    return new Promise((resolve, reject) => {
      // 시험용으로 user 테이블 조회하게 했습니다!
      db.query("SELECT * FROM user", function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          if (results.length > 0) {
            console.log("productService 333333333333333333");
            console.log("productService results값 확인 == ", results);
            resolve(results);
          } else {
            reject(new Error("상품이 없습니다."));
          }
        }
      });
    });
  }
  //   static async getProducts() {
  //     db.query("SELECT * FROM product", function (error, results, fields) {
  //       if (error) throw error;
  //       if (results.length > 0) {
  //         return results;
  //       } else {
  //         response.send(`<script type="text/javascript">alert("상품이 없습니다.");
  //             document.location.href="/auth/login";</script>`);
  //       }
  //     });
  //   }
}
export { productService };
