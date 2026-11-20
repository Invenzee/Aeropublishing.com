"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  COVER_IDEA_MIN,
  COVER_PREMISE_MAX,
  coverFileName,
  coverGenres,
  coverThemes,
  type CoverDirection,
} from "@/lib/cover-prompt";
import { COVER_REFERENCE_LIMIT, coverReferenceError, coverReferenceTypes } from "@/lib/cover-references";

type CoverResponse = {
  image?: unknown;
  error?: unknown;
  used?: unknown;
  referenceError?: unknown;
};

const STEPS = ["Book", "Genre", "Colours", "References", "Idea"] as const;
const REFERENCES_STEP = STEPS.indexOf("References");
const IDEA_STEP = STEPS.indexOf("Idea");

type CoverIdea = { label: string; text: string; direction?: CoverDirection };

const COVER_PHASES = [
  "Checking your details",
  "Reading the genre",
  "Setting the palette",
  "Thinking through the cover",
  "Composing the layout",
  "Setting the title",
  "Generating the image",
  "Hold on — almost ready",
];

const CARDS = [
  {
    title: "Instant AI concepts",
    body: "Two directions from your title, author, genre and colours. You choose one.",
  },
  {
    title: "Polished by real designers",
    body: "Our team refines your favourite into a print-ready front, spine and back cover.",
  },
  {
    title: "Free when you publish with us",
    body: "Every package includes your final, print-ready cover at no extra cost.",
  },
];

function Spark() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
      <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" />
    </svg>
  );
}

function ReferenceThumbnail({ file }: { file: File }) {
  const attachPreview = useCallback((element: HTMLImageElement | null) => {
    if (!element) return;
    const url = URL.createObjectURL(file);
    element.src = url;
    return () => URL.revokeObjectURL(url);
  }, [file]);

  // eslint-disable-next-line @next/next/no-img-element -- Local files are previewed with browser object URLs.
  return <img ref={attachPreview} alt="" width={44} height={58} className="h-[58px] w-11 shrink-0 rounded-md bg-[#eceaf3] object-contain" />;
}

