// Action Types
import { OrderType, Product, SelectedProducts } from "../../core/types";

export const SET_SELECTED_PRODUCTS = "SET_SELECTED_PRODUCTS";
export const SET_SELECTED_PRODUCT_IDS = "SET_SELECTED_PRODUCT_IDS";
export const SET_SELECTED_CATEGORY = "SET_SELECTED_CATEGORY";
export const SET_ORDER_TYPE = "SET_ORDER_TYPE";
export const SET_SELECTED_BASKET_ITEM = "SET_SELECTED_BASKET_ITEM";

// Action Creators
export const setSelectedProducts = (products: Product[]) => ({
  type: SET_SELECTED_PRODUCTS,
  payload: products,
});

export const setSelectedProductIds = (productIds: number[]) => ({
  type: SET_SELECTED_PRODUCT_IDS,
  payload: productIds,
});

export const setSelectedCategory = (category: string) => ({
  type: SET_SELECTED_CATEGORY,
  payload: category,
});

export const setOrderType = (orderType: OrderType) => ({
  type: SET_ORDER_TYPE,
  payload: orderType,
});

export const setSelectedBasketItem = (item: SelectedProducts | null) => ({
  type: SET_SELECTED_BASKET_ITEM,
  payload: item,
});
