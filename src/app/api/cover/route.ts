import { buildCoverPrompt, coverModel, findCoverGenre, findCoverTheme } from "@/lib/cover-prompt";
import { coverAlreadyUsed, markCoverUsed } from "@/lib/cover-limit";

export const runtime = "nodejs";
export const maxDuration = 180;

const OPENROUTER_URL = "https://openrouter.ai/api/v1/images";

function usedCookie() {
  const secure = process.env.VERCEL ? "; Secure" : "";
  return `cover_used=1; Path=/; Max-Age=31536000; HttpOnly; SameSite=Lax${secure}`;
}

function hasUsedCookie(request: Request) {
  return (request.headers.get("cookie") || "")
    .split(";")
    .some((part) => part.trim() === "cover_used=1");
}

async function alreadyUsed(request: Request) {
  if (hasUsedCookie(request)) return true;
  return coverAlreadyUsed(request);
}

class CoverError extends Error {
  status: number;
  constructor(message: string, status = 502) {
    super(message);
    this.status = status;
  }
}

function providerMessage(body: string, fallback: string) {
  try {
    const parsed = JSON.parse(body) as {
      error?: { message?: string } | string;
      message?: string;
      detail?: string;
    };
    const message =
      typeof parsed.error === "string"
        ? parsed.error
        : parsed.error?.message || parsed.message || parsed.detail;
    if (message && !/sk-|bearer|api[_-]?key/i.test(message)) {
      return message.slice(0, 220);
    }
  } catch {
    /* The provider did not return JSON. */
  }
  return fallback;
}

export async function GET(request: Request) {
  const used = await alreadyUsed(request);
  return Response.json({ used });
}

export async function POST(request: Request) {
  let payload: {
    title?: unknown;
    author?: unknown;
    theme?: unknown;
    genre?: unknown;
    idea?: unknown;
  };
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Send the cover details as JSON." }, { status: 400 });
  }

  const theme = typeof payload.theme === "string" ? findCoverTheme(payload.theme) : undefined;
  const genre = typeof payload.genre === "string" ? findCoverGenre(payload.genre) : undefined;
  const title = typeof payload.title === "string" ? payload.title.trim() : "";
  const author = typeof payload.author === "string" ? payload.author.trim() : "";
  const idea = typeof payload.idea === "string" ? payload.idea.trim() : "";

  if (!theme) {
    return Response.json({ error: "Choose a colour theme." }, { status: 400 });
  }
  if (!genre) {
    return Response.json({ error: "Choose a genre." }, { status: 400 });
  }
  if (!title || !author || !idea) {
    return Response.json(
      { error: "Add the book title, author name, and cover idea." },
      { status: 400 },
    );
  }
  if (idea.length < 200) {
    return Response.json(
      { error: "Describe the cover in at least 200 characters." },
      { status: 400 },
    );
  }
  if (title.length > 120 || author.length > 80 || idea.length > 800) {
    return Response.json(
      { error: "Shorten the title, author name, or cover idea and try again." },
      { status: 400 },
    );
  }

  if (await alreadyUsed(request)) {
    return Response.json(
      { error: "A cover was already created from this connection.", used: true },
      { status: 429 },
    );
  }

  const key = process.env.OPENROUTER_API_KEY;
  if (!key) {
    return Response.json(
      { error: "Cover generation is not configured yet. Add OPENROUTER_API_KEY." },
      { status: 500 },
    );
  }

  try {
    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        "HTTP-Referer": request.headers.get("origin") || "https://aeropublishing.com",
        "X-Title": "Aero Publishing Cover Studio",
      },
      body: JSON.stringify({
        model: coverModel.openrouter,
        prompt: buildCoverPrompt({ title, author, theme, idea, genre }),
        aspect_ratio: "2:3",
        output_format: "jpeg",
        quality: coverModel.quality,
        n: 1,
        provider: { options: { openai: { complexity: "high" } } },
      }),
    });

    const body = await response.text();
    if (response.status === 401) {
      throw new CoverError("The cover service rejected the request. Try again later.", 401);
    }
    if (!response.ok) {
      throw new CoverError(providerMessage(body, "The cover could not be created. Try again."));
    }

    const parsed = JSON.parse(body) as { data?: { b64_json?: string }[] };
    const image = parsed.data?.[0]?.b64_json;
    if (!image) {
      throw new CoverError("The model did not return a cover.");
    }
    try {
      await markCoverUsed(request);
    } catch {
      /* Remembering the IP must not hide a cover that was already created. */
    }
    const bytes = Buffer.from(image, "base64");
    return new Response(new Uint8Array(bytes), {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "no-store",
        "Set-Cookie": usedCookie(),
      },
    });
  } catch (err) {
    if (err instanceof CoverError) {
      return Response.json({ error: err.message }, { status: err.status });
    }
    return Response.json({ error: "The cover could not be created. Try again." }, { status: 502 });
  }
}
