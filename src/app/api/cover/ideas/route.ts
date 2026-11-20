import { coverIdeasAlreadyUsed, markCoverIdea } from "@/lib/cover-limit";
import {
  COVER_IDEA_MAX,
  COVER_IDEA_MIN,
  COVER_PREMISE_MAX,
  buildCoverIdeaPrompt,
  coverDirections,
  coverIdeaModel,
  findCoverGenre,
  findCoverTheme,
  type CoverDirection,
} from "@/lib/cover-prompt";

export const runtime = "nodejs";
export const maxDuration = 60;

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

type CoverIdea = { label: string; text: string; direction: CoverDirection };

function usedCookie() {
  const secure = process.env.VERCEL ? "; Secure" : "";
  return `ideas_used=1; Path=/; Max-Age=31536000; HttpOnly; SameSite=Lax${secure}`;
}

function hasUsedCookie(request: Request) {
  return (request.headers.get("cookie") || "")
    .split(";")
    .some((part) => part.trim() === "ideas_used=1");
}

async function alreadyUsed(request: Request) {
  if (hasUsedCookie(request)) return true;
  return coverIdeasAlreadyUsed(request);
}

function providerMessage(body: string, fallback: string) {
  try {
    const parsed = JSON.parse(body) as {
      error?: { message?: string } | string;
      message?: string;
    };
    const message =
      typeof parsed.error === "string" ? parsed.error : parsed.error?.message || parsed.message;
    if (message && !/sk-|bearer|api[_-]?key/i.test(message)) return message.slice(0, 220);
  } catch {
    /* The provider did not return JSON. */
  }
  return fallback;
}

