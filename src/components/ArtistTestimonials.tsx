import { useState } from 'react';
import SectionTag from './SectionTag';
import { sol, mayaewk } from '../data/artists';
import solPhoto from '../assets/artist-sol.png';
import mayaewkPhoto from '../assets/artist-mayaewk.png';

const slides = [
  {
    artist: sol,
    quote:
      'Fans showed up in a way I did not expect. I kept asking myself why I waited so long to press my music on vinyl, because it felt like people had been waiting for it.',
    photo: solPhoto,
    alt: 'Bearded man with curly hair holding a vinyl record in front of a bookshelf',
  },
  {
    artist: mayaewk,
    quote:
      'I put my record up and the pre-orders started arriving within days. Spindrop handled the pressing and the shipping, so I could stay in the studio and finish my next track.',
    photo: mayaewkPhoto,
    alt: 'Smiling man with glasses holding a record sleeve and a blue vinyl in a home studio',
  },
];

export default function ArtistTestimonials() {
  const [index, setIndex] = useState(0);
  const slide = slides[index];

  return (
    <section className="grid min-h-[calc(100svh-4rem)] grid-cols-2 border-b border-black lg:min-h-[calc(100svh-5rem)]">
      <div className="flex flex-col bg-brand-yellow px-6 py-8 lg:px-10 lg:py-10 2xl:px-16">
        <div>
          <SectionTag>Artists on Spindrop</SectionTag>
        </div>

        <div aria-live="polite" className="my-auto py-12">
          <figure
            key={slide.artist.name}
            className="animate-fade-in motion-reduce:animate-none"
          >
            <blockquote className="max-w-md text-xl leading-snug lg:text-2xl 2xl:text-3xl">
              “{slide.quote}”
            </blockquote>
            <figcaption className="mt-6 text-sm font-semibold uppercase">
              <a
                href={slide.artist.href}
                target="_blank"
                rel="noreferrer noopener"
                className="underline underline-offset-4"
              >
                {slide.artist.name}
              </a>
            </figcaption>
          </figure>
        </div>

        <div className="flex gap-2">
          {slides.map((item, i) => (
            <button
              key={item.artist.name}
              type="button"
              aria-label={`Show testimonial from ${item.artist.name}`}
              aria-current={i === index ? 'true' : undefined}
              onClick={() => setIndex(i)}
              className={`h-8 w-8 rounded-full border border-black text-xs font-semibold ${
                i === index
                  ? 'bg-black text-white'
                  : 'bg-transparent text-black hover:bg-black/10'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="relative aspect-[4/5] max-h-[36rem] border-t border-black lg:aspect-auto lg:max-h-none lg:border-l lg:border-t-0">
        <img
          key={slide.artist.name}
          src={slide.photo}
          alt={slide.alt}
          className="absolute inset-0 h-full w-full animate-fade-in object-cover object-[50%_60%] motion-reduce:animate-none"
        />
      </div>
    </section>
  );
}
