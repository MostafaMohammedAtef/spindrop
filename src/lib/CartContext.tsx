import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { readJson, writeJson } from './storage';

type CartItem = {
  recordId: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  addToCart: (recordId: string) => void;
  removeFromCart: (recordId: string) => void;
};

const cartStorageKey = 'spindrop.cart';
const CartContext = createContext<CartContextValue | null>(null);

function readCart(): CartItem[] {
  return readJson<CartItem[]>(cartStorageKey, (storedItems): storedItems is CartItem[] =>
    Array.isArray(storedItems) && storedItems.every(
      (item) =>
        typeof item === 'object' &&
        item !== null &&
        'recordId' in item &&
        'quantity' in item &&
        typeof item.recordId === 'string' &&
        typeof item.quantity === 'number' &&
        item.quantity >= 1,
    ), []);
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(readCart);

  useEffect(() => {
    writeJson(cartStorageKey, items.map((item) => ({ ...item, quantity: Math.min(10, item.quantity) })));
  }, [items]);

  useEffect(() => {
    function syncCart(event: StorageEvent) {
      if (event.key === cartStorageKey) setItems(readCart());
    }
    window.addEventListener('storage', syncCart);
    return () => window.removeEventListener('storage', syncCart);
  }, []);

  function addToCart(recordId: string) {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.recordId === recordId);
      if (existingItem) {
        return currentItems.map((item) =>
          item.recordId === recordId ? { ...item, quantity: Math.min(10, item.quantity + 1) } : item,
        );
      }
      return [...currentItems, { recordId, quantity: 1 }];
    });
  }

  function removeFromCart(recordId: string) {
    setItems((currentItems) => currentItems.filter((item) => item.recordId !== recordId));
  }

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, itemCount, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
