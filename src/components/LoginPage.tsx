import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInDemoAccount } from '../lib/demoAuth';

export default function LoginPage() {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      await signInDemoAccount(
        String(formData.get('email') ?? ''),
        String(formData.get('password') ?? ''),
      );
      navigate('/');
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Could not sign in.');
    }
  }

  return (
    <main className="grid min-h-[calc(100svh-5rem)] grid-cols-1 border-b border-black lg:grid-cols-2">
      <section className="relative flex min-h-80 flex-col justify-between overflow-hidden bg-palette-31 p-8 text-white lg:min-h-full lg:p-12 2xl:p-16">
        <div className="relative z-10 flex items-center gap-3">
          <img src="/spindrop-icon-default.png" alt="" className="h-10 w-10 rounded-full bg-white p-1" />
          <span className="text-sm font-bold uppercase tracking-[0.18em]">Spindrop</span>
        </div>
        <div className="relative z-10 my-14 lg:my-0">
          <p className="inline-block border border-white px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-wide">Welcome back</p>
          <h1 className="mt-6 max-w-lg text-4xl font-bold leading-[0.98] lg:text-6xl 2xl:text-7xl">
            Your next record starts here.
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/80 lg:text-base">
            Sign in to follow your projects, discover new releases, and keep your music moving.
          </p>
        </div>
        <div className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full border-[3rem] border-palette-21/90 lg:h-[26rem] lg:w-[26rem]" />
        <div className="pointer-events-none absolute -bottom-12 -right-4 h-44 w-44 rounded-full border-[1.5rem] border-palette-11 lg:h-56 lg:w-56" />
      </section>

      <section className="flex items-center justify-center bg-white px-6 py-14 lg:px-12">
        <div className="w-full max-w-md">
          <Link to="/" className="text-xs font-bold uppercase tracking-wide underline underline-offset-4">← Back to Spindrop</Link>
          <h2 className="mt-10 text-3xl font-bold lg:text-4xl">Sign in</h2>
          <p className="mt-2 text-sm text-stone-600">Welcome back. Enter your details below.</p>
          <p className="mt-3 border border-black bg-brand-yellow px-3 py-2 text-xs">Demo account, stored only in this browser.</p>
          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <label className="block text-xs font-bold uppercase tracking-wide" htmlFor="email">
              Email address
              <input id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" className="mt-2 block w-full rounded-none border border-black bg-white px-4 py-3 text-sm font-normal normal-case tracking-normal outline-none placeholder:text-stone-400 focus:ring-2 focus:ring-palette-21" />
            </label>
            <label className="block text-xs font-bold uppercase tracking-wide" htmlFor="password">
              Password
              <input id="password" name="password" type="password" autoComplete="current-password" required placeholder="Enter your password" className="mt-2 block w-full rounded-none border border-black bg-white px-4 py-3 text-sm font-normal normal-case tracking-normal outline-none placeholder:text-stone-400 focus:ring-2 focus:ring-palette-21" />
            </label>
            <div className="flex items-center justify-between gap-3 text-xs">
              <label className="flex items-center gap-2"><input type="checkbox" name="remember" className="h-4 w-4 accent-palette-21" /> Remember me</label>
              <a href="#" className="font-semibold underline underline-offset-4">Forgot password?</a>
            </div>
            {error && <p role="alert" className="text-sm font-medium text-red-700">{error}</p>}
            <button type="submit" className="w-full rounded-full bg-brand-yellow px-6 py-4 text-xs font-bold uppercase tracking-wide text-black hover:bg-palette-12">Sign in</button>
          </form>
          <p className="mt-7 text-center text-sm text-stone-600">New to Spindrop? <Link to="/create-account" className="font-bold text-black underline underline-offset-4">Create an account</Link></p>
        </div>
      </section>
    </main>
  );
}
