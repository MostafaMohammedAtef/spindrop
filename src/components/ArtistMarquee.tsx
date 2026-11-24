import { artists } from '../data/artists';

export default function ArtistMarquee() {
  return (
    <div className="overflow-hidden border-b border-black bg-white">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0">
            {artists.map((artist) => (
              <li
                key={artist.name}
                className="whitespace-nowrap px-8 py-10 text-xs font-medium uppercase lg:px-12 lg:py-12 lg:text-sm"
              >
                <a
                  href={artist.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  tabIndex={copy === 1 ? -1 : undefined}
                  className="underline underline-offset-4"
                >
                  {artist.name}
                </a>{' '}
                is on Spindrop
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
