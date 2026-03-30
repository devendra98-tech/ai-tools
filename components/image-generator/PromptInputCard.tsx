import { ArrowUpRightIcon } from "@/components/ui/Icons";
import { Spinner } from "@/components/ui/Spinner";
import { StyleChip } from "@/components/image-generator/StyleChip";

const STYLE_OPTIONS = ["Photorealistic", "Cinematic", "Watercolor"] as const;

type PromptInputCardProps = {
  prompt: string;
  onPromptChange: (value: string) => void;
  selectedStyles: Set<string>;
  onToggleStyle: (style: string) => void;
  onGenerate: () => void;
  loading: boolean;
  canGenerate: boolean;
};

export function PromptInputCard({
  prompt,
  onPromptChange,
  selectedStyles,
  onToggleStyle,
  onGenerate,
  loading,
  canGenerate,
}: PromptInputCardProps) {
  return (
    <div className="mb-8 rounded-2xl border border-slate-200/90 bg-[#f5f0e6]/80 shadow-sm">
      <textarea
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        placeholder="A red panda reading a book in a cozy autumn library, warm lighting, photorealistic…"
        rows={5}
        className="w-full resize-none rounded-t-2xl border-0 bg-transparent px-6 py-5 text-base font-medium text-slate-900 placeholder:font-normal placeholder:text-slate-400 focus:outline-none focus:ring-0"
        aria-label="Image prompt"
      />
      <div className="border-t border-slate-200/80" />
      <div className="flex flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {STYLE_OPTIONS.map((s) => (
            <StyleChip
              key={s}
              label={s}
              selected={selectedStyles.has(s)}
              onClick={() => onToggleStyle(s)}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={onGenerate}
          disabled={!canGenerate || loading}
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-teal-400 px-6 text-sm font-bold text-white shadow-md shadow-blue-500/20 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <>
              <Spinner className="size-4 animate-spin" />
              Generating…
            </>
          ) : (
            <>
              Generate
              <ArrowUpRightIcon className="size-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
