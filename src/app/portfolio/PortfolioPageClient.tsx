'use client'

import HeroSection from '@/components/About/HeroSection'
import ConnectWithUsSection from '@/components/ConnectWithUsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import AuthorsShowcaseSection from '@/components/AuthorsShowcaseSection';
import PromoSection from '@/components/PromoSection';
import FAQSection from '@/components/FAQSection';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import PortfolioSection from '../book-publishing-landing-page/PortfolioSection';


const faqs = [
    {
        id: 1,
        question: "How long does self-publishing take?",
        answer: "The timeline for self-publishing depends on the condition of your manuscript and the services required. On average, professionally publishing a book can take anywhere from 4 to 12 weeks. This includes editing, formatting, cover design, ISBN registration, and distribution setup. If your manuscript is already finalized, the process can move faster. At Aero Publishing, we provide a clear timeline at the beginning of every project so you know exactly what to expect."
    },
    {
        id: 2,
        question: "Do I keep full rights and royalties?",
        answer: "Yes. When you publish with Aero Publishing, you retain 100% ownership of your manuscript and creative rights. You also receive the royalties generated from book sales based on the platform's payout structure. We assist with the publishing process, but you remain the legal owner of your work at all times."
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

export default function page() {
    const containerRef = useRef(null);
    const containerRef2 = useRef(null); // Create a separate ref for the second carousel
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });
    const isInView2 = useInView(containerRef2, { once: true, margin: "-100px" }); // Second inView state
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
    const [swiperInstance2, setSwiperInstance2] = useState<SwiperType | null>(null); // Second swiper instance

    const books = [
        {
            id: 1,
            image: "/book-landing-page-11.webp",
            title: "Book 1"
        },
        {
            id: 2,
            image: "/book-landing-page-4.webp",
            title: "Book 2"
        },
        {
            id: 3,
            image: "/book-landing-page-5.webp",
            title: "Book 3"
        },
        {
            id: 4,
            image: "/book-landing-page-6.webp",
            title: "Book 4"
        },
        {
            id: 5,
            image: "/book-landing-page-7.webp",
            title: "Book 5"
        },
        {
            id: 6,
            image: "/book-landing-page-8.webp",
            title: "Book 6"
        },
        {
            id: 7,
            image: "/book-landing-page-9.webp",
            title: "Book 7"
        },
        {
            id: 8,
            image: "/book-landing-page-10.webp",
            title: "Book 8"
        }
    ];

    // Create reversed copy of books for the second carousel
    const reversedBooks = [...books].reverse();

    return (
        <main className="min-h-screen bg-white pb-20">
            <HeroSection
                hasForm={false}
                title="Portfolio"
                description="Explore a curated selection of projects crafted by Aero Publishing—where ideas turn into professionally published books. Our portfolio reflects the quality, creativity, and care we bring to every author we work with.
                From fiction and nonfiction to ebooks, children's books, and visual marketing assets, each project showcases our commitment to polished execution, author ownership, and market-ready results."
            />
            <PortfolioSection />
            <ConnectWithUsSection />
            <TestimonialsSection />
            <WhyChooseUsSection />
            <AuthorsShowcaseSection />
            <PromoSection />
            <FAQSection faqs={faqs} />
        </main>
    )
}