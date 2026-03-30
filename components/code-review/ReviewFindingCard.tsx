import type { ReactNode } from "react";

type FindingVariant = "warning" | "suggestion" | "info";

type ReviewFindingCardProps = {
  variant: FindingVariant;
  title: string;
  children: ReactNode;
};

const variants: Record<
  FindingVariant,
  { dot: string; border: string; bg: string; title: string }
> = {
  warning: {
    dot: "bg-orange-500",
    border: "border-orange-200",
    bg: "bg-orange-50/90",
    title: "text-orange-950",
  },
  suggestion: {
    dot: "bg-teal-500",
    border: "border-teal-200",
    bg: "bg-teal-50/90",
    title: "text-teal-950",
  },
  info: {
    dot: "bg-blue-500",
    border: "border-slate-200",
    bg: "bg-slate-50/90",
    title: "text-slate-900",
  },
};

export function ReviewFindingCard({
  variant,
  title,
  children,
}: ReviewFindingCardProps) {
  const v = variants[variant];
  return (
    <article
      className={`rounded-xl border px-4 py-3.5 ${v.border} ${v.bg}`}
    >
      <div className="flex gap-2.5">
        <span
          className={`mt-1.5 size-2 shrink-0 rounded-full ${v.dot}`}
          aria-hidden
        />
        <div className="min-w-0 flex-1">
          <h3 className={`text-sm font-bold ${v.title}`}>{title}</h3>
          <div className="mt-1.5 text-sm leading-relaxed text-slate-600">
            {children}
          </div>
        </div>
      </div>
    </article>
  );
}
