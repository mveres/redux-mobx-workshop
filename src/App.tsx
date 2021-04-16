import React from 'react';
import './App.css';
import { Products } from './components/Products';
import { Cart } from './components/Cart';


const App = () => {
  return (
    <div className="App">
      <h1>Shopping App</h1>
      <hr />
      <Products />
      <hr />
      <Cart />
    </div>
  );
}

export default App;
