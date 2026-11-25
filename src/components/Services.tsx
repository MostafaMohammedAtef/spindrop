import SectionTag from './SectionTag';
import PillButton from './PillButton';
import Accordion from './Accordion';
import type { AccordionGroup } from './Accordion';
import studio from '../assets/optimized/you-do-the-music-we-do-the-rest.webp';

const groups: AccordionGroup[] = [
  {
    title: 'Making Records',
    items: [
      {
        name: 'Design & Customization',
        text: 'Pick your vinyl color, weight and sleeve style, and preview the result before you commit.',
      },
      {
        name: 'Mastering',
        text: 'Get your tracks prepared for vinyl so they sound right on a turntable.',
      },
      {
        name: 'Artwork Assistance',
        text: 'Upload your cover or get help adapting it to the exact sleeve and label sizes.',
      },
      {
        name: 'Pressing',
        text: 'We press, check and pack your records at partner plants.',
      },
    ],
  },
  {
    title: 'Storage & Distribution',
    items: [
      {
        name: 'Free Storage',
        text: 'Your pressed records stay safe with us until they are sold or shipped.',
      },
      {
        name: 'Shop',
        text: 'Every release gets its own page where fans can pre-order.',
      },
      {
        name: 'Digital Downloads',
        text: 'Include a download code with each record at no extra work.',
      },
      {
        name: 'Retail Distribution',
        text: 'Reach record stores around the world through our partner network.',
      },
    ],
  },
  {
    title: 'Support',
    items: [
      {
        name: 'Customer Support',
        text: 'We answer your fans about orders, shipping and returns.',
      },
      {
        name: 'Artist Support',
        text: 'A real person helps you at every step of your project.',
      },
    ],
  },
];

export default function Services() {
  return (
    <section className="min-h-[calc(100svh-4rem)] border-b border-black lg:min-h-[calc(100svh-5rem)]">
      <div className="mx-auto grid max-w-md grid-cols-1 gap-12 px-4 py-14 lg:max-w-6xl lg:grid-cols-2 lg:items-start lg:gap-16 lg:px-8 lg:py-24 2xl:max-w-[88rem] 2xl:gap-24">
        <div className="flex flex-col items-center text-center lg:pt-6">
          <SectionTag>Our services</SectionTag>
          <h2 className="mt-5 text-3xl font-bold uppercase leading-none text-transparent [-webkit-text-stroke:1.5px_black] lg:text-5xl 2xl:text-6xl">
            <span className="block">You make music.</span>
            <span className="block">We do the rest.</span>
          </h2>
          <img
            src={studio}
            alt="Musician wearing headphones playing a keyboard in a studio"
            width="3704"
            height="5556"
            loading="lazy"
            decoding="async"
            className="mt-8 aspect-[3/4] w-56 rotate-[4deg] border-2 border-black object-cover lg:w-72"
          />
          <p className="mt-12 max-w-sm text-sm leading-relaxed">
            We want you to be able to put all your energy into the creative
            side of making music. So we created a one-stop shop for everything
            else.
          </p>
          <PillButton variant="outline" className="mt-6">
            Learn more
          </PillButton>
        </div>

        <Accordion groups={groups} />
      </div>
    </section>
  );
}
