export const COVER_REFERENCE_LIMIT = 2;
export const COVER_REFERENCE_MAX_BYTES = 2 * 1024 * 1024;
export const coverReferenceTypes = ["image/jpeg", "image/png", "image/webp"];

export function coverReferenceError(file: File) {
  if (!coverReferenceTypes.includes(file.type) || file.size === 0) {
    return "Choose a non-empty JPG, PNG, or WebP image.";
  }
  if (file.size > COVER_REFERENCE_MAX_BYTES) {
    return "Each reference image must be 2 MB or smaller.";
  }
  return "";
}
