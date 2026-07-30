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
  title: "Book Editing & Proofreading Services – Aero Publishing",
  description:
    "Polish your manuscript with Aero’s editing services: developmental editing, copyediting, and final proofreading tailored to your book’s genre and voice.",
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
            title: "ISBN Registration & Copyright Assistance",
            description: "We take care of ISBN registration and copyright support to ensure your book is properly identified and protected. Our team manages the technical requirements with accuracy and care, so your book is ready for publication in both print and digital formats."
        },
        {
            icon: "/feature-icon-2.webp",
            title: "Manuscript Formatting & Layout",
            description: "Your manuscript is professionally formatted to meet industry standards and platform requirements. We focus on clean layouts, readability, and consistency, ensuring your book looks polished and professional across all editions."
        },
        {
            icon: "/feature-icon-3.webp",
            title: "Cover Design Integration",
            description: "We integrate your cover design seamlessly into the publishing process. Our team ensures your cover meets technical specifications, aligns with market expectations, and presents your book professionally across all platforms."
        },
        {
            icon: "/feature-icon-4.webp",
            title: "Platform Upload & Distribution",
            description: "We prepare and upload your book to major online retailers and distribution platforms. Your title is correctly formatted, positioned, and ready to reach readers throughout the United States and worldwide in both print and digital marketplaces."
        }
    ];


    return (
        <main className="min-h-screen bg-white pb-20">
            <HeroSection
                title="Book Editing"
                description="Professional book editing tailored to your voice and genre. Our experienced editors refine structure, clarity, and flow—ensuring your manuscript is polished, publication-ready, and aligned with industry standards for both print and digital release."
            />
            <FeatureSection
                subtitle="Book Editing Made Effortless:"
                title={{
                    prefix: "Powered by",
                    highlight: "Expertise",
                    suffix: "and Editorial Precision"
                }}
                description={`Take control of your publishing journey with Aero Publishing’s professional book editing services. you’re preparing your first manuscript or refining a completed draft, our experienced editors work closely with you to strengthen clarity, structure, and flow—while preserving your unique voice.

                From developmental feedback to detailed line editing and final polish, we ensure your book meets industry standards and is ready for publication in both print and digital formats. Our streamlined process keeps you informed and involved at every stage, so your manuscript moves forward with confidence and care.                
                `}

                features={[
                    "7-Day Money Back Guarantee",
                    "Professional Editorial Review by Industry Experts",
                    "Full Creative Control & 100% Author Rights"
                ]}
                imageSrc="/book-editing-1.webp"
                hasFeatures={true}
            />
            <WhyAeroSection
                highlightTitle="What"
                normalTitle=" Our Book Editing"
                boldTitle=' Services Include'
                description='Publishing doesn’t need to be complicated. We offer a clear, honest, and author-focused editing experience—keeping you informed, in control, and confident at every stage while delivering professional results you can trust.'
                features={features}
                imageUrl='/editing-3.webp'
            />
            <BenefitsGridSection
                subtitle="Why Book Editing with Aero?"
                title={{
                    text: <>A Faster, Easier, and More <br className='max-sm:hidden' /> Profitable Editing </>,
                    highlight: "Experience"
                }}
                benefits={[
                    {
                        title: "All-in-One Editing Solution for Self-Publishing",
                        description: "Our book editing services cover every stage of refinement—from structural feedback to detailed line edits and final proofreading. We streamline the process so you don’t need multiple vendors or confusing workflows to prepare your manuscript for publication."
                    },
                    {
                        title: "Full Creative & Editorial Control",
                        description: "You stay in control of your manuscript at every stage. Our editors collaborate with you to strengthen clarity, flow, and consistency while preserving your voice, vision, and authorial intent—no unwanted changes, no loss of ownership."
                    },
                    {
                        title: "Keep 100% of Your Rights & Royalties",
                        description: "Your work remains fully yours. Aero Publishing ensures you retain complete ownership of your content and earn 100% of your royalties, with no hidden clauses or restrictive contracts."
                    },
                    {
                        title: "Edit Faster with a Streamlined Process",
                        description: "Our structured editorial workflow helps move your manuscript forward efficiently without sacrificing quality. With clear timelines and dedicated support, your book progresses faster than traditional publishing timelines."
                    },
                    {
                        title: "Professional Quality, Powered by Expertise",
                        description: "Every manuscript is handled by experienced editors who understand market standards, genre expectations, and reader engagement. We combine editorial precision with modern tools to deliver polished, publication-ready results."
                    },
                    {
                        title: "Preparation for Publishing & Distribution",
                        description: "Our editing process ensures your manuscript is fully prepared for the next stages of publishing. From formatting readiness to content consistency, we help set your book up for successful print and digital release."
                    }
                ]}
            />
            <FeatureSection
                title={{
                    prefix: "Book Editing",
                    highlight: "Services"
                }}
                description={`Take full control of your publishing journey with Aero Publishing’s professional book editing solutions. Whether you’re preparing your first manuscript or refining a completed draft, our experienced editors help strengthen clarity, structure, and flow—while preserving your unique voice.

                From initial manuscript review to final polish, we combine editorial expertise with a streamlined process to ensure your book is professional, polished, and publication-ready. With dedicated support at every step, we help you move forward confidently toward print and digital release—without sacrificing ownership or creative control.
                `}
                imageSrc="/editing-2.webp"
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
