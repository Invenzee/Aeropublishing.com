import { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import CounterSection from "@/components/CounterSection";
import WhyAeroSection from "@/components/WhyAeroSection";
import LogoCarousel from "@/components/LogoCarousel";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import ConnectWithUsSection from "@/components/ConnectWithUsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import AuthorsShowcaseSection from "@/components/AuthorsShowcaseSection";
import FAQSection from "@/components/FAQSection";
import PromoSection from "@/components/PromoSection";
import PortfolioSection from "./book-publishing-landing-page/PortfolioSection";
import BlogSection from "@/components/Blog/BlogSection";

export const metadata: Metadata = {
  title: "Publish Your Book with Aero Publishing – Ghostwriting, Editing & More",
  description:
    "Turn your manuscript into a published book with Aero Publishing’s expert services—ghostwriting, editing, design, and global book marketing included.",
};

const faqs = [
    {
        id: 1,
        question: "How long does self-publishing take?",
        answer: "The timeline for self-publishing depends on the condition of your manuscript and the services required. On average, professionally publishing a book can take anywhere from 4 to 12 weeks. This includes editing, formatting, cover design, ISBN registration, and distribution setup. If your manuscript is already finalized, the process can move faster. At Aero Publishing, we provide a clear timeline at the beginning of every project so you know exactly what to expect."
    },
    {
        id: 2,
        question: "Do I keep full rights and royalties?",
        answer: "Yes. When you publish with Aero Publishing, you retain 100% ownership of your manuscript and creative rights. You also receive the royalties generated from book sales based on the platform’s payout structure. We assist with the publishing process, but you remain the legal owner of your work at all times."
    },
    {
        id: 3,
        question: "Can you publish eBooks, paperbacks, and hardcovers?",
        answer: "Yes, we offer publishing solutions for eBooks, paperback editions, and hardcover books. We format your manuscript according to platform-specific requirements and ensure it meets professional printing and digital distribution standards. Whether you want to publish on Amazon Kindle, distribute globally, or produce print-ready copies, we handle the technical setup for you."
    },
    {
        id: 4,
        question: "Do you offer ghostwriting and editing services?",
        answer: "Yes. In addition to publishing, we provide professional ghostwriting, developmental editing, copy editing, proofreading, formatting, cover design, and marketing support. Whether you need help starting your manuscript or refining a completed draft, our team offers end-to-end services designed for self-publishing authors."
    }
];

export default function Home() {

  const features = [
    {
      icon: "/feature-icon-1.webp",
      title: "Professional Publishing Without Compromise",
      description: "We provide industry-standard publishing services from manuscript preparation to final release—handled with precision, care, and attention to detail for both print and digital formats."
    },
    {
      icon: "/feature-icon-2.webp",
      title: "Expert-Led Editorial and Design Support",
      description: "Work with experienced editors and designers who refine your manuscript, craft engaging interiors, and design covers that reflect your vision and appeal to your audience."
    },
    {
      icon: "/feature-icon-3.webp",
      title: "Full Creative Control and 100% Royalties",
      description: "You retain complete ownership of your work and receive 100% of your royalties. We support and guide the process—your intellectual property always remains yours."
    },
    {
      icon: "/feature-icon-4.webp",
      title: "Global Distribution Across Major Platforms",
      description: "Your book is professionally formatted and distributed across leading online retailers, reaching readers in the United States and worldwide in both print and digital formats."
    }
  ];

  return (
    <main className="min-h-screen w-full max-w-full overflow-x-hidden">
      <HeroSection />
      <CounterSection />
      <WhyAeroSection description="" highlightTitle="Publishing" normalTitle="Your Book Should Be " boldTitle="Simple, Transparent, and Author-First" features={features} />
      <PortfolioSection />
      <LogoCarousel />
      <HowWeWorkSection />
      <ConnectWithUsSection />
      <TestimonialsSection />
      <WhyChooseUsSection />
      <AuthorsShowcaseSection />
      <BlogSection />
      <FAQSection faqs={faqs} />
      <PromoSection />
    </main>
  );
}