function cleanText(value: string) {
  return value
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function fitText(value: string) {
  const text = cleanText(value);
  if (text.length <= COVER_IDEA_MAX) return text;
  const cut = text.slice(0, COVER_IDEA_MAX);
  const end = Math.max(cut.lastIndexOf("."), cut.lastIndexOf("!"), cut.lastIndexOf("?"));
  return end >= COVER_IDEA_MIN ? cut.slice(0, end + 1) : "";
}

function asIdeas(value: unknown): CoverIdea[] | null {
  if (!value || typeof value !== "object") return null;
  const raw = (value as { ideas?: unknown }).ideas;
  if (!Array.isArray(raw) || raw.length !== coverDirections.length) return null;
  const ideas: CoverIdea[] = [];
  for (const [index, direction] of coverDirections.entries()) {
    const item: unknown = raw[index];
    if (!item || typeof item !== "object") return null;
    const candidate = item as { direction?: unknown; label?: unknown; text?: unknown };
    if (candidate.direction !== direction || typeof candidate.label !== "string" || typeof candidate.text !== "string") {
      return null;
    }
    const label = cleanText(candidate.label).slice(0, 48);
    const text = fitText(candidate.text);
    if (!label || text.length < COVER_IDEA_MIN || !/[.!?]["']?$/.test(text)) return null;
    ideas.push({ label, text, direction });
  }
  const [first, second] = ideas;
  const left = first.text.toLowerCase();
  const right = second.text.toLowerCase();
  if (left === right || first.label.toLowerCase() === second.label.toLowerCase()) return null;
  return [first, second];
}

function parseIdeas(content: string) {
  const fenced = content.replace(/```(?:json)?/gi, "").trim();
  const start = fenced.indexOf("{");
  const end = fenced.lastIndexOf("}");
  if (start < 0 || end <= start) return null;
  try {
    return asIdeas(JSON.parse(fenced.slice(start, end + 1)));
  } catch {
    return null;
  }
}

function messageText(content: unknown) {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";
  return content
    .map((part) => {
      if (typeof part === "string") return part;
      if (part && typeof part === "object" && "text" in part && typeof (part as { text?: unknown }).text === "string") {
        return (part as { text: string }).text;
      }
      return "";
    })
    .join("");
}

async function askForIdeas(key: string, request: Request, prompt: string, reasoning: boolean) {
  const response = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      "HTTP-Referer": request.headers.get("origin") || "https://aeropublishing.com",
      "X-Title": "Aero Publishing Cover Studio",
    },
    body: JSON.stringify({
      model: coverIdeaModel,
      messages: [
        {
          role: "system",
          content: "You reply with one JSON object and nothing else. You think about the specific book before choosing a cover direction.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.8,
      max_tokens: reasoning ? 2600 : 1600,
      response_format: { type: "json_object" },
      ...(reasoning ? { reasoning: { effort: "low", exclude: true } } : {}),
    }),
  });
  const body = await response.text();
  return { response, body };
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
    premise?: unknown;
    pass?: unknown;
  };
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Send the book details as JSON." }, { status: 400 });
  }

  const theme = typeof payload.theme === "string" ? findCoverTheme(payload.theme) : undefined;
  const genre = typeof payload.genre === "string" ? findCoverGenre(payload.genre) : undefined;
  const title = typeof payload.title === "string" ? payload.title.trim() : "";
  const author = typeof payload.author === "string" ? payload.author.trim() : "";
  const premise = typeof payload.premise === "string" ? payload.premise.trim() : "";
  const pass = typeof payload.pass === "number" && payload.pass >= 1 && payload.pass <= 20 ? Math.floor(payload.pass) : 1;

  if (!theme) return Response.json({ error: "Choose a colour theme." }, { status: 400 });
  if (!genre) return Response.json({ error: "Choose a genre." }, { status: 400 });
  if (!title || !author) {
    return Response.json({ error: "Add the book title and author name." }, { status: 400 });
  }
  if (title.length > 120 || author.length > 80) {
    return Response.json({ error: "Shorten the title or author name and try again." }, { status: 400 });
  }
  if (premise.length > COVER_PREMISE_MAX) {
    return Response.json({ error: "Shorten the book description and try again." }, { status: 400 });
  }
  if (await alreadyUsed(request)) {
    return Response.json(
      { error: "A pair of ideas was already created from this connection.", used: true },
      { status: 429 },
    );
  }

  const key = process.env.OPENROUTER_API_KEY;
  if (!key) {
    return Response.json(
      { error: "Cover ideas are not configured yet. Add OPENROUTER_API_KEY." },
      { status: 500 },
    );
  }

  const prompt = buildCoverIdeaPrompt({ title, author, theme, genre, premise, pass });

  try {
    let { response, body } = await askForIdeas(key, request, prompt, true);
    if (!response.ok && /reasoning|response_format|effort/i.test(body)) {
      ({ response, body } = await askForIdeas(key, request, prompt, false));
    }
    if (response.status === 401) {
      return Response.json({ error: "The idea service rejected the request. Try again later." }, { status: 401 });
    }
    if (!response.ok) {
      return Response.json(
        { error: providerMessage(body, "The ideas could not be written. Try again.") },
        { status: 502 },
      );
    }

    const parsed = JSON.parse(body) as { choices?: { message?: { content?: unknown } }[] };
    const content = messageText(parsed.choices?.[0]?.message?.content);
    let ideas = parseIdeas(content);
    if (!ideas) {
      const again = await askForIdeas(key, request, `${prompt}\n\nThe last reply was unusable. Return the JSON object with two distinct labels and two complete concepts in the requested order and length.`, false);
      if (again.response.ok) {
        const second = JSON.parse(again.body) as { choices?: { message?: { content?: unknown } }[] };
        ideas = parseIdeas(messageText(second.choices?.[0]?.message?.content));
      }
    }
    if (!ideas) {
      return Response.json({ error: "The ideas came back incomplete. Try again." }, { status: 502 });
    }

    try {
      await markCoverIdea(request);
    } catch {
      /* Remembering the count must not hide ideas that were already written. */
    }
    return Response.json({ ideas }, { headers: { "Set-Cookie": usedCookie() } });
  } catch {
    return Response.json({ error: "The ideas could not be written. Try again." }, { status: 502 });
  }
}
