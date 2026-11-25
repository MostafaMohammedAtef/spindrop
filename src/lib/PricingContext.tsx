import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { readJson, readString, writeJson, writeString } from './storage';
import { formatMoney, quotePrice, type PriceQuote } from './pricing';

export const marketCountries = [
  { code: 'US', name: 'United States', currency: 'USD', locale: 'en-US' },
  { code: 'EG', name: 'Egypt', currency: 'EGP', locale: 'en-EG' },
  { code: 'GB', name: 'United Kingdom', currency: 'GBP', locale: 'en-GB' },
  { code: 'CA', name: 'Canada', currency: 'CAD', locale: 'en-CA' },
  { code: 'AU', name: 'Australia', currency: 'AUD', locale: 'en-AU' },
  { code: 'NZ', name: 'New Zealand', currency: 'NZD', locale: 'en-NZ' },
  { code: 'DE', name: 'Germany', currency: 'EUR', locale: 'de-DE' },
  { code: 'FR', name: 'France', currency: 'EUR', locale: 'fr-FR' },
  { code: 'IT', name: 'Italy', currency: 'EUR', locale: 'it-IT' },
  { code: 'ES', name: 'Spain', currency: 'EUR', locale: 'es-ES' },
  { code: 'JP', name: 'Japan', currency: 'JPY', locale: 'ja-JP' },
  { code: 'CN', name: 'China', currency: 'CNY', locale: 'zh-CN' },
  { code: 'IN', name: 'India', currency: 'INR', locale: 'en-IN' },
  { code: 'AE', name: 'United Arab Emirates', currency: 'AED', locale: 'en-AE' },
  { code: 'SA', name: 'Saudi Arabia', currency: 'SAR', locale: 'ar-SA' },
  { code: 'TR', name: 'Türkiye', currency: 'TRY', locale: 'tr-TR' },
  { code: 'BR', name: 'Brazil', currency: 'BRL', locale: 'pt-BR' },
  { code: 'MX', name: 'Mexico', currency: 'MXN', locale: 'es-MX' },
  { code: 'ZA', name: 'South Africa', currency: 'ZAR', locale: 'en-ZA' },
  { code: 'CH', name: 'Switzerland', currency: 'CHF', locale: 'de-CH' },
  { code: 'SE', name: 'Sweden', currency: 'SEK', locale: 'sv-SE' },
  { code: 'NO', name: 'Norway', currency: 'NOK', locale: 'nb-NO' },
  { code: 'DK', name: 'Denmark', currency: 'DKK', locale: 'da-DK' },
  { code: 'KR', name: 'South Korea', currency: 'KRW', locale: 'ko-KR' },
  { code: 'PL', name: 'Poland', currency: 'PLN', locale: 'pl-PL' },
  { code: 'SG', name: 'Singapore', currency: 'SGD', locale: 'en-SG' },
  { code: 'HK', name: 'Hong Kong', currency: 'HKD', locale: 'zh-HK' },
] as const;

type MarketCountry = (typeof marketCountries)[number];
type PricingContextValue = {
  country: MarketCountry;
  setCountryCode: (countryCode: string) => void;
  formatPrice: (amountInUsd: number) => string;
  quotePrice: (amountInUsd: number) => PriceQuote;
  isCurrencyAvailable: boolean;
  rateStatus: 'loading' | 'ready' | 'fallback';
};

const countryStorageKey = 'spindrop.market-country';
const ratesStorageKey = 'spindrop.market-rates';
const PricingContext = createContext<PricingContextValue | null>(null);
const quoteCurrencies = [...new Set(marketCountries.map((country) => country.currency))]
  .filter((currency) => currency !== 'USD');

function getInitialCountryCode() {
  const savedCountry = readString(countryStorageKey);
  if (marketCountries.some((country) => country.code === savedCountry)) return savedCountry;

  if (typeof navigator !== 'undefined') {
    for (const locale of navigator.languages) {
      const region = locale.match(/-([a-z]{2})(?:-|$)/i)?.[1]?.toUpperCase();
      const detected = marketCountries.find((country) => country.code === region);
      if (detected) return detected.code;
    }
  }
  return 'US';
}

function readFreshRates() {
  const cached = readJson(ratesStorageKey, (value): value is { rates: Record<string, number>; timestamp: number } => {
    if (typeof value !== 'object' || value === null || !('rates' in value) || !('timestamp' in value) || typeof value.timestamp !== 'number' || value.timestamp > Date.now() || !Number.isFinite(value.timestamp) || typeof value.rates !== 'object' || value.rates === null) return false;
    const entries = Object.entries(value.rates);
    return entries.length <= 100 && entries.every(([currency, rate]) => currency.length === 3 && typeof rate === 'number' && Number.isFinite(rate) && rate > 0);
  }, { rates: { USD: 1 }, timestamp: 0 });
  return Date.now() - cached.timestamp >= 0 && Date.now() - cached.timestamp < 12 * 60 * 60 * 1000 ? cached.rates : null;
}

export function PricingProvider({ children }: { children: ReactNode }) {
  const [countryCode, setCountryCode] = useState(getInitialCountryCode);
  const [cachedRates] = useState(readFreshRates);
  const [rates, setRates] = useState<Record<string, number>>(cachedRates ?? { USD: 1 });
  const [rateStatus, setRateStatus] = useState<PricingContextValue['rateStatus']>(cachedRates ? 'ready' : 'loading');
  const country = marketCountries.find((entry) => entry.code === countryCode) ?? marketCountries[0];
  const isCurrencyAvailable = country.currency === 'USD' || typeof rates[country.currency] === 'number';

  useEffect(() => {
    if (cachedRates) return;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 5000);
    let cancelled = false;
    const quotes = quoteCurrencies.join(',');

    fetch(`https://api.frankfurter.dev/v2/rates?base=USD&quotes=${quotes}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Exchange rates are unavailable.');
        return response.json() as Promise<unknown>;
      })
      .then((response) => {
        if (!Array.isArray(response)) throw new Error('Unexpected exchange rate data.');
        const nextRates: Record<string, number> = { USD: 1 };
        for (const row of response) {
          if (
            typeof row === 'object' &&
            row !== null &&
            'quote' in row &&
            'rate' in row &&
            typeof row.quote === 'string' &&
            typeof row.rate === 'number'
          ) {
            nextRates[row.quote] = row.rate;
          }
        }
        if (!cancelled) {
          setRates(nextRates);
          setRateStatus('ready');
          writeJson(ratesStorageKey, { rates: nextRates, timestamp: Date.now() });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setRates({ USD: 1 });
          setRateStatus('fallback');
        }
      });

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [cachedRates]);

  function updateCountry(countryCodeToSet: string) {
    const nextCountry = marketCountries.find((entry) => entry.code === countryCodeToSet);
    if (!nextCountry) return;
    setCountryCode(nextCountry.code);
    writeString(countryStorageKey, nextCountry.code);
  }

  const value = useMemo<PricingContextValue>(() => ({
    country,
    setCountryCode: updateCountry,
    rateStatus,
    isCurrencyAvailable,
    quotePrice: (amountInUsd) => quotePrice(amountInUsd, country, rates),
    formatPrice: (amountInUsd) => {
      const quote = quotePrice(amountInUsd, country, rates);
      return formatMoney(quote.amount, quote.currency, quote.locale, quote.approximate);
    },
  }), [country, isCurrencyAvailable, rates, rateStatus]);

  return <PricingContext.Provider value={value}>{children}</PricingContext.Provider>;
}

export function usePricing() {
  const context = useContext(PricingContext);
  if (!context) throw new Error('usePricing must be used within PricingProvider');
  return context;
}
