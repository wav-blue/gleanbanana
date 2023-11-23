var db = require("../db/db.js");
console.log("productService 111111111111111");
class productService {
  static async getProducts() {
    console.log("productService 222222222222222");
    db.query("SELECT * FROM product", function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        console.log("productService 333333333333333333");
        console.log("productService results값 확인 == ", results);
        return results;
        // db에서의 반환값이 있으면 상품 정보 전달 실시
        response.send(results);
        response.redirect(`/`);
      } else {
        response.send(`<script type="text/javascript">alert("상품이 없습니다."); 
            document.location.href="/auth/login";</script>`);
      }
    });
  }
}
export { productService };
