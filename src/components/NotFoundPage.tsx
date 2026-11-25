import { Link } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';

export default function NotFoundPage() {
  usePageTitle('Page not found');
  return (
    <main id="main-content" className="mx-auto flex min-h-[60svh] max-w-7xl flex-col items-start justify-center px-6 py-16">
      <p className="border border-black px-2 py-1 text-xs font-bold uppercase">404</p>
      <h1 tabIndex={-1} className="mt-5 text-4xl font-bold">Page not found</h1>
      <p className="mt-3 max-w-prose">This page is not here. Find your way back to Spindrop.</p>
      <div className="mt-6 flex gap-3">
        <Link to="/" className="rounded-full bg-black px-6 py-3 text-xs font-bold uppercase text-white">Home</Link>
        <Link to="/discover" className="rounded-full border-2 border-black px-6 py-3 text-xs font-bold uppercase">Discover</Link>
      </div>
    </main>
  );
}
