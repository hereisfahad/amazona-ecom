import React, { createContext, useContext, useState, useEffect } from 'react';

import {
  addItemToCart,
  filterItemFromCart,
  getCartItemsCount,
  getCartTotal
} from './cart.utils';

export const CartContext = createContext({
  cartItems: [],
  addItem: () => { },
  clearItemFromCart: () => { },
  cartItemsCount: 0,
  cartTotal: 0
});

export const useCart = () => {
  return useContext(CartContext);
};

const CartProvider = ({ children }) => {
  let tempCartItems = []
  if (process.browser) {
    let items = localStorage.getItem('cartItems')
    tempCartItems = items ? JSON.parse(items) : [];
  }
  const [cartItems, setCartItems] = useState(tempCartItems);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const addItem = (item, quantity) => setCartItems(addItemToCart(cartItems, item, quantity));
  
  const clearItemFromCart = item =>
    setCartItems(filterItemFromCart(cartItems, item));

  useEffect(() => {
    setCartItemsCount(getCartItemsCount(cartItems));
    setCartTotal(getCartTotal(cartItems));
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        clearItemFromCart,
        cartItemsCount,
        cartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
