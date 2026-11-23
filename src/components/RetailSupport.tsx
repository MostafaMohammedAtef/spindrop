import SectionTag from './SectionTag';
import retailLogos from '../assets/our-sponsers.png';
import helpPhoto from '../assets/here-to-help.jpg';

const panels = [
  {
    tag: 'Retail network',
    title: 'Worldwide distribution, simplified.',
    text: 'Get direct access to over 150 retail partners around the world.',
    image: retailLogos,
    alt: 'Logos of retail partners: Jet Set, Think Indie, Vindig, HHV and Juno Records',
    imageStyle: 'object-contain',
    style: 'bg-black text-white',
  },
  {
    tag: 'Customer support',
    title: 'Here to help, whenever you need it.',
    text: 'Whether you are an artist mid-project or a fan with a question about an order, our team is ready to help.',
    image: helpPhoto,
    alt: 'Purple and yellow vinyl records lying on top of each other',
    imageStyle: 'border border-black object-cover',
    style: 'bg-brand-pink text-black',
  },
];

export default function RetailSupport() {
  return (
    <section className="border-b border-black">
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
