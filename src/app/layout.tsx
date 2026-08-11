import type { Metadata } from "next";
import { Syne, Poppins } from "next/font/google";
import localFont from "next/font/local";
import { Suspense } from "react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PromoPopup from "@/components/PromoPopup";
import TrackingProvider from "@/components/TrackingProvider";
import SiteScripts from "@/components/SiteScripts";

const ShadedLarsh = localFont({
  src: "../../public/fonts/shaded-larsh.ttf",
  variable: "--font-shaded-larsh",
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aeropublishing.com"),
  title: "Publish Your Book with Aero Publishing – Ghostwriting, Editing & More",
  description:
    "Turn your manuscript into a published book with Aero Publishing’s expert services—ghostwriting, editing, design, and global book marketing included.",
  keywords: [
    "book publishing",
    "ghostwriting services",
    "book editing",
    "book marketing",
    "self publishing",
    "book cover design",
  ],
  openGraph: {
    title: "Publish Your Book with Aero Publishing – Ghostwriting, Editing & More",
    description:
      "Turn your manuscript into a published book with Aero Publishing’s expert services—ghostwriting, editing, design, and global book marketing included.",
    url: "https://aeropublishing.com",
    siteName: "Aero Publishing",
    images: [
      {
        url: "/main-blog-image.webp",
        width: 1200,
        height: 630,
        alt: "Aero Publishing",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Publish Your Book with Aero Publishing – Ghostwriting, Editing & More",
    description:
      "Turn your manuscript into a published book with Aero Publishing’s expert services—ghostwriting, editing, design, and global book marketing included.",
    images: ["/main-blog-image.webp"],
  },
  icons: {
    icon: "/favicon-3.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-clip">
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="preconnect" href="https://static.zdassets.com" />
        <meta name="msvalidate.01" content="7000FF60495EE20E0D4689F671EDA603" />
        <meta name="google-site-verification" content="ROiFaEOVsREbtiohpnzCc7_R8WV_m6inTfBrUQsVtD4" />
        <link rel="icon" href="/favicon-3.webp" />
      </head>
      <body
        className={`${syne.variable} ${poppins.variable} ${ShadedLarsh.variable} antialiased overflow-x-clip`}
      >
        <div className="w-full max-w-full">
          <SiteScripts />

          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=1595522894901835&ev=PageView&noscript=1`}
              alt="facebook-pixel"
            />
          </noscript>
          <Suspense fallback={null}>
            <TrackingProvider />
          </Suspense>

          <Header />
          {children}
          <Footer />
          <PromoPopup />
        </div>
      </body>
    </html>
  );
}
