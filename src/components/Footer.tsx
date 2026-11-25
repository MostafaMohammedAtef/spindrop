import footerImage from '../assets/footer-img.png';
import { useState, type FormEvent } from 'react';
import { readJson, writeJson } from '../lib/storage';

const columns = [
  {
    title: 'For artists',
    links: ['Why Spindrop?', 'Crowdfunding', 'Press & Sell', 'Our Services', 'Artist Toolkit', 'Referral Program'],
  },
  {
    title: 'For fans',
    links: ['Discover', 'Records', 'Stories', 'Lists', 'Artists & Labels'],
  },
  {
    title: 'Our company',
    links: ['About Spindrop', 'Careers', 'Partners'],
  },
  {
    title: 'Help',
    links: ['Support Center', 'Contact Us', 'Returns', 'Shipping'],
  },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = email.trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(value)) { setMessage('Enter a valid email address.'); return; }
    const saved = readJson<string[]>('spindrop.newsletter', (data): data is string[] => Array.isArray(data) && data.every((entry) => typeof entry === 'string'), []);
    if (!writeJson('spindrop.newsletter', [...new Set([...saved, value])])) { setMessage('Could not save in this browser.'); return; }
    setEmail('');
    setMessage('You are on the list. Demo signup saved in this browser.');
  }
  return (
    <footer className="flex min-h-[calc(100svh-4rem)] flex-col justify-between bg-black px-6 pb-12 pt-28 text-white lg:min-h-[calc(100svh-5rem)] lg:px-16 lg:pb-16 lg:pt-40">
      <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-10 lg:grid-cols-4 lg:gap-8">
        {columns.map((column) => (
          <div key={column.title}>
            <h2 className="text-sm font-bold uppercase">{column.title}</h2>
            <ul className="mt-5 space-y-2 text-sm">
              {column.links.map((link) => (
                <li key={link}>
                  <a href="#" className="hover:underline">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <form onSubmit={subscribe} className="mt-14 max-w-lg">
        <label htmlFor="footer-email" className="text-sm font-bold">Get the latest drops</label>
        <div className="mt-3 flex gap-2"><input id="footer-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" placeholder="Email address" className="h-11 min-w-0 flex-1 border border-white bg-black px-3 text-sm text-white placeholder:text-white/70" /><button type="submit" className="min-h-11 border border-white px-4 text-xs font-bold uppercase">Join</button></div>
        <p className="mt-2 text-xs">Demo, stored only in this browser.</p>
        {message && <p role="status" className="mt-2 text-xs">{message}</p>}
      </form>

      <div className="mt-16 flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
        <img src={footerImage} alt="Spindrop — Music in your hands" className="w-full max-w-md" />
        <div className="flex flex-col gap-6 text-xs lg:items-end">
          <div className="flex gap-5 text-sm font-bold">
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Instagram">◎</a>
            <a href="#" aria-label="X">𝕏</a>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Legal Information</a>
            <span>© Spindrop</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
