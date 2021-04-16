import React from 'react';
import { useSelector } from 'react-redux';
import { InventoryItem } from '../types';

export const Cart = () => {
  const cart: InventoryItem[] = useSelector((state: any) => state.productsStore.cart);


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
};