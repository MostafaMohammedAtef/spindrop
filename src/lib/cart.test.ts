import { describe, expect, it } from 'vitest';
import { addCartItem, clampCartQuantity, removeCartItem, setCartItemQuantity } from './cart';

describe('cart quantity helpers', () => {
  it('adds items and increments an existing record', () => {
    const first = addCartItem([], 'record-a');
    expect(first).toEqual([{ recordId: 'record-a', quantity: 1 }]);
    expect(addCartItem(first, 'record-a')).toEqual([{ recordId: 'record-a', quantity: 2 }]);
  });

  it('clamps quantities from 1 through 10', () => {
    expect(clampCartQuantity(0)).toBe(1);
    expect(clampCartQuantity(5.8)).toBe(5);
    expect(clampCartQuantity(19)).toBe(10);
    expect(setCartItemQuantity([{ recordId: 'record-a', quantity: 2 }], 'record-a', 99)).toEqual([{ recordId: 'record-a', quantity: 10 }]);
  });

  it('removes an item', () => {
    expect(removeCartItem([{ recordId: 'a', quantity: 1 }, { recordId: 'b', quantity: 2 }], 'a')).toEqual([{ recordId: 'b', quantity: 2 }]);
  });
});
