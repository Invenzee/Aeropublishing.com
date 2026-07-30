import fs from "fs/promises";
import path from "path";

const PUBLIC_DIR = path.resolve("public");
const RASTER_EXTENSIONS = new Set([".jpg", ".jpeg", ".png"]);

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (RASTER_EXTENSIONS.has(ext)) {
      files.push(fullPath);
    }
  }

  return files;
}

async function main() {
  const files = await walk(PUBLIC_DIR);
  let deleted = 0;

  for (const file of files) {
    const webpPath = file.replace(/\.(jpe?g|png)$/i, ".webp");
    try {
      await fs.access(webpPath);
      await fs.unlink(file);
      deleted += 1;
      console.log(`Deleted ${path.relative(PUBLIC_DIR, file)}`);
    } catch {
      console.warn(`SKIP ${path.relative(PUBLIC_DIR, file)} (no matching .webp)`);
    }
  }

  console.log(`\nDeleted ${deleted} raster files`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
