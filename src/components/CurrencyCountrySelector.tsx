import { marketCountries, usePricing } from '../lib/PricingContext';

export default function CurrencyCountrySelector() {
  const { country, setCountryCode, isCurrencyAvailable } = usePricing();

  return (
    <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
    <label className="flex items-center gap-3 text-[0.65rem] font-bold uppercase tracking-wide">
      Prices for
      <select
        value={country.code}
        onChange={(event) => setCountryCode(event.target.value)}
        className="max-w-48 border border-black bg-white px-3 py-2 text-xs font-medium normal-case tracking-normal outline-none focus:ring-2 focus:ring-palette-21"
        aria-label="Choose country for prices"
      >
        {marketCountries.map((marketCountry) => (
          <option key={marketCountry.code} value={marketCountry.code}>
            {marketCountry.name}
          </option>
        ))}
      </select>
    </label>
    {!isCurrencyAvailable && <span className="text-[0.65rem] font-medium normal-case">Showing USD, rates unavailable for {country.currency}</span>}
    </div>
  );
}
