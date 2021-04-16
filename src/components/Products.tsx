import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, addToCart } from '../actions';
import { InventoryItem, Product } from '../types';

export const Products = () => {
  const dispatch = useDispatch();
  const products: InventoryItem[] = useSelector((state: any) => state.productsStore.products);
  const noProducts = !products.length;

  useEffect(() => {
    dispatch(getProducts());
  }, [noProducts, dispatch]);

  const add = (p: Product) => dispatch(addToCart(p));

  return (
    <div>
      <h2>Products</h2>
      {products.map(p => (
        <div key={p.id}>
          <div>{p.title}</div>
          <div>{p.price}</div>
          <div>{`Qty: ${p.qty}`}</div>
          <button onClick={() => add(p)} disabled={p.qty === 0}>Add to cart</button>
        </div>
      ))}
    </div>
  );
};