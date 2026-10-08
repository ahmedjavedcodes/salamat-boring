export function SkipLink({ label }: { label: string }) {
  return (
    <a
      href="#main"
      className="focus:rounded-input focus:bg-aquifer focus:text-limewash sr-only focus:not-sr-only focus:fixed focus:start-3 focus:top-3 focus:z-50 focus:px-4 focus:py-3 focus:text-base"
    >
      {label}
    </a>
  );
}
