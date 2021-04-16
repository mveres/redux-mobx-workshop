# Redux

Redux is a predictable state container for JavaScript apps.

# Typescript

TypeScript is an open-source language which builds on JavaScript, by adding static type definitions.


# Setup

```
npx create-react-app my-app
```

- typescript and redux can be added by template at creation

```
npx create-react-app my-app --template redux
npx create-react-app my-app --template typescript
npx create-react-app my-app --template redux-typescript
```

- can be added afterwards


```
yarn add react-redux
yarn add @types/react-redux
yarn add redux-thunk
yarn add @types/redux-thunk

```

# Redux Thunk 
With a plain basic Redux store, you can only do simple synchronous updates by dispatching an action. Middleware extends the store's abilities, and lets you write async logic that interacts with the store.
The components

## Let's go

`index.tsx`

```
import thunk from 'redux-thunk'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)


ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </Provider>,
  document.getElementById('root')
);
```

`reducers/index.ts`
```
import { combineReducers } from 'redux'

export default combineReducers({
  // reducers go here,
})
```

`actions/index.ts`

```
const products = [
  { "id": 1, "title": "iPad 4 Mini", "price": 500.01, "inventory": 2 },
  { "id": 2, "title": "Converse All Star", "price": 69.99, "inventory": 10 },
  { "id": 3, "title": "Michael Jackson CD", "price": 19.99, "inventory": 5 }
];

export const getProducts = () => ({
  type: 'GET_PRODUCTS',
  products
})
```

`src/reducers/products.ts`
```
export const productsReducer = (state = {}, action: Record<string, any>) => {
  switch (action.type) {
    case 'GET_PRODUCTS':
      return { ...state, products: action.products };

  default: return state;
}};
```

`src/reducers/index`

import { combineReducers } from 'redux';
import { productsStore } from './products';

export default combineReducers({
  productsStore,
})


`src/components/Products.tsx`


```
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../actions';


export const Products = () => {

  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.productsStore.products);

  useEffect(() => {
    setTimeout(() => dispatch(getProducts), 3000);
  });

  return (
    <div>
      {!products.length ? 'Loading...' : JSON.stringify(products, null, 2)}
    </div>
  )
};

```

------------------------------------------------
# Part 2: Redux Thunk and Mobx
------------------------------------------------


## Type fixes

 - use Interseciton Types for actions


## Thunk

### Option 1
  
	use `npx create-react-app --template redux-typescript thunk`
	- it comes with redux thunk already installed via the redux js toolkit package
	- it has an example to elaborate on

### Option 2
 
```
npm install redux-thunk

import thunk from 'redux-thunk';

import rootReducer from './reducers/index';

const store = createStore(rootReducer, applyMiddleware(thunk));
```


Enhance action functions:

```
export const getProducts = () => async (
  dispatch: (action: Action) => void,
  getState: () => Record<string, any>
) => {
  dispatch({
    type: "GET_PRODUCTS",
    products,
  });
};

export const addToCart = (product: Partial<Product>) => async (
  dispatch: (action: Action) => void,
  getState: () => Record<string, any>
) => {
  dispatch({
    type: "ADD_TO_CART",
    product,
  });
};
```

Retrieve products from server:

```
const loadProducts = async (): Promise<InventoryItem[]> => {
  // simulate server delay
  await new Promise((r) => setTimeout(r, 2000));

  return [
    { id: "1", title: "iPad 4 Mini", price: 500.01, qty: 2 },
    { id: "2", title: "Converse All Star", price: 69.99, qty: 10 },
    { id: "3", title: "Michael Jackson CD", price: 19.99, qty: 5 },
  ];
};

export const getProducts = () => async (dispatch: (action: Action) => void) => {
  dispatch({ type: "GETTING_PRODUCTS" });

  const products = await loadProducts();

  dispatch({ type: "GET_PRODUCTS", products });
};

```

### Using `getState()` 

```
export const addToCart = (product: Partial<Product>) => async (
   dispatch: (action: Action) => void,
   getState: () => Record<string, any>
 ) => {
  const { cart, products } = getState().productsStore;

  const newProducts = products.map((p: InventoryItem) =>
    p.id === product.id ? { ...p, qty: p.qty - 1 } : p
  );

  const prevCartProduct = cart.find(
    (p: InventoryItem) => p.id === product.id
  ) || { ...product, qty: 0 };

  const newCart = [
    ...cart.filter((p: InventoryItem) => p.id !== product.id),
    { ...prevCartProduct, qty: prevCartProduct.qty + 1 },
  ];

  dispatch({ type: "ADD_TO_CART", products: newProducts, cart: newCart });
};
```


## MOBX

"_Simple, scalable state management._"

https://mobx.js.org/assets/getting-started-assets/overview.png


```
yarn add mobx
yarn add mobx-react
```

### The Store

```
import { Product, InventoryItem } from "../types";
import { makeAutoObservable } from "mobx";

// Model the application state.
export class ProductsStore {
  products: InventoryItem[] = [];
  cart: InventoryItem[] = [];
  isLoadingProducts = false;

  constructor() {
    makeAutoObservable(this);
  }

  async getProducts() {
    this.isLoadingProducts = true;

    await new Promise((r) => setTimeout(r, 2000));

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
```


### Observer components

```
import { observer } from "mobx-react";
import { ProductsStore } from '../mobx/products';

export const Products = observer(({ productsStore }: { productsStore: ProductsStore }) => { ...

export const Cart = observer(({ productsStore }: { productsStore: ProductsStore }) => {...
```



