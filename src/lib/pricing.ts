export type PriceCountry = { currency: string; locale: string };
export type PriceQuote = { amount: number; currency: string; locale: string; approximate: boolean };

export function quotePrice(amountUsd: number, country: PriceCountry, rates: Record<string, number>): PriceQuote {
  const rate = country.currency === 'USD' ? 1 : rates[country.currency];
  if (typeof rate !== 'number' || !Number.isFinite(rate) || rate <= 0) return { amount: amountUsd, currency: 'USD', locale: 'en-US', approximate: false };
  return { amount: amountUsd * rate, currency: country.currency, locale: country.locale, approximate: country.currency !== 'USD' };
}

export function formatMoney(amount: number, currency: string, locale: string, approximate = false) {
  const formatted = new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
  return approximate ? `approx. ${formatted}` : formatted;
}
