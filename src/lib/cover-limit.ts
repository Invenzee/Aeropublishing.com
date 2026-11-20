import { createHash } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import os from "os";
import path from "path";

function storePath() {
  const dir = process.env.VERCEL ? os.tmpdir() : path.join(process.cwd(), "data");
  return path.join(dir, "cover-used.json");
}

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = (forwarded?.split(",")[0] || request.headers.get("x-real-ip") || "local").trim();
  return createHash("sha256").update(`aero-cover:${ip}`).digest("hex");
}

async function readKeys() {
  try {
    const raw = await readFile(storePath(), "utf8");
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export async function coverAlreadyUsed(request: Request) {
  const key = clientKey(request);
  const keys = await readKeys();
  return keys.includes(key);
}

export async function markCoverUsed(request: Request) {
  const key = clientKey(request);
  const keys = await readKeys();
  if (keys.includes(key)) return;
  const file = storePath();
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, JSON.stringify([...keys, key]), "utf8");
}
