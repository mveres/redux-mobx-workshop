import { Product, InventoryItem } from "../types";
import { ActionType } from "../action-types";

const products: InventoryItem[] = [
  { id: "1", title: "iPad 4 Mini", price: 500.01, qty: 2 },
  { id: "2", title: "Converse All Star", price: 69.99, qty: 10 },
  { id: "3", title: "Michael Jackson CD", price: 19.99, qty: 5 },
];

export const getProducts = (): { type: ActionType } => ({
  type: "GET_PRODUCTS",
  products,
});

export const addToCart = (product: Partial<Product>): { type: ActionType } => ({
  type: "ADD_TO_CART",
  product,
});
