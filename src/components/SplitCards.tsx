import PillButton from './PillButton';
import crowdfunding from '../assets/crowdfunding.png';
import pressAndSell from '../assets/press-and-sell.png';

const cards = [
  {
    tag: 'No risk, no waste',
    title: 'Crowdfunding',
    text: 'Rally your fans and gather pledges. Press the exact number of records you need, without having to pay anything upfront.',
    image: crowdfunding,
    alt: 'Fans reaching up around a vinyl record',
    style: 'bg-brand-yellow border-b border-black lg:border-b-0 lg:border-r',
  },
  {
    tag: 'Get into it',
    title: 'Press & Sell',
    text: 'Launch your record, sooner. Take pre-orders from fans and we will take care of the rest.',
    image: pressAndSell,
    alt: 'Vinyl record character pushing a cart of record sleeves',
    style: 'bg-brand-olive',
  },
];

export default function SplitCards() {
  return (
    <section className="min-h-[calc(100svh-4rem)] border-y border-black lg:min-h-[calc(100svh-5rem)]">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {cards.map((card) => (
          <article
            key={card.title}
            className={`flex flex-col items-center px-6 py-12 text-center lg:px-12 lg:py-16 ${card.style}`}
          >
            <span className="inline-block border border-black bg-white px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide">
              {card.tag}
            </span>
            <h3 className="mt-5 text-3xl font-medium lg:text-4xl">{card.title}</h3>
            <p className="mt-5 max-w-sm text-sm leading-relaxed">{card.text}</p>
            <img
              src={card.image}
              alt={card.alt}
              className="mt-10 h-56 w-auto max-w-full object-contain lg:h-72"
            />
            <PillButton className="mt-auto">Learn more</PillButton>
          </article>
        ))}
      </div>

      <div className="bg-black text-white">
        <div className="mx-auto flex max-w-5xl flex-col gap-5 px-6 py-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-12 lg:py-12">
          <p className="max-w-lg text-sm leading-relaxed">
            Just after straight up vinyl pressing? We do that too. Records are
            shipped in bulk to wherever you need.
          </p>
          <a
            href="#"
            className="text-xs font-bold uppercase underline underline-offset-4 lg:whitespace-nowrap"
          >
            Start a press only project
          </a>
        </div>
      </div>
    </section>
  );
}
