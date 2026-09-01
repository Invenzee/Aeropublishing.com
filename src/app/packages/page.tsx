import HeroSection from "@/components/About/HeroSection";
import PricingSection from "@/components/Pricing/PricingSection";
import ConnectWithUsSection from "@/components/ConnectWithUsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import AuthorsShowcaseSection from "@/components/AuthorsShowcaseSection";
import PromoSection from "@/components/PromoSection";
import FAQSection from "@/components/FAQSection";
import PortfolioSection from "../book-publishing-landing-page/PortfolioSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Publishing Packages & Pricing – Aero Publishing",
  description:
    "Explore Aero Publishing packages for editing, design, formatting, publishing, and marketing. Transparent pricing with copyright protection and a 7-day money-back guarantee.",
};

const faqs = [
  {
    id: 1,
    question: "How long does self-publishing take?",
    answer:
      "The timeline for self-publishing depends on the condition of your manuscript and the services required. On average, professionally publishing a book can take anywhere from 4 to 12 weeks. This includes editing, formatting, cover design, ISBN registration, and distribution setup. If your manuscript is already finalized, the process can move faster. At Aero Publishing, we provide a clear timeline at the beginning of every project so you know exactly what to expect.",
  },
  {
    id: 2,
    question: "Do I keep full rights and royalties?",
    answer:
      "Yes. When you publish with Aero Publishing, you retain 100% ownership of your manuscript and creative rights. You also receive the royalties generated from book sales based on the platform’s payout structure. We assist with the publishing process, but you remain the legal owner of your work at all times.",
  },
  {
    id: 3,
    question: "Can you publish eBooks, paperbacks, and hardcovers?",
    answer:
      "Yes, we offer publishing solutions for eBooks, paperback editions, and hardcover books. We format your manuscript according to platform-specific requirements and ensure it meets professional printing and digital distribution standards. Whether you want to publish on Amazon Kindle, distribute globally, or produce print-ready copies, we handle the technical setup for you.",
  },
  {
    id: 4,
    question: "Do you offer ghostwriting and editing services?",
    answer:
      "Yes. In addition to publishing, we provide professional ghostwriting, developmental editing, copy editing, proofreading, formatting, cover design, and marketing support. Whether you need help starting your manuscript or refining a completed draft, our team offers end-to-end services designed for self-publishing authors.",
  },
];

export default function PackagesPage() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection
        title="Publishing Packages Built for Every Author"
        description="All-inclusive packages with copyright protection and a 7-day money-back guarantee. Choose the plan that fits your book and publish with confidence."
      />
      <PricingSection />
      <PortfolioSection />
      <ConnectWithUsSection />
      <TestimonialsSection />
      <WhyChooseUsSection />
      <AuthorsShowcaseSection />
      <PromoSection />
      <FAQSection faqs={faqs} />
    </main>
  );
}
