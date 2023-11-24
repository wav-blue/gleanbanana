import { Router } from "express";

import { itemService } from "../services/itemService";
const itemRouter = Router();

// 조회
itemRouter.get("/items", async function (req, res, next) {
  try {
    const items = await itemService.getItems({});
    res.status(200).json(items);
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
