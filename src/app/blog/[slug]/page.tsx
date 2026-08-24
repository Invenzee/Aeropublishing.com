import { notFound } from "next/navigation";
import { getBlogPostBySlug, getAllPosts } from "@/lib/blogData";
import type { Metadata } from "next";
import BlogPostClient from "./BlogPostClient";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({ slug: post.slug }));
}

function toIsoDate(date: string) {
    const parsed = new Date(date);
    return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getBlogPostBySlug(slug);
    if (!post) return {};

    const title = post.metaTitle || post.title;
    const description = post.metaDescription || post.description;
    const url = `https://aeropublishing.com/blog/${slug}`;
    const imageUrl = post.image.startsWith("http")
        ? post.image
        : `https://aeropublishing.com${post.image}`;
    const keywords = post.keywords?.length
        ? post.keywords
        : post.focusKeyphrase
            ? [post.focusKeyphrase]
            : undefined;
    const publishedTime = toIsoDate(post.date);

    return {
        title,
        description,
        keywords,
        authors: [{ name: post.author }],
        robots: { index: true, follow: true },
        alternates: {
            canonical: url,
        },
        openGraph: {
            title,
            description,
            url,
            siteName: "Aero Publishing",
            type: "article",
            publishedTime,
            authors: [post.author],
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [imageUrl],
        },
    };
}

function extractFaqs(content: string) {
    const match = content.match(/\[FAQ\]([\s\S]*?)\[\/FAQ\]/);
    if (!match) return [];

    const items: { question: string; answer: string }[] = [];
    const lines = match[1].trim().split("\n").filter(Boolean);
    let question = "";
    let answer = "";

    for (const line of lines) {
        if (line.startsWith("Q: ")) {
            if (question) items.push({ question, answer: answer.trim() });
            question = line.slice(3);
            answer = "";
        } else if (line.startsWith("A: ")) {
            answer = line.slice(3);
        }
    }
    if (question) items.push({ question, answer: answer.trim() });
    return items;
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = getBlogPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const allPosts = getAllPosts().filter((p) => p.slug !== slug).slice(0, 3);
    const url = `https://aeropublishing.com/blog/${slug}`;
    const imageUrl = post.image.startsWith("http")
        ? post.image
        : `https://aeropublishing.com${post.image}`;
    const faqs = extractFaqs(post.content);

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "BlogPosting",
                headline: post.metaTitle || post.title,
                name: post.title,
                description: post.metaDescription || post.description,
                image: imageUrl,
                datePublished: toIsoDate(post.date),
                dateModified: toIsoDate(post.date),
                author: {
                    "@type": "Organization",
                    name: post.author,
                },
                publisher: {
                    "@type": "Organization",
                    name: "Aero Publishing",
                    logo: {
                        "@type": "ImageObject",
                        url: "https://aeropublishing.com/favicon-3.webp",
                    },
                },
                mainEntityOfPage: {
                    "@type": "WebPage",
                    "@id": url,
                },
                keywords: post.keywords?.join(", ") || post.focusKeyphrase,
                url,
            },
            ...(faqs.length
                ? [
                      {
                          "@type": "FAQPage",
                          mainEntity: faqs.map((item) => ({
                              "@type": "Question",
                              name: item.question,
                              acceptedAnswer: {
                                  "@type": "Answer",
                                  text: item.answer,
                              },
                          })),
                      },
                  ]
                : []),
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <BlogPostClient post={post} relatedPosts={allPosts} />
        </>
    );
}
