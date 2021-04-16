import { ActionType } from "../action-types";
import { InventoryItem } from "../types";

export const productsStore = (
  state: { products: InventoryItem[]; cart: InventoryItem[] } = {
    products: [],
    cart: [],
  },
  action: { type: ActionType }
) => {
  switch (action.type) {
    case "GET_PRODUCTS": {
      return { ...state, products: action.products };
    }
    case "ADD_TO_CART": {
      const product = action.product;
      const newProducts = state.products.map((p) =>
        p.id === product.id ? { ...p, qty: p.qty - 1 } : p
      );

      const prevCartProduct = state.cart.find((p) => p.id === product.id) || {
        ...product,
        qty: 0,
      };

      const newCart = [
        ...state.cart.filter((p) => p.id !== product.id),
        { ...prevCartProduct, qty: prevCartProduct.qty + 1 },
      ];

      return { ...state, products: newProducts, cart: newCart };
    }

    default:
      return state;
  }
};
