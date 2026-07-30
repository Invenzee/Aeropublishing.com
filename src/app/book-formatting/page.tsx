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
import { Metadata } from "next";

export const metadata : Metadata = {
    title: "Book Formatting Services for eBook & Print – Aero Publishing",
    description: "Get your manuscript professionally formatted for Kindle and print. Ensure clean layout, readability, and compliance with publishing standards.",
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
            title: "Print-Ready Interior formatting",
            description: "We format your book interior for print with clean layouts, proper margins, and professional spacing—ensuring your book meets industry and printer requirements."
        },
        {
            icon: "/feature-icon-2.webp",
            title: "eBook formatting for Kindle & EPUB",
            description: "Your manuscript is formatted for major eBook platforms, including Kindle and EPUB formats, ensuring compatibility, readability, and smooth digital performance."
        },
        {
            icon: "/feature-icon-3.webp",
            title: "Typography & Layout Optimization",
            description: "We refine typography, spacing, and layout elements to improve readability and visual consistency—creating a professional reading experience across all formats."
        },
        {
            icon: "/feature-icon-4.webp",
            title: "Platform-Specific Submission Files",
            description: "We prepare final, platform-ready files for major retailers and distributors. Your book is correctly formatted, checked, and ready for upload in both U.S. and global marketplaces."
        }
    ];

    return (
        <main className="min-h-screen bg-white pb-20">
            <HeroSection
                title="Book Formatting"
                description="All-inclusive book formatting packages designed to prepare your manuscript for professional publication. With industry-standard formatting, platform compatibility, and a 7-day money-back guarantee, Aero Publishing makes formatting simple and stress-free."
            />
            <FeatureSection
                subtitle="Book Formatting Made Effortless:"
                title={{
                    prefix: "Powered by",
                    highlight: "Innovation",
                    suffix: "and Human Expertise"
                }}
                description="Take full control of your publishing journey with Aero Publishing’s professional book formatting services. Whether you’re preparing your first book or refining a final manuscript, our team ensures your interior layout meets industry standards for both print and digital formats.
                We combine technical precision with publishing expertise to deliver clean, readable, and professional layouts. From manuscript preparation to final files, our streamlined process ensures your book looks polished, consistent, and ready for distribution—without compromising ownership or creative control.
                "
                features={[
                    "7-Day Money Back Guarantee",
                    "Print & Digital formatting Support",
                    "100% Ownership of Your Book Files"
                ]}
                imageSrc="/book-formatting-1.webp"
                hasFeatures={true}
            />
            <WhyAeroSection
                highlightTitle="What"
                normalTitle=" Our Book Formatting"
                boldTitle=' Services Include'
                description='Publishing doesn’t need to be complicated. We offer a clear, honest, and author-focused formatting experience—keeping you informed, in control, and confident at every stage while delivering professional results you can trust.'
                features={features}
                imageUrl='/book-formatting-3.webp'
            />
            <BenefitsGridSection
                subtitle="Why Book Formatting with Aero?"
                title={{
                    text: <>A Faster, Easier, and More <br className='max-sm:hidden' /> Profitable </>,
                    highlight: "Experience"
                }}
                benefits={[
                    {
                        title: "All-in-One Platform for Seamless Publishing",
                        description: "Our formatting services integrate seamlessly with editing, publishing, and distribution—eliminating the need for multiple vendors or complex workflows."
                    },
                    {
                        title: "Full Creative & Financial Control",
                        description: "You maintain complete control over your content and design preferences. We format your book to professional standards while respecting your vision and publishing goals."
                    },
                    {
                        title: "Keep 100% of Your Royalties",
                        description: "Your book remains fully yours. We deliver final, ready-to-upload files while you retain full ownership and earnings across all platforms."
                    },
                    {
                        title: "Publish Faster with Our Streamlined Process",
                        description: "Our efficient formatting workflow helps move your book toward publication quickly, without delays or unnecessary revisions."
                    },
                    {
                        title: "Professional Quality, Backed by Expertise",
                        description: "Every book is formatted by experienced professionals who understand layout standards, readability, and platform requirements."
                    },
                    {
                        title: "Marketing and Distribution Ready",
                        description: "Your formatted files are prepared to support distribution and marketing—ensuring a smooth transition into the next stage of publishing."
                    }
                ]}
            />
            <FeatureSection
                title={{
                    prefix: "Format Your",
                    highlight: "Book"
                }}
                description="Prepare your manuscript for publication with Aero Publishing’s professional book formatting services. We help authors transform raw documents into clean, polished interiors that meet industry standards and platform guidelines.
                Whether you’re publishing in print, digital, or both, our team ensures your book is formatted accurately and consistently—so it’s ready for readers, not revisions.
                "
                imageSrc="/book-formatting-2.webp"
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
