import { Product, InventoryItem } from "../types";
import { Action } from "../action-types";

const loadProducts = async (): Promise<InventoryItem[]> => {
  await new Promise((r) => setTimeout(r, 1500));

  return [
    { id: "1", title: "iPad 4 Mini", price: 500.01, qty: 2 },
    { id: "2", title: "Converse All Star", price: 69.99, qty: 10 },
    { id: "3", title: "Michael Jackson CD", price: 19.99, qty: 5 },
  ];
};

export const getProducts = () => async (dispatch: (action: Action) => void) => {
  dispatch({ type: "GETTING_PRODUCTS" });

  const products = await loadProducts();

  dispatch({
    type: "GET_PRODUCTS",
    products,
  });
};

export const addToCart = (product: Partial<Product>) => (
  dispatch: (action: Action) => void,
  getState: () => Record<string, any>
) => {
  const { products, cart } = getState().productsStore;

  const newProducts = products.map((p: InventoryItem) =>
    p.id === product.id ? { ...p, qty: p.qty - 1 } : p
  );

  const prevCartProduct = cart.find(
    (p: InventoryItem) => p.id === product.id
  ) || {
    ...product,
    qty: 0,
  };

  const newCart = [
    ...cart.filter((p: InventoryItem) => p.id !== product.id),
    { ...prevCartProduct, qty: prevCartProduct.qty + 1 },
  ];

  dispatch({
    type: "ADD_TO_CART",
    newProducts,
    newCart,
  });
};
