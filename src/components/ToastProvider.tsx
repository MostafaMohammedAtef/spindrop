import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { X } from 'lucide-react';

type ToastAction = { label: string; run: () => void };
type ToastItem = { id: number; message: string; action?: ToastAction };
type ToastContextValue = { toast: (message: string, action?: ToastAction) => void };
const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context.toast;
}

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const timers = useRef(new Map<number, number>());
  const dismiss = useCallback((id: number) => {
    const timer = timers.current.get(id);
    if (timer) window.clearTimeout(timer);
    timers.current.delete(id);
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);
  const toast = useCallback((message: string, action?: ToastAction) => {
    const id = Date.now() + Math.random();
    setItems((current) => [...current.slice(-2), { id, message, action }]);
    timers.current.set(id, window.setTimeout(() => dismiss(id), 4000));
  }, [dismiss]);

  useEffect(() => () => timers.current.forEach((timer) => window.clearTimeout(timer)), []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div role="status" aria-live="polite" aria-atomic="false" className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-[120] flex w-[min(92vw,26rem)] -translate-x-1/2 flex-col gap-2 md:bottom-6 md:left-auto md:right-6 md:translate-x-0">
        {items.map((item) => <div key={item.id} onMouseEnter={() => { const timer = timers.current.get(item.id); if (timer) window.clearTimeout(timer); }} onMouseLeave={() => timers.current.set(item.id, window.setTimeout(() => dismiss(item.id), 4000))} onFocus={() => { const timer = timers.current.get(item.id); if (timer) window.clearTimeout(timer); }} onBlur={() => timers.current.set(item.id, window.setTimeout(() => dismiss(item.id), 4000))} className="flex items-center gap-3 border-2 border-black bg-white px-4 py-3 shadow-[4px_4px_0_#000]">
          <p className="flex-1 text-sm">{item.message}</p>
          {item.action && <button type="button" onClick={item.action.run} className="text-xs font-bold uppercase underline underline-offset-4">{item.action.label}</button>}
          <button type="button" onClick={() => dismiss(item.id)} aria-label="Dismiss notification" className="grid size-10 place-items-center"><X size={18} aria-hidden="true" /></button>
        </div>)}
      </div>
    </ToastContext.Provider>
  );
}
