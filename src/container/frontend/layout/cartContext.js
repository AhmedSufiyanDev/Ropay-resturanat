import React, { createContext, useState ,useContext,useEffect } from 'react';
import * as actions from "../../../store/actions";
import { connect } from "react-redux";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);


  const addItemToCart = (item) => {
    //   setCartItems([...cartItems, item]);
    const cartRoom = [...cartItems, item]
    setCartItems(cartRoom);
    localStorage.setItem('cart', JSON.stringify(cartRoom));
  };

  const removeItemFromCart = (index) => {
      const updatedCart = [...cartItems];
      updatedCart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setCartItems(updatedCart);
  };
  const clearCart = () => {
    setCartItems([]);
  };
  return (
      <CartContext.Provider value={{ 
        cartItems, 
        addItemToCart, 
        removeItemFromCart,
        clearCart,
         }}>
          {children}
      </CartContext.Provider>
  );
};

export default CartProvider;

export function useCart() {
  
    return useContext(CartContext);
}


