"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    BookOpen,
    CheckCircle2,
    FileText,
    Lock,
    Mail,
    MapPin,
    Phone,
    ShieldCheck,
    Upload,
    User,
    X,
    ChevronDown,
} from "lucide-react";
import Button from "@/components/Button";
import { sendManuscriptSubmission } from "@/app/actions/email";
import { getFormTrackingPayload } from "@/lib/tracking";

const GENRES = [
    "Fiction",
    "Non-Fiction",
    "Memoir",
    "Biography",
    "Children's Book",
    "Poetry",
    "Self-Help",
    "Business",
    "Romance",
    "Thriller / Mystery",
    "Science Fiction / Fantasy",
    "Academic",
    "Other",
];

const COUNTRIES = [
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "India",
    "Pakistan",
    "United Arab Emirates",
    "Germany",
    "France",
    "Italy",
    "Spain",
    "Netherlands",
    "Ireland",
    "New Zealand",
    "South Africa",
    "Singapore",
    "Philippines",
    "Nigeria",
    "Mexico",
    "Brazil",
    "Other",
];

const ACCEPTED_EXTENSIONS = [".pdf", ".doc", ".docx", ".rtf", ".txt", ".odt"];
const MAX_FILE_BYTES = 15 * 1024 * 1024;

const inputClass =
    "w-full min-h-[52px] px-4 sm:px-5 rounded-2xl bg-[#F7F6FB] border border-transparent text-sm font-poppins text-brand-black placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-brand-secondary/40 focus:ring-4 focus:ring-brand-secondary/10 transition-all";

const labelClass = "block text-[13px] font-poppins font-medium text-brand-primary mb-2";

