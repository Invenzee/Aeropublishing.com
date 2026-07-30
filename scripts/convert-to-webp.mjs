import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const PUBLIC_DIR = path.resolve("public");
const BATCH_SIZE = 5;
const SOURCE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png"]);

async function collectImages(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectImages(fullPath)));
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (SOURCE_EXTENSIONS.has(ext)) {
      files.push(fullPath);
    }
  }

  return files;
}

async function convertImage(inputPath) {
  const ext = path.extname(inputPath).toLowerCase();
  const outputPath = inputPath.replace(/\.(jpe?g|png)$/i, ".webp");

  try {
    const [inputStat, outputStat] = await Promise.all([
      fs.stat(inputPath),
      fs.stat(outputPath).catch(() => null),
    ]);

    if (outputStat && outputStat.mtimeMs >= inputStat.mtimeMs) {
      return { inputPath, outputPath, skipped: true };
    }

    const pipeline = sharp(inputPath, { failOn: "none" });

    if (ext === ".png") {
      await pipeline
        .webp({
          lossless: true,
          effort: 4,
        })
        .toFile(outputPath);
    } else {
      await pipeline
        .webp({
          quality: 95,
          effort: 4,
        })
        .toFile(outputPath);
    }

    const [before, after] = await Promise.all([
      fs.stat(inputPath),
      fs.stat(outputPath),
    ]);

    return {
      inputPath,
      outputPath,
      skipped: false,
      beforeBytes: before.size,
      afterBytes: after.size,
    };
  } catch (error) {
    return { inputPath, error: error.message };
  }
}

async function runBatch(batch) {
  return Promise.all(batch.map(convertImage));
}

async function main() {
  const images = await collectImages(PUBLIC_DIR);
  const results = [];

  console.log(`Found ${images.length} images to convert in ${PUBLIC_DIR}`);

  for (let i = 0; i < images.length; i += BATCH_SIZE) {
    const batch = images.slice(i, i + BATCH_SIZE);
    const batchResults = await runBatch(batch);
    results.push(...batchResults);

    for (const result of batchResults) {
      if (result.error) {
        console.error(`FAIL ${result.inputPath}: ${result.error}`);
      } else if (result.skipped) {
        console.log(`SKIP ${path.relative(PUBLIC_DIR, result.outputPath)}`);
      } else {
        const saved = result.beforeBytes - result.afterBytes;
        const pct = ((saved / result.beforeBytes) * 100).toFixed(1);
        console.log(
          `OK   ${path.relative(PUBLIC_DIR, result.inputPath)} -> ${path.basename(result.outputPath)} (${pct}% smaller)`
        );
      }
    }
  }

  const converted = results.filter((r) => !r.skipped && !r.error).length;
  const skipped = results.filter((r) => r.skipped).length;
  const failed = results.filter((r) => r.error).length;

  console.log(`\nDone: ${converted} converted, ${skipped} skipped, ${failed} failed`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
