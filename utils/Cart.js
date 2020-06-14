export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.productId === cartItemToAdd.productId
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.productId === cartItemToAdd.productId
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.productId === cartItemToRemove.productId
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter(
      (cartItem) => cartItem.productId !== cartItemToRemove.productId
    );
  }

  return cartItems.map((cartItem) =>
    cartItem.productId === cartItemToRemove.productId
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export const getCartItemsCount = (cartItems) => {
  return cartItems.reduce(
    (accumalatedQuantity, cartItem) => accumalatedQuantity + cartItem.quantity,
    0
  );
};

export const getCartTotal = (cartItems) => {
  return cartItems.reduce(
    (accumalatedQuantity, cartItem) =>
      accumalatedQuantity + cartItem.quantity * cartItem.price,
    0
  );
};
