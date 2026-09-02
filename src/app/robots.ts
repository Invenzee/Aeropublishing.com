import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/admin/", "/login/", "/dashboard/", "/search/", "/thank-you"],
        },
        sitemap: "https://aeropublishing.com/sitemap.xml",
        host: "https://aeropublishing.com",
    };
}
