import footerImage from '../assets/footer-img.png';

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
