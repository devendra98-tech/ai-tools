import { formatRelativeTime } from "@/components/image-generator/formatRelativeTime";
import type { RecentGeneration } from "@/components/image-generator/types";

type RecentGenerationsListProps = {
  items: RecentGeneration[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

const thumbGradients = [
  "from-blue-500 to-teal-400",
  "from-amber-400 to-yellow-300",
  "from-teal-500 to-emerald-400",
] as const;

export function RecentGenerationsList({
  items,
  selectedId,
  onSelect,
}: RecentGenerationsListProps) {
  return (
    <div className="flex w-full shrink-0 flex-col rounded-2xl border border-slate-200/90 bg-[#f5f0e6]/80 shadow-sm lg:w-[300px] xl:w-[320px]">
      <div className="border-b border-slate-200/80 px-5 py-3">
        <span className="text-sm font-semibold text-slate-800">
          Recent generations
        </span>
      </div>
      <ul className="max-h-[480px] overflow-y-auto p-3">
        {items.length === 0 ? (
          <li className="px-2 py-6 text-center text-sm text-slate-500">
            No generations yet. Create one to see it here.
          </li>
        ) : (
          items.map((item, index) => {
            const selected = item.id === selectedId;
            const grad = thumbGradients[index % thumbGradients.length];
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onSelect(item.id)}
                  className={`flex w-full gap-3 rounded-xl p-2.5 text-left transition ${
                    selected
                      ? "bg-[#e8e0d4] ring-1 ring-slate-300/60"
                      : "hover:bg-white/60"
                  }`}
                >
                  <span
                    className={`size-12 shrink-0 rounded-lg bg-gradient-to-br ${grad}`}
                    aria-hidden
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-slate-950">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {formatRelativeTime(item.createdAt)}
                    </p>
                  </div>
                </button>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}
