import { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [subscriptionDiscount] = useState(0.10); // 10% off for subscriptions

  const addItem = useCallback((product, isSubscription = false) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.isSubscription === isSubscription);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.isSubscription === isSubscription
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { 
        ...product, 
        quantity: 1, 
        isSubscription,
        subscriptionPrice: Math.round(product.price * (1 - subscriptionDiscount))
      }];
    });
  }, [subscriptionDiscount]);

  const removeItem = useCallback((id, isSubscription) => {
    setItems((prev) => prev.filter((item) => !(item.id === id && item.isSubscription === isSubscription)));
  }, []);

  const updateQuantity = useCallback((id, isSubscription, quantity) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => !(item.id === id && item.isSubscription === isSubscription)));
    } else {
      setItems((prev) =>
        prev.map((item) => 
          item.id === id && item.isSubscription === isSubscription
            ? { ...item, quantity }
            : item
        )
      );
    }
  }, []);

  const toggleSubscription = useCallback((id, isSubscription) => {
    setItems((prev) => {
      const item = prev.find(i => i.id === id && i.isSubscription === isSubscription);
      if (!item) return prev;
      
      // Remove from current state
      const filtered = prev.filter(i => !(i.id === id && i.isSubscription === isSubscription));
      
      // Add with opposite subscription state
      const newItem = {
        ...item,
        isSubscription: !isSubscription,
        subscriptionPrice: Math.round(item.price * (1 - subscriptionDiscount))
      };
      
      return [...filtered, newItem];
    });
  }, [subscriptionDiscount]);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => {
    const price = item.isSubscription ? item.subscriptionPrice : item.price;
    return sum + price * item.quantity;
  }, 0);
  
  const subscriptionSavings = items.reduce((sum, item) => {
    if (item.isSubscription) {
      return sum + (item.price - item.subscriptionPrice) * item.quantity;
    }
    return sum;
  }, 0);

  const hasSubscription = items.some(item => item.isSubscription);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        setIsOpen,
        addItem,
        removeItem,
        updateQuantity,
        toggleSubscription,
        clearCart,
        totalItems,
        totalPrice,
        subscriptionSavings,
        hasSubscription,
        subscriptionDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
