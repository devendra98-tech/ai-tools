import Image from "next/image";
import { ImagePlaceholderIcon } from "@/components/ui/Icons";
import { Spinner } from "@/components/ui/Spinner";

type OutputCardProps = {
  loading: boolean;
  apiError: string | null;
  imageSrc: string | null;
  onDownload?: () => void;
  onShare?: () => void;
};

export function OutputCard({
  loading,
  apiError,
  imageSrc,
  onDownload,
  onShare,
}: OutputCardProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col rounded-2xl border border-slate-200/90 bg-[#f5f0e6]/80 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 px-5 py-3">
        <span className="text-sm font-semibold text-slate-800">Output</span>
        <div className="flex gap-2">
          <button
            type="button"
            disabled={!imageSrc}
            onClick={onDownload}
            className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Download
          </button>
          <button
            type="button"
            disabled={!imageSrc}
            onClick={onShare}
            className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Share
          </button>
        </div>
      </div>

      <div className="flex min-h-[320px] flex-1 flex-col p-5 sm:min-h-[400px]">
        {loading && !apiError && (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-slate-400">
            <Spinner className="size-8 animate-spin text-teal-400" />
            <p className="text-sm">Creating your image…</p>
          </div>
        )}

        {apiError && (
          <div className="flex flex-1 items-center justify-center rounded-xl border border-red-200 bg-red-50 p-6">
            <pre className="max-h-full overflow-auto whitespace-pre-wrap text-sm text-red-800">
              {apiError}
            </pre>
          </div>
        )}

        {!loading && !apiError && !imageSrc && (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-xl bg-gradient-to-br from-[#1a1f35] via-[#252048] to-[#1a1f35] px-6 text-center">
            <ImagePlaceholderIcon className="size-14 text-slate-500" />
            <p className="text-sm font-medium text-slate-500">
              Generated image appears here
            </p>
          </div>
        )}

        {!loading && !apiError && imageSrc && (
          <div className="relative flex flex-1 items-center justify-center overflow-hidden rounded-xl border border-slate-200/80 bg-slate-900/5">
            <Image
              src={imageSrc}
              alt="Generated from your prompt"
              width={1024}
              height={1024}
              unoptimized
              className="max-h-[min(70vh,560px)] w-auto max-w-full object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
}
