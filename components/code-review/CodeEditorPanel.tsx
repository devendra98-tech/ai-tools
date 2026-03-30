import type { ReactNode } from "react";
import { TrafficLights } from "@/components/code-review/TrafficLights";

type CodeEditorPanelProps = {
  children: ReactNode;
};

export function CodeEditorPanel({ children }: CodeEditorPanelProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-[#ece8e0]/40 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200/80 bg-[#f3f1ec] px-5 py-3">
        <span className="text-sm font-semibold text-slate-700">Input</span>
        <TrafficLights />
      </div>
      <div className="min-h-[480px] flex-1 overflow-hidden rounded-b-2xl bg-[#0b0f1a] p-1 sm:min-h-[560px]">
        {children}
      </div>
    </div>
  );
}
