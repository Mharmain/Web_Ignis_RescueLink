// Logo: red rounded square with a white side-view ambulance + wordmark.
export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" role="img" aria-label="Ignis RescueLink logo">
      <rect width="40" height="40" rx="8.8" fill="#E5484D" />
      {/* body */}
      <rect x="6.5" y="13" width="16.5" height="12.5" rx="1.8" fill="#fff" />
      {/* cab */}
      <path d="M23 16.5h6.2c.5 0 1 .25 1.3.65l2.6 3.5c.25.3.4.7.4 1.1V25.5H23z" fill="#fff" />
      <path d="M25 18.3h3.7l2 2.7H25z" fill="#E5484D" />
      {/* cross */}
      <rect x="13.6" y="15.2" width="2.2" height="8" rx=".5" fill="#E5484D" />
      <rect x="10.7" y="18.1" width="8" height="2.2" rx=".5" fill="#E5484D" />
      {/* wheels */}
      <circle cx="12.5" cy="26.6" r="3" fill="#fff" stroke="#E5484D" strokeWidth="1.2" />
      <circle cx="12.5" cy="26.6" r="1" fill="#E5484D" />
      <circle cx="28.5" cy="26.6" r="3" fill="#fff" stroke="#E5484D" strokeWidth="1.2" />
      <circle cx="28.5" cy="26.6" r="1" fill="#E5484D" />
    </svg>
  );
}

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark />
      <span className="text-xl font-extrabold leading-none tracking-tight">
        <span className={light ? "text-white" : "text-navy"}>Ignis</span>{" "}
        <span className="text-brand">RescueLink</span>
      </span>
    </span>
  );
}
