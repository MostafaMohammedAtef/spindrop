export type CartItem = { recordId: string; quantity: number };

export function clampCartQuantity(quantity: number) {
  return Math.max(1, Math.min(10, Math.floor(Number.isFinite(quantity) ? quantity : 1)));
}

export function addCartItem(items: CartItem[], recordId: string) {
  const existing = items.find((item) => item.recordId === recordId);
  if (existing) return items.map((item) => item.recordId === recordId ? { ...item, quantity: clampCartQuantity(item.quantity + 1) } : item);
  return [...items, { recordId, quantity: 1 }];
}

export function setCartItemQuantity(items: CartItem[], recordId: string, quantity: number) {
  const safeQuantity = clampCartQuantity(quantity);
  return items.map((item) => item.recordId === recordId ? { ...item, quantity: safeQuantity } : item);
}

export function removeCartItem(items: CartItem[], recordId: string) {
  return items.filter((item) => item.recordId !== recordId);
}
