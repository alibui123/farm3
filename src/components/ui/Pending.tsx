import { SHOW_PENDING } from "@/lib/constants";

/** Dashed "To confirm" note for facts awaiting client sign-off. Renders nothing in production. */
export function Pending({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  if (!SHOW_PENDING) return null;
  return (
    <div
      className={`rounded-2xl border border-dashed border-amber-deep/60 bg-amber/10 px-4 py-3 text-sm text-soil ${className}`}
    >
      <PendingBadge className="mr-2" />
      {children}
    </div>
  );
}

/** Small "To confirm" pill. Also renders nothing in production. */
export function PendingBadge({ className = "" }: { className?: string }) {
  if (!SHOW_PENDING) return null;
  return (
    <span
      className={`inline-block rounded-full bg-amber px-2 py-0.5 align-[1px] text-[10px] font-semibold tracking-[0.12em] text-soil uppercase ${className}`}
    >
      To confirm
    </span>
  );
}
