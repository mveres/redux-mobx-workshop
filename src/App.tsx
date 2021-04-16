import React from 'react';
import './App.css';
import { Products } from './components/MProducts';
import { Cart } from './components/MCart';
import { ProductsStore } from './mobx/products';

const productsStore = new ProductsStore();

const App = () => {
  return (
    <div className="App">
      <h1>Shopping App</h1>
      <hr />
      <Products productsStore={productsStore} />
      <hr />
      <Cart productsStore={productsStore} />
    </div>
  );
}

export default App;
