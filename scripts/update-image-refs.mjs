import fs from "fs/promises";
import path from "path";

const ROOT = path.resolve("src");
const PUBLIC_DIR = path.resolve("public");
const SKIP_FILES = new Set();

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else if (/\.(tsx?|jsx?|css)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

async function webpExists(imagePath) {
  const fileName = path.basename(imagePath);
  if (SKIP_FILES.has(fileName)) {
    return false;
  }

  const webpPath = imagePath.replace(/\.(jpe?g|png)$/i, ".webp");
  try {
    await fs.access(path.join(PUBLIC_DIR, webpPath.replace(/^\//, "")));
    return true;
  } catch {
    return false;
  }
}

async function updateFile(filePath) {
  let content = await fs.readFile(filePath, "utf8");
  const original = content;

  const matches = [...content.matchAll(/\/[A-Za-z0-9_\-./]+\.(?:jpe?g|png)/gi)];

  for (const match of matches) {
    const imagePath = match[0];
    if (!(await webpExists(imagePath))) {
      continue;
    }

    const webpPath = imagePath.replace(/\.(jpe?g|png)$/i, ".webp");
    content = content.split(imagePath).join(webpPath);
  }

  if (content !== original) {
    await fs.writeFile(filePath, content, "utf8");
    return true;
  }

  return false;
}

async function main() {
  const files = await walk(ROOT);
  let updated = 0;

  for (const file of files) {
    if (await updateFile(file)) {
      updated += 1;
      console.log(`Updated ${path.relative(process.cwd(), file)}`);
    }
  }

  console.log(`\nUpdated ${updated} files`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
