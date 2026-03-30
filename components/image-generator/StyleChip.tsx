type StyleChipProps = {
  label: string;
  selected?: boolean;
  onClick?: () => void;
};

export function StyleChip({ label, selected, onClick }: StyleChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
        selected
          ? "border-slate-800 bg-slate-800 text-white"
          : "border-slate-300 bg-white/80 text-slate-700 hover:border-slate-400"
      }`}
    >
      {label}
    </button>
  );
}
