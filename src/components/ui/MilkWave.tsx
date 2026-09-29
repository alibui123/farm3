export function MilkWaveDivider({
  flip = false,
  className = "",
  from = "#FBF7EE",
  to = "#FFFFFF",
}: {
  flip?: boolean;
  className?: string;
  from?: string;
  to?: string;
}) {
  return (
    <div
      className={`relative -mb-px h-16 w-full overflow-hidden md:h-24 ${className}`}
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className={`absolute inset-0 h-full w-full ${flip ? "rotate-180" : ""}`}
      >
        <path
          fill={to}
          d="M0,64 C240,120 480,0 720,48 C960,96 1200,16 1440,64 L1440,120 L0,120 Z"
        />
        <path
          fill={from}
          fillOpacity="0.35"
          d="M0,80 C280,20 520,100 760,60 C1000,20 1240,90 1440,40 L1440,0 L0,0 Z"
        />
      </svg>
    </div>
  );
}

export function OrganicBlob({
  className = "",
  color = "#A9C4A0",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      aria-hidden
      style={{ color }}
    >
      <path
        fill="currentColor"
        d="M44.7,-67.2C57.2,-59.3,65.8,-44.6,72.4,-28.8C79,-13,83.6,3.9,79.5,18.9C75.4,33.9,62.6,46.9,48.1,57.2C33.6,67.5,16.8,75.1,0.2,74.8C-16.4,74.5,-32.8,66.3,-46.9,55.4C-61,44.5,-72.8,30.9,-77.4,14.7C-82,-1.5,-79.4,-20.3,-70.6,-34.8C-61.8,-49.3,-46.8,-59.5,-31.6,-66.4C-16.4,-73.3,-0.9,-77,14.2,-75.1C29.3,-73.2,32.2,-75.1,44.7,-67.2Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}
