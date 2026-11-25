type RecordIconProps = {
  className?: string;
};

export default function RecordIcon({ className }: RecordIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="10.25" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="7.25" stroke="currentColor" strokeWidth="1" opacity="0.55" />
      <circle cx="12" cy="12" r="5.25" stroke="currentColor" strokeWidth="1" opacity="0.35" />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm0 2.25a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Z"
      />
    </svg>
  );
}
