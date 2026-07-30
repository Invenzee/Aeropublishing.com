import type { Metadata } from "next";
import { Syne, Poppins } from "next/font/google";
import localFont from "next/font/local";
import { Suspense } from "react";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PromoPopup from "@/components/PromoPopup";
import FacebookPixel from "@/components/FacebookPixel";
import TrackingProvider from "@/components/TrackingProvider";

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
    <html lang="en">
      <head>
        {/* ✅ CRITICAL OPTIMIZATION: Only 2 essential preconnects */}
        <link
          rel="preconnect"
          href="https://www.googletagmanager.com"
        />
        <link
          rel="preconnect"
          href="https://connect.facebook.net"
        />

        {/* ✅ DNS-prefetch for non-critical domains */}
        <link rel="dns-prefetch" href="https://core.service.elfsight.com" />
        <link rel="dns-prefetch" href="https://static.elfsight.com" />
        <link rel="dns-prefetch" href="https://embed.tawk.to" />

        <meta name="msvalidate.01" content="7000FF60495EE20E0D4689F671EDA603" />
        <meta name="google-site-verification" content="70KQU6GQM-v5XdEOb0Zykiq6Q3sYzR1QO6o3LlfzSmo" />
        <link rel="icon" href="/favicon-3.webp" />
      </head>
      <body
        className={`${syne.variable} ${poppins.variable} ${ShadedLarsh.variable} antialiased`}
      >
        {/* ✅ Google Tag Manager - Delayed to improve LCP */}
        <Script
          id="gtm-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.defer=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-ML8Q9N76');
            `,
          }}
        />

        {/* ✅ Suspense wrapper for search params */}
        <Suspense fallback={null}>
          <FacebookPixel />
          <TrackingProvider />
        </Suspense>

        {/* Noscript fallbacks */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-ML8Q9N76"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1595522894901835&ev=PageView&noscript=1"
            alt="facebook-pixel"
          />
        </noscript>

        <Header />
        {children}
        <Footer />
        <PromoPopup />

        {/* ✅ Google Analytics - Delayed further */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NDYR2R3WP0"
          strategy="lazyOnload"
        />
        <Script
          id="ga-script"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-NDYR2R3WP0', {
                send_page_view: false
              });
              // Send pageview after everything loads
              window.addEventListener('load', function() {
                gtag('event', 'page_view');
              });
            `,
          }}
        />

        {/* ✅ Meta Pixel - Delayed with timeout */}
        <Script
          id="meta-pixel"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.fbAsyncInit = function() {
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '1595522894901835');
                fbq('track', 'PageView');
              };
              // Delay initialization by 3 seconds
              setTimeout(function() { 
                if(typeof fbAsyncInit === 'function') fbAsyncInit(); 
              }, 3000);
            `,
          }}
        />

        {/* ✅ Tawk.to - Load on idle (unchanged, already optimized) old one */}
        {/* <Script
          id="tawk-script"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/6855bbafc96da61913b7204e/1iu7ea9e7';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
              })();
              
              // Auto-open chat on desktop only
              Tawk_API.onLoad = function(){
                // Check if device is desktop (screen width > 768px)
                if(window.innerWidth > 768) {
                  Tawk_API.maximize();
                }
              };
            `,
          }}
        /> */}


        <Script
          id="tawk-script"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
             var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/69d7d37066239b1c36ac7b45/1jlph3s9v';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
              
              // Auto-open chat on desktop only
              Tawk_API.onLoad = function(){
                  Tawk_API.maximize();
              };
            `,
          }}
        />
      </body>
    </html>
  );
}