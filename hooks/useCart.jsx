import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import firebase from "../firebase";

import { useAuth } from "./useAuth";

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
  const { currentUser } = useAuth();
  const db = firebase.firestore();
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const addItem = (item) => setCartItems(addItemToCart(cartItems, item));
  const removeItem = (item) =>
    setCartItems(removeItemFromCart(cartItems, item));

  const prevCartItems = usePrevious(cartItems);

  useEffect(() => {
    if (currentUser) {
      const fetchData = () => {
        // Listen changes in product prices & stocks
        const unsubscribe = db.collection("products").onSnapshot(() => {
          db.collection("carts")
            .doc(currentUser.uid)
            .get()
            .then((doc) => {
              if (doc.exists) {
                const updatedCarts = doc.data();
                const productIds = Object.keys(updatedCarts.ducts);
                const userCartItems = [];
                productIds.forEach((productId) => {
                  db.collection("products")
                    .where("productId", "==", productId)
                    .get()
                    .then((querySnapshot) => {
                      const productItem = querySnapshot.docs.map(
                        (docSnapshot) => {
                          const { name, thumbnail, price } = docSnapshot.data();
                          return {
                            productId,
                            name,
                            thumbnail,
                            price,
                            quantity: updatedCarts.ducts[productId],
                          };
                        }
                      );
                      userCartItems.push(...productItem);
                      setCartItems(userCartItems);
                    });
                });
              }
            });
        });

        return () => unsubscribe;
      };

      // Start fetch data from db whenever cart items is null
      if (!cartItems.length) {
        Promise.all()
        fetchData();
      }

      // Update changes in user cart items to db
      if (prevCartItems !== cartItems) {
        let userCartItems = {};
        cartItems.forEach((item) => {
          const { productId, quantity } = item;
          userCartItems[productId] = quantity;
        });
        db.collection("carts")
          .doc(currentUser.uid)
          .set({
            ducts: userCartItems,
          })
          .then(() => {
            setCartItemsCount(getCartItemsCount(cartItems));
            setCartTotal(getCartTotal(cartItems));
          });
      }
    }

    // Clear cart items on user logout
    if (!currentUser && cartItems.length) {
      setCartItemsCount(0);
      setCartItems([]);
    }
  }, [cartItems, currentUser]);

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

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
