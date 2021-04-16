import React, { useEffect } from 'react';
import { InventoryItem, Product } from '../types';
import { observer } from "mobx-react"
import { ProductsStore } from '../mobx/products';

export const Products = observer(({ productsStore }: { productsStore: ProductsStore }) => {
  const products: InventoryItem[] = productsStore.products;
  const isLoading: boolean = productsStore.isLoadingProducts;
  const noProducts = !products.length;

  useEffect(() => {
    productsStore.getProducts();
  }, [noProducts, productsStore]);

  const add = (p: Product) => productsStore.addToCart(p);

  return (
    <div>
      <h2>Products</h2>
      {isLoading
        ? <h3>Loading...</h3>
        : products.map(p => (
          <div key={p.id}>
            <div>{p.title}</div>
            <div>{p.price}</div>
            <div>{`Qty: ${p.qty}`}</div>
            <button onClick={() => add(p)} disabled={p.qty === 0}>Add to cart</button>
          </div>
        ))}
    </div>
  );
});