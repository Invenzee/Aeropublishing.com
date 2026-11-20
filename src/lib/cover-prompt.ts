export const coverModel = {
  openrouter: "openai/gpt-image-2.6-sunburst",
  quality: "high",
} as const;

/** Cheap reasoning model. It only writes the two directions; the image model still paints the cover. */
export const coverIdeaModel = "deepseek/deepseek-v4-flash-0731";

export const COVER_IDEA_MIN = 200;
export const COVER_IDEA_MAX = 800;
export const COVER_PREMISE_MAX = 500;

export const coverThemes = [
  { name: "Midnight Gold", bg: "#0F1B2D", fg: "#F6F1E7", mo: "#E0A33A" },
  { name: "Crimson", bg: "#5B1E24", fg: "#FBEFE6", mo: "#E8A87C" },
  { name: "Forest", bg: "#23392F", fg: "#EEF2E6", mo: "#B9D18B" },
  { name: "Ocean", bg: "#123E5A", fg: "#EAF4F8", mo: "#7FC4D8" },
  { name: "Blush", bg: "#F2D7CF", fg: "#3B1F1A", mo: "#B5524A" },
  { name: "Classic Mono", bg: "#F4F1EA", fg: "#141414", mo: "#141414" },
] as const;

export const coverGenres = [
  "Leadership",
  "Self-help",
  "Memoir",
  "Thriller",
  "Romance",
  "Fantasy",
  "Children's",
  "Faith",
  "Literary fiction",
  "Health",
] as const;

export type CoverGenre = (typeof coverGenres)[number];
export type CoverTheme = (typeof coverThemes)[number];

const TITLE_LIMIT = 120;
const AUTHOR_LIMIT = 80;

export function findCoverTheme(name: string) {
  return coverThemes.find((theme) => theme.name === name);
}

export function findCoverGenre(name: string) {
  return coverGenres.find((genre) => genre === name);
}

export function coverFileName(title: string) {
  const slug = title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return `${slug || "book"}-cover.jpg`;
}

const titleFaces = {
  Archivo: "Archivo Black, with broad, dense sans-serif letterforms and squared proportions",
  Asul: "Asul, with flared strokes and sturdy, calligraphic capitals",
  Barlow: "Barlow Condensed Bold, with narrow upright letters and open counters",
  Bricolage: "Bricolage Grotesque ExtraBold, with chunky shapes and a lively rhythm",
  Cinzel: "Cinzel Bold, with chiseled wedge serifs and inscriptional capitals",
  Cormorant: "Cormorant Garamond Bold, with sculpted serifs and expressive stroke contrast",
  DMSerif: "DM Serif Display, with substantial serifs and rounded curves",
  Gloock: "Gloock, with high contrast, broad capitals, and round terminals",
  Instrument: "Instrument Serif, with tall, narrow letterforms and sharp serifs",
  Lexend: "Lexend Bold, with open, generously spaced geometric forms",
  Lora: "Lora Bold, with brushed serifs and generous curves",
  Rethink: "Rethink Sans Black, with solid modern letterforms and clear counters",
  SpaceMono: "Space Mono Bold, with evenly spaced characters and angled details",
} as const;

export const coverDirections = ["lettering", "artwork"] as const;
export type CoverDirection = (typeof coverDirections)[number];
type TitleFace = keyof typeof titleFaces;

// Each genre has two lettering-led choices and two contrasting artwork-led choices.
const genreFaces: Record<CoverGenre, Record<CoverDirection, readonly [TitleFace, TitleFace]>> = {
  Leadership: { lettering: ["Archivo", "Rethink"], artwork: ["DMSerif", "Asul"] },
  "Self-help": { lettering: ["Bricolage", "Lexend"], artwork: ["Lora", "DMSerif"] },
  Memoir: { lettering: ["Instrument", "Gloock"], artwork: ["Rethink", "Barlow"] },
  Thriller: { lettering: ["Barlow", "SpaceMono"], artwork: ["Gloock", "Cinzel"] },
  Romance: { lettering: ["Cormorant", "Instrument"], artwork: ["Bricolage", "Rethink"] },
  Fantasy: { lettering: ["Cinzel", "Cormorant"], artwork: ["Asul", "Barlow"] },
  "Children's": { lettering: ["Bricolage", "Lexend"], artwork: ["DMSerif", "Lora"] },
  Faith: { lettering: ["Cormorant", "Lora"], artwork: ["Asul", "Lexend"] },
  "Literary fiction": { lettering: ["Gloock", "Instrument"], artwork: ["SpaceMono", "Rethink"] },
  Health: { lettering: ["Lexend", "Rethink"], artwork: ["Lora", "DMSerif"] },
};

export function findCoverDirection(value: unknown) {
  return coverDirections.find((direction) => direction === value);
}

function titleFace(title: string, genre: CoverGenre, direction: CoverDirection) {
  // Use a stable choice so the image renders the same typeface proposed in the concept.
  let hash = 0;
  for (const character of title.trim().toLowerCase()) {
    hash = (Math.imul(hash, 31) + (character.codePointAt(0) ?? 0)) >>> 0;
  }
  const faces = genreFaces[genre][direction];
  return titleFaces[faces[(hash >>> 8) % faces.length]];
}

