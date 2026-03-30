"use client";

import Editor from "@monaco-editor/react";
import { useState } from "react";
import { CodeEditorPanel } from "@/components/code-review/CodeEditorPanel";
import { CodeReviewPageHeader } from "@/components/code-review/CodeReviewPageHeader";
import { ReviewPanel } from "@/components/code-review/ReviewPanel";
import CodeReviewService from "../services/code.review.service";

const LANGUAGES = [
  "javascript",
  "typescript",
  "python",
  "java",
  "go",
  "rust",
] as const;

export default function CodeReviewPage() {
  const [code, setCode] = useState(`function fetchUser(id) {
  return fetch(\`/api/users/\${id}\`)
    .then((res) => res.json());
}

// Paste your code here...`);
  const [language, setLanguage] = useState<string>("javascript");
  const [review, setReview] = useState("");
  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleReview = async () => {
    setLoading(true);
    setApiError(null);
    setReview("");

    const res = await CodeReviewService.codeReview(code, language);
    if ("error" in res) {
      setReview("");
      setApiError(
        res.details ? `${res.error}\n\n${res.details}` : res.error,
      );
    } else {
      setReview(res.review?.trim() ? res.review : "No review returned.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-0 flex-1 bg-[#f8f9fa]">
      <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">
        <CodeReviewPageHeader
          languages={LANGUAGES}
          language={language}
          onLanguageChange={setLanguage}
          onReview={handleReview}
          loading={loading}
        />

        <div className="mt-8 grid min-h-0 gap-6 lg:grid-cols-2 lg:gap-8">
          <CodeEditorPanel>
            <div className="h-[min(560px,calc(100vh-220px))] min-h-[480px] overflow-hidden rounded-lg">
              <Editor
                height="100%"
                language={language}
                value={code}
                onChange={(v) => setCode(v || "")}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  padding: { top: 16 },
                  scrollBeyondLastLine: false,
                }}
              />
            </div>
          </CodeEditorPanel>

          <ReviewPanel
            loading={loading}
            apiError={apiError}
            review={review}
          />
        </div>
      </div>
    </div>
  );
}
