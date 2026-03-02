import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const CartContext = createContext();

// Get subscription tier from localStorage
function getSubscriptionTier() {
  if (typeof window === 'undefined') return 0;
  const completedOrders = parseInt(localStorage.getItem('subscriptionOrders') || '0');
  return completedOrders;
}

// Calculate discount based on subscription tier
function getSubscriptionDiscount(tier) {
  if (tier === 0) return 0.05; // First order: 5% off
  if (tier === 1) return 0.05; // Second order: 5% off + free shipping
  return 0.10; // Third order+: 10% off + free shipping
}

// Get subscription benefits text
function getSubscriptionBenefits(tier) {
  if (tier === 0) return '5% off (Free shipping starting order 2)';
  if (tier === 1) return '5% off + Free shipping';
  return '10% off + Free shipping (Loyalty tier)';
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [subscriptionTier, setSubscriptionTier] = useState(0);
  
  // Load subscription tier on mount
  useEffect(() => {
    setSubscriptionTier(getSubscriptionTier());
  }, []);

  const subscriptionDiscount = getSubscriptionDiscount(subscriptionTier);

  const addItem = useCallback((product, isSubscription = false) => {
    const tier = getSubscriptionTier();
    const discount = isSubscription ? getSubscriptionDiscount(tier) : 0;
    
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
        subscriptionPrice: Math.round(product.price * (1 - discount)),
        subscriptionDiscount: discount,
      }];
    });
  }, []);

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
      
      const tier = getSubscriptionTier();
      const newIsSubscription = !isSubscription;
      const discount = newIsSubscription ? getSubscriptionDiscount(tier) : 0;
      
      // Remove from current state
      const filtered = prev.filter(i => !(i.id === id && i.isSubscription === isSubscription));
      
      // Add with opposite subscription state
      const newItem = {
        ...item,
        isSubscription: newIsSubscription,
        subscriptionPrice: Math.round(item.price * (1 - discount)),
        subscriptionDiscount: discount,
      };
      
      return [...filtered, newItem];
    });
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  // Increment subscription order count (call this after successful subscription order)
  const incrementSubscriptionTier = useCallback(() => {
    const current = getSubscriptionTier();
    const next = current + 1;
    localStorage.setItem('subscriptionOrders', next.toString());
    setSubscriptionTier(next);
    return next;
  }, []);

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
  
  // Check if user qualifies for free shipping on subscriptions
  const hasFreeShipping = subscriptionTier >= 1 && hasSubscription;
  
  // Check if user is at loyalty tier (3+ orders)
  const isLoyaltyTier = subscriptionTier >= 2;

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
        incrementSubscriptionTier,
        totalItems,
        totalPrice,
        subscriptionSavings,
        hasSubscription,
        hasFreeShipping,
        isLoyaltyTier,
        subscriptionTier,
        subscriptionDiscount,
        subscriptionBenefits: getSubscriptionBenefits(subscriptionTier),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
