export default function ArrowRight({ className = "text-primary size-5" }) {
  return (
     <svg
      className={className}
      viewBox="0 0 24 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 8H22 M13 2Q16 6 22 8 Q16 10 13 14" />
    </svg>
  );
}