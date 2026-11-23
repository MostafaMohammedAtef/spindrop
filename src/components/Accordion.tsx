import { useState } from 'react';

export type AccordionItem = { name: string; text: string };
export type AccordionGroup = { title: string; items: AccordionItem[] };

export default function Accordion({ groups }: { groups: AccordionGroup[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="w-full">
      {groups.map((group, groupIndex) => (
        <div key={group.title}>
          <h3 className="bg-black px-5 pb-8 pt-5 text-lg font-bold text-white">
            {group.title}
          </h3>
          <ul>
            {group.items.map((item, itemIndex) => {
              const id = `accordion-${groupIndex}-${itemIndex}`;
              const open = openId === id;

              return (
                <li
                  key={item.name}
                  className="border-x border-b border-black bg-white"
                >
                  <h4>
                    <button
                      type="button"
                      id={`${id}-button`}
                      aria-expanded={open}
                      aria-controls={`${id}-panel`}
                      onClick={() => setOpenId(open ? null : id)}
                      className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold hover:bg-stone-50 focus-visible:bg-stone-100"
                    >
                      {item.name}
                      <svg
                        viewBox="0 0 12 12"
                        aria-hidden="true"
                        className={`h-3 w-3 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
                      >
                        <path
                          d="M2 4l4 4 4-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </button>
                  </h4>
                  <div
                    id={`${id}-panel`}
                    role="region"
                    aria-labelledby={`${id}-button`}
                    hidden={!open}
                    className="px-5 pb-5 text-sm leading-relaxed text-stone-600"
                  >
                    {item.text}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
