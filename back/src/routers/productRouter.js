import { Router } from "express";

import { productService } from "../services/productService";
const productRouter = Router();

// 조회
productRouter.get("/products", async function (req, res, next) {
  try {
    console.log("productRouter try 11111111111111");
    console.log("여기까지 왔나 11111111111111111");
    //const { userId } = req.params;
    const products = await productService.getProducts({
      //userId,
    });
    console.log("productRouter try 222222222222222222");
    console.log("productRouter products값 확인 == ", products);
    res.status(200).json(products);
    console.log("productRouter try 3333333333333333");
  } catch (error) {
    console.log("productRouter error 11111111111111");
    console.log("여기까지 왔나 에러 111111111111111");
    next(error);
  }
});

export { productRouter };
