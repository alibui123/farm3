/** Frosted card with a CSS-only hover lift (no JS on mouse move). */
export function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`glass relative overflow-hidden rounded-3xl transition-transform duration-300 ease-out hover:-translate-y-1 motion-reduce:hover:translate-y-0 ${className}`}
    >
      {children}
    </div>
  );
}
