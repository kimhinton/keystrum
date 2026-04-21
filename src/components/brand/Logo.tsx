type LogoProps = {
  size?: number;
  className?: string;
};

export function Logo({ size = 24, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 130 130"
      className={className}
      aria-hidden="true"
      role="img"
    >
      <circle cx="32" cy="44" r="16" fill="#FF3864" />
      <circle cx="72" cy="30" r="11" fill="#FFC857" />
      <rect x="60" y="58" width="28" height="28" rx="8" fill="#7B2CBF" />
      <circle cx="98" cy="82" r="13" fill="#2EC4B6" />
      <rect x="22" y="80" width="22" height="22" rx="6" fill="#FFC857" transform="rotate(15 33 91)" />
      <circle cx="76" cy="106" r="8" fill="#FF3864" />
    </svg>
  );
}
