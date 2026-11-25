import { useCallback, useEffect, useState } from 'react';
import { readJson, writeJson } from '../lib/storage';

const wishlistKey = 'spindrop.wishlist';
const isWishlist = (value: unknown): value is string[] => Array.isArray(value) && value.length <= 100 && value.every((id) => typeof id === 'string' && id.length > 0 && id.length <= 120);

export function useWishlist() {
  const [ids, setIds] = useState<string[]>(() => [...new Set(readJson(wishlistKey, isWishlist, []))]);
  useEffect(() => {
    function sync(event: StorageEvent) {
      if (event.key === wishlistKey) setIds([...new Set(readJson(wishlistKey, isWishlist, []))]);
    }
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);
  const toggle = useCallback((id: string) => {
    setIds((current) => {
      const safeId = id.slice(0, 120);
      const next = current.includes(safeId) ? current.filter((saved) => saved !== safeId) : [...current.slice(-99), safeId];
      writeJson(wishlistKey, next);
      return next;
    });
  }, []);
  return { has: (id: string) => ids.includes(id), toggle, ids };
}
