import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

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
  isCurrencyAvailable: boolean;
  rateStatus: 'loading' | 'ready' | 'fallback';
};

const countryStorageKey = 'spindrop.market-country';
const PricingContext = createContext<PricingContextValue | null>(null);
const quoteCurrencies = [...new Set(marketCountries.map((country) => country.currency))]
  .filter((currency) => currency !== 'USD');

function getInitialCountryCode() {
  try {
    const savedCountry = localStorage.getItem(countryStorageKey);
    if (marketCountries.some((country) => country.code === savedCountry)) return savedCountry;
  } catch {
    return 'US';
  }

  if (typeof navigator !== 'undefined') {
    for (const locale of navigator.languages) {
      const region = locale.match(/-([a-z]{2})(?:-|$)/i)?.[1]?.toUpperCase();
      const detected = marketCountries.find((country) => country.code === region);
      if (detected) return detected.code;
    }
  }
  return 'US';
}

export function PricingProvider({ children }: { children: ReactNode }) {
  const [countryCode, setCountryCode] = useState(getInitialCountryCode);
  const [rates, setRates] = useState<Record<string, number>>({ USD: 1 });
  const [rateStatus, setRateStatus] = useState<PricingContextValue['rateStatus']>('loading');
  const country = marketCountries.find((entry) => entry.code === countryCode) ?? marketCountries[0];
  const isCurrencyAvailable = country.currency === 'USD' || typeof rates[country.currency] === 'number';

  useEffect(() => {
    let cancelled = false;
    const quotes = quoteCurrencies.join(',');

    fetch(`https://api.frankfurter.dev/v2/rates?base=USD&quotes=${quotes}`)
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
        }
      })
      .catch(() => {
        if (!cancelled) setRateStatus('fallback');
      });

    return () => {
      cancelled = true;
    };
  }, []);

  function updateCountry(countryCodeToSet: string) {
    const nextCountry = marketCountries.find((entry) => entry.code === countryCodeToSet);
    if (!nextCountry) return;
    setCountryCode(nextCountry.code);
    try {
      localStorage.setItem(countryStorageKey, nextCountry.code);
    } catch {
      return;
    }
  }

  const value = useMemo<PricingContextValue>(() => ({
    country,
    setCountryCode: updateCountry,
    rateStatus,
    isCurrencyAvailable,
    formatPrice: (amountInUsd) => {
      const rate = rates[country.currency];
      const currency = rate ? country.currency : 'USD';
      const amount = rate ? amountInUsd * rate : amountInUsd;
      return new Intl.NumberFormat(country.locale, {
        style: 'currency',
        currency,
      }).format(amount);
    },
  }), [country, isCurrencyAvailable, rates, rateStatus]);

  return <PricingContext.Provider value={value}>{children}</PricingContext.Provider>;
}

export function usePricing() {
  const context = useContext(PricingContext);
  if (!context) throw new Error('usePricing must be used within PricingProvider');
  return context;
}
