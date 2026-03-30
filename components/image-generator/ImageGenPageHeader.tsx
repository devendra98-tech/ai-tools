import { ImageMountainIcon } from "@/components/ui/Icons";

export function ImageGenPageHeader() {
  return (
    <div className="mb-8 flex gap-4">
      <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-teal-100 text-teal-700">
        <ImageMountainIcon className="size-7" />
      </div>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
          AI Image Generator
        </h1>
        <p className="mt-1 text-base text-slate-600">
          Describe what you want, generate stunning visuals instantly
        </p>
      </div>
    </div>
  );
}
