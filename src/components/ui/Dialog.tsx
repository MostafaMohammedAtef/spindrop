import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

export default function Dialog({ open, onClose, labelledBy, children, position = 'center' }: {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
  position?: 'center' | 'bottom';
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    (panelRef.current?.querySelector<HTMLElement>('[data-autofocus="true"]') ?? panelRef.current?.querySelector<HTMLElement>('button, a, input, select, textarea, [tabindex="0"]'))?.focus();
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab' || !panelRef.current) return;
      const elements = [...panelRef.current.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])')];
      if (!elements.length) return;
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;
  return createPortal(
    <div className={`fixed inset-0 z-[100] flex justify-center bg-black/50 ${position === 'bottom' ? 'items-end md:items-center' : 'items-center'}`} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div ref={panelRef} role="dialog" aria-modal="true" aria-labelledby={labelledBy} className={`relative max-h-[90dvh] w-full overflow-y-auto border-2 border-black bg-white p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-[6px_6px_0_#000] motion-safe:animate-[dialog-in_200ms_ease-out] md:max-w-xl ${position === 'bottom' ? 'rounded-t-3xl md:rounded-3xl' : 'rounded-3xl'}`}>
        {children}
      </div>
    </div>, document.body,
  );
}
