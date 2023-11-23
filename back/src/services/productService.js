var db = require("../db/db.js");
console.log("productService 111111111111111");
class productService {
  static async getProducts() {
    // 시험용으로 user 테이블 조회하게 했습니다!
    db.query("SELECT * FROM user", function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        console.log("productService 333333333333333333");
        console.log("productService results값 확인 == ", results);
        return results;
      } else {
        return `<script type="text/javascript">alert("상품이 없습니다."); 
        document.location.href="/auth/login";</script>`;
      }
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
