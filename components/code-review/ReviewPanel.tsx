import { ReviewFindingCard } from "@/components/code-review/ReviewFindingCard";
import { ReviewMarkdownBody } from "@/components/code-review/ReviewMarkdownBody";
import { ReviewStatusBadge } from "@/components/code-review/ReviewStatusBadge";
import { Spinner } from "@/components/ui/Spinner";

type ReviewPanelProps = {
  loading: boolean;
  apiError: string | null;
  review: string;
};

export function ReviewPanel({ loading, apiError, review }: ReviewPanelProps) {
  const badgeStatus = loading ? "reviewing" : apiError ? "error" : "ready";

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-[#ece8e0]/40 shadow-sm">
      <div className="flex items-center gap-3 border-b border-slate-200/80 bg-[#f3f1ec] px-5 py-3">
        <span className="text-sm font-semibold text-slate-700">Review</span>
        <ReviewStatusBadge status={badgeStatus} />
      </div>

      <div className="custom-scrollbar min-h-[480px] flex-1 space-y-4 overflow-y-auto bg-[#f8f7f4] p-5 sm:min-h-[560px]">
        {loading && !apiError && (
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <Spinner className="size-5 shrink-0 animate-spin text-blue-500" />
            Analyzing your code…
          </div>
        )}

        {apiError && (
          <ReviewFindingCard variant="warning" title="Something went wrong">
            <pre className="whitespace-pre-wrap font-sans text-sm">
              {apiError}
            </pre>
          </ReviewFindingCard>
        )}

        {!loading && !apiError && !review && (
          <>
            <p className="text-sm text-slate-500">
              Run a review to see AI feedback here. Example findings:
            </p>
            <ReviewFindingCard variant="warning" title="Missing error handling">
              Consider wrapping async calls in try/catch so failures surface
              clearly to callers and users.
            </ReviewFindingCard>
            <ReviewFindingCard variant="suggestion" title="Consider async/await">
              Chained <code className="text-xs">.then()</code> can be replaced
              with async/await for readability and easier debugging.
            </ReviewFindingCard>
            <ReviewFindingCard variant="info" title="Add JSDoc comment">
              Document parameters and return values to help teammates and
              tooling understand this function at a glance.
            </ReviewFindingCard>
          </>
        )}

        {!loading && !apiError && review ? (
          <ReviewMarkdownBody markdown={review} />
        ) : null}
      </div>
    </div>
  );
}
