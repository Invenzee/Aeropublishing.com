import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blogData";

const BASE_URL = "https://aeropublishing.com";

type StaticRoute = {
    path: string;
    changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
    priority: number;
};

const staticRoutes: StaticRoute[] = [
    { path: "", changeFrequency: "weekly", priority: 1 },
    { path: "/submit-manuscript", changeFrequency: "monthly", priority: 0.9 },
    { path: "/book-editing", changeFrequency: "monthly", priority: 0.9 },
    { path: "/book-publishing", changeFrequency: "monthly", priority: 0.9 },
    { path: "/book-marketing", changeFrequency: "monthly", priority: 0.9 },
    { path: "/services", changeFrequency: "monthly", priority: 0.8 },
    { path: "/about", changeFrequency: "monthly", priority: 0.8 },
    { path: "/portfolio", changeFrequency: "weekly", priority: 0.8 },
    { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
    { path: "/contact-us", changeFrequency: "monthly", priority: 0.8 },
    { path: "/packages", changeFrequency: "monthly", priority: 0.8 },
    { path: "/pricing", changeFrequency: "monthly", priority: 0.7 },
    { path: "/amazon-publishing", changeFrequency: "monthly", priority: 0.7 },
    { path: "/audio-book-narration", changeFrequency: "monthly", priority: 0.7 },
    { path: "/authors-website", changeFrequency: "monthly", priority: 0.7 },
    { path: "/book-cover-design", changeFrequency: "monthly", priority: 0.7 },
    { path: "/book-formatting", changeFrequency: "monthly", priority: 0.7 },
    { path: "/book-printing", changeFrequency: "monthly", priority: 0.7 },
    { path: "/children-book", changeFrequency: "monthly", priority: 0.7 },
    { path: "/ebook-writing", changeFrequency: "monthly", priority: 0.7 },
    { path: "/fiction-writing", changeFrequency: "monthly", priority: 0.7 },
    { path: "/ghost-writing", changeFrequency: "monthly", priority: 0.7 },
    { path: "/proof-reading", changeFrequency: "monthly", priority: 0.7 },
    { path: "/video-trailer", changeFrequency: "monthly", priority: 0.7 },
    { path: "/terms-and-conditions", changeFrequency: "yearly", priority: 0.3 },
    { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/return-refund-policies", changeFrequency: "yearly", priority: 0.3 },
];

function parseDate(value: string) {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date();

    const pages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
        url: `${BASE_URL}${route.path}`,
        lastModified,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
    }));

    const posts: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: parseDate(post.date),
        changeFrequency: "monthly",
        priority: 0.7,
    }));

    return [...pages, ...posts];
}
