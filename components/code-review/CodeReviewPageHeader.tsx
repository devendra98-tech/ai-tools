import { ArrowUpRightIcon, ChevronDownIcon, CodeBracketsIcon } from "@/components/ui/Icons";
import { Spinner } from "@/components/ui/Spinner";

type CodeReviewPageHeaderProps = {
  languages: readonly string[];
  language: string;
  onLanguageChange: (value: string) => void;
  onReview: () => void;
  loading: boolean;
};

const displayLanguage = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

export function CodeReviewPageHeader({
  languages,
  language,
  onLanguageChange,
  onReview,
  loading,
}: CodeReviewPageHeaderProps) {
  return (
    <div className="flex flex-col gap-6 border-b border-slate-200/90 bg-white pb-8 lg:flex-row lg:items-end lg:justify-between">
      <div className="flex gap-4">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
          <CodeBracketsIcon className="size-7" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            AI Code Reviewer
          </h1>
          <p className="mt-1 text-base text-slate-600">
            Paste your code and get instant AI-powered feedback
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative">
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="h-12 w-full min-w-[180px] appearance-none rounded-xl border border-slate-200 bg-white pl-4 pr-10 text-sm font-medium text-slate-800 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 sm:w-auto"
            aria-label="Programming language"
          >
            {languages.map((l) => (
              <option key={l} value={l}>
                {displayLanguage(l)}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-slate-500" />
        </div>

        <button
          type="button"
          onClick={onReview}
          disabled={loading}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-emerald-400 px-6 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Spinner className="size-5 animate-spin" />
              Reviewing…
            </>
          ) : (
            <>
              Review Code
              <ArrowUpRightIcon className="size-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
