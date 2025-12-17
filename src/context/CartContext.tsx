import { createContext, useContext, useState, ReactNode } from 'react';
import { Coffee } from '../lib/supabase';

export interface CartItem {
  coffee: Coffee;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (coffee: Coffee) => void;
  removeFromCart: (coffeeId: string) => void;
  updateQuantity: (coffeeId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (coffee: Coffee) => {
    setItems(prev => {
      const existing = prev.find(item => item.coffee.id === coffee.id);
      if (existing) {
        return prev.map(item =>
          item.coffee.id === coffee.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { coffee, quantity: 1 }];
    });
  };

  const removeFromCart = (coffeeId: string) => {
    setItems(prev => prev.filter(item => item.coffee.id !== coffeeId));
  };

  const updateQuantity = (coffeeId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(coffeeId);
    } else {
      setItems(prev =>
        prev.map(item =>
          item.coffee.id === coffeeId
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (Number(item.coffee.price) * item.quantity), 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, getTotalPrice, getTotalItems }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
