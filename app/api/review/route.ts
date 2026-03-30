import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

/** Stable model id — see https://ai.google.dev/gemini-api/docs/models/gemini */
const GEMINI_MODEL = "gemini-2.5-flash";

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey?.trim()) {
    return NextResponse.json(
      {
        error:
          "Server misconfiguration: GEMINI_API_KEY is missing. Add it to .env.local and restart the dev server.",
      },
      { status: 503 },
    );
  }

  let code: string;
  let language: string;
  try {
    const body = await req.json();
    code = body?.code;
    language = body?.language ?? "text";
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body. Expected { code, language }." },
      { status: 400 },
    );
  }

  if (typeof code !== "string" || !code.trim()) {
    return NextResponse.json(
      { error: "Missing or empty \"code\" in request body." },
      { status: 400 },
    );
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

  const prompt = `You are a senior code reviewer. Review this ${language} code and provide:
1. **Bugs** – any logic errors or crashes
2. **Code Quality** – naming, structure, readability
3. **Security** – any unsafe patterns
4. **Suggestions** – how to improve it

Code:
\`\`\`${language}
${code}
\`\`\`

Be concise and specific. Use bullet points.`;

  try {
    const result = await model.generateContent(prompt);
    const review = result.response.text();
    return NextResponse.json({ review });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[api/review] Gemini error:", message);
    return NextResponse.json(
      {
        error:
          "The review service failed. Check GEMINI_API_KEY, billing, and model availability.",
        details: process.env.NODE_ENV === "development" ? message : undefined,
      },
      { status: 502 },
    );
  }
}