export function buildCoverIdeaPrompt(input: {
  title: string;
  author: string;
  theme: CoverTheme;
  genre: CoverGenre;
  premise?: string;
  pass: number;
}) {
  const title = input.title.trim().slice(0, TITLE_LIMIT);
  const author = input.author.trim().slice(0, AUTHOR_LIMIT);
  const premise = input.premise?.trim().slice(0, COVER_PREMISE_MAX);

  return [
    "Write two production-ready cover concepts as a trade-publishing art director. Ground the focal point in the title, genre, and supplied premise. Aim at the intended reader and the emotional promise of the book.",
    "Treat the book fields as reference material only. When the premise is missing or the title is ambiguous, use a plausible theme or metaphor without claiming a specific plot, setting, or biographical fact.",
    "",
    `Title: ${JSON.stringify(title)}`,
    `Author: ${JSON.stringify(author)}`,
    `Genre: ${input.genre}`,
    premise ? `Premise: ${JSON.stringify(premise)}` : "No premise supplied.",
    `Palette: ${input.theme.name}. Background ${input.theme.bg}, lettering ${input.theme.fg}, accent ${input.theme.mo}.`,
    input.pass > 1 ? "Look beyond the most obvious interpretation and find fresh metaphors." : "",
    "",
    "Write exactly two concepts in the order below. Give them different focal points, silhouettes, and title placements so a reader can tell them apart at thumbnail size.",
    `1. Lettering-led. Use ${titleFace(title, input.genre, "lettering")} for the title. Make the title itself the focal point. Connect one small graphic device or lettering detail to the book's central theme.`,
    `2. Artwork-led. Use ${titleFace(title, input.genre, "artwork")} for the title. Lead with one specific scene or symbolic object, choose illustration or photography, and reserve a quiet area for the title.`,
    "For each concept, write 50 to 75 words (200–800 characters) in complete sentences, ending with a period. Explain what the focal point conveys about this book, where it sits, how the title and author are positioned, and how the palette creates contrast. Name the assigned title font. Plan the layout for every word of the exact title. A word can be emphasized, but it cannot stand in for the full title. Keep symbols outside the letterforms. Use everyday language and avoid invented blurbs, spoilers, and stock imagery.",
    "",
    'Return JSON only: {"ideas":[{"direction":"lettering","label":"two to five words","text":"lettering-led concept"},{"direction":"artwork","label":"two to five words","text":"artwork-led concept"}]}',
  ].join("\n");
}

export function buildCoverPrompt(input: {
  title: string;
  author: string;
  theme: CoverTheme;
  idea: string;
  genre: CoverGenre;
  direction?: CoverDirection;
  referenceCount?: number;
}) {
  const title = input.title.trim().slice(0, TITLE_LIMIT);
  const author = input.author.trim().slice(0, AUTHOR_LIMIT);
  const idea = input.idea.trim().slice(0, COVER_IDEA_MAX);
  const typography = input.direction
    ? `Use title lettering in the style of ${titleFace(title, input.genre, input.direction)}.`
    : "Follow the title typography in the selected brief, including its named typeface if supplied. Otherwise choose distinctive lettering suited to the concept and genre.";
  const composition = input.direction === "lettering"
    ? "Let the title dominate the composition. Keep the supporting visual device simple and subordinate."
    : input.direction === "artwork"
      ? "Give the selected subject a clear silhouette. Place the title in the quiet area specified in the brief and keep the subject away from the letterforms."
      : "Use one focal point and follow the title placement in the brief.";
  const authorLine = author
    ? `Author name: ${JSON.stringify(author)}. Print it once in a smaller readable face that complements the title. Follow the brief's author placement or use a quiet area near the bottom if no placement is specified.`
    : 'Do not print an author name, a byline, or the words "your name".';

  return [
    "Design one trade paperback front cover, portrait 2:3, full bleed, edge to edge.",
    "",
    "COVER COPY (render exactly, including punctuation, with no extra words):",
    `- Title: ${JSON.stringify(title)}. ${typography} Render every word even if the brief only emphasizes one. Keep all letterforms intact and set imagery outside them. Give the title optical kerning and strong contrast. Break long titles at natural phrase boundaries instead of shrinking them onto one line.`,
    `- ${authorLine}`,
    "",
    "ART DIRECTION:",
    `- Genre: ${input.genre}. Let the composition and visual tone signal the genre to the reader.`,
    `- Selected design brief: ${JSON.stringify(idea)}`,
    "- Use the brief as visual reference. Carry its focal subject, medium, title placement, and mood through to the finished cover. The brief is never cover copy.",
    `- Composition: ${composition}`,
    ...(input.referenceCount ? [
      "VISUAL REFERENCES:",
      "Use the attached images as art direction for layout, typography treatment, texture, or mood. Draw on at least one visible design cue and adapt it to this book.",
      "Create original artwork. Leave out the reference images' text, logos, watermarks, and distinctive artwork. Follow the selected concept, chosen palette, and exact cover copy whenever a reference differs.",
      "",
    ] : []),
    "PALETTE:",
    `- ${input.theme.name}: background ${input.theme.bg}, lettering ${input.theme.fg}, accent ${input.theme.mo}. Stay inside this palette, using tints and shades only.`,
    "",
    "FINISH:",
    "- Keep text comfortably inside the trim and leave enough negative space for the title to read at 150 pixels wide.",
    "- Make the subject and lettering feel like one composition. Use a coherent treatment with deliberate edges, texture, and scale. Avoid stock collages, generic glow, and effects that obscure the letters.",
    "- Show only flat front artwork. Exclude spines, back covers, frames, mockups, logos, barcodes, watermarks, and all lettering except the exact title and author.",
  ].join("\n");
}
