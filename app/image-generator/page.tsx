"use client";

import { useCallback, useState } from "react";
import { ImageGenPageHeader } from "@/components/image-generator/ImageGenPageHeader";
import { OutputCard } from "@/components/image-generator/OutputCard";
import { PromptInputCard } from "@/components/image-generator/PromptInputCard";
import { RecentGenerationsList } from "@/components/image-generator/RecentGenerationsList";
import type { RecentGeneration } from "@/components/image-generator/types";
import ImageGeneratorService from "../services/image.generator.service";

function titleFromPrompt(text: string) {
  const t = text.trim();
  if (!t) return "Untitled";
  return t.length > 42 ? `${t.slice(0, 42)}…` : t;
}

function downloadDataUrl(dataUrl: string, filename: string) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export default function ImageGeneratorPage() {
  const [prompt, setPrompt] = useState(
    "A red panda reading a book in a cozy autumn library, warm lighting, photorealistic…",
  );
  const [selectedStyles, setSelectedStyles] = useState<Set<string>>(new Set());
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [recent, setRecent] = useState<RecentGeneration[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const buildPromptForApi = useCallback(() => {
    const base = prompt.trim();
    if (selectedStyles.size === 0) return base;
    return `${base}${base ? ", " : ""}${[...selectedStyles].join(", ")}`;
  }, [prompt, selectedStyles]);

  const toggleStyle = (style: string) => {
    setSelectedStyles((prev) => {
      const next = new Set(prev);
      if (next.has(style)) next.delete(style);
      else next.add(style);
      return next;
    });
  };

  const handleGenerate = async () => {
    const finalPrompt = buildPromptForApi();
    if (!finalPrompt) return;

    setLoading(true);
    setApiError(null);
    setImageSrc(null);

    const res = await ImageGeneratorService.generateImage(finalPrompt);
    if ("error" in res) {
      let msg = res.details ? `${res.error}\n\n${res.details}` : res.error;
      if (
        typeof res.retryAfterSeconds === "number" &&
        Number.isFinite(res.retryAfterSeconds)
      ) {
        msg += `\n\nSuggested wait: about ${res.retryAfterSeconds}s before retrying.`;
      }
      setApiError(msg);
    } else {
      const src = `data:${res.mimeType};base64,${res.imageBase64}`;
      setImageSrc(src);
      const id =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}`;
      const item: RecentGeneration = {
        id,
        title: titleFromPrompt(finalPrompt),
        createdAt: Date.now(),
        prompt: finalPrompt,
        imageSrc: src,
      };
      setRecent((prev) => [item, ...prev]);
      setSelectedId(id);
    }

    setLoading(false);
  };

  const handleSelectRecent = (id: string) => {
    const item = recent.find((r) => r.id === id);
    if (!item) return;
    setSelectedId(id);
    setPrompt(item.prompt);
    setImageSrc(item.imageSrc);
    setApiError(null);
  };

  const handleDownload = () => {
    if (!imageSrc) return;
    downloadDataUrl(imageSrc, `ai-tools-${Date.now()}.png`);
  };

  const handleShare = async () => {
    if (!prompt.trim()) return;
    try {
      await navigator.clipboard.writeText(prompt.trim());
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="min-h-0 flex-1 bg-[#fcfaf2]">
      <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">
        <ImageGenPageHeader />

        <PromptInputCard
          prompt={prompt}
          onPromptChange={setPrompt}
          selectedStyles={selectedStyles}
          onToggleStyle={toggleStyle}
          onGenerate={handleGenerate}
          loading={loading}
          canGenerate={Boolean(buildPromptForApi())}
        />

        <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-8">
          <div className="min-w-0 flex-1">
            <OutputCard
              loading={loading}
              apiError={apiError}
              imageSrc={imageSrc}
              onDownload={handleDownload}
              onShare={handleShare}
            />
          </div>
          <RecentGenerationsList
            items={recent}
            selectedId={selectedId}
            onSelect={handleSelectRecent}
          />
        </div>
      </div>
    </div>
  );
}
