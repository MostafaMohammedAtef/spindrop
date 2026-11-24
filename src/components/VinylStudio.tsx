import { useEffect, useState } from 'react';
import vinylOne from '../assets/vinyl-one.png';
import vinylTwo from '../assets/vinyl-two.png';
import vinylThree from '../assets/vinyl-three.png';
import vinylFour from '../assets/vinyl-four.png';
import vinylFive from '../assets/vinyl-five.png';
import vinylSix from '../assets/vinyl-six.png';
import dollar from '../assets/vinyl-dollar.png';
import sparkles from '../assets/vinyl-sparkles.png';

const records = [vinylOne, vinylTwo, vinylThree, vinylFour, vinylFive, vinylSix];
const positions = [
  'left-[3%] top-[4%]',
  'right-[3%] top-[4%]',
  'left-[3%] bottom-[4%]',
  'right-[3%] bottom-[4%]',
  'left-[24%] top-[2%]',
  'right-[24%] top-[2%]',
];

export default function VinylStudio() {
  const [recordIndex, setRecordIndex] = useState(5);
  const [doodle, setDoodle] = useState({ icon: 0, position: 0 });

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRecordIndex((index) => (index + 1) % records.length);
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setDoodle({
        icon: Math.floor(Math.random() * 2),
        position: Math.floor(Math.random() * positions.length),
      });
    }, 3000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative flex h-[calc(100svh-4rem)] flex-col items-center overflow-hidden bg-black px-6 py-8 text-center text-white lg:h-[calc(100svh-5rem)] lg:py-10">
      <span className="inline-block border border-white px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide text-white">
        Vinyl Studio
      </span>
      <h2 className="mt-6 text-3xl font-bold leading-tight lg:text-4xl">
        Make it real with
        <br />
        Qrates Vinyl Studio
        <svg
          viewBox="0 0 240 18"
          aria-hidden="true"
          className="mx-auto mt-1 w-48 lg:w-56"
        >
          <path
            d="M5 13 C48 6 83 8 119 6 S188 5 235 1"
            fill="none"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </h2>
      <p className="mt-8 max-w-xl text-sm leading-relaxed">
        Design the look and feel of your vinyl and use the profit calculator to
        immediately see how much your project will cost, and how much you’ll earn.
      </p>
      <div className="relative mt-12 mb-12 flex min-h-0 w-full max-w-2xl flex-1 items-center justify-center">
        <img
          src={records[recordIndex]}
          alt={`Vinyl record design ${recordIndex + 1}`}
          className="relative z-10 h-[115%] max-w-[130vw] object-contain lg:h-[125%] lg:max-w-[110vw]"
        />
        <img
          src={doodle.icon === 0 ? dollar : sparkles}
          alt=""
          className={`pointer-events-none absolute z-20 w-14 lg:w-20 ${positions[doodle.position]}`}
        />
      </div>
      <a
        href="#"
        className="mt-4 inline-block shrink-0 rounded-full bg-brand-yellow px-16 py-4 text-xs font-bold uppercase tracking-wide text-black hover:bg-yellow-300"
      >
        Try it now
      </a>
    </section>
  );
}
