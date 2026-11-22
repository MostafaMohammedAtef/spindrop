import SectionTag from './SectionTag'
import RoundBadge from './RoundBadge'
import vinylStack from '../assets/vinyl-stack.jpg'
import vinylSleeve from '../assets/vinyl-sleeve.jpg'

export default function WhyHero() {
  return (
    <div className="overflow-x-clip">
      <section className="border-b border-black">
        <div className="relative mx-auto h-[34rem] max-w-md px-4 lg:h-[44rem] lg:max-w-5xl lg:px-6">
          <div className="relative z-30 w-[40%] pt-10 lg:w-80 lg:pt-24">
            <SectionTag>Why Spindrop</SectionTag>
            <h2 className="mt-4 text-lg font-bold leading-tight lg:mt-6 lg:text-4xl">
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
            <p className="mt-3 text-[0.7rem] leading-snug text-stone-600 lg:mt-4 lg:text-sm lg:leading-normal">
              Full-service pressing, a global retail network, customer support,
              and you keep up to 85% of profits.
            </p>
            <button
              type="button"
              className="mt-12 hidden rounded-full bg-black px-6 py-2.5 text-xs font-bold uppercase tracking-wide text-white hover:bg-stone-800 lg:block"
            >
              Start a project
            </button>
            <div className="mt-12 hidden gap-8 border-t border-black pt-6 lg:flex">
              <div>
                <p className="text-3xl font-bold">85%</p>
                <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-wide">
                  Profits you keep
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold">150+</p>
                <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-wide">
                  Retail partners
                </p>
              </div>
            </div>
          </div>

          <img
            src={vinylStack}
            alt="Artist sitting on a chair holding a vinyl record"
            className="absolute right-[2%] top-8 z-10 aspect-[3/4] w-[54%] rotate-[4deg] border-2 border-black object-cover lg:right-0 lg:aspect-[4/5] lg:w-[24rem] lg:rotate-[3deg]"
          />

          <img
            src={vinylSleeve}
            alt="Hand placing a needle on a red vinyl record"
            className="absolute -bottom-8 left-[6%] z-20 aspect-[4/5] w-[52%] -rotate-[3deg] border-2 border-black object-cover object-top lg:-bottom-16 lg:left-[28%] lg:aspect-[3/4] lg:w-80 lg:-rotate-[10deg]"
          />

          <div className="absolute bottom-10 right-[6%] z-20 translate-x-4 translate-y-6 lg:bottom-12 lg:right-[18%]">
            <RoundBadge className="h-28 w-28 lg:h-40 lg:w-40" />
          </div>
        </div>
      </section>

      <p className="px-6 pb-10 pt-16 text-center text-[0.7rem] lg:pt-28 lg:text-xs">
        No matter where you are in your career, we have a production model to
        suit you.
      </p>
    </div>
  )
}
