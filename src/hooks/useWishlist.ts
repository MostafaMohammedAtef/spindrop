import { useCallback, useEffect, useState } from 'react';
import { readJson, writeJson } from '../lib/storage';

const wishlistKey = 'spindrop.wishlist';
const isWishlist = (value: unknown): value is string[] => Array.isArray(value) && value.every((id) => typeof id === 'string' && id.length < 120);

export function useWishlist() {
  const [ids, setIds] = useState<string[]>(() => readJson(wishlistKey, isWishlist, []));
  useEffect(() => {
    function sync(event: StorageEvent) {
      if (event.key === wishlistKey) setIds(readJson(wishlistKey, isWishlist, []));
    }
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);
  const toggle = useCallback((id: string) => {
    setIds((current) => {
      const next = current.includes(id) ? current.filter((saved) => saved !== id) : [...current, id];
      writeJson(wishlistKey, next);
      return next;
    });
  }, []);
  return { has: (id: string) => ids.includes(id), toggle, ids };
}
