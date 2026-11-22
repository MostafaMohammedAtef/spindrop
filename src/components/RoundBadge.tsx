import recordIcon from '../assets/vinyl_record.svg';

export default function RoundBadge({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label="Over 1 million dollars paid to artists"
    >
      <defs>
        <path
          id="badge-circle"
          d="M 100,100 m -70,0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
        />
      </defs>
      <text className="fill-black text-[15px] font-bold uppercase tracking-widest">
        <textPath href="#badge-circle">Over $1 million paid to artists</textPath>
      </text>
      <image href={recordIcon} x="62" y="62" width="76" height="76" />
    </svg>
  );
}
