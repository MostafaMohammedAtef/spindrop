import SectionTag from './SectionTag';
import retailLogos from '../assets/optimized/our-sponsers.webp';
import helpPhoto from '../assets/optimized/here-to-help.webp';

const panels = [
  {
    tag: 'Retail network',
    title: 'Worldwide distribution, simplified.',
    text: 'Get direct access to over 150 retail partners around the world.',
    image: retailLogos,
    width: 1637,
    height: 961,
    alt: 'Logos of retail partners: Jet Set, Think Indie, Vindig, HHV and Juno Records',
    imageStyle: 'object-contain',
    style: 'bg-black text-white',
  },
  {
    tag: 'Customer support',
    title: 'Here to help, whenever you need it.',
    text: 'Whether you are an artist mid-project or a fan with a question about an order, our team is ready to help.',
    image: helpPhoto,
    width: 5472,
    height: 3648,
    alt: 'Customer listening to a vinyl record at home',
    imageStyle: 'border border-black object-cover',
    style: 'bg-brand-pink text-black',
  },
];

export default function RetailSupport() {
  return (
    <section className="min-h-[calc(100svh-4rem)] border-b border-black lg:min-h-[calc(100svh-5rem)]">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {panels.map((panel) => (
          <article
            key={panel.title}
            className={`flex flex-col items-center px-4 pb-14 pt-4 text-center lg:px-8 lg:pb-20 lg:pt-8 ${panel.style}`}
          >
            <div className="aspect-[16/9] w-full max-w-2xl">
              <img
                src={panel.image}
                alt={panel.alt}
                width={panel.width}
                height={panel.height}
                loading="lazy"
                decoding="async"
                className={`h-full w-full ${panel.imageStyle}`}
              />
            </div>
            <div className="mt-10 flex flex-col items-center lg:mt-14">
              <SectionTag>{panel.tag}</SectionTag>
              <h3 className="mt-5 max-w-md text-2xl font-medium leading-tight lg:text-3xl 2xl:text-4xl">
                {panel.title}
              </h3>
              <p className="mt-4 max-w-sm text-sm leading-relaxed">
                {panel.text}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
