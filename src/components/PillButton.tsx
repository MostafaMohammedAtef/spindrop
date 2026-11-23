import type { ReactNode } from 'react';

export default function PillButton({
  children,
  href = '#',
  className = '',
}: {
  children: ReactNode;
  href?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`inline-block rounded-full bg-black px-10 py-3 text-xs font-bold uppercase tracking-wide text-white hover:bg-stone-800 ${className}`}
    >
      {children}
    </a>
  );
}
