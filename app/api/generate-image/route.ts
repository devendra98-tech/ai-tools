import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

/** Text-to-image; see https://ai.google.dev/gemini-api/docs/image-generation */
const IMAGE_MODEL = "gemini-2.5-flash-image";

function parseRetryAfterSeconds(message: string): number | undefined {
  const retryIn = message.match(/Please retry in ([\d.]+)\s*s/i);
  if (retryIn) return Math.max(1, Math.ceil(Number.parseFloat(retryIn[1])));
  const delayJson = message.match(/"retryDelay"\s*:\s*"(\d+)s"/);
  if (delayJson) return Math.max(1, parseInt(delayJson[1], 10));
  return undefined;
}

function geminiErrorPayload(err: unknown): {
  status: number;
  body: { error: string; details?: string; retryAfterSeconds?: number };
} {
  const message = err instanceof Error ? err.message : String(err);
  const is429 =
    message.includes("[429") || message.includes("429 Too Many Requests");
  const quotaHit =
    /quota exceeded|Quota exceeded|RESOURCE_EXHAUSTED|free_tier/i.test(
      message,
    );
  const retryAfterSeconds = parseRetryAfterSeconds(message);
  const details =
    process.env.NODE_ENV === "development" ? message : undefined;

  if (is429 && quotaHit) {
    return {
      status: 429,
      body: {
        error:
          "Gemini image quota exceeded (free tier limits for this model). Wait and try again, or enable billing in Google AI Studio for higher limits. See https://ai.google.dev/gemini-api/docs/rate-limits",
        details,
        ...(retryAfterSeconds != null ? { retryAfterSeconds } : {}),
      },
    };
  }

  if (is429) {
    return {
      status: 429,
      body: {
        error:
          "Too many requests to the image model. Please wait a moment and try again.",
        details,
        ...(retryAfterSeconds != null ? { retryAfterSeconds } : {}),
      },
    };
  }

  return {
    status: 502,
    body: {
      error:
        "Image generation failed. Check GEMINI_API_KEY, billing, and model availability.",
      details,
    },
  };
}

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

  let prompt: string;
  try {
    const body = await req.json();
    prompt = body?.prompt;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body. Expected { prompt }." },
      { status: 400 },
    );
  }

  if (typeof prompt !== "string" || !prompt.trim()) {
    return NextResponse.json(
      { error: "Missing or empty \"prompt\" in request body." },
      { status: 400 },
    );
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: IMAGE_MODEL });

  try {
    const result = await model.generateContent(prompt.trim());
    const response = result.response;

    const blockReason = response.promptFeedback?.blockReason;
    if (blockReason) {
      return NextResponse.json(
        {
          error: "Prompt was blocked by safety settings.",
          details: String(blockReason),
        },
        { status: 400 },
      );
    }

    const parts = response.candidates?.[0]?.content?.parts ?? [];
    for (const part of parts) {
      if (
        "inlineData" in part &&
        part.inlineData?.data &&
        part.inlineData?.mimeType
      ) {
        return NextResponse.json({
          imageBase64: part.inlineData.data,
          mimeType: part.inlineData.mimeType,
        });
      }
    }

    let textHint: string | undefined;
    try {
      textHint = response.text();
    } catch {
      // No text assembled (e.g. empty candidates).
    }

    return NextResponse.json(
      {
        error: "The model did not return an image.",
        details: textHint || undefined,
      },
      { status: 502 },
    );
  } catch (err) {
    console.error("[api/generate-image] Gemini error:", err);
    const { status, body } = geminiErrorPayload(err);
    return NextResponse.json(body, { status });
  }
}
