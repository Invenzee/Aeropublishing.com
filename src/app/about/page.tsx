import HeroSection from "@/components/About/HeroSection";
import MissionSection from "@/components/About/Mission";
import CounterSection from "@/components/CounterSection";
import WhyAeroSection from "@/components/WhyAeroSection";
import LogoCarousel from "@/components/LogoCarousel";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import ConnectWithUsSection from "@/components/ConnectWithUsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import PromoSection from "@/components/PromoSection";
import { Metadata } from "next";
import PortfolioSection from "../book-publishing-landing-page/PortfolioSection";

export const metadata: Metadata = {
  title: "About Aero Publishing – Helping Authors Get Published",
  description:
    "Meet the team behind Aero Publishing. We empower authors to bring their stories to life with transparent, creative, and results-driven publishing services.",
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

export default function About() {

    const features = [
        {
            icon: "/feature-icon-1.webp",
            title: "Professional Publishing Without Compromise",
            description: "We deliver industry-standard publishing services without cutting corners. From manuscript preparation to final release, every step is handled with precision, care, and attention to detail—so your book meets professional publishing standards in both print and digital formats."
        },
        {
            icon: "/feature-icon-2.webp",
            title: "Expert-Led Editorial and Design Support",
            description: "Your book is supported by experienced editors and designers who understand both storytelling and market expectations. We work collaboratively to refine your manuscript, develop compelling interiors, and create covers that reflect your vision while appealing to your audience."
        },
        {
            icon: "/feature-icon-3.webp",
            title: "Full Creative Control and 100% Royalties",
            description: "You retain complete ownership of your work. Every creative decision remains yours, and you earn 100% of your royalties. Our role is to support, guide, and execute—not to take control of your intellectual property."
        },
        {
            icon: "/feature-icon-4.webp",
            title: "Global Distribution Across Major Platforms",
            description: "Your book is prepared for distribution across leading online retailers and platforms worldwide. We ensure your title is professionally formatted and positioned to reach readers in the United States and beyond, in both print and digital marketplaces."
        }
    ];

    return (
        <main className="min-h-screen">
            <HeroSection hasForm={false} title="About Us" description="Your story deserves more than just being written—it deserves to be seen, shared, and remembered. At Aero Publishing, we help authors bring their ideas to life and place them in the hands of readers worldwide with confidence and ease." />
            <CounterSection />
            <MissionSection />
            <WhyAeroSection highlightTitle="Publishing" normalTitle="Your Book Should Be " boldTitle=" Simple, Transparent, and Author-First" features={features} description="" />
            <PortfolioSection />
            <LogoCarousel />
            <HowWeWorkSection />
            <ConnectWithUsSection />
            <TestimonialsSection />
            <PromoSection />
            <FAQSection faqs={faqs} />
        </main>
    );
}
