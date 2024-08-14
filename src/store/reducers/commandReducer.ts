import { combineReducers } from "redux";
import {
    SET_SELECTED_PRODUCTS,
    SET_SELECTED_PRODUCT_IDS,
    SET_SELECTED_CATEGORY,
    SET_ORDER_TYPE,
    SET_SELECTED_BASKET_ITEM,
} from "../actions";
import { OrderType, SelectedProducts } from "../../core/types";

const selectedProducts = (state: SelectedProducts[] = [], action: any) => {
    switch (action.type) {
        case SET_SELECTED_PRODUCTS:
            return action.payload;
        default:
            return state;
    }
};

const selectedProductIds = (state: number[] = [], action: any) => {
    switch (action.type) {
        case SET_SELECTED_PRODUCT_IDS:
            return action.payload;
        default:
            return state;
    }
};

const selectedCategory = (state: string = "SUSHI", action: any) => {
    switch (action.type) {
        case SET_SELECTED_CATEGORY:
            return action.payload;
        default:
            return state;
    }
};

const orderType = (state: OrderType | null = null, action: any) => {
    switch (action.type) {
        case SET_ORDER_TYPE:
            return action.payload;
        default:
            return state;
    }
};

const selectedBasketItem = (
    state: SelectedProducts | null = null,
    action: any
) => {
    switch (action.type) {
        case SET_SELECTED_BASKET_ITEM:
            return action.payload;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    selectedProducts,
    selectedProductIds,
    selectedCategory,
    orderType,
    selectedBasketItem,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;