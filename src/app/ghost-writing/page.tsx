import HeroSection from '@/components/About/HeroSection'
import FeatureSection from '@/components/About/FeatureSection';
import BenefitsGridSection from '@/components/About/BenefitsGridSection';
import ConnectWithUsSection from '@/components/ConnectWithUsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import AuthorsShowcaseSection from '@/components/AuthorsShowcaseSection';
import PromoSection from '@/components/PromoSection';
import FAQSection from '@/components/FAQSection';
import HowWeWorkSection from '@/components/HowWeWorkSection';
import WhyAeroSection from '@/components/WhyAeroSection';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professional Ghostwriting Services – Memoirs to Fiction ",
  description:
    "Hire experienced ghostwriters for memoirs, novels, business books & more. We turn your ideas into polished manuscripts ready for publishing success.",
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

export default function page() {

    const features = [
        {
            icon: "/feature-icon-1.webp",
            title: "Concept Development & Planning",
            description: "We help shape your idea into a strong, structured concept with clear direction, chapter planning, and audience positioning before writing begins."
        },
        {
            icon: "/feature-icon-2.webp",
            title: "In-Depth Research",
            description: "Our writers conduct thorough research to ensure accuracy, credibility, and depth—especially for memoirs, business books, and non-fiction titles."
        },
        {
            icon: "/feature-icon-3.webp",
            title: "Full Manuscript Writing",
            description: "Experienced ghostwriters craft your manuscript in your voice and style, delivering engaging, original content tailored to your genre and goals."
        },
        {
            icon: "/feature-icon-4.webp",
            title: "Collaborative Revisions",
            description: "You’re part of the process. We revise based on your feedback until the manuscript aligns perfectly with your vision."
        }
    ];

    return (
        <main className="min-h-screen bg-white pb-20">
            <HeroSection
                title="Ghostwriting"
                description="All-inclusive packages with copyright protection and a 7-day money-back guarantee. Publish your book with ease."
            />
            <FeatureSection
                subtitle="Ghostwriting Made Effortless:"
                title={{
                    prefix: "Powered by",
                    highlight: "Innovation",
                    suffix: "and Human Expertise"
                }}
                description="Take full control of your publishing journey with Aero Publishing’s all-in-one self-publishing platform. Whether you have a rough idea, an outline, or just a story to tell, our experienced ghostwriters work closely with you to craft a book that sounds authentically you.
                We combine advanced publishing technology with professional writers, editors, and publishing specialists to deliver a manuscript that is polished, compelling, and market-ready—without giving up your rights or royalties. From concept to final draft, you’re supported every step of the way by a dedicated account manager."
                features={[
                    "7-Day Money-Back Guarantee",
                    "Copyright & ISBN Certificate",
                    "Retain 100% of Your Book Rights"
                ]}
                imageSrc="/ghostwriting-1.webp"
            />
            <WhyAeroSection
                highlightTitle="What"
                normalTitle=" Our Ghostwriting"
                boldTitle=' Services Include'
                description='Publishing doesn’t need to be complicated. We offer a clear, honest, and author-focused publishing experience—keeping you informed, in control, and confident at every stage while delivering professional results you can trust.'
                features={features}
                imageUrl='/ghostwriting-3.webp'
            />
            <BenefitsGridSection
                subtitle="Why Ghostwriting with Aero?"
                title={{
                    text: <>A Faster, Easier, and More <br className='max-sm:hidden' /> Profitable </>,
                    highlight: "Experience"
                }}
                benefits={[
                    {
                        title: "All-in-One Platform For Seamless Self-Publishing",
                        description: "Our comprehensive platform supports every stage of publishing—from writing and editing to formatting, printing, and distribution—so you never need multiple vendors."
                    },
                    {
                        title: "Full Creative & Financial Control",
                        description: "You stay in charge of your story, voice, and vision. We write with you, not over you, and you keep full ownership of your work."
                    },
                    {
                        title: "Keep 100% of Your Royalties & Track Sales in Real Time",
                        description: "Publish globally through Amazon, Barnes & Noble, IngramSpark, Apple Books, and 100+ platforms while monitoring performance from one dashboard."
                    },
                    {
                        title: "Publish Faster with Our Streamlined Process",
                        description: "Our structured ghostwriting workflow helps you move from idea to finished manuscript significantly faster than industry averages."
                    },
                    {
                        title: "Professional Quality, Backed by AI & Human Expertise",
                        description: "We pair experienced ghostwriters with editorial specialists and smart publishing tools to ensure clarity, consistency, and market appeal."
                    },
                    {
                        title: "Marketing and Distribution Support",
                        description: "From launch planning to long-term visibility, our built-in marketing tools help position your book for success."
                    }
                ]}
            />
            <FeatureSection
                title={{
                    prefix: "Ghostwriting Your",
                    highlight: "Book"
                }}
                description="Bring your story to life with confidence. Whether you’re writing a memoir, business book, fiction, or non-fiction, Aero Publishing transforms your ideas into a professionally written manuscript that reflects your voice, goals, and audience.
                From early brainstorming to final revisions, everything is managed through one intuitive system—with expert guidance at every step."
                imageSrc="/ghostwriting-2.webp"
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
