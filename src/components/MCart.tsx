import React from 'react';
import { InventoryItem } from '../types';
import { observer } from "mobx-react"
import { ProductsStore } from '../mobx/products';

export const Cart = observer(({ productsStore }: { productsStore: ProductsStore }) => {
  const cart: InventoryItem[] = productsStore.cart;

  const total = cart.reduce((t, p) => t + p.qty * p.price, 0);

  return (
    <div>
      <h2>Cart</h2>
      {cart.map(p => (
        <div key={p.id}>
          <div>{p.title}</div>
          <div>{p.price}</div>
          <div>{`Qty: ${p.qty}`}</div>
        </div>
      ))}
      <div>{`Total: ${total}`}</div>
    </div>
  );
});