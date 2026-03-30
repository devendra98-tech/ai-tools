import Link from "next/link";
import type { ReactNode } from "react";

type HomeFeatureCardProps = {
  href: string;
  icon: ReactNode;
  title: string;
  description: string;
  tags: readonly string[];
  tagClassName: string;
};

export function HomeFeatureCard({
  href,
  icon,
  title,
  description,
  tags,
  tagClassName,
}: HomeFeatureCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-3xl border border-slate-200 bg-white p-8 text-left shadow-sm transition hover:border-slate-300 hover:shadow-md"
    >
      <div className="mb-5 flex size-12 items-center justify-center rounded-xl [&_svg]:size-6">
        {icon}
      </div>
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <p className="mt-3 flex-1 text-base leading-relaxed text-slate-600">
        {description}
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${tagClassName}`}
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
