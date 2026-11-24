import { useCart } from '../lib/CartContext';
import { records } from '../data/records';

export default function DiscoverPage() {
  const { addToCart, items } = useCart();

  return (
    <main className="bg-white text-black">
      <section className="border-b border-black bg-palette-11 px-6 py-12 lg:px-12 lg:py-20">
        <p className="inline-block border border-black bg-white px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-wide">The Spindrop shop</p>
        <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight lg:text-6xl">Find your next favorite record.</h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed lg:text-base">Independent sounds, pressed with care. Browse the latest records from the Spindrop community.</p>
          </div>
          <p className="text-xs font-bold uppercase tracking-wide">{records.length} records to discover</p>
        </div>
      </section>

      <section className="grid grid-cols-1 border-b border-black lg:grid-cols-3">
        {records.map((record, index) => {
          const cartItem = items.find((item) => item.recordId === record.id);

          return (
            <article key={record.id} className={`flex flex-col border-b border-black p-5 lg:border-r lg:p-7 ${index >= 3 ? 'lg:border-b-0' : ''} ${index % 3 === 2 ? 'lg:border-r-0' : ''}`}>
              <div className={`relative flex aspect-square items-center justify-center overflow-hidden border border-black ${record.background}`}>
                <span className="absolute left-4 top-4 border border-black bg-white px-2 py-1 text-[0.6rem] font-bold uppercase tracking-wide">Community press</span>
                <img src={record.image} alt={`${record.title} vinyl record artwork`} className="h-[86%] w-[86%] object-contain drop-shadow-xl" />
                <span className="absolute bottom-4 right-4 rounded-full bg-black px-3 py-1 text-[0.6rem] font-bold uppercase tracking-wide text-white">Side A</span>
              </div>
              <div className="flex flex-1 flex-col pt-5">
                <p className="text-[0.65rem] font-bold uppercase tracking-wide text-stone-600">{record.artist}</p>
                <h2 className="mt-1 text-xl font-bold">{record.title}</h2>
                <button type="button" onClick={() => addToCart(record.id)} className="mt-5 w-full rounded-full bg-black px-5 py-3 text-xs font-bold uppercase tracking-wide text-white hover:bg-palette-31">
                  {cartItem ? `Add another · ${cartItem.quantity} in cart` : 'Add to cart'}
                </button>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
