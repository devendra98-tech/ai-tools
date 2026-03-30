import Link from "next/link";

type BrandLogoProps = {
  /** Home / code-review use teal; image generator uses blue per design */
  accent?: "teal" | "blue";
  className?: string;
};

const accentClasses = {
  teal: "bg-teal-500",
  blue: "bg-blue-500",
} as const;

export function BrandLogo({ accent = "teal", className }: BrandLogoProps) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2.5 shrink-0 ${className ?? ""}`}
    >
      <span
        className={`flex size-9 items-center justify-center rounded-lg text-sm font-bold text-white ${accentClasses[accent]}`}
      >
        AI
      </span>
      <span className="text-base font-bold tracking-tight text-white">
        AI Tools
      </span>
    </Link>
  );
}
