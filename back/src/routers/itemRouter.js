import { Router } from "express";

import { itemService } from "../services/itemService";

const itemRouter = Router();

// 전체조회 + 카테고리 + 검색 조회
itemRouter.get("/items", async function (req, res, next) {
  const { category, search } = req.query;
  try {
    if (search) {
      // 검색어가 제공된 경우 검색 수행
      const items = await itemService.searchItems({ search });
      res.status(200).json(items);
    } else if (category) {
      const pageNum = Number(req.query.pageNum) || 1; // NOTE: 쿼리스트링으로 받을 페이지 번호 값, 기본값은 1
      const contentSize = Number(req.query.countPerPage) || 12; // NOTE: 페이지에서 보여줄 컨텐츠 수.
      const skipSize = (pageNum - 1) * contentSize; // NOTE: 다음 페이지 갈 때 건너뛸 리스트 개수.
      // 카테고리가 제공된 경우 카테고리별 조회
      const items = await itemService.getItemsByCategory({
        category,
        contentSize,
        skipSize,
      });
      res.status(200).json(items);
    } else {
      const pageNum = Number(req.query.pageNum) || 1; // NOTE: 쿼리스트링으로 받을 페이지 번호 값, 기본값은 1
      const contentSize = Number(req.query.countPerPage) || 12; // NOTE: 페이지에서 보여줄 컨텐츠 수.
      const skipSize = (pageNum - 1) * contentSize; // NOTE: 다음 페이지 갈 때 건너뛸 리스트 개수.
      // 검색어와 카테고리가 모두 제공되지 않은 경우 전체 상품 조회
      const items = await itemService.getItems({
        contentSize,
        skipSize,
      });
      res.status(200).json(items);
    }
  } catch (error) {
    next(error);
  }
});

// 검색 자동완성
itemRouter.get("/autocomplete", async function (req, res, next) {
  const { search } = req.query;
  try {
    const items = await itemService.autocomplete({ search });
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

// 추천 상품 조회
itemRouter.get("/recommend", async function (req, res, next) {
  try {
    const items = await itemService.getRandomItem();
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
});

// 그래프를 위한 조회
itemRouter.get("/graph", async function (req, res, next) {
  try {
    const items = await itemService.graphItems();
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
});

// 추가
itemRouter.post("/items", async function (req, res, next) {
  try {
    const {
      item_id,
      item_name,
      price,
      description,
      banana_index,
      category_id,
      image_url,
    } = req.body;

    // DB에 데이터 추가
    const newItems = await itemService.createItem({
      item_id,
      item_name,
      price,
      description,
      banana_index,
      category_id,
      image_url,
    });

    if (newItems.errorMessage) {
      throw new Error(newItems.errorMessage);
    }
    res.status(201).json(newItems);
  } catch (error) {
    next(error);
  }
});

// 삭제
itemRouter.delete("/items/:itemId", async function (req, res, next) {
  try {
    const { itemId } = req.params;
    await itemService.deleteItem({ item_id: itemId });
    res.status(204).json();
  } catch (error) {
    next(error);
  }
});

// 수정
itemRouter.post("/items/:itemId", async function (req, res, next) {
  try {
    const { itemId } = req.params;
    const { item_name, category, price, description, banana_index, image_url } =
      req.body;

    // DB에 데이터 수정
    const updatedItem = await itemService.updateItem(itemId, {
      item_name,
      category,
      price,
      description,
      banana_index,
      image_url,
    });

    if (updatedItem.errorMessage) {
      throw new Error(updatedItem.errorMessage);
    }
    res.status(200).json(updatedItem);
  } catch (err) {
    next(err);
  }
});

export { itemRouter };
