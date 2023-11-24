import { Router } from "express";

import { itemService } from "../services/itemService";
const itemRouter = Router();

// 조회 + 카테고리 + 검색 조회
itemRouter.get("/items", async function (req, res, next) {
  const { category, search } = req.query;
  try {
    if (search) {
      // 검색어가 제공된 경우 검색 수행
      const items = await itemService.searchItems({ search });
      res.status(200).json(items);
    } else if (category) {
      // 카테고리가 제공된 경우 카테고리별 조회
      const items = await itemService.getItemsByCategory({ category });
      res.status(200).json(items);
    } else {
      // 검색어와 카테고리가 모두 제공되지 않은 경우 전체 상품 조회
      const items = await itemService.getItems({});
      res.status(200).json(items);
    }
  } catch (error) {
    next(error);
  }
});

// 개별 조회
itemRouter.get("/items/:itemId", async function (req, res, next) {
  const { itemId } = req.params;
  try {
    const items = await itemService.getItem({
      itemId,
    });
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
});

// 추가
itemRouter.post("/items", async function (req, res, next) {
  try {
    const items = await itemService.createItem({});
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
});

// 삭제
itemRouter.delete("/items/:item_id", async function (req, res, next) {
  try {
    const items = await itemService.deleteItem({});
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
});

// 수정
itemRouter.post("/items/:item_id", async function (req, res, next) {
  try {
    const { item_id } = req.params;
    const { update_vaule } = req.body;
    console.log(update_vaule);
    const item = await itemService.updateItem({ update_vaule, item_id });
    res.status(200).json(item);
  } catch (err) {
    next(err);
  }
});

export { itemRouter };
