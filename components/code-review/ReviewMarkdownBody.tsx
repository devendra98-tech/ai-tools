import ReactMarkdown from "react-markdown";

type ReviewMarkdownBodyProps = {
  markdown: string;
};

export function ReviewMarkdownBody({ markdown }: ReviewMarkdownBodyProps) {
  return (
    <div
      className="prose prose-sm max-w-none prose-headings:mt-4 prose-headings:mb-2 prose-headings:font-bold prose-headings:text-slate-900 prose-h3:text-base prose-p:my-2 prose-p:text-slate-600 prose-p:leading-relaxed prose-li:text-slate-600 prose-strong:text-slate-800 prose-code:rounded prose-code:bg-slate-100 prose-code:px-1 prose-code:text-slate-800 prose-pre:bg-slate-900 prose-pre:text-slate-100"
    >
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
}
