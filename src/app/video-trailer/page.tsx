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
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Book Trailer Video Services – Promote Your Book",
    description: "Promote your book with engaging video trailers designed to capture attention, boost visibility, and drive readers to your book.",
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
            title: "Script Development & Creative Storyboarding",
            description: "We develop a compelling trailer script and visual storyboard that captures your book’s core theme, tone, and audience appeal—ensuring every second has purpose."
        },
        {
            icon: "/feature-icon-2.webp",
            title: "Professional Video Editing & Animation",
            description: "Our editors create polished trailers using cinematic transitions, motion graphics, typography, and pacing designed to engage readers instantly."
        },
        {
            icon: "/feature-icon-3.webp",
            title: "Background Music & Voiceover Integration",
            description: "Choose from licensed music tracks and optional professional voiceovers to enhance emotion, clarity, and memorability."
        },
        {
            icon: "/feature-icon-4.webp",
            title: "Social Media & Amazon-Optimized Formats",
            description: "Your trailer is delivered in multiple formats optimized for Amazon listings, YouTube, Instagram, Facebook, TikTok, and author websites—ready to publish immediately."
        }
    ];


    return (
        <main className="min-h-screen bg-white pb-20">
            <HeroSection
                title="Video Trailer"
                description="All-inclusive packages with full copyright protection and a 7-day money-back guarantee. Promote your book with cinematic impact and confidence."
            />
            <FeatureSection
                subtitle="Video Trailer Made Effortless:"
                title={{
                    prefix: "Powered by",
                    highlight: "Innovation",
                    suffix: "and Human Expertise"
                }}
                description="Bring your story to life with professionally crafted book video trailers designed to captivate readers and boost visibility. At Aero Publishing, we combine creative storytelling, advanced production tools, and human expertise to produce compelling trailers that showcase the heart of your book.
                Whether you’re launching a new release or reviving an existing title, our team manages the entire process—from concept to final cut—so you can focus on being the author while we handle the visuals."
                features={[
                    "7-Day Money-Back Guarantee",
                    "Copyright & Creative Ownership Secured",
                    "Retain 100% of Your Book Rights"
                ]}
                imageSrc="/video-trailer-1.webp"
            />
            <WhyAeroSection
                highlightTitle="What"
                normalTitle=" Our Book Video Trailer"
                boldTitle=' Services Include'
                description='Publishing doesn’t need to be complicated. We offer a transparent, author-focused creative experience—keeping you informed, in control, and confident while delivering professional promotional assets you can trust.'
                features={features}
                imageUrl='/video-trailer-3.webp'
            />
            <BenefitsGridSection
                subtitle="Why Video Trailer with Aero?"
                title={{
                    text: <>A Faster, Easier, and More <br className='max-sm:hidden' /> Profitable </>,
                    highlight: "Experience"
                }}
                benefits={[
                    {
                        title: "All-in-One Platform for Seamless Publishing",
                        description: "Our integrated publishing ecosystem connects video production, book marketing, and distribution—eliminating the need for multiple vendors or complicated workflows."
                    },
                    {
                        title: "Full Creative & Financial Control",
                        description: "You stay in control of your story, visuals, branding, and budget. Every decision is guided by you, supported by our experienced creative team."
                    },
                    {
                        title: "Keep 100% of Your Royalties & Track Performance",
                        description: "Your book trailer is designed for platforms like Amazon, social media, and author websites—helping drive engagement while you retain full earnings and rights."
                    },
                    {
                        title: "Publish Faster with Our Streamlined Process",
                        description: "From concept approval to final delivery, our efficient workflow ensures your trailer is completed quickly without sacrificing quality."
                    },
                    {
                        title: "Professional Quality, Backed by AI & Human Expertise",
                        description: "We blend modern production tools with skilled editors, designers, and storytellers to deliver visually striking, market-ready trailers."
                    },
                    {
                        title: "Marketing & Distribution Ready",
                        description: "Your trailer is optimized for Amazon listings, social media ads, websites, and email campaigns—so it works where readers actually discover books."
                    }
                ]}
            />
            <FeatureSection
                title={{
                    prefix: "Video Trailer Your",
                    highlight: "Book"
                }}
                description="Create buzz before launch—or reignite interest after publication—with a professional book video trailer. Aero Publishing delivers cinematic visuals that highlight your story’s emotion, genre, and appeal.
                From scripting to final export, everything is handled through one intuitive process with a dedicated account manager guiding you at every step."
                imageSrc="/video-trailer-2.webp"
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
