import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // ADD ITEM
  const addToCart = (product) => {
    setCartItems((prev) => {
      const exist = prev.find((item) => item.id === product.id);

      if (exist) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, qty: 1 }];
      }
    });
  };

  // REMOVE ITEM
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

 // UPDATE QTY
const updateQty = (id, qty) => {

  if (qty <= 0) {
    removeFromCart(id);
    return;
  }

  setCartItems((prev) =>
    prev.map((item) =>
      item.id === id ? { ...item, qty } : item
    )
  );
};

  // TOTAL COUNT
  const cartCount = cartItems.reduce((a, b) => a + b.qty, 0);
  const cartTotal = cartItems.reduce(
  (total, item) => total + item.price * item.qty,
  0
);

  return (
    <CartContext.Provider
  value={{
    cartItems,
    addToCart,
    removeFromCart,
    updateQty,
    cartCount,
    cartTotal
  }}
>
    {children}
</CartContext.Provider>
  );
};
