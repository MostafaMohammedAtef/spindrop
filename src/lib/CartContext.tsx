import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

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
  try {
    const storedItems: unknown = JSON.parse(localStorage.getItem(cartStorageKey) ?? '[]');
    if (!Array.isArray(storedItems)) return [];
    return storedItems.filter(
      (item): item is CartItem =>
        typeof item === 'object' &&
        item !== null &&
        'recordId' in item &&
        'quantity' in item &&
        typeof item.recordId === 'string' &&
        typeof item.quantity === 'number' &&
        item.quantity > 0,
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(readCart);

  useEffect(() => {
    localStorage.setItem(cartStorageKey, JSON.stringify(items));
  }, [items]);

  function addToCart(recordId: string) {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.recordId === recordId);
      if (existingItem) {
        return currentItems.map((item) =>
          item.recordId === recordId ? { ...item, quantity: item.quantity + 1 } : item,
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
