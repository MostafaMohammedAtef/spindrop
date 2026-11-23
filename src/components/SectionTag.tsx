import type { ReactNode } from 'react';

export default function SectionTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block border border-black bg-white px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide text-black">
      {children}
    </span>
  );
}
