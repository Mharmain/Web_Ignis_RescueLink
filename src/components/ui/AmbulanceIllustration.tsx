// Static SVG ambulance, used when 3D is off (no WebGL / reduced motion / weak device).
export default function AmbulanceIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 520 340" className={className} role="img" aria-label="Illustration of an ambulance driving toward a fire site">
      <defs>
        <linearGradient id="il-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#E8F0FE" /><stop offset="1" stopColor="#F5F9FF" /></linearGradient>
      </defs>
      <rect x="10" y="10" width="500" height="320" rx="28" fill="url(#il-sky)" stroke="#DCE7F5" />
      <circle cx="410" cy="80" r="46" fill="#E5484D" opacity=".12" />
      <circle cx="410" cy="80" r="26" fill="#E5484D" opacity=".18" />
      {/* city */}
      <g fill="#BFD7FF"><rect x="40" y="150" width="46" height="110" rx="4" /><rect x="96" y="120" width="40" height="140" rx="4" /><rect x="146" y="170" width="50" height="90" rx="4" /><rect x="340" y="140" width="44" height="120" rx="4" /><rect x="394" y="165" width="50" height="95" rx="4" /><rect x="454" y="130" width="34" height="130" rx="4" /></g>
      <g fill="#fff" opacity=".8"><rect x="52" y="166" width="10" height="10" /><rect x="68" y="166" width="10" height="10" /><rect x="108" y="140" width="10" height="10" /><rect x="352" y="160" width="10" height="10" /><rect x="466" y="150" width="10" height="10" /></g>
      {/* fire marker */}
      <path d="M416 258c-22-18-8-40 4-58 4 10 10 14 16 20 6-8 6-18 4-28 22 20 30 44 8 66z" fill="#F2B04A" />
      <path d="M424 258c-12-10-4-24 4-34 3 6 6 8 10 12 8 8 4 18-2 22z" fill="#E5484D" />
      {/* road + route */}
      <rect x="10" y="258" width="500" height="72" fill="#DCE7F5" />
      <path d="M40 292h330" stroke="#E5484D" strokeWidth="5" strokeDasharray="14 10" strokeLinecap="round" />
      {/* ambulance */}
      <g transform="translate(110 168)">
        <rect x="0" y="8" width="150" height="86" rx="12" fill="#fff" stroke="#DCE7F5" strokeWidth="2" />
        <path d="M150 34h46c6 0 11 3 14 8l16 26c2 3 3 6 3 10v16h-79z" fill="#fff" stroke="#DCE7F5" strokeWidth="2" />
        <path d="M162 44h28l14 22h-42z" fill="#9CC8FF" />
        <rect x="0" y="62" width="150" height="14" fill="#E5484D" />
        <rect x="58" y="22" width="14" height="36" rx="3" fill="#E5484D" /><rect x="47" y="33" width="36" height="14" rx="3" fill="#E5484D" />
        <rect x="150" y="14" width="22" height="14" rx="4" fill="#E5484D" /><rect x="176" y="14" width="22" height="14" rx="4" fill="#2F6FEB" />
        <circle cx="46" cy="98" r="19" fill="#1B2B44" /><circle cx="46" cy="98" r="8" fill="#DCE7F5" />
        <circle cx="178" cy="98" r="19" fill="#1B2B44" /><circle cx="178" cy="98" r="8" fill="#DCE7F5" />
      </g>
    </svg>
  );
}
