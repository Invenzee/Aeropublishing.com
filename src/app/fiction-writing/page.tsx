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
  title: "Fiction Writing Services – Novels & Story Development",
  description:
    "Work with expert writers to create compelling fiction stories, novels, and narratives crafted for readers and publishing success.",
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
            title: "Plot Development & Story Structuring",
            description: "We help shape strong story arcs, pacing, and chapter flow to keep readers engaged from start to finish."
        },
        {
            icon: "/feature-icon-2.webp",
            title: "Character Creation & World-Building",
            description: "Develop memorable characters and believable worlds that resonate with your target audience."
        },
        {
            icon: "/feature-icon-3.webp",
            title: "Dialogue & Narrative Crafting",
            description: "Natural dialogue, compelling narration, and emotionally driven scenes crafted by experienced fiction writers."
        },
        {
            icon: "/feature-icon-4.webp",
            title: "Genre-Specific Writing Expertise",
            description: "Our writers specialize in multiple fiction genres—romance, fantasy, sci-fi, thrillers, mystery, and more—ensuring market-aligned storytelling."
        }
    ];


    return (
        <main className="min-h-screen bg-white pb-20">
            <HeroSection
                title="Fiction Writing"
                description="All-inclusive packages with copyright protection and a 7-day money-back guarantee. Publish your book with ease."
            />
            <FeatureSection
                subtitle="Fiction Writing Made Effortless:"
                title={{
                    prefix: "Powered by",
                    highlight: "Innovation",
                    suffix: "and Human Expertise"
                }}
                description="Bring your story to life with Aero Publishing’s end-to-end fiction writing solutions. Whether you’re developing your first novel or expanding an existing series, our experienced fiction writers, editors, and publishing specialists work closely with you to create compelling, market-ready stories—without compromising your creative vision.
From concept to final manuscript, we combine human storytelling expertise with modern publishing tools to ensure your book is polished, engaging, and ready for global readers."
                features={[
                    "7-Day Money-Back Guarantee",
                    "Copyright & ISBN Certificate",
                    "Retain 100% of Your Book Rights"
                ]}
                imageSrc="/fiction-writing-1.webp"
                hasFeatures={true}
            />
            <WhyAeroSection
                highlightTitle="What"
                normalTitle=" Our Fiction Writing"
                boldTitle=' Services Include'
                description=''
                features={features}
                imageUrl='/fiction-writing-3.webp'
            />
            <BenefitsGridSection
                subtitle="Why Fiction Writing with Aero?"
                title={{
                    text: <>A Faster, Easier, and More <br className='max-sm:hidden' /> Profitable </>,
                    highlight: "Experience"
                }}
                benefits={[
                    {
                        title: "All-in-One Platform for Seamless Publishing",
                        description: "We handle writing, editing, formatting, cover design, printing, distribution, and marketing—so you don’t need multiple vendors."
                    },
                    {
                        title: "Full Creative & Financial Control",
                        description: "Your story, your voice, your decisions. You stay in control of content, pricing, and publishing timelines."
                    },
                    {
                        title: "Keep 100% of Your Royalties & Track Sales in Real Time",
                        description: "Distribute globally through Amazon, Barnes & Noble, IngramSpark, Apple Books, and more—while keeping full ownership."
                    },
                    {
                        title: "Publish Faster with Our Streamlined Process",
                        description: "Launch your fiction book in significantly less time than traditional publishing routes."
                    },
                    {
                        title: "Professional Quality, Backed by AI & Human Expertise",
                        description: "Industry-experienced writers and editors supported by smart publishing tools for consistent quality."
                    },
                    {
                        title: "Marketing and Distribution",
                        description: "From launch to long-term visibility, we help position your fiction book for maximum reach and sales."
                    }
                ]}
            />
            <FeatureSection
                title={{
                    prefix: "Fiction Writing Your",
                    highlight: "Book"
                }}
                description="Turn your ideas into a professionally written fiction book with Aero Publishing. We guide you through every step—from early brainstorming to a finished manuscript—ensuring your story is immersive, well-structured, and reader-ready.
                Our collaborative process ensures your voice remains authentic while meeting modern fiction market expectations."
                imageSrc="/fiction-writing-2.webp"
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