export default function CoverStudioSection() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [premise, setPremise] = useState("");
  const [references, setReferences] = useState<File[]>([]);
  const [ideas, setIdeas] = useState<CoverIdea[]>([]);
  const [pickedIdea, setPickedIdea] = useState<number | null>(null);
  const [ideasLoading, setIdeasLoading] = useState(false);
  const [ideasUsed, setIdeasUsed] = useState(false);
  const [theme, setTheme] = useState<number | null>(null);
  const [genre, setGenre] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [phase, setPhase] = useState(0);
  const [used, setUsed] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(0);
  const [reached, setReached] = useState(0);
  const coverRequest = useRef<AbortController | null>(null);
  const ideaRequest = useRef<AbortController | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/cover")
      .then((response) => response.json())
      .then((data: CoverResponse) => {
        if (!cancelled && data?.used === true) setUsed(true);
      })
      .catch(() => {});
    fetch("/api/cover/ideas")
      .then((response) => response.json())
      .then((data: { used?: unknown }) => {
        if (!cancelled && data?.used === true) setIdeasUsed(true);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      setPhase(0);
      return;
    }
    const timer = window.setInterval(() => {
      setPhase((current) => (current + 1) % COVER_PHASES.length);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [loading]);

  useEffect(() => {
    return () => {
      coverRequest.current?.abort();
      ideaRequest.current?.abort();
    };
  }, []);

  const picked = theme === null ? undefined : coverThemes[theme];
  const cur = picked ?? { name: "", bg: "#3F3774", fg: "#FFFFFF", mo: "#FE695B" };
  const bookDetailsLocked = ideasLoading || ideas.length > 0;
  const referencesLocked = loading || used;
  const chosen = pickedIdea === null ? undefined : ideas[pickedIdea];
  const ideaText = chosen?.text.trim() ?? "";
  const displayTitle = title.trim() || "Your Book Title";
  const displayAuthor = author.trim() || "Your Name";
  const coverTag = chosen
    ? chosen.label
    : picked
      ? "A " + picked.name + " cover"
      : "Your cover";

  function resetIdeas() {
    if (ideasUsed) return;
    ideaRequest.current?.abort();
    setIdeas([]);
    setPickedIdea(null);
    setIdeasLoading(false);
  }

  function clearArt() {
    if (used || image) return;
    coverRequest.current?.abort();
    setLoading(false);
    setError("");
  }

  function addReferences(files: File[]) {
    const next = [...references];
    for (const file of files) {
      const message = coverReferenceError(file);
      if (message) {
        setError(message);
        return;
      }
      if (!next.some((reference) => reference.name === file.name && reference.size === file.size && reference.lastModified === file.lastModified)) {
        next.push(file);
      }
    }
    if (next.length > COVER_REFERENCE_LIMIT) {
      setError(`Choose up to ${COVER_REFERENCE_LIMIT} reference images.`);
      return;
    }
    setReferences(next);
    setError("");
  }

  function stepError(index: number) {
    if (index === 0) {
      if (!title.trim()) return "Add the book title to continue.";
      if (!author.trim()) return "Add the author name to continue.";
    }
    if (index === 1 && !genre) return "Choose a genre to continue.";
    if (index === 2 && theme === null) return "Choose a colour theme to continue.";
    if (index === IDEA_STEP && ideaText.length < COVER_IDEA_MIN) {
      return ideas.length ? "Choose one of the two ideas." : "Generate two ideas, then choose one.";
    }
    return "";
  }

  function openStep(target: number) {
    for (let index = 0; index < target; index += 1) {
      const message = stepError(index);
      if (message) {
        setStep(index);
        setError(message);
        return;
      }
    }
    setError("");
    setStep(target);
  }

  async function imageFile(src: string, name: string) {
    if (src.startsWith("blob:")) {
      const blob = await fetch(src).then((item) => item.blob());
      return new File([blob], name, { type: blob.type || "image/jpeg" });
    }
    const mime = src.startsWith("data:image/png") ? "image/png" : "image/jpeg";
    const bytes = Uint8Array.from(atob(src.split(",")[1] || ""), (char) => char.charCodeAt(0));
    return new File([bytes], name, { type: mime });
  }

  async function saveCover(src: string | null) {
    if (!src) return;
    const name = coverFileName(title);
    const url = URL.createObjectURL(await imageFile(src, name));
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  async function shareCover(src: string | null) {
    if (!src) return;
    const name = coverFileName(title);
    const file = await imageFile(src, name);
    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: displayTitle });
        return;
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
      }
    }
    await saveCover(src);
  }

  function goNext() {
    const message = stepError(step);
    if (message) {
      setError(message);
      return;
    }
    setError("");
    const next = Math.min(IDEA_STEP, step + 1);
    setReached((max) => Math.max(max, next));
    setStep(next);
  }

  function goBack() {
    setError("");
    setStep((current) => Math.max(0, current - 1));
  }

  async function generateIdeas() {
    if (ideasUsed) {
      setError("A pair of ideas was already created from this connection.");
      return;
    }
    for (let index = 0; index < IDEA_STEP; index += 1) {
      const message = stepError(index);
      if (message) {
        setStep(index);
        setError(message);
        return;
      }
    }
    if (!picked) return;

    ideaRequest.current?.abort();
    const controller = new AbortController();
    ideaRequest.current = controller;
    setIdeasLoading(true);
    setError("");

    try {
      const response = await fetch("/api/cover/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          title: title.trim(),
          author: author.trim(),
          theme: picked.name,
          genre,
          premise: premise.trim(),
        }),
      });
      const data = (await response.json().catch(() => null)) as { ideas?: unknown; error?: unknown; used?: unknown } | null;
      if (controller.signal.aborted) return;
      if (data?.used === true) setIdeasUsed(true);
      const next = Array.isArray(data?.ideas)
        ? data.ideas.filter(
            (item): item is CoverIdea =>
              !!item &&
              typeof item === "object" &&
              typeof (item as CoverIdea).label === "string" &&
              typeof (item as CoverIdea).text === "string" &&
              (item as CoverIdea).text.trim().length >= COVER_IDEA_MIN,
          )
        : [];
      if (!response.ok || next.length !== 2) {
        const message = data && typeof data.error === "string" ? data.error : "The ideas could not be written. Try again.";
        throw new Error(message);
      }
      setIdeas(next.slice(0, 2));
      setPickedIdea(null);
      setIdeasUsed(true);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      if (controller.signal.aborted) return;
      setError(err instanceof Error ? err.message : "The ideas could not be written. Try again.");
    } finally {
      if (ideaRequest.current === controller) setIdeasLoading(false);
    }
  }

  async function generateCover() {
    if (used) {
      setError("A cover was already created from this connection.");
      return;
    }
    for (let index = 0; index <= IDEA_STEP; index += 1) {
      const message = stepError(index);
      if (message) {
        setStep(index);
        setError(message);
        return;
      }
    }
    if (!picked) return;

    coverRequest.current?.abort();
    const controller = new AbortController();
    coverRequest.current = controller;
    setLoading(true);
    setError("");

    try {
      const form = new FormData();
      form.set("details", JSON.stringify({
        title: title.trim(),
        author: author.trim(),
        theme: picked.name,
        genre,
        idea: ideaText,
        direction: chosen?.direction,
      }));
      for (const reference of references) {
        form.append("references", reference);
      }

      const response = await fetch("/api/cover", {
        method: "POST",
        signal: controller.signal,
        body: form,
      });
      const type = response.headers.get("content-type") || "";
      if (controller.signal.aborted) return;
      if (response.ok && type.startsWith("image/")) {
        const blob = await response.blob();
        if (controller.signal.aborted) return;
        setUsed(true);
        setImage((current) => {
          if (current?.startsWith("blob:")) URL.revokeObjectURL(current);
          return URL.createObjectURL(blob);
        });
        return;
      }
      const data = (await response.json().catch(() => null)) as CoverResponse | null;
      if (controller.signal.aborted) return;
      if (data?.used === true) setUsed(true);
      if (data?.referenceError === true) setStep(REFERENCES_STEP);
      const message = data && typeof data.error === "string" ? data.error : "The cover could not be created. Try again.";
      throw new Error(message);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      if (controller.signal.aborted) return;
      setError(err instanceof Error ? err.message : "The cover could not be created. Try again.");
    } finally {
      if (coverRequest.current === controller) setLoading(false);
    }
  }

  const fieldClass =
    "w-full rounded-xl border border-[#d7d7d7] bg-white px-4 font-poppins text-[16px] text-black outline-none transition focus:border-brand-primary focus:shadow-[0_0_0_4px_rgba(254,105,91,0.22)]";

  return (
    <section id="free-cover" className="relative w-full max-w-full overflow-x-clip bg-white py-20 max-sm:py-12">
      <div className="mx-auto w-full min-w-0 max-w-[1140px] px-6 max-sm:px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 flex flex-col items-center gap-4 text-center max-sm:mb-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-4 py-2 font-poppins text-[12px] font-bold uppercase tracking-[1.4px] text-white">
            <Spark />
            Free offer · AI Cover Studio
          </span>
          <h2 className="max-w-3xl font-syne text-[50px] font-bold leading-[1.1] text-brand-primary max-sm:text-[32px]">
            Get your book cover designed{" "}
            <span className="font-shaded text-[50px] font-[300] text-brand-secondary max-sm:text-[36px]">free</span>
            , in minutes.
          </h2>
          <p className="max-w-2xl font-poppins text-[16px] leading-relaxed text-brand-gray max-sm:text-[14px]">
            Move through the steps with Next. At the end, generate two cover ideas and design the one you choose.
          </p>
        </motion.div>

        <div className="grid items-start gap-9 lg:grid-cols-2">
          <form className="flex min-w-0 flex-col gap-3.5" onSubmit={(event) => event.preventDefault()}>
            <div className="relative grid grid-cols-5" aria-label="Cover steps">
              <span className="pointer-events-none absolute top-[21px] left-[10%] h-0.5 w-4/5 bg-[#e4e4e4]" aria-hidden="true" />
              <span
                className="pointer-events-none absolute top-[21px] left-[10%] h-0.5 w-4/5 origin-left bg-brand-primary transition-transform duration-500"
                style={{ transform: `scaleX(${step / IDEA_STEP})` }}
                aria-hidden="true"
              />
              {STEPS.map((label, index) => {
                const current = index === step;
                const done = !current && index < reached;
                return (
                  <button
                    key={label}
                    type="button"
                    className={`relative z-[1] flex min-h-[72px] flex-col items-center gap-1.5 bg-transparent px-1 py-2.5 font-poppins text-[12px] font-bold ${
                      current ? "text-brand-primary" : done ? "text-brand-primary" : "text-brand-muted"
                    } disabled:cursor-default disabled:opacity-45`}
                    aria-current={current ? "step" : undefined}
                    disabled={index > reached}
                    onClick={() => openStep(index)}
                  >
                    <span
                      className={`flex h-[26px] w-[26px] items-center justify-center rounded-full text-[13px] ${
                        current
                          ? "bg-brand-primary text-white shadow-[0_0_0_4px_rgba(254,105,91,0.28)]"
                          : done
                            ? "bg-brand-primary text-white shadow-[0_0_0_4px_#ffffff]"
                            : "bg-[#f3f3f3] text-brand-primary shadow-[0_0_0_4px_#ffffff]"
                      }`}
                    >
                      {done ? (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        index + 1
                      )}
                    </span>
                    {label}
                  </button>
                );
              })}
            </div>

            <section className="flex flex-col gap-3.5 rounded-2xl border border-black/10 bg-white p-5 shadow-[0_8px_28px_rgba(63,55,116,0.06)]">
              {step < IDEA_STEP && ideas.length > 0 && (
                <p className="m-0 font-poppins text-sm text-brand-gray">These details are set for your generated ideas.</p>
              )}
              {step === 0 && (
                <>
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-primary font-poppins text-sm font-bold text-white">1</div>
                    <div className="flex min-w-0 flex-col">
                      <label htmlFor="c-title" className="font-poppins text-[17px] font-bold leading-snug text-black">The book</label>
                      <span className="font-poppins text-sm font-medium leading-snug text-brand-gray">Title and author, exactly as they should be printed.</span>
                    </div>
                  </div>
                  <input
                    id="c-title"
                    type="text"
                    maxLength={120}
                    placeholder="e.g. The Quiet Founder"
                    value={title}
                    readOnly={bookDetailsLocked}
                    className={`${fieldClass} min-h-[52px]`}
                    onChange={(event) => {
                      setTitle(event.target.value);
                      resetIdeas();
                      clearArt();
                    }}
                  />
                  <label className="font-poppins text-[15px] font-bold text-black" htmlFor="c-author">Author name</label>
                  <input
                    id="c-author"
                    type="text"
                    maxLength={80}
                    placeholder="e.g. Jane Smith"
                    value={author}
                    readOnly={bookDetailsLocked}
                    className={`${fieldClass} min-h-[52px]`}
                    onChange={(event) => {
                      setAuthor(event.target.value);
                      resetIdeas();
                      clearArt();
                    }}
                  />
                </>
              )}

              {step === 1 && (
                <>
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-primary font-poppins text-sm font-bold text-white">2</div>
                    <div className="flex min-w-0 flex-col">
                      <label htmlFor="c-genre" className="font-poppins text-[17px] font-bold leading-snug text-black">The genre</label>
                      <span className="font-poppins text-sm font-medium leading-snug text-brand-gray">So the type and mood match the shelf it belongs on.</span>
                    </div>
                  </div>
                  <select
                    id="c-genre"
                    value={genre}
                    disabled={bookDetailsLocked}
                    className={`${fieldClass} form-select form-select-arrow-dark min-h-[52px]`}
                    onChange={(event) => {
                      setGenre(event.target.value);
                      resetIdeas();
                      clearArt();
                    }}
                  >
                    <option value="">Choose a genre</option>
                    {coverGenres.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-primary font-poppins text-sm font-bold text-white">3</div>
                    <div className="flex min-w-0 flex-col">
                      <div id="c-theme-label" className="font-poppins text-[17px] font-bold leading-snug text-black">The colours</div>
                      <span className="font-poppins text-sm font-medium leading-snug text-brand-gray">The palette the cover stays inside.</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3" role="group" aria-labelledby="c-theme-label">
                    {coverThemes.map((item, index) => (
                      <button
                        key={item.name}
                        type="button"
                        className={`flex min-h-12 items-center gap-2 rounded-xl border px-2.5 py-2 text-left font-poppins text-sm font-semibold text-black transition ${
                          index === theme
                            ? "border-brand-primary bg-white shadow-[inset_0_0_0_1px_#3F3774]"
                            : "border-[#d7d7d7] bg-[#fafafa] hover:border-brand-primary"
                        }`}
                        aria-pressed={index === theme}
                        disabled={bookDetailsLocked}
                        onClick={() => {
                          setTheme(index);
                          resetIdeas();
                          clearArt();
                        }}
                      >
                        <span
                          className="h-[22px] w-[22px] shrink-0 rounded-full border border-[#d7d7d7]"
                          aria-hidden="true"
                          style={{
                            background: item.bg,
                            boxShadow: `inset 0 0 0 5px ${item.bg}, inset 0 0 0 11px ${item.mo}`,
                          }}
                        />
                        <span>{item.name}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {step === REFERENCES_STEP && (
                <>
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-primary font-poppins text-sm font-bold text-white">4</div>
                    <div className="flex min-w-0 flex-col gap-1">
                      <label htmlFor="c-references" className="font-poppins text-[17px] font-bold leading-snug text-black">Upload reference covers (optional)</label>
                      <span id="c-references-help" className="font-poppins text-sm leading-snug text-brand-gray">Add up to {COVER_REFERENCE_LIMIT} JPG, PNG, or WebP images, 2 MB each. The image model uses them to guide the design of your cover.</span>
                    </div>
                  </div>
                  <input
                    id="c-references"
                    type="file"
                    multiple
                    accept={coverReferenceTypes.join(",")}
                    aria-describedby="c-references-help"
                    disabled={referencesLocked}
                    className={`${fieldClass} min-w-0 py-2 text-sm file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-[#eceaf3] file:px-3 file:py-2 file:font-semibold file:text-brand-primary disabled:opacity-60`}
                    onChange={(event) => {
                      addReferences(Array.from(event.currentTarget.files ?? []));
                      event.currentTarget.value = "";
                    }}
                  />
                  {references.length > 0 && (
                    <ul className="m-0 grid gap-2 p-0" aria-label="Selected reference images">
                      {references.map((file) => (
                        <li key={`${file.name}-${file.size}-${file.lastModified}`} className="flex min-w-0 items-center gap-3 rounded-xl border border-black/10 p-2">
                          <ReferenceThumbnail file={file} />
                          <span className="min-w-0 flex-1 truncate font-poppins text-sm text-brand-gray" title={file.name}>{file.name}</span>
                          <button
                            type="button"
                            disabled={referencesLocked}
                            aria-label={`Remove ${file.name}`}
                            className="rounded-lg px-2 py-2 font-poppins text-sm font-semibold text-brand-primary hover:bg-[#eceaf3] disabled:opacity-60"
                            onClick={() => {
                              setReferences((current) => current.filter((reference) => reference !== file));
                              setError("");
                            }}
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  <label className="font-poppins text-[15px] font-bold text-black" htmlFor="c-premise">What is the book about? (optional)</label>
                  <textarea
                    id="c-premise"
                    rows={3}
                    maxLength={COVER_PREMISE_MAX}
                    placeholder="A sentence or two about the story, subject, or intended reader"
                    value={premise}
                    readOnly={bookDetailsLocked}
                    className={`${fieldClass} resize-y py-3`}
                    onChange={(event) => {
                      setPremise(event.target.value);
                      resetIdeas();
                      clearArt();
                    }}
                  />
                </>
              )}

              {step === IDEA_STEP && (
                <>
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-primary font-poppins text-sm font-bold text-white">5</div>
                    <div className="flex min-w-0 flex-col">
                      <div id="c-idea-label" className="font-poppins text-[17px] font-bold leading-snug text-black">The idea</div>
                      <span className="font-poppins text-sm font-medium leading-snug text-brand-gray">Choose between a lettering-led direction and an artwork-led direction.</span>
                    </div>
                  </div>
                  {ideasLoading && ideas.length === 0 && (
                    <p className="m-0 rounded-xl bg-[#fafafa] px-4 py-3.5 text-center font-poppins text-[15px] font-semibold text-brand-primary" role="status">
                      Writing two directions for your book…
                    </p>
                  )}
                  {ideas.length > 0 && (
                    <div className="flex flex-col gap-2.5" role="radiogroup" aria-labelledby="c-idea-label">
                      {ideas.map((item, index) => {
                        const selected = index === pickedIdea;
                        return (
                          <button
                            key={`${item.label}-${index}`}
                            type="button"
                            role="radio"
                            aria-checked={selected}
                            disabled={loading || used}
                            className={`flex items-start gap-3 rounded-xl border px-3.5 py-3.5 text-left transition ${
                              selected
                                ? "border-brand-primary bg-white shadow-[inset_0_0_0_1px_#3F3774]"
                                : "border-[#d7d7d7] bg-[#fafafa] hover:border-brand-primary"
                            }`}
                            onClick={() => setPickedIdea(index)}
                          >
                            <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-poppins text-[12px] font-bold ${selected ? "bg-brand-primary text-white" : "bg-[#eceaf3] text-brand-primary"}`}>
                              {index + 1}
                            </span>
                            <span className="min-w-0">
                              <span className="block font-poppins text-[15px] font-bold text-black">{item.label}</span>
                              <span className="mt-1 block font-poppins text-[14px] leading-relaxed text-brand-gray">{item.text}</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                  {ideas.length > 0 && !chosen && !ideasLoading && (
                    <p className="m-0 font-poppins text-[13px] font-semibold text-brand-gray">Choose one, then generate the cover.</p>
                  )}
                </>
              )}

              {error && (
                <div className="aero-cover-error rounded-xl bg-[#fff1ef] px-4 py-3.5 text-center font-poppins text-[15px] text-[#8a2e24]" role="alert">
                  {error}
                </div>
              )}

              <div className="flex gap-2.5">
                {step > 0 && (
                  <button
                    type="button"
                    className="inline-flex min-h-14 flex-1 items-center justify-center rounded-xl border-2 border-brand-primary bg-transparent px-4 font-poppins text-[16px] font-bold text-brand-primary transition hover:bg-brand-primary/5"
                    onClick={goBack}
                  >
                    Back
                  </button>
                )}
                {step < IDEA_STEP ? (
                  <button
                    type="button"
                    className="inline-flex min-h-14 flex-1 items-center justify-center rounded-xl bg-brand-primary px-4 font-poppins text-[16px] font-bold text-white shadow-[0_8px_20px_rgba(63,55,116,0.18)] transition hover:brightness-110"
                    onClick={goNext}
                  >
                    Next
                  </button>
                ) : ideas.length === 0 ? (
                  <button
                    type="button"
                    className="inline-flex min-h-14 flex-1 items-center justify-center gap-2 rounded-xl bg-brand-primary px-4 font-poppins text-[16px] font-bold text-white shadow-[0_8px_20px_rgba(63,55,116,0.18)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:bg-[#eceaf3] disabled:text-brand-primary disabled:shadow-none"
                    onClick={generateIdeas}
                    disabled={ideasLoading || ideasUsed}
                  >
                    <Spark />
                    {ideasUsed ? "Used" : ideasLoading ? "Writing ideas…" : "Generate ideas"}
                  </button>
                ) : (
                  <button
                    type="button"
                    className="inline-flex min-h-14 flex-1 items-center justify-center gap-2 rounded-xl bg-brand-primary px-4 font-poppins text-[16px] font-bold text-white shadow-[0_8px_20px_rgba(63,55,116,0.18)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:bg-[#eceaf3] disabled:text-brand-primary disabled:shadow-none"
                    onClick={generateCover}
                    disabled={loading || used || ideasLoading || !chosen}
                  >
                    <Spark />
                    {used ? "Used" : loading ? "Generating…" : "Generate"}
                  </button>
                )}
              </div>
              <p className="m-0 text-center font-poppins text-[13px] text-brand-gray">
                One cover · No card needed · Included free with every package
              </p>
            </section>
          </form>

          <div className="min-w-0">
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-black/10 bg-[#fafafa] px-6 py-7 shadow-[0_12px_36px_rgba(63,55,116,0.08)] lg:sticky lg:top-24">
              <div className="font-poppins text-[13px] font-bold uppercase tracking-[1.4px] text-brand-gray">
                {image ? "Your cover" : "Live preview"}
              </div>
              <div
                className={`aero-cover-book ${loading ? "is-loading" : ""} ${image ? "is-ready" : ""}`}
                style={loading ? undefined : { background: cur.bg, color: cur.fg }}
              >
                {image && <img className="aero-cover-art" src={image} alt={`Cover for ${displayTitle}`} />}
                {!image && (
                  <>
                    <div className="text-center text-[11px] uppercase tracking-[2px] opacity-80">{coverTag}</div>
                    <div className="flex flex-col items-center gap-[18px]">
                      <div
                        className="h-[88px] w-[88px] rounded-full"
                        style={{
                          border: `2px solid ${cur.mo}`,
                          boxShadow: `inset 0 0 0 14px ${cur.bg}, inset 0 0 0 44px ${cur.mo}`,
                        }}
                      />
                      <div className="text-center font-syne text-[30px] font-bold leading-[1.15] [overflow-wrap:anywhere]">
                        {displayTitle}
                      </div>
                    </div>
                    <div className="text-[13px] uppercase tracking-[2.4px] opacity-85">{displayAuthor}</div>
                  </>
                )}
                {loading && (
                  <div className="aero-cover-loading" role="status" aria-live="polite">
                    <span className="aero-cover-orbit" aria-hidden="true" />
                    <p key={phase} className="aero-cover-phase">{COVER_PHASES[phase]}</p>
                  </div>
                )}
              </div>
              {image && (
                <div className="flex w-full max-w-[320px] gap-2.5">
                  <button
                    type="button"
                    className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl bg-brand-primary px-3 font-poppins text-[15px] font-bold text-white"
                    onClick={() => saveCover(image)}
                  >
                    Download
                  </button>
                  <button
                    type="button"
                    className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl border-2 border-brand-primary bg-transparent px-3 font-poppins text-[15px] font-bold text-brand-primary"
                    onClick={() => shareCover(image)}
                  >
                    Share
                  </button>
                </div>
              )}
              <p className="m-0 max-w-[420px] text-center font-poppins text-sm text-brand-gray">
                {image
                  ? "AI artwork, not a finished template. Our designers polish this for print."
                  : "A colour sketch only. Design the cover to replace it with one original image."}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-11 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card) => (
            <div key={card.title} className="rounded-2xl border border-black bg-white p-[22px] transition-colors duration-300 hover:border-brand-secondary">
              <span className="block font-poppins text-[18px] font-bold text-black">{card.title}</span>
              <span className="mt-2 block font-poppins text-[15px] leading-relaxed text-brand-gray">{card.body}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
