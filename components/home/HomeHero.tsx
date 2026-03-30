import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/ui/Icons";

export function HomeHero() {
  return (
    <section className="relative px-4 pb-20 pt-16 text-center sm:px-6 sm:pb-28 sm:pt-20 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-orange-200 sm:text-5xl lg:text-6xl">
          Your AI toolkit,
          <br />
          <span className="bg-gradient-to-r from-purple-500 via-blue-500 to-teal-400 bg-clip-text text-transparent">
            all in one place
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-orange-200 sm:text-xl">
          Review code instantly and generate stunning images 
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-gl5">
          <Link
            href="/code-review"
            className="inline-flex w-full min-w-[200px] items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-teal-400 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-purple-500/25 transition hover:opacity-95 sm:w-auto"
          >
            Get started
          </Link>
          <Link
            href="/image-generator"
            className="inline-flex w-full min-w-[200px] items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white/90 px-8 py-3.5 text-base font-bold text-slate-800 shadow-sm transition hover:bg-white sm:w-auto"
          >
            See examples
            <ArrowUpRightIcon className="size-4 text-slate-600" />
          </Link>
        </div>
      </div>
    </section>
  );
}
