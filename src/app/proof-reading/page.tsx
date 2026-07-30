import HeroSection from '@/components/About/HeroSection'
import FeatureSection from '@/components/About/FeatureSection';
import BenefitsGridSection from '@/components/About/BenefitsGridSection';
import ConnectWithUsSection from '@/components/ConnectWithUsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import AuthorsShowcaseSection from '@/components/AuthorsShowcaseSection';
import PromoSection from '@/components/PromoSection';
import FAQSection from '@/components/FAQSection';
import WhyAeroSection from '@/components/WhyAeroSection';
import { Metadata } from 'next';

export const metadata : Metadata = {
    title: "Proofreading Services for Books – Error-Free Manuscripts",
    description: "Ensure your manuscript is polished and error-free with professional proofreading services focused on grammar, clarity, and consistency.",
}

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

export default function page() {

    const features = [
        {
            icon: "/feature-icon-1.webp",
            title: "Grammar, Spelling & Punctuation Corrections",
            description: "We identify and correct grammatical errors, spelling mistakes, punctuation issues, and typographical inconsistencies to ensure your manuscript reads smoothly and professionally."
        },
        {
            icon: "/feature-icon-2.webp",
            title: "Sentence Clarity & Consistency Review",
            description: "Our editors refine sentence flow, improve readability, and ensure consistency in tone, tense, and style — without altering your authorial voice."
        },
        {
            icon: "/feature-icon-3.webp",
            title: "Formatting & Layout Error Checks",
            description: "We review spacing, indentation, headings, page breaks, and layout inconsistencies to ensure your book meets industry formatting standards."
        },
        {
            icon: "/feature-icon-4.webp",
            title: "Final Pre-Publication Quality Assurance",
            description: "Before distribution, your manuscript undergoes a final quality check to confirm it is polished, error-free, and ready for print and digital platforms in the U.S. and beyond."
        }
    ];


    return (
        <main className="min-h-screen bg-white pb-20">
            <HeroSection
                title="Proof Reading"
                description="All-inclusive proofreading packages designed for authors who value accuracy, clarity, and professionalism. Protect your work, polish every word, and publish with confidence."
            />
            <FeatureSection
                subtitle="Proof Reading Made Effortless:"
                title={{
                    prefix: "Powered by",
                    highlight: "Innovation",
                    suffix: "and Human Expertise"
                }}
                description="At Aero Publishing, we believe proofreading is more than correcting errors — it’s about refining your voice without changing it. Our expert proofreaders combine advanced editorial tools with meticulous human review to ensure your manuscript is clear, consistent, and publication-ready.
                Whether you’re preparing your first book or finalizing your next release, we work line by line to eliminate grammar errors, punctuation issues, and formatting inconsistencies — while preserving your unique tone and intent.
                From final manuscript checks to quality assurance before print or digital distribution, Aero Publishing ensures your book meets professional publishing standards across all platforms."
                features={[
                    "7-Day Money-Back Guarantee",
                    "Copyright & ISBN Support Available",
                    "Retain 100% Ownership of Your Work"
                ]}
                imageSrc="/proof-reading-1.webp"
                hasFeatures={true}
            />
            <WhyAeroSection
                highlightTitle="What"
                normalTitle=" Our Book Proof Reading"
                boldTitle=' Services Include'
                description='Publishing doesn’t have to feel overwhelming. Our proofreading services are designed to give authors clarity, control, and confidence — delivering professional results without unnecessary complexity.'
                features={features}
                imageUrl='/proof-reading-3.webp'
            />
            <BenefitsGridSection
                subtitle="Why Proof Reading with Aero?"
                title={{
                    text: <>A Faster, Easier, and More <br className='max-sm:hidden' /> Profitable </>,
                    highlight: "Experience"
                }}
                benefits={[
                    {
                        title: "All-in-One Platform for Seamless Publishing",
                        description: "Our integrated publishing platform supports you beyond proofreading — connecting editing, formatting, cover design, and distribution into one smooth workflow."
                    },
                    {
                        title: "Full Creative & Financial Control",
                        description: "You remain in control of your content, timelines, and publishing decisions. No hidden fees, no royalty sharing — just transparent services built around your goals."
                    },
                    {
                        title: "Keep 100% of Your Royalties & Track Sales in Real Time",
                        description: "Distribute your book through Amazon, Barnes & Noble, Apple Books, IngramSpark, and more — while retaining full earnings and visibility."
                    },
                    {
                        title: "Publish Faster with Our Streamlined Process",
                        description: "Our efficient editorial workflow reduces turnaround time without sacrificing quality, helping you move from manuscript to market faster."
                    },
                    {
                        title: "Professional Quality, Backed by AI & Human Expertise",
                        description: "We combine smart proofreading tools with trained editorial professionals to catch what software alone can’t — context, clarity, and flow."
                    },
                    {
                        title: "Marketing and Distribution Support",
                        description: "From launch to long-term visibility, our tools and guidance help position your book for success in competitive markets."
                    }
                ]}
            />
            <FeatureSection
                title={{
                    prefix: "Proof Reading Your",
                    highlight: "Book"
                }}
                description="Your manuscript deserves a final review that leaves no room for doubt. Aero Publishing provides thorough proofreading that prepares your book for professional release — in print and digital formats.
                We review your manuscript with precision, correcting surface-level errors while ensuring consistency across chapters, headings, dialogue, and formatting. Our goal is simple: deliver a clean, credible, and polished book that readers trust.
                With Aero Publishing, you’re supported by a dedicated team that understands both storytelling and publishing standards — guiding your book confidently to the finish line."
                imageSrc="/proof-reading-2.webp"
                isReversed={true}
                subtitle=""
            />
            <ConnectWithUsSection />
            <TestimonialsSection />
            <WhyChooseUsSection />
            <AuthorsShowcaseSection />
            <PromoSection />
            <FAQSection faqs={faqs} />
        </main>
    )
}
