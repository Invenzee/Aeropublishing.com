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
    title: "Amazon KDP Publishing Services – Aero Publishing",
    description: "Publish your book on Amazon KDP with expert support. Aero handles formatting, setup, and distribution so your book reaches readers worldwide."
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
            title: "KDP Account Setup & Configuration",
            description: "We configure your KDP account, including tax details, royalty preferences, and payment settings. Every account element is structured correctly to ensure compliance, accuracy, and a seamless publishing experience."
        },
        {
            icon: "/feature-icon-2.webp",
            title: "Kindle eBook & Print Formatting",
            description: "Your manuscript is professionally formatted for Kindle and print editions, with proper margins, fonts, trim sizes, and layout standards. Paperback and hardcover files are prepared to meet Amazon’s technical requirements."
        },
        {
            icon: "/feature-icon-3.webp",
            title: "Metadata & Keyword Optimization",
            description: "We structure your title and subtitle strategically, select relevant categories, and research backend keywords to improve indexing and search visibility within Amazon’s marketplace."
        },
        {
            icon: "/feature-icon-4.webp",
            title: "Publishing Setup & Release Management",
            description: "We manage the final upload process, configure pricing and distribution territories, and conduct pre-launch checks to ensure your book goes live without technical errors or delays."
        }
    ];

    return (
        <main className="min-h-screen bg-white pb-20">
            <HeroSection
                title="Amazon KDP Publishing Services"
                description="At Aero Publishing, we provide end-to-end Amazon KDP publishing support, from manuscript preparation to final release. Our team edits and proofreads for clarity, formats your interior according to KDP standards, and manages cover design and account configuration. We oversee each stage of the publishing process so your book launches smoothly while you retain full ownership and royalties."
            />
            <FeatureSection
                subtitle="Amazon Publishing Made Simple"
                title={{
                    prefix: "Professional",
                    highlight: " Support ",
                    suffix: "from Manuscript to Marketplace"
                }}
                description="Publishing a book through Amazon KDP involves both technical precision and strategic planning. We refine your manuscript, format the interior for Kindle and print compliance, and perform detailed quality checks before release. Our team designs your cover, configures your KDP account, and optimizes categories, keywords, and pricing to ensure your book is professionally positioned from day one."
                features={[
                    "Complete Amazon KDP listing preparation",
                    "Professional formatting for Kindle and print editions",
                    "Strategic metadata and category optimization"
                ]}
                imageSrc="/amazon-publishing-1.webp"
                hasFeatures={true}
            />
            <WhyAeroSection
                eyebrowTitle='What’s Included'
                highlightTitle="Complete "
                normalTitle=" Amazon Publishing Solutions "
                boldTitle='Done for You'
                description='We manage the technical, creative, and strategic elements required to publish your book in full compliance with Amazon KDP standards, positioning it for professional presentation and long-term visibility.'
                features={features}
                imageUrl='/amazon-publishing-3.webp'
            />
            <BenefitsGridSection
                subtitle="Why Authors Choose Aero"
                title={{
                    text: <>A Faster, Smarter Way to <br className='max-sm:hidden' /> Publish on </>,
                    highlight: "Amazon"
                }}
                benefits={[
                    {
                        title: "All-in-One Publishing Management",
                        description: "Editing, formatting, proofreading, cover design, and KDP setup are handled within one structured workflow. You work with a single, coordinated team from manuscript to launch."
                    },
                    {
                        title: "Full Creative & Financial Control",
                        description: "You approve all files, pricing, and distribution settings before publication. Royalties are paid directly to your KDP account without third-party interference."
                    },
                    {
                        title: "100% Ownership & Royalties",
                        description: "You retain complete rights to your manuscript, publishing files, and earnings. We facilitate the process without claiming ownership or long-term contractual restrictions."
                    },
                    {
                        title: "Efficient & Error-Free Publishing",
                        description: "Files are prepared according to Amazon’s current technical guidelines, minimizing upload errors, rejections, and delays during the publishing process."
                    },
                    {
                        title: "Professional Standards & Compliance",
                        description: "Formatting, metadata structuring, and account configuration follow established KDP best practices for both digital and print editions."
                    },
                    {
                        title: "Optimized for Visibility & Reach",
                        description: "Titles, categories, and backend keywords are structured to enhance discoverability within Amazon search results. Our approach supports stronger indexing and broader marketplace exposure."
                    }
                ]}
            />
            <FeatureSection
                title={{
                    prefix: "Publish Your Book on Amazon with",
                    highlight: "Confidence"
                }}
                description="Amazon offers global reach, but successful publishing requires careful execution. We manage manuscript refinement, interior formatting for digital and print editions, cover development, account configuration, and listing setup, all aligned with KDP standards. With a structured publishing process and strategic optimization, your book launches professionally while you maintain full ownership and earnings."
                imageSrc="/amazon-publishing-2.webp"
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
