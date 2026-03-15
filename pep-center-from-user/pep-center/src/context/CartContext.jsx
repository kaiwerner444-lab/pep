import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

const CartContext = createContext();

// Get cart from localStorage
function getSavedCart() {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem('cartItems');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

// Get subscription tier from localStorage (guest users)
function getLocalSubscriptionTier() {
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
  if (tier === 0) return '5% off (Free shipping starts order 2)';
  if (tier === 1) return '5% off + Free shipping';
  return '10% off + Free shipping (Loyalty tier)';
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(getSavedCart);
  const [isOpen, setIsOpen] = useState(false);
  const [localTier, setLocalTier] = useState(0);
  const { user, profile, subscriptionTier: authTier } = useAuth();
  
  // Use auth tier if logged in, otherwise use localStorage
  const effectiveTier = user ? (authTier ?? 0) : localTier;
  
  // Load local tier on mount (for guests)
  useEffect(() => {
    setLocalTier(getLocalSubscriptionTier());
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(items));
  }, [items]);

  const subscriptionDiscount = getSubscriptionDiscount(effectiveTier);

  const addItem = useCallback((product, isSubscription = false) => {
    const discount = isSubscription ? getSubscriptionDiscount(effectiveTier) : 0;

    // Analytics tracking
    if (typeof window !== 'undefined' && window.pepTrack) {
      window.pepTrack.addToCart(product.slug || product.id, product.name || 'Unknown');
    }

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
  }, [effectiveTier]);

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
      
      const newIsSubscription = !isSubscription;
      const discount = newIsSubscription ? getSubscriptionDiscount(effectiveTier) : 0;
      
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
  }, [effectiveTier]);

  const clearCart = useCallback(() => {
    setItems([]);
    localStorage.removeItem('cartItems');
  }, []);

  // Increment subscription order count
  const incrementSubscriptionTier = useCallback(async () => {
    const nextTier = effectiveTier + 1;
    
    if (user) {
      // Update in database
      await supabase
        .from('profiles')
        .update({ subscription_tier: nextTier })
        .eq('id', user.id);
    } else {
      // Update localStorage
      localStorage.setItem('subscriptionOrders', nextTier.toString());
      setLocalTier(nextTier);
    }
    
    return nextTier;
  }, [user, effectiveTier]);

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
  const hasFreeShipping = effectiveTier >= 1 && hasSubscription;
  
  // Check if user is at loyalty tier (3+ orders)
  const isLoyaltyTier = effectiveTier >= 2;

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
        subscriptionTier: effectiveTier,
        subscriptionDiscount,
        subscriptionBenefits: getSubscriptionBenefits(effectiveTier),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
