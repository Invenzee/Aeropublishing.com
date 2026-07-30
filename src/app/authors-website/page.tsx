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

export const metadata : Metadata = {
    title: "Author Website Design Services – Build Your Brand",
    description: "Create a professional author website to showcase your book, build your brand, and connect with readers online with Aero Publishing.",
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
            title: "Custom Author Website Design",
            description: "We design a custom website tailored to your author brand, genre, and audience. Every layout is crafted to reflect your identity while presenting your books and content professionally."
        },
        {
            icon: "/feature-icon-2.webp",
            title: "Book Showcase & Landing Pages",
            description: "Your books are highlighted through dedicated pages designed to inform, engage, and convert visitors—supporting launches, promotions, and long-term visibility."
        },
        {
            icon: "/feature-icon-3.webp",
            title: "SEO-Optimized Website Structure",
            description: "We build your site with search visibility in mind, using SEO-friendly structure and best practices to help readers find you through search engines."
        },
        {
            icon: "/feature-icon-4.webp",
            title: "Mobile-Responsive Development",
            description: "Your website is fully responsive and optimized for all devices. We ensure smooth performance, readability, and navigation across desktop, tablet, and mobile screens."
        }
    ];

    return (
        <main className="min-h-screen bg-white pb-20">
            <HeroSection
                title="Authors Website"
                description="All-inclusive author website packages designed to help you build a strong online presence. With professional design, SEO-ready structure, and a 7-day money-back guarantee, Aero Publishing makes launching your author website simple and stress-free."
            />
            <FeatureSection
                subtitle="Authors Website Made Effortless:"
                title={{
                    prefix: "Powered by",
                    highlight: "Innovation",
                    suffix: "and Human Expertise"
                }}
                description="Take full control of your author brand with Aero Publishing’s professional author website solutions. Whether you’re launching your first book or expanding your publishing portfolio, we design websites that reflect your identity, showcase your work, and connect you with readers.
                Our team combines modern website design with publishing and marketing expertise to deliver sites that are visually polished, easy to manage, and built for long-term growth—without taking control of your content or rights.
                "
                features={[
                    "7-Day Money-Back Guarantee",
                    "Professional Website Design & Setup",
                    "100% Ownership of Your Website & Content"
                ]}
                imageSrc="/author-1.webp"
                hasFeatures={true}
            />
            <WhyAeroSection
                highlightTitle="What"
                normalTitle=" Our Author Website Design"
                boldTitle=' Services Include'
                description="Publishing doesn’t need to be complicated. We offer a clear, honest, and author-focused website experience—keeping you informed, in control, and confident at every stage while delivering professional results you can trust."
                features={features}
                imageUrl='/author-3.webp'
            />
            <BenefitsGridSection
                subtitle="Why Authors Website with Aero?"
                title={{
                    text: <>A Faster, Easier, and More <br className='max-sm:hidden' /> Profitable </>,
                    highlight: "Experience"
                }}
                benefits={[
                    {
                        title: "All-in-One Platform for Author Growth",
                        description: "Your author website integrates seamlessly with your publishing and marketing efforts. We eliminate the need for multiple providers by handling design, setup, and optimization in one streamlined process."
                    },
                    {
                        title: "Full Creative & Financial Control",
                        description: "You control your content, branding, and messaging. Our role is to guide and build—not restrict—ensuring your website aligns with your goals and evolves as your career grows."
                    },
                    {
                        title: "Keep 100% of Your Royalties & Sales",
                        description: "Your website works as an extension of your author brand, supporting direct sales, reader engagement, and platform links—while you retain full ownership and earnings."
                    },
                    {
                        title: "Launch Faster with a Streamlined Process",
                        description: "Our efficient workflow allows your author website to go live quickly, without unnecessary delays or technical confusion."
                    },
                    {
                        title: "Professional Quality, Backed by Expertise",
                        description: "Every site is built with industry best practices in design, usability, and SEO—supported by experienced professionals who understand author branding and reader behavior."
                    },
                    {
                        title: "Marketing and Distribution Support",
                        description: "Your website is designed to support book launches, email sign-ups, and promotional campaigns—helping you attract readers and grow your audience across platforms."
                    }
                ]}
            />
            <FeatureSection
                title={{
                    prefix: "Build Your Author ",
                    highlight: "Website"
                }}
                description="Establish a professional online presence with Aero Publishing’s author website design services. We help authors create websites that showcase books, highlight achievements, and connect directly with readers.
                Whether you’re just starting out or rebranding your author platform, our team delivers clean design, clear structure, and reliable functionality—so your website works for you, not against you.
                "
                imageSrc="/author-2.webp"
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
