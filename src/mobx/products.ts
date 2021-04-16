import { Product, InventoryItem } from "../types";
import { makeAutoObservable } from "mobx";

export class ProductsStore {
  products: InventoryItem[] = [];
  cart: InventoryItem[] = [];
  isLoadingProducts = false;

  constructor() {
    makeAutoObservable(this);
  }

  async getProducts() {
    this.isLoadingProducts = true;
    await new Promise((r) => setTimeout(r, 1500));

    this.isLoadingProducts = false;

    this.products = [
      { id: "1", title: "iPad 4 Mini", price: 500.01, qty: 2 },
      { id: "2", title: "Converse All Star", price: 69.99, qty: 10 },
      { id: "3", title: "Michael Jackson CD", price: 19.99, qty: 5 },
    ];
  }

  addToCart(product: Product) {
    const newProducts = this.products.map((p: InventoryItem) =>
      p.id === product.id ? { ...p, qty: p.qty - 1 } : p
    );

    const prevCartProduct = this.cart.find(
      (p: InventoryItem) => p.id === product.id
    ) || { ...product, qty: 0 };

    const newCart = [
      ...this.cart.filter((p: InventoryItem) => p.id !== product.id),
      { ...prevCartProduct, qty: prevCartProduct.qty + 1 },
    ];

    this.cart = newCart;
    this.products = newProducts;
  }
}
