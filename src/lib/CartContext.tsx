import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { readJson, writeJson } from './storage';
import { useToast } from '../components/ToastProvider';
import { addCartItem, clampCartQuantity, removeCartItem, setCartItemQuantity, type CartItem } from './cart';

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  miniCartOpen: boolean;
  lastAddedId: string | null;
  addToCart: (recordId: string) => void;
  addManyToCart: (recordIds: string[]) => void;
  removeFromCart: (recordId: string) => void;
  restoreItem: (item: CartItem) => void;
  setQuantity: (recordId: string, quantity: number) => void;
  clearCart: () => void;
  closeMiniCart: () => void;
};

const cartStorageKey = 'spindrop.cart';
const CartContext = createContext<CartContextValue | null>(null);

function readCart(): CartItem[] {
  const storedItems = readJson<CartItem[]>(cartStorageKey, (value): value is CartItem[] =>
    Array.isArray(value) && value.length <= 100 && value.every(
      (item) =>
        typeof item === 'object' &&
        item !== null &&
        'recordId' in item &&
        'quantity' in item &&
        typeof item.recordId === 'string' && item.recordId.length <= 120 &&
        typeof item.quantity === 'number' &&
        Number.isFinite(item.quantity) && item.quantity >= 1,
    ), []);
  return [...new Map(storedItems.map((item) => [item.recordId, { ...item, quantity: clampCartQuantity(item.quantity) }])).values()];
}

export function CartProvider({ children }: { children: ReactNode }) {
  const toast = useToast();
  const [items, setItems] = useState<CartItem[]>(readCart);
  const [miniCartOpen, setMiniCartOpen] = useState(false);
  const [lastAddedId, setLastAddedId] = useState<string | null>(null);
  const closeMiniCart = useCallback(() => setMiniCartOpen(false), []);

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
    setLastAddedId(recordId);
    setMiniCartOpen(true);
    setItems((currentItems) => addCartItem(currentItems, recordId));
    toast('Record added to your cart.');
  }

  function addManyToCart(recordIds: string[]) {
    if (!recordIds.length) return;
    setLastAddedId(recordIds[recordIds.length - 1]);
    setMiniCartOpen(true);
    setItems((currentItems) => recordIds.reduce((nextItems, recordId) => addCartItem(nextItems, recordId), currentItems));
    toast(`${recordIds.length} ${recordIds.length === 1 ? 'record' : 'records'} added to your cart.`);
  }

  function removeFromCart(recordId: string) {
    const removed = items.find((item) => item.recordId === recordId);
    setItems((currentItems) => removeCartItem(currentItems, recordId));
    if (removed) toast('Record removed from your cart.', { label: 'Undo', run: () => restoreItem(removed) });
  }

  function restoreItem(item: CartItem) {
    setItems((currentItems) => {
      const existing = currentItems.find((entry) => entry.recordId === item.recordId);
      if (existing) return currentItems.map((entry) => entry.recordId === item.recordId ? { ...entry, quantity: clampCartQuantity(entry.quantity + item.quantity) } : entry);
      return [...currentItems, { ...item, quantity: clampCartQuantity(item.quantity) }];
    });
  }

  function setQuantity(recordId: string, quantity: number) {
    setItems((currentItems) => setCartItemQuantity(currentItems, recordId, quantity));
  }

  function clearCart() {
    setItems([]);
  }

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, itemCount, miniCartOpen, lastAddedId, addToCart, addManyToCart, removeFromCart, restoreItem, setQuantity, clearCart, closeMiniCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
