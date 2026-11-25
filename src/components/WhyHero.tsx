import SectionTag from './SectionTag'
import RoundBadge from './RoundBadge'
import vinylStack from '../assets/optimized/vinyl-stack.webp'
import vinylSleeve from '../assets/optimized/vinyl-sleeve.webp'

export default function WhyHero() {
  return (
    <div className="min-h-[calc(100svh-4rem)] overflow-x-clip lg:min-h-[calc(100svh-5rem)]">
      <section className="border-b border-black">
        <div className="mx-auto grid max-w-md grid-cols-1 px-4 lg:max-w-6xl lg:grid-cols-[24rem_minmax(0,1fr)] lg:items-start lg:gap-12 lg:px-8 2xl:max-w-[88rem] 2xl:grid-cols-[30rem_minmax(0,1fr)] 2xl:gap-20">
          <div className="relative z-30 col-start-1 row-start-1 w-[40%] self-start pt-10 lg:w-auto lg:pt-24 2xl:pt-32">
            <SectionTag>Why Spindrop</SectionTag>
            <h2 className="mt-4 text-lg font-bold leading-tight lg:mt-6 lg:text-4xl 2xl:text-5xl">
              Your music on vinyl. Without the{' '}
              <span className="relative inline-block">
                barriers.
                <svg
                  className="absolute -bottom-1 left-0 w-full lg:-bottom-2"
                  viewBox="0 0 100 8"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 5 Q 50 0 100 4"
                    stroke="black"
                    strokeWidth="2"
                    fill="none"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </span>
            </h2>
            <p className="mt-3 text-[0.7rem] leading-snug text-stone-600 lg:mt-4 lg:text-sm lg:leading-normal 2xl:text-base">
              Full-service pressing, a global retail network, customer support,
              and you keep up to 85% of profits.
            </p>
            <button
              type="button"
              className="mt-6 hidden rounded-full bg-black px-6 py-2.5 text-xs font-bold uppercase tracking-wide text-white hover:bg-stone-800 lg:block"
            >
              Start a project
            </button>
            <div className="mt-10 hidden gap-8 border-t border-black pt-6 lg:flex">
              <div>
                <p className="text-3xl font-bold 2xl:text-4xl">85%</p>
                <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-wide">
                  Profits you keep
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold 2xl:text-4xl">150+</p>
                <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-wide">
                  Retail partners
                </p>
              </div>
            </div>
          </div>

          <div className="relative col-start-1 row-start-1 h-[34rem] lg:col-start-2 lg:aspect-[5/6] lg:h-auto lg:w-full lg:max-w-[42rem] lg:justify-self-end 2xl:max-w-[48rem]">
            <img
              src={vinylStack}
              alt="Artist sitting on a chair holding a vinyl record"
              width="4732"
              height="7090"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="absolute right-[2%] top-8 z-10 aspect-[3/4] w-[54%] rotate-[4deg] border-2 border-black object-cover lg:right-0 lg:top-10 lg:aspect-[4/5] lg:w-[62%] lg:rotate-[3deg]"
            />

            <img
              src={vinylSleeve}
              alt="Hand placing a needle on a red vinyl record"
              width="4000"
              height="6000"
              loading="lazy"
              decoding="async"
              className="absolute -bottom-8 left-[6%] z-20 aspect-[4/5] w-[52%] -rotate-[3deg] border-2 border-black object-cover object-top lg:-bottom-12 lg:left-[2%] lg:aspect-[3/4] lg:w-[46%] lg:-rotate-[10deg]"
            />

            <div className="absolute bottom-10 right-[6%] z-20">
              <RoundBadge className="h-28 w-28 lg:h-36 lg:w-36 2xl:h-40 2xl:w-40" />
            </div>
          </div>
        </div>
      </section>

      <p className="px-6 pb-10 pt-16 text-center text-[0.7rem] lg:pt-24 lg:text-xs 2xl:text-sm">
        No matter where you are in your career, we have a production model to
        suit you.
      </p>
    </div>
  )
}
