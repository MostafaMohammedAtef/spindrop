import { Link } from 'react-router-dom';
import { records } from '../data/records';
import { usePricing } from '../lib/PricingContext';
import RecordArtwork from './RecordArtwork';

export default function RecentlyViewed({ ids, exclude }: { ids: string[]; exclude?: string }) {
  const { formatPrice } = usePricing();
  const viewed = ids.filter((id) => id !== exclude).map((id) => records.find((record) => record.id === id)).filter((record) => record !== undefined).slice(0, 4);
  if (!viewed.length) return null;

  return (
    <section aria-labelledby="recently-viewed-title" className="mt-12 border-t border-black pt-8">
      <h2 id="recently-viewed-title" className="text-2xl font-bold">Recently viewed</h2>
      <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
        {viewed.map((record) => <Link key={record.id} to={`/records/${record.id}`} className="group border border-black p-3 hover:bg-brand-yellow"><div className={`grid aspect-video place-items-center ${record.background}`}><RecordArtwork src={record.image} alt={`${record.title} by ${record.artists.join(', ')}`} className="h-full w-full object-contain" /></div><p dir="auto" className="mt-3 truncate text-sm font-bold group-hover:underline">{record.title}</p><p className="mt-1 truncate text-xs">{record.artists.join(', ')}</p><p className="mt-2 text-xs font-semibold">{formatPrice(record.priceUsd)}</p></Link>)}
      </div>
    </section>
  );
}
