type ReviewStatusBadgeProps = {
  status: "ready" | "reviewing" | "error";
};

const styles = {
  ready: "bg-teal-100 text-teal-800 border-teal-200/80",
  reviewing: "bg-blue-100 text-blue-800 border-blue-200/80",
  error: "bg-orange-100 text-orange-900 border-orange-200/80",
} as const;

const labels = {
  ready: "Ready",
  reviewing: "Reviewing",
  error: "Error",
} as const;

export function ReviewStatusBadge({ status }: ReviewStatusBadgeProps) {
  return (
    <span
      className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}
