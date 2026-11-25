import { describe, expect, it } from 'vitest';
import { formatMoney, quotePrice } from './pricing';

describe('price display helpers', () => {
  it('formats demo currency values and identifies estimates', () => {
    expect(formatMoney(24.99, 'USD', 'en-US')).toBe('$24.99');
    expect(formatMoney(100, 'EUR', 'en-GB', true)).toContain('approx.');
  });

  it('falls back to USD when a currency rate is missing', () => {
    expect(quotePrice(24.99, { currency: 'EGP', locale: 'en-EG' }, { USD: 1 })).toEqual({ amount: 24.99, currency: 'USD', locale: 'en-US', approximate: false });
  });

  it('converts prices when a rate is present', () => {
    expect(quotePrice(10, { currency: 'EUR', locale: 'de-DE' }, { EUR: 0.9 })).toEqual({ amount: 9, currency: 'EUR', locale: 'de-DE', approximate: true });
  });
});
