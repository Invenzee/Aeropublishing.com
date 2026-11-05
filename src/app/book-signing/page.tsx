import type { Metadata } from 'next';
import HeroSection from '@/components/About/HeroSection';
import FeatureSection from '@/components/About/FeatureSection';
import BenefitsGridSection from '@/components/About/BenefitsGridSection';
import WhyAeroSection from '@/components/WhyAeroSection';
import ConnectWithUsSection from '@/components/ConnectWithUsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import AuthorsShowcaseSection from '@/components/AuthorsShowcaseSection';
import PromoSection from '@/components/PromoSection';
import FAQSection from '@/components/FAQSection';

export const metadata: Metadata = {
    title: 'Book Signing Event Services – Aero Publishing',
    description: 'Connect with readers through a thoughtfully planned book signing. Aero Publishing supports venue outreach, event promotion, and signing day preparation.',
    alternates: { canonical: '/book-signing' },
};

const faqs = [
    {
        id: 1,
        question: 'How do you help organize a book signing?',
        answer: 'We start with your book, audience, preferred location, and budget. Together, we develop an event plan covering venue outreach, promotion, book availability, and the signing day schedule. Your proposal outlines the support included before work begins.',
    },
    {
        id: 2,
        question: 'Can you arrange a signing at a bookstore or library?',
        answer: 'We can help identify suitable bookstores, libraries, and community spaces and prepare outreach materials. Each venue sets its own requirements and makes its own booking decisions. Dates, fees, inventory arrangements, and any sales terms must be confirmed with the venue.',
    },
    {
        id: 3,
        question: 'What should I prepare before the event?',
        answer: 'Have a finished print edition, an author bio, a short book description, cover artwork, and a clear idea of your audience. We help you plan book quantities, ordering deadlines, signing supplies, promotional materials, and any reading or question-and-answer session.',
    },
    {
        id: 4,
        question: 'How far in advance should I start planning?',
        answer: 'Start as early as possible so there is time for venue outreach, promotion, and book delivery. The schedule depends on venue availability, your location, and print lead times. We agree on a practical timeline after discussing your preferred date and event needs.',
    },
    {
        id: 5,
        question: 'Are attendance or book sales guaranteed?',
        answer: 'Attendance and sales depend on your audience, venue, promotion, timing, and other factors, so neither is guaranteed. We focus on thoughtful preparation and relevant outreach, then help you review the event and identify opportunities to keep connecting with readers.',
    },
];

const features = [
    {
        icon: '/feature-icon-1.webp',
        title: 'Event Strategy & Planning',
        description: 'Build a signing around your goals, genre, and audience. We help shape the format, timeline, budget, and event checklist so you know what needs to happen at each stage.',
    },
    {
        icon: '/feature-icon-2.webp',
        title: 'Venue Research & Outreach',
        description: 'Explore bookstores, libraries, and community venues that suit your book. We support outreach and coordination, with bookings subject to each venue\'s approval and availability.',
    },
    {
        icon: '/feature-icon-3.webp',
        title: 'Event Promotion & Reader Invitations',
        description: 'Give readers a clear reason to attend with coordinated event messaging, social media content, and invitation materials tailored to your author brand and local audience.',
    },
    {
        icon: '/feature-icon-4.webp',
        title: 'Signing Day Preparation',
        description: 'Prepare your book display, signing supplies, reading notes, and event schedule. We help coordinate the details with you and the venue so you can focus on meeting readers.',
    },
];

export default function BookSigningPage() {
    return (
        <main className="min-h-screen bg-white pb-20">
            <HeroSection
                title="Book Signing"
                backgroundImage="/book-signing-hero.webp"
                description="Bring your story off the page and into the hands of your readers. Aero Publishing helps you plan and promote a book signing with thoughtful event coordination, venue outreach, and personal support from preparation to the final signature."
            />
            <FeatureSection
                subtitle="Book Signing Made Personal:"
                title={{ prefix: 'Turn Your Book into a', highlight: 'Memorable', suffix: 'Reader Experience' }}
                description="A signed copy is more than a book. It is a conversation, a shared moment, and a personal connection with the person behind the story. Whether you are celebrating a new release or introducing an existing title to a local audience, we help you shape an event that reflects your voice. From the first planning conversation to invitations and signing day details, our team helps bring the moving parts together with a clear scope and practical timeline."
                features={[
                    'An Event Plan Tailored to Your Book & Audience',
                    'Venue Outreach & Promotional Support',
                    'Clear Scope, Budget & Author Approval',
                ]}
                imageSrc="/book-signing-1.webp"
                imageAlt="Open book and fountain pen on a prepared bookstore signing table"
                hasFeatures={true}
                ctaText="Plan Your Book Signing"
            />
            <WhyAeroSection
                highlightTitle="What"
                normalTitle=" Our Book Signing"
                boldTitle=" Services Include"
                description="Create a welcoming event with support for the details that matter. We work with you on the plan, outreach, promotion, and preparation, with the services and responsibilities agreed in advance."
                features={features}
                imageUrl="/book-signing-2.webp"
                imageAlt="Prepared book signing table with books and a pen in a bookstore"
            />
            <BenefitsGridSection
                subtitle="Why Plan Your Book Signing with Aero?"
                title={{
                    text: <>A Personal Connection. A Lasting <br className="max-sm:hidden" /></>,
                    highlight: 'Impression',
                }}
                benefits={[
                    {
                        title: 'Meet Your Readers in Person',
                        description: 'Give readers a chance to hear your story, ask questions, and take home a personally signed copy. Build connections that go beyond an online book listing.',
                    },
                    {
                        title: 'An Event That Reflects Your Brand',
                        description: 'From promotional messaging to your book display, keep the experience consistent with your author identity, genre, and the readers you want to reach.',
                    },
                    {
                        title: 'Clear Planning & Communication',
                        description: 'Work from an agreed checklist, timeline, and scope. Stay informed about venue responses, preparation tasks, and decisions that need your approval.',
                    },
                    {
                        title: 'Coordinated Book & Event Logistics',
                        description: 'Plan inventory needs, ordering deadlines, and venue requirements ahead of time. Set clear responsibilities for book delivery, setup, and sales arrangements.',
                    },
                    {
                        title: 'Promotion with a Local Focus',
                        description: 'Introduce your event to relevant readers and community contacts with invitations and promotional content that explain where, when, and why to attend.',
                    },
                    {
                        title: 'Keep the Conversation Going',
                        description: 'Plan a follow-up thank-you, share event highlights with permission, and invite interested readers to your author channels so the connection can continue.',
                    },
                ]}
            />
            <FeatureSection
                subtitle="Make Your Next Chapter an Event"
                title={{ prefix: 'Meet the Readers Behind Every', highlight: 'Signature' }}
                description="Your book deserves a moment worth sharing. Whether you imagine an intimate bookstore gathering, a library conversation, or a community launch, Aero Publishing helps turn your idea into a practical event plan. Tell us about your book, preferred location, and goals, and we will outline the next steps for a signing that feels personal, prepared, and true to you."
                imageSrc="/book-signing-3.webp"
                imageAlt="Navy hardback books with a cream ribbon beside an open book and pen"
                isReversed={true}
                ctaText="Discuss Your Event"
            />
            <ConnectWithUsSection />
            <TestimonialsSection showPortraits={false} />
            <WhyChooseUsSection />
            <AuthorsShowcaseSection showPortraits={false} />
            <PromoSection imageSrc="/book-signing-3.webp" />
            <FAQSection faqs={faqs} />
        </main>
    );
}