"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BlogPost } from "@/lib/blogData";
import Button from "@/components/Button";
import { openZendeskChat } from "@/lib/zendesk";

interface TocItem {
    id: string;
    text: string;
    level: 2 | 3;
}

function slugify(text: string, index: number) {
    return `section-${index}-${text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
}

function renderInlineText(text: string, keyPrefix: string) {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, idx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
            return (
                <strong key={`${keyPrefix}-b-${idx}`} className="text-brand-primary font-semibold">
                    {part.slice(2, -2)}
                </strong>
            );
        }

        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        const linkParts = part.split(linkRegex);

        if (linkParts.length > 1) {
            return linkParts.map((linkPart, linkIdx) => {
                if (linkIdx > 0 && linkIdx % 3 === 1) {
                    const url = linkParts[linkIdx + 1];
                    const isInternal =
                        url.startsWith("/") || url.includes("aeropublishing.com");
                    return (
                        <a
                            key={`${keyPrefix}-l-${linkIdx}`}
                            href={url}
                            {...(!isInternal
                                ? { target: "_blank", rel: "noopener noreferrer" }
                                : {})}
                            className="text-brand-secondary font-medium underline decoration-2 underline-offset-2 hover:text-brand-primary transition-colors duration-200"
                        >
                            {linkPart}
                        </a>
                    );
                }
                if (linkIdx % 3 === 0) return linkPart;
                return null;
            });
        }

        return part;
    });
}

function FAQAccordion({ items }: { items: { question: string; answer: string }[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="mt-6 space-y-3">
            {items.map((item, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                    <button
                        type="button"
                        onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-brand-light hover:bg-brand-light/80 transition-colors"
                    >
                        <span className="font-syne font-semibold text-brand-primary text-base">{item.question}</span>
                        <span className="text-brand-secondary text-xl font-bold shrink-0">{openIndex === idx ? "−" : "+"}</span>
                    </button>
                    {openIndex === idx && (
                        <p className="px-5 py-4 text-gray-700 font-poppins text-[15px] leading-relaxed border-t border-gray-100">
                            {item.answer}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
}

function parseFaqItems(faqBlock: string) {
    const faqItems: { question: string; answer: string }[] = [];
    const faqLines = faqBlock.trim().split("\n").filter(Boolean);
    let currentQ = "";
    let currentA = "";

    faqLines.forEach((line) => {
        if (line.startsWith("Q: ")) {
            if (currentQ) faqItems.push({ question: currentQ, answer: currentA.trim() });
            currentQ = line.replace("Q: ", "");
            currentA = "";
        } else if (line.startsWith("A: ")) {
            currentA = line.replace("A: ", "");
        }
    });
    if (currentQ) faqItems.push({ question: currentQ, answer: currentA.trim() });
    return faqItems;
}

function renderMarkdownChunk(
    markdown: string,
    keyPrefix: string,
    headings: TocItem[],
    headingIndexStart: number
) {
    const lines = markdown.split("\n");
    const elements: React.ReactNode[] = [];
    let headingIndex = headingIndexStart;
    let i = 0;

    while (i < lines.length) {
        const line = lines[i].trim();

        if (!line) {
            i++;
            continue;
        }

        if (line.startsWith("## ")) {
            const text = line.replace("## ", "");
            const id = slugify(text, headingIndex++);
            headings.push({ id, text, level: 2 });
            elements.push(
                <h2 key={`${keyPrefix}-h2-${i}`} id={id} className="text-2xl md:text-3xl font-syne font-bold text-brand-primary mt-10 mb-4 leading-tight scroll-mt-32">
                    {text}
                </h2>
            );
        } else if (line.startsWith("### ")) {
            const text = line.replace("### ", "");
            const id = slugify(text, headingIndex++);
            headings.push({ id, text, level: 3 });
            elements.push(
                <h3 key={`${keyPrefix}-h3-${i}`} id={id} className="text-xl font-syne font-semibold text-brand-primary mt-8 mb-3 leading-tight scroll-mt-32">
                    {text}
                </h3>
            );
        } else if (line.startsWith("| ")) {
            const tableRows: string[][] = [];
            while (i < lines.length && lines[i].trim().startsWith("|")) {
                const row = lines[i].trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim());
                if (!row.every((cell) => /^-+$/.test(cell))) tableRows.push(row);
                i++;
            }
            if (tableRows.length > 0) {
                const [header, ...body] = tableRows;
                elements.push(
                    <div key={`${keyPrefix}-table-${i}`} className="my-8 overflow-x-auto rounded-lg shadow-sm border border-gray-100">
                        <table className="w-full min-w-[600px] border-collapse text-sm">
                            <thead>
                                <tr>
                                    {header.map((cell, idx) => (
                                        <th key={idx} className="bg-brand-primary text-white px-4 py-3 text-left font-syne font-semibold">{cell}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {body.map((row, rowIdx) => (
                                    <tr key={rowIdx} className="hover:bg-gray-50">
                                        {row.map((cell, cellIdx) => (
                                            <td key={cellIdx} className="border-t border-gray-100 px-4 py-3 text-gray-700 font-poppins align-top">{cell}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            }
            continue;
        } else if (line.startsWith("- ")) {
            const listItems: string[] = [];
            while (i < lines.length && lines[i].trim().startsWith("- ")) {
                listItems.push(lines[i].trim().replace(/^- /, ""));
                i++;
            }
            elements.push(
                <ul key={`${keyPrefix}-list-${i}`} className="space-y-2 mb-6 pl-4">
                    {listItems.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-gray-700 font-poppins text-[15px] leading-relaxed">
                            <span className="mt-1.5 w-2 h-2 rounded-full bg-brand-secondary shrink-0" />
                            <span>{renderInlineText(item, `${keyPrefix}-li-${idx}`)}</span>
                        </li>
                    ))}
                </ul>
            );
            continue;
        } else {
            elements.push(
                <p key={`${keyPrefix}-p-${i}`} className="text-gray-700 font-poppins text-[15px] md:text-[16px] leading-[1.9] mb-5">
                    {renderInlineText(line, `${keyPrefix}-p-${i}`)}
                </p>
            );
        }

        i++;
    }

    return { elements, headingIndex };
}

function renderContent(content: string) {
    const faqRegex = /\[FAQ\]([\s\S]*?)\[\/FAQ\]/;
    const faqMatch = content.match(faqRegex);
    const faqItems = faqMatch ? parseFaqItems(faqMatch[1]) : [];
    const bodyContent = content.replace(faqRegex, "");

    const headings: TocItem[] = [];
    const body = renderMarkdownChunk(bodyContent, "body", headings, 0);
    const elements: React.ReactNode[] = [...body.elements];

    if (faqItems.length > 0) {
        elements.push(<div key="faq-section"><FAQAccordion items={faqItems} /></div>);
    }

    return { elements, headings };
}

interface Props {
    post: BlogPost;
    relatedPosts: BlogPost[];
}

export default function BlogPostClient({ post, relatedPosts }: Props) {
    const { elements, headings } = renderContent(post.content);

    return (
        <main className="min-h-screen bg-white w-full max-w-full overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-[url('/hero-bg.webp')] bg-cover bg-center pt-40 pb-20">
                {/* Overlay */}
                <div className="absolute inset-0 bg-brand-primary/80" />

                {/* Decorative blobs */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand-secondary/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-accent/10 rounded-full blur-3xl" />

                <div className="relative z-10 max-w-[860px] mx-auto px-6 text-center">
                    {/* Category badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-block bg-brand-secondary text-white text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest font-poppins mb-6">
                            {post.category}
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-syne font-bold text-white leading-[1.2] mb-6"
                    >
                        {post.title}
                    </motion.h1>

                    {/* Meta row */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-wrap items-center justify-center gap-4 text-white/70 font-poppins text-sm"
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-brand-secondary/40 flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span>{post.author}</span>
                        </div>
                        <span className="w-1 h-1 rounded-full bg-white/40" />
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{post.date}</span>
                        </div>
                        <span className="w-1 h-1 rounded-full bg-white/40" />
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{post.readTime}</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Image */}
            <div className="max-w-[900px] mx-auto px-6 -mt-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="relative rounded-3xl overflow-hidden shadow-2xl aspect-16/7"
                >
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Subtle overlay gradient */}
                    <div className="absolute inset-0 bg-linear-to-t from-brand-primary/20 to-transparent" />
                </motion.div>
            </div>

            {/* Main Content + Sidebar */}
            <section className="max-w-[1140px] mx-auto px-6 py-16 grid lg:grid-cols-[1fr_300px] gap-12">
                {/* Article Body */}
                <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="min-w-0"
                >
                    {/* Decorative opening line */}
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-1 rounded-full bg-brand-secondary" />
                        <span className="text-brand-secondary font-poppins text-sm font-semibold uppercase tracking-widest">
                            {post.category}
                        </span>
                    </div>

                    {/* Content */}
                    <div className="prose-content">
                        {elements}
                    </div>

                    {/* Tags / Share row */}
                    <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap gap-2">
                            {["Publishing", "Writing Tips", "Author Advice", "Book Marketing"].map((tag) => (
                                <span
                                    key={tag}
                                    className="text-[11px] font-poppins font-semibold text-brand-primary bg-brand-primary/8 px-3 py-1.5 rounded-full border border-brand-primary/15 hover:bg-brand-secondary hover:text-white hover:border-brand-secondary transition-all duration-200 cursor-pointer"
                                >
                                    #{tag.replace(" ", "")}
                                </span>
                            ))}
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-xs text-gray-400 font-poppins">Share:</span>
                            {/* Facebook */}
                            <a
                                href="https://www.facebook.com/people/Aero-Publishing/100069250598189/"
                                aria-label="Share on Facebook"
                                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-brand-primary transition-colors duration-200 flex items-center justify-center group"
                            >
                                <svg className="w-3.5 h-3.5 text-gray-500 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                            {/* Instagram */}
                            <a
                                href="https://www.instagram.com/aeropublishingus/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Follow on Instagram"
                                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-brand-primary transition-colors duration-200 flex items-center justify-center group"
                            >
                                <svg className="w-3.5 h-3.5 text-gray-500 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Author Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mt-10 bg-linear-to-br from-brand-primary/5 to-brand-secondary/5 rounded-3xl p-6 md:p-8 border border-brand-primary/10 flex gap-5 items-start"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-brand-primary flex items-center justify-center shrink-0">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-[11px] font-poppins font-bold text-brand-secondary uppercase tracking-widest mb-1">Written By</p>
                            <h4 className="text-lg font-syne font-bold text-brand-primary mb-1">{post.author}</h4>
                            <p className="text-sm font-poppins text-gray-500 mb-3">{post.authorRole} · Aero Publishing</p>
                            <p className="text-sm font-poppins text-gray-600 leading-relaxed">
                                Our team of publishing experts has helped hundreds of authors bring their books to life through professional editing, design, and global distribution.
                            </p>
                        </div>
                    </motion.div>

                    {/* Back to Blog */}
                    <div className="mt-10 flex justify-start">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-secondary font-poppins text-sm font-semibold transition-colors duration-200 group"
                        >
                            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to All Posts
                        </Link>
                    </div>
                </motion.article>

                {/* Sidebar */}
                <aside className="space-y-8">
                    {/* CTA Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.6 }}
                        className="sticky top-28 space-y-6"
                    >
                        {/* Table of Contents */}
                        {headings.length > 0 && (
                            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                                <h4 className="font-syne font-bold text-brand-primary text-base mb-4">Contents</h4>
                                <nav className="space-y-2 max-h-[50vh] overflow-y-auto">
                                    {headings.map((item) => (
                                        <a
                                            key={item.id}
                                            href={`#${item.id}`}
                                            className={`block text-sm font-poppins text-gray-600 hover:text-brand-secondary transition-colors border-l-2 border-transparent hover:border-brand-secondary ${
                                                item.level === 3 ? "pl-6" : "pl-3"
                                            }`}
                                        >
                                            {item.text}
                                        </a>
                                    ))}
                                </nav>
                            </div>
                        )}

                        <div className="bg-linear-to-br from-brand-primary to-[#6259a8] rounded-3xl p-6 text-white relative overflow-hidden">
                            {/* Decorative circle */}
                            <div className="absolute -top-8 -right-8 w-28 h-28 bg-white/10 rounded-full" />
                            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-brand-secondary/30 rounded-full" />

                            <div className="relative z-10">
                                <span className="text-brand-secondary font-poppins text-[11px] font-bold uppercase tracking-widest">Ready to Publish?</span>
                                <h3 className="text-xl font-syne font-bold mt-2 mb-3 leading-snug">
                                    Turn Your Manuscript Into a Published Book
                                </h3>
                                <p className="text-white/75 font-poppins text-sm leading-relaxed mb-6">
                                    Get expert help with editing, cover design, formatting, and global distribution.
                                </p>
                                <div className="flex flex-col gap-3">
                                    <Button variant="secondary" className="w-full justify-center">
                                        <a href="tel:+14242823304">Call Us: +1424 282 3304</a>
                                    </Button>
                                    <button
                                        onClick={openZendeskChat}
                                        className="w-full h-10 rounded-full border border-white/40 text-white font-poppins text-sm font-semibold hover:bg-white/10 transition-colors duration-200"
                                    >
                                        Chat Now
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Related Posts */}
                        {relatedPosts.length > 0 && (
                            <div>
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-6 h-0.5 bg-brand-secondary rounded-full" />
                                    <h4 className="font-syne font-bold text-brand-primary text-base">Related Posts</h4>
                                </div>
                                <div className="space-y-5">
                                    {relatedPosts.map((related, idx) => (
                                        <motion.div
                                            key={related.slug}
                                            initial={{ opacity: 0, y: 15 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: idx * 0.1 }}
                                        >
                                            <Link
                                                href={`/blog/${related.slug}`}
                                                className="flex gap-4 group"
                                            >
                                                <div className="relative w-20 h-16 rounded-xl overflow-hidden shrink-0">
                                                    <Image
                                                        src={related.image}
                                                        alt={related.title}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[10px] text-brand-secondary font-poppins font-semibold uppercase tracking-wide mb-1">
                                                        {related.category}
                                                    </p>
                                                    <h5 className="text-[13px] font-syne font-bold text-brand-primary leading-snug line-clamp-2 group-hover:text-brand-secondary transition-colors duration-200">
                                                        {related.title}
                                                    </h5>
                                                    <p className="text-[11px] text-gray-400 font-poppins mt-1">{related.date}</p>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quick Stats */}
                        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                            <h4 className="font-syne font-bold text-brand-primary text-sm mb-4">Article Info</h4>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500 font-poppins">Read Time</span>
                                    <span className="text-xs font-semibold text-brand-primary font-poppins">{post.readTime}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500 font-poppins">Published</span>
                                    <span className="text-xs font-semibold text-brand-primary font-poppins">{post.date}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500 font-poppins">Category</span>
                                    <span className="text-xs font-semibold text-brand-secondary font-poppins">{post.category}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </aside>
            </section>

            {/* More Posts Section */}
            {relatedPosts.length > 0 && (
                <section className="bg-[url('/why-aero-gradient-bg.webp')] bg-contain bg-no-repeat bg-left py-20">
                    <div className="max-w-[1140px] mx-auto px-6">
                        {/* Section Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-12"
                        >
                            <span className="text-brand-secondary font-poppins text-sm font-semibold uppercase tracking-widest">Keep Reading</span>
                            <h2 className="text-3xl md:text-4xl font-syne font-bold text-brand-primary mt-2 leading-tight">
                                More Publishing{" "}
                                <span className="text-brand-secondary font-shaded italic font-light text-[44px]">Insights</span>
                            </h2>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {relatedPosts.map((related, idx) => (
                                <motion.article
                                    key={related.slug}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                                >
                                    <Link href={`/blog/${related.slug}`} className="block">
                                        {/* Image */}
                                        <div className="relative aspect-4/3 overflow-hidden">
                                            <Image
                                                src={related.image}
                                                alt={related.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute top-4 right-4">
                                                <span className="bg-brand-secondary text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                                                    {related.category}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            <h3 className="text-base font-syne font-bold text-brand-primary leading-snug mb-3 line-clamp-2 group-hover:text-brand-secondary transition-colors duration-200">
                                                {related.title}
                                            </h3>
                                            <p className="text-[13px] text-gray-500 font-poppins leading-relaxed line-clamp-2 mb-4">
                                                {related.description}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2 text-[11px] text-gray-400 font-poppins">
                                                    <span>{related.date}</span>
                                                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                                                    <span>{related.readTime}</span>
                                                </div>
                                                <span className="text-brand-secondary font-poppins text-xs font-semibold group-hover:underline">
                                                    Read Now →
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.article>
                            ))}
                        </div>

                        <div className="text-center mt-10">
                            <Link href="/blog">
                                <Button variant="primary" className="mx-auto">View All Posts</Button>
                            </Link>
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}
