import SectionTag from './SectionTag';
import PillButton from './PillButton';
import peekIcon from '../assets/optimized/peek-icon.webp';
import imageOne from '../assets/optimized/image-one.webp';
import imageTwo from '../assets/optimized/image-two.webp';
import imageThree from '../assets/optimized/image-three.webp';
import imageFour from '../assets/optimized/image-four.webp';
import imageFive from '../assets/optimized/image-five.webp';

const photos = [
  {
    src: imageOne,
    width: 707,
    height: 712,
    alt: 'Man smiling in a garden holding a vinyl record, with a dog in front of him',
    href: 'https://open.spotify.com/album/3YTJ6azaXjOBrr60oPwYYU',
    platform: 'Spotify',
    style: 'col-span-2 aspect-square lg:row-span-2 lg:aspect-auto',
  },
  {
    src: imageTwo,
    width: 355,
    height: 355,
    alt: 'Person in a white cat mask holding a blue record over a pile of photos',
    href: 'https://open.spotify.com/playlist/5rA1iEiH9aWJTpGPDOfk6n',
    platform: 'Spotify',
    style: 'aspect-square',
  },
  {
    src: imageThree,
    width: 473,
    height: 475,
    alt: 'Person in overalls holding an album cover in front of their face',
    href: 'https://open.spotify.com/track/0bsR8k20ADjBCdOOAntDyi',
    platform: 'Spotify',
    style: 'aspect-square',
  },
  {
    src: imageFour,
    width: 477,
    height: 472,
    alt: 'Woman sitting on a wicker chair holding a record sleeve',
    href: 'https://www.youtube.com/watch?v=CF7Y7AedcsQ',
    platform: 'YouTube',
    style: 'aspect-square',
  },
  {
    src: imageFive,
    width: 476,
    height: 472,
    alt: 'Man in sunglasses by a swimming pool holding a record and its sleeve',
    href: 'https://open.spotify.com/track/00HIh9mVUQQAycsQiciWsh',
    platform: 'Spotify',
    style: 'aspect-square',
  },
];

export default function Community() {
  return (
    <section className="min-h-[calc(100svh-4rem)] border-b border-black lg:min-h-[calc(100svh-5rem)]">
      <div className="mx-auto flex max-w-md flex-col items-center px-6 pb-16 pt-14 text-center lg:max-w-2xl lg:pb-24 lg:pt-20">
        <SectionTag>Community</SectionTag>
        <h2 className="mt-5 text-3xl font-bold leading-tight lg:text-4xl">
          Join a growing community.
        </h2>
        <p className="mt-4 max-w-sm text-sm leading-relaxed lg:max-w-md">
          Spindrop is a home for the next generation of vinyl lovers. Meet
          fans, and connect with artists, labels and stores.
        </p>
        <PillButton variant="outline" className="mt-6">
          Browse artists
        </PillButton>
      </div>

      <div className="relative w-full">
        <img
          src={peekIcon}
          alt=""
          width="1254"
          height="1254"
          loading="lazy"
          decoding="async"
          className="pointer-events-none absolute bottom-[calc(100%-1.5rem)] right-[6%] z-20 w-16 lg:right-[10%] lg:w-24"
        />
        <div className="relative z-10 grid grid-cols-2 gap-px border border-black bg-black lg:grid-cols-4">
          {photos.map((photo) => (
            <a
              key={photo.href}
              href={photo.href}
              target="_blank"
              rel="noreferrer noopener"
              className={`group relative block overflow-hidden bg-white ${photo.style}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-white px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-black opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                Open on {photo.platform}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
