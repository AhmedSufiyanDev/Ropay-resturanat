import React, { Suspense } from "react";
import ReactDOM from 'react-dom';
import App from './App';
import './i18n.js';
import CartProvider from "./container/frontend/layout/cartContext.js";
ReactDOM.render(
  // <Suspense fallback={<div>Loading...</div>}> 
  <React.StrictMode>
    <CartProvider>
        <App />
    </CartProvider>
  </React.StrictMode>,
  // </Suspense>

  document.getElementById('root')
);
