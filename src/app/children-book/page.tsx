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
    title: "Children’s Book Publishing & Illustration Services",
    description: "Bring your children’s book to life with writing, illustration, and publishing support tailored for young readers and engaging storytelling.",
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
            title: "Story Development for Young Readers",
            description: "We help shape age-appropriate narratives with engaging language, clear structure, and meaningful themes that resonate with children and parents alike."
        },
        {
            icon: "/feature-icon-2.webp",
            title: "Professional Illustration & Artwork",
            description: "Collaborate with skilled illustrators to create vibrant, expressive visuals that bring your story to life and capture young imaginations."
        },
        {
            icon: "/feature-icon-3.webp",
            title: "Age-Appropriate Editing",
            description: "Our editors ensure tone, vocabulary, pacing, and content are perfectly suited to your target age group—while preserving your unique voice."
        },
        {
            icon: "/feature-icon-4.webp",
            title: "Color Layout & Formatting",
            description: "We design visually balanced page layouts optimized for both print and digital formats, ensuring clarity, readability, and visual appeal across all platforms."
        },
        {
            icon: "/feature-icon-4.webp",
            title: "Print & Digital Readiness",
            description: "Your children’s book is professionally prepared for distribution across major US and global retailers, in both print and digital marketplaces."
        }
    ];

    return (
        <main className="min-h-screen bg-white pb-20">
            <HeroSection
                title="Children Book"
                description="All-inclusive packages with copyright protection and a 7-day money-back guarantee. Publish your children’s book with confidence and ease."
            />
            <FeatureSection
                subtitle="Children Book Made Effortless:"
                title={{
                    prefix: "Powered by",
                    highlight: "Innovation",
                    suffix: "and Human Expertise"
                }}
                description="Bring your children’s story to life with Aero Publishing’s all-in-one self-publishing solution. Whether you’re creating a picture book, early reader, or middle-grade story, our blend of advanced technology and hands-on creative expertise ensures your book is engaging, professionally produced, and ready for young readers.
                From concept development and illustration to printing, distribution, and marketing, we manage every step through a single intuitive dashboard—so you stay informed, confident, and in control."
                features={[
                    "7-Day Money-Back Guarantee",
                    "Copyright & ISBN Certification",
                    "Retain 100% of Your Book Rights"
                ]}
                imageSrc="/children-book-1.webp"
                hasFeatures={true}
            />
            <WhyAeroSection
                highlightTitle="What"
                normalTitle=" Our Children's Book"
                boldTitle=' Services Include'
                description='Publishing children’s books doesn’t need to be complicated. We offer a transparent, author-focused experience—keeping you informed, involved, and confident while delivering high-quality results you can trust.'
                features={features}
                imageUrl='/children-book-3.webp'
            />
            <BenefitsGridSection
                subtitle="Why Children’s Book Publishing with Aero?"
                title={{
                    text: <>A Faster, Easier, and More <br className='max-sm:hidden' /> Profitable </>,
                    highlight: "Experience"
                }}
                benefits={[
                    {
                        title: "All-in-One Platform for Seamless Self-Publishing",
                        description: "We handle editing, illustration, formatting, cover design, printing, and distribution—eliminating the need for multiple vendors or complex workflows."
                    },
                    {
                        title: "Full Creative & Financial Control",
                        description: "You maintain complete ownership of your story, artwork, pricing, and publishing decisions—without pressure or hidden fees."
                    },
                    {
                        title: "Keep 100% of Your Royalties & Track Sales in Real Time",
                        description: "Sell worldwide through Amazon, Barnes & Noble, IngramSpark, Apple Books, and more—while monitoring performance through real-time reporting."
                    },
                    {
                        title: "Publish Faster with Our Streamlined Process",
                        description: "Launch your children’s book in weeks, not months, with an efficient production timeline designed for modern authors."
                    },
                    {
                        title: "Professional Quality, Backed by AI & Human Expertise",
                        description: "Every project is enhanced by AI-assisted tools and refined by experienced editors, illustrators, and designers."
                    },
                    {
                        title: "Marketing & Distribution Support",
                        description: "From launch strategies to ongoing promotion, we help position your book for visibility, discoverability, and long-term success."
                    }
                ]}
            />
            <FeatureSection
                title={{
                    prefix: "Children’s Book Publishing Your ",
                    highlight: "Book"
                }}
                description="Turn your idea into a beautifully illustrated children’s book with Aero Publishing’s guided self-publishing experience. Our personalized approach ensures your book is age-appropriate, visually engaging, and professionally produced—without sacrificing creative freedom or royalties.
                From manuscript upload to global distribution, everything is managed in one place with the support of a dedicated publishing specialist at every stage."
                imageSrc="/children-book-2.webp"
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