function formatBytes(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function SectionHeading({
    step,
    icon: Icon,
    title,
    subtitle,
}: {
    step: string;
    icon: typeof User;
    title: string;
    subtitle: string;
}) {
    return (
        <div className="flex items-start gap-4 mb-6 sm:mb-8">
            <div className="shrink-0 w-11 h-11 rounded-2xl bg-brand-primary text-white flex items-center justify-center shadow-lg shadow-brand-primary/20">
                <Icon size={18} />
            </div>
            <div>
                <p className="text-[11px] tracking-[0.18em] uppercase font-poppins font-semibold text-brand-secondary mb-1">
                    {step}
                </p>
                <h3 className="text-xl sm:text-2xl font-syne font-bold text-brand-primary">{title}</h3>
                <p className="text-sm text-gray-500 font-poppins mt-1">{subtitle}</p>
            </div>
        </div>
    );
}

export default function ManuscriptForm() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [dragOver, setDragOver] = useState(false);
    const [fileError, setFileError] = useState("");
    const [status, setStatus] = useState<{
        submitting: boolean;
        success: boolean | null;
        message: string;
    }>({
        submitting: false,
        success: null,
        message: "",
    });

    const validateAndSetFile = (nextFile: File | null) => {
        if (!nextFile) {
            setFile(null);
            setFileError("");
            return;
        }

        const extension = `.${nextFile.name.split(".").pop()?.toLowerCase() || ""}`;
        if (!ACCEPTED_EXTENSIONS.includes(extension)) {
            setFile(null);
            setFileError("Please upload a PDF, DOC, DOCX, RTF, TXT, or ODT file.");
            return;
        }

        if (nextFile.size > MAX_FILE_BYTES) {
            setFile(null);
            setFileError("Manuscript must be 15MB or smaller.");
            return;
        }

        setFile(nextFile);
        setFileError("");
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragOver(false);
        const dropped = event.dataTransfer.files?.[0];
        if (dropped) validateAndSetFile(dropped);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!file) {
            setFileError("Please attach your manuscript file.");
            return;
        }

        setStatus({ submitting: true, success: null, message: "" });

        const form = event.currentTarget;
        const payload = new FormData(form);
        payload.set("manuscript", file);

        const tracking = getFormTrackingPayload();
        Object.entries(tracking).forEach(([key, value]) => {
            if (value) payload.set(key, value);
        });

        try {
            const result = await sendManuscriptSubmission(payload);
            if (result.success) {
                router.push("/thank-you?type=manuscript");
                return;
            }

            setStatus({
                submitting: false,
                success: false,
                message: result.message || "Something went wrong. Please try again.",
            });
        } catch (error) {
            console.error(error);
            setStatus({
                submitting: false,
                success: false,
                message: "An error occurred. Please try again later.",
            });
        }
    };

    return (
        <section className="relative pb-16 sm:pb-24">
            <div className="max-w-[1140px] mx-auto px-5 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    <motion.aside
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-4 lg:sticky lg:top-36 max-sm:hidden"
                    >
                        <div className="rounded-[28px] bg-brand-primary text-white p-7 sm:p-8 overflow-hidden relative shadow-2xl shadow-brand-primary/20">
                            <div className="absolute -top-16 -right-10 w-44 h-44 rounded-full bg-white/10 blur-2xl" />
                            <div className="absolute -bottom-20 -left-10 w-48 h-48 rounded-full bg-brand-secondary/20 blur-2xl" />

                            <p className="relative text-[11px] tracking-[0.2em] uppercase font-poppins font-semibold text-brand-secondary mb-3">
                                Confidential review
                            </p>
                            <h2 className="relative font-syne text-2xl sm:text-3xl font-bold leading-tight mb-4">
                                Your story stays yours.
                            </h2>
                            <p className="relative text-sm text-white/80 font-poppins leading-relaxed mb-8">
                                We review every manuscript privately. You keep 100% of your rights while our team evaluates fit, quality, and publishing next steps.
                            </p>

                            <ul className="relative space-y-4">
                                {[
                                    { icon: ShieldCheck, text: "Confidential editorial review" },
                                    { icon: CheckCircle2, text: "Response within 2–3 business days" },
                                    { icon: FileText, text: "PDF, DOC, DOCX, RTF, TXT, ODT" },
                                    { icon: Lock, text: "You retain full ownership" },
                                ].map((item) => (
                                    <li key={item.text} className="flex items-center gap-3 text-sm font-poppins">
                                        <span className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                            <item.icon size={16} className="text-brand-secondary" />
                                        </span>
                                        {item.text}
                                    </li>
                                ))}
                            </ul>

                            <div className="relative mt-8 pt-6 border-t border-white/15 space-y-3">
                                <a href="tel:+14242823304" className="flex items-center gap-3 text-sm hover:text-brand-secondary transition-colors">
                                    <Phone size={16} />
                                    +1 424 282 3304
                                </a>
                                <a href="mailto:admin@aeropublishing.com" className="flex items-center gap-3 text-sm hover:text-brand-secondary transition-colors">
                                    <Mail size={16} />
                                    admin@aeropublishing.com
                                </a>
                            </div>
                        </div>
                    </motion.aside>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="lg:col-span-8"
                    >
                        <form
                            onSubmit={handleSubmit}
                            className="rounded-[28px] bg-white border border-gray-100 shadow-[0_24px_80px_rgba(63,55,116,0.08)] p-5 sm:p-8 lg:p-10 space-y-10 sm:space-y-12"
                        >
                            <section>
                                <SectionHeading
                                    step="01 — Author"
                                    icon={User}
                                    title="Author details"
                                    subtitle="Tell us who we should contact about this submission."
                                />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                                    <label className="block">
                                        <span className={labelClass}>Full name *</span>
                                        <input name="fullName" type="text" required autoComplete="name" className={inputClass} placeholder="Jane Austen" />
                                    </label>
                                    <label className="block">
                                        <span className={labelClass}>Pen name</span>
                                        <input name="penName" type="text" className={inputClass} placeholder="Optional" />
                                    </label>
                                    <label className="block">
                                        <span className={labelClass}>Email *</span>
                                        <input name="email" type="email" required autoComplete="email" className={inputClass} placeholder="you@email.com" />
                                    </label>
                                    <label className="block">
                                        <span className={labelClass}>Phone *</span>
                                        <input name="phone" type="tel" required autoComplete="tel" className={inputClass} placeholder="+1 424 282 3304" />
                                    </label>
                                </div>
                            </section>

                            <section>
                                <SectionHeading
                                    step="02 — Location"
                                    icon={MapPin}
                                    title="Address"
                                    subtitle="Used for contracts and publishing correspondence."
                                />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                                    <label className="block sm:col-span-2">
                                        <span className={labelClass}>Street address *</span>
                                        <input name="street" type="text" required autoComplete="street-address" className={inputClass} placeholder="12508 Center St" />
                                    </label>
                                    <label className="block">
                                        <span className={labelClass}>Apartment / suite</span>
                                        <input name="apartment" type="text" className={inputClass} placeholder="Optional" />
                                    </label>
                                    <label className="block">
                                        <span className={labelClass}>City *</span>
                                        <input name="city" type="text" required autoComplete="address-level2" className={inputClass} placeholder="South Gate" />
                                    </label>
                                    <label className="block">
                                        <span className={labelClass}>State / province *</span>
                                        <input name="state" type="text" required autoComplete="address-level1" className={inputClass} placeholder="California" />
                                    </label>
                                    <label className="block">
                                        <span className={labelClass}>Postal code *</span>
                                        <input name="postalCode" type="text" required autoComplete="postal-code" className={inputClass} placeholder="90280" />
                                    </label>
                                    <label className="block sm:col-span-2">
                                        <span className={labelClass}>Country *</span>
                                        <div className="relative">
                                            <select name="country" required defaultValue="United States" className={`${inputClass} appearance-none pr-10`}>
                                                {COUNTRIES.map((country) => (
                                                    <option key={country} value={country}>
                                                        {country}
                                                    </option>
                                                ))}
                                            </select>
                                            <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        </div>
                                    </label>
                                </div>
                            </section>

                            <section>
                                <SectionHeading
                                    step="03 — Manuscript"
                                    icon={BookOpen}
                                    title="Book details"
                                    subtitle="A concise snapshot helps our editors prepare for review."
                                />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                                    <label className="block sm:col-span-2">
                                        <span className={labelClass}>Book title *</span>
                                        <input name="bookTitle" type="text" required className={inputClass} placeholder="The title of your book" />
                                    </label>
                                    <label className="block">
                                        <span className={labelClass}>Genre *</span>
                                        <div className="relative">
                                            <select name="genre" required defaultValue="" className={`${inputClass} appearance-none pr-10`}>
                                                <option value="" disabled>
                                                    Select a genre
                                                </option>
                                                {GENRES.map((genre) => (
                                                    <option key={genre} value={genre}>
                                                        {genre}
                                                    </option>
                                                ))}
                                            </select>
                                            <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        </div>
                                    </label>
                                    <label className="block">
                                        <span className={labelClass}>Word count *</span>
                                        <input name="wordCount" type="text" required className={inputClass} placeholder="e.g. 72,000" />
                                    </label>
                                    <label className="block sm:col-span-2">
                                        <span className={labelClass}>Target audience</span>
                                        <input name="audience" type="text" className={inputClass} placeholder="Adult, YA, children ages 6–8…" />
                                    </label>
                                    <label className="block sm:col-span-2">
                                        <span className={labelClass}>Synopsis *</span>
                                        <textarea
                                            name="synopsis"
                                            required
                                            rows={5}
                                            className={`${inputClass} h-auto py-4 resize-y min-h-[140px]`}
                                            placeholder="Share a brief overview of your book, central idea, and what makes it distinctive."
                                        />
                                    </label>
                                    <label className="block sm:col-span-2">
                                        <span className={labelClass}>Additional notes</span>
                                        <textarea
                                            name="notes"
                                            rows={3}
                                            className={`${inputClass} h-auto py-4 resize-y min-h-[96px]`}
                                            placeholder="Publishing goals, previous editions, or anything else we should know."
                                        />
                                    </label>
                                </div>
                            </section>

                            <section>
                                <SectionHeading
                                    step="04 — File"
                                    icon={Upload}
                                    title="Upload your manuscript"
                                    subtitle="Attach the latest draft. Maximum file size 15MB."
                                />

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".pdf,.doc,.docx,.rtf,.txt,.odt"
                                    className="sr-only"
                                    onChange={(event) => validateAndSetFile(event.target.files?.[0] ?? null)}
                                />

                                <div
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => fileInputRef.current?.click()}
                                    onKeyDown={(event) => {
                                        if (event.key === "Enter" || event.key === " ") {
                                            event.preventDefault();
                                            fileInputRef.current?.click();
                                        }
                                    }}
                                    onDragOver={(event) => {
                                        event.preventDefault();
                                        setDragOver(true);
                                    }}
                                    onDragLeave={() => setDragOver(false)}
                                    onDrop={handleDrop}
                                    className={`relative cursor-pointer rounded-[24px] border-2 border-dashed px-5 py-10 sm:py-12 text-center transition-all ${
                                        dragOver
                                            ? "border-brand-secondary bg-brand-secondary/5"
                                            : file
                                              ? "border-brand-primary/30 bg-[#F7F6FB]"
                                              : "border-gray-200 hover:border-brand-secondary/50 hover:bg-[#F7F6FB]"
                                    }`}
                                >
                                    {file ? (
                                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-brand-primary">
                                                <FileText size={22} />
                                            </div>
                                            <div className="text-center sm:text-left min-w-0">
                                                <p className="font-poppins font-medium text-brand-primary truncate max-w-[260px] sm:max-w-xs">
                                                    {file.name}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">{formatBytes(file.size)}</p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    validateAndSetFile(null);
                                                    if (fileInputRef.current) fileInputRef.current.value = "";
                                                }}
                                                className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-brand-secondary hover:border-brand-secondary transition-colors"
                                                aria-label="Remove file"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="mx-auto w-14 h-14 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-4">
                                                <Upload size={22} />
                                            </div>
                                            <p className="font-syne font-semibold text-brand-primary text-lg">
                                                Drop your manuscript here
                                            </p>
                                            <p className="text-sm text-gray-500 font-poppins mt-2">
                                                or tap to browse · PDF, Word, RTF, TXT, ODT
                                            </p>
                                        </>
                                    )}
                                </div>
                                {fileError && (
                                    <p className="mt-3 text-sm text-red-600 font-poppins">{fileError}</p>
                                )}

                                <label className="mt-6 flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        required
                                        className="mt-1 w-4 h-4 accent-brand-secondary shrink-0"
                                    />
                                    <span className="text-sm text-gray-600 font-poppins leading-relaxed">
                                        I confirm this is my original work (or I have the rights to submit it) and agree to be contacted about this manuscript.
                                    </span>
                                </label>
                            </section>

                            <div className="pt-2 border-t border-gray-100">
                                {status.message && (
                                    <p className={`mb-4 text-sm font-poppins ${status.success ? "text-green-600" : "text-red-600"}`}>
                                        {status.message}
                                    </p>
                                )}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <p className="text-xs text-gray-400 font-poppins max-w-sm">
                                        By submitting, you will receive a confirmation email. We never share your manuscript with third parties.
                                    </p>
                                    <Button
                                        variant="secondary"
                                        disabled={status.submitting}
                                        className="w-full sm:!w-auto !max-w-none !h-12 !px-8 !text-base whitespace-nowrap"
                                    >
                                        {status.submitting ? "Sending manuscript…" : "Submit manuscript"}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
