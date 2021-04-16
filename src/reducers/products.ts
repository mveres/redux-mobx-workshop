import { Action } from "../action-types";
import { InventoryItem } from "../types";

export const productsStore = (
  state: {
    products: InventoryItem[];
    cart: InventoryItem[];
    isLoadingProducts: boolean;
  } = {
    products: [],
    cart: [],
    isLoadingProducts: false,
  },
  action: Action
) => {
  switch (action.type) {
    case "GETTING_PRODUCTS": {
      return { ...state, isLoadingProducts: true };
    }
    case "GET_PRODUCTS": {
      return { ...state, products: action.products, isLoadingProducts: false };
    }
    case "ADD_TO_CART": {
      const { newCart, newProducts } = action;
      return { ...state, products: newProducts, cart: newCart };
    }

    default:
      return state;
  }
};
