export interface Product {
  id: string;
  title: string;
  price: number;
}

export interface InventoryItem extends Product {
  qty: number;
}
