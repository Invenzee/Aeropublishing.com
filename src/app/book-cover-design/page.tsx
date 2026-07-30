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
  title: "Custom Book Cover Design Services – Aero Publishing",
  description:
    "Make your book stand out with a professionally designed cover tailored to your genre. Aero’s custom designs help boost credibility and attract readers.",
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
            title: "Custom Front Cover Design",
            description: "Each cover is designed from scratch to reflect your story, genre expectations, and target audience—ensuring originality and market relevance."
        },
        {
            icon: "/feature-icon-2.webp",
            title: "Spine & Back Cover Layout",
            description: "We professionally design the spine and back cover, including typography, barcode placement, and layout compliance for print platforms."
        },
        {
            icon: "/feature-icon-3.webp",
            title: "Genre-Specific Market Research",
            description: "Our designers analyze top-performing titles in your genre to ensure your cover aligns with reader expectations while standing out competitively."
        },
        {
            icon: "/feature-icon-4.webp",
            title: "Print & Digital Platform Optimization",
            description: "Your final cover is optimized for both print and digital distribution, meeting specifications for Amazon KDP, IngramSpark, and other major platforms in the U.S. and beyond."
        }
    ];

    return (
        <main className="min-h-screen bg-white pb-20">
            <HeroSection
                title="Book Cover Design"
                description="All-inclusive packages with copyright protection and a 7-day money-back guarantee. Design your book cover with confidence."
            />
            <FeatureSection
                subtitle="Book Cover Design Made Effortless:"
                title={{
                    prefix: "Powered by",
                    highlight: "Innovation",
                    suffix: "and Human Expertise"
                }}
                description="Take full control of your publishing journey with Aero Publishing’s all-in-one author services. Whether you’re launching your first book or refreshing an existing title, our design-led approach blends creative expertise with market insight to ensure your cover is professional, compelling, and ready to compete.
                From concept development to final production, we manage the entire process with precision—without taking ownership of your rights. Every design is crafted to meet platform standards and attract readers across print and digital marketplaces."
                features={[
                    "7-Day Money-Back Guarantee",
                    "Copyright & ISBN Assistance",
                    "You Retain 100% of Your Book Rights"
                ]}
                imageSrc="/business-1.webp"
                hasFeatures={true}
                noImageRadius
                imageContain
                imageWidthPercent={80}
            />
            <WhyAeroSection
                highlightTitle="What"
                normalTitle=" Our Book Cover Design"
                boldTitle=' Services Include'
                description='Publishing doesn’t need to be complicated. We offer a clear, honest, and author-focused design experience—keeping you informed, in control, and confident at every stage.'
                features={features}
                imageUrl='/business-2.webp'
                noImageRadius
                imageContain
                imageWidthPercent={80}
            />
            <BenefitsGridSection
                subtitle="Why Book Cover Design with Aero?"
                title={{
                    text: <>A Faster, Easier, and More <br className='max-sm:hidden' /> Profitable </>,
                    highlight: "Experience"
                }}
                benefits={[
                    {
                        title: "All-in-One Platform for Seamless Publishing",
                        description: "Our comprehensive platform supports every stage of publishing—from cover design and formatting to distribution and marketing—so you don’t need multiple vendors or complicated workflows."
                    },
                    {
                        title: "Full Creative & Financial Control",
                        description: "You stay in control of your vision, pricing, and publishing decisions. We guide and execute, ensuring your book aligns with your goals without creative pressure or hidden costs."
                    },
                    {
                        title: "Keep 100% of Your Royalties & Track Sales in Real Time",
                        description: "Your book is distributed through Amazon, Barnes & Noble, IngramSpark, Apple Books, and more—while you maintain full ownership and transparency."
                    },
                    {
                        title: "Publish Faster with Our Streamlined Process",
                        description: "Our proven workflows bring your book to market efficiently—often in weeks, not months."
                    },
                    {
                        title: "Professional Quality, Backed by AI & Human Expertise",
                        description: "We combine industry-tested design practices with smart technology to deliver covers that are visually striking and marketplace-ready."
                    },
                    {
                        title: "Marketing and Distribution Support",
                        description: "From launch preparation to ongoing visibility, we help position your book for long-term success."
                    }
                ]}
            />
            <FeatureSection
                title={{
                    prefix: "Book Cover Design Your",
                    highlight: "Book"
                }}
                description="Your book’s cover is the first impression readers see—and often the deciding factor in whether they click, browse, or buy.
                At Aero Publishing, we design covers that don’t just look good—they sell. Our team combines creative design with genre research and marketplace trends to ensure your book stands out while meeting professional publishing standards.
                Every project includes guided collaboration, revision rounds, and platform-ready delivery—so your book is polished, credible, and ready for readers."
                imageSrc="/business-3.webp"
                isReversed={true}
                subtitle=""
                noImageRadius
                imageContain
                imageWidthPercent={80}
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
