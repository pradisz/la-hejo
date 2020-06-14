import React, { createContext, useContext, useState, useEffect } from "react";

import {
  addItemToCart,
  removeItemFromCart,
  getCartItemsCount,
  getCartTotal,
} from "../utils/Cart";

const CartContext = createContext({
  cartItems: [],
  addItem: () => {},
  removeItem: () => {},
  cartItemsCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const addItem = (item) => setCartItems(addItemToCart(cartItems, item));
  const removeItem = (item) =>
    setCartItems(removeItemFromCart(cartItems, item));

  useEffect(() => {
    setCartItemsCount(getCartItemsCount(cartItems));
    setCartTotal(getCartTotal(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        removeItem,
        cartItemsCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const {
    cartItems,
    addItem,
    removeItem,
    cartItemsCount,
    cartTotal,
  } = useContext(CartContext);

  return {
    cartItems,
    addItem,
    removeItem,
    cartItemsCount,
    cartTotal,
  };
};
