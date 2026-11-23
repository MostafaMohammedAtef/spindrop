import type { ReactNode } from 'react';

const variants = {
  solid: 'bg-black text-white hover:bg-stone-800',
  outline: 'border border-black bg-white text-black hover:bg-black hover:text-white',
};

export default function PillButton({
  children,
  href = '#',
  className = '',
  variant = 'solid',
}: {
  children: ReactNode;
  href?: string;
  className?: string;
  variant?: keyof typeof variants;
}) {
  return (
    <a
      href={href}
      className={`inline-block rounded-full px-10 py-3 text-xs font-bold uppercase tracking-wide ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
