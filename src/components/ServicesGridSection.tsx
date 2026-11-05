"use client";

import { motion } from "framer-motion";
import { 
    BookOpen, 
    PenTool, 
    Users, 
    FileText, 
    Edit3, 
    Palette, 
    Layout, 
    Megaphone, 
    Printer, 
    Headphones, 
    Video, 
    Globe,
    Baby,
    ShoppingCart,
    Type,
    Search,
    Check
} from "lucide-react";
import Link from "next/link";

const services = [
    {
        icon: PenTool,
        title: "Book Signing",
        description: "Connect with readers through a thoughtfully planned book signing event tailored to your book and audience.",
        features: [
            "Event Strategy & Venue Outreach",
            "Promotion & Reader Invitations",
            "Signing Day Preparation"
        ],
        link: "/book-signing",
        color: "#3F3774"
    },
    {
        icon: BookOpen,
        title: "Book Publishing",
        description: "Full creative control. Pro results. Everything you need to publish, promote, and sell – without the stress!",
        features: [
            "All-in-One Publishing Platform",
            "Full Rights Ownership",
            "Fast Turnaround with Professional Quality"
        ],
        link: "/book-publishing",
        color: "#3F3774"
    },
    {
        icon: PenTool,
        title: "Ghostwriting",
        description: "Your voice, your story – professionally written and built to publish with confidence and credibility.",
        features: [
            "Top-Tier Professional Writers",
            "Transparent, Collaborative Process",
            "100% Ownership & Authentic Voice"
        ],
        link: "/ghostwriting",
        color: "#FE695B"
    },
    {
        icon: Edit3,
        title: "Book Editing",
        description: "From rough draft to polished manuscript – comprehensive editing to elevate your writing and captivate readers.",
        features: [
            "Developmental & Copy Editing",
            "Grammar & Style Perfection",
            "Multiple Revision Rounds"
        ],
        link: "/book-editing",
        color: "#36C0E7"
    },
    {
        icon: Search,
        title: "Proof Reading",
        description: "Final quality check to catch every typo, error, and inconsistency before your book goes to print.",
        features: [
            "Detailed Error Detection",
            "Consistency & Formatting Check",
            "Publication-Ready Assurance"
        ],
        link: "/proof-reading",
        color: "#3F3774"
    },
    {
        icon: Palette,
        title: "Book Cover Design",
        description: "Eye-catching, professional cover designs that grab attention and sell books across all platforms.",
        features: [
            "Custom Cover Artwork",
            "Multiple Design Concepts",
            "Print & Digital Formats"
        ],
        link: "/book-cover-design",
        color: "#FE695B"
    },
    {
        icon: Layout,
        title: "Book Formatting",
        description: "Professional interior formatting and layout design for a beautiful reading experience in any format.",
        features: [
            "Print-Ready PDF Layout",
            "Ebook Format Conversion",
            "Typography & Spacing Excellence"
        ],
        link: "/book-formating",
        color: "#36C0E7"
    },
    {
        icon: Type,
        title: "Ebook Writing",
        description: "Expert ebook creation services to help you publish digital content that engages and converts readers.",
        features: [
            "Digital-First Content Strategy",
            "Multi-Platform Optimization",
            "Interactive Elements"
        ],
        link: "/ebook-writing",
        color: "#3F3774"
    },
    {
        icon: FileText,
        title: "Fiction Writing",
        description: "Bring your fictional worlds to life with creative writing support from experienced storytellers.",
        features: [
            "Character Development",
            "Plot Structure & Pacing",
            "Genre-Specific Expertise"
        ],
        link: "/fiction-writing",
        color: "#FE695B"
    },
    {
        icon: Baby,
        title: "Children's Book",
        description: "Create magical stories for young readers with specialized children's book publishing services.",
        features: [
            "Age-Appropriate Content",
            "Illustration Coordination",
            "Educational Value Focus"
        ],
        link: "/children-book",
        color: "#36C0E7"
    },
    {
        icon: ShoppingCart,
        title: "Amazon Publishing",
        description: "Maximize your reach with expert Amazon KDP setup, optimization, and publishing management.",
        features: [
            "KDP Account Setup",
            "Listing Optimization",
            "Sales Strategy & Analytics"
        ],
        link: "/amazon-publishing",
        color: "#3F3774"
    },
    {
        icon: Megaphone,
        title: "Book Marketing",
        description: "Strategic marketing campaigns to boost visibility, drive sales, and build your author brand.",
        features: [
            "Social Media Promotion",
            "Email Marketing Campaigns",
            "Amazon Advertising"
        ],
        link: "/book-marketing",
        color: "#FE695B"
    },
    {
        icon: Printer,
        title: "Book Printing",
        description: "High-quality print-on-demand and bulk printing services for physical book distribution.",
        features: [
            "Print-on-Demand Integration",
            "Premium Paper Options",
            "Global Distribution Network"
        ],
        link: "/book-printing",
        color: "#36C0E7"
    },
    {
        icon: Headphones,
        title: "Audio Book Narration",
        description: "Professional audiobook production with skilled narrators to reach the growing audio market.",
        features: [
            "Professional Voice Talent",
            "Studio-Quality Recording",
            "ACX & Major Platform Distribution"
        ],
        link: "/audio-book-narration",
        color: "#3F3774"
    },
    {
        icon: Video,
        title: "Video Trailer",
        description: "Cinematic book trailers that capture attention and generate buzz for your upcoming release.",
        features: [
            "Custom Video Production",
            "Script & Storyboard",
            "Social Media Optimization"
        ],
        link: "/video-trailer",
        color: "#FE695B"
    },
    {
        icon: Globe,
        title: "Author's Website",
        description: "Professional author websites to showcase your work, connect with readers, and build your brand.",
        features: [
            "Custom Website Design",
            "Book Showcase & Store",
            "Blog & Newsletter Integration"
        ],
        link: "/authors-website",
        color: "#36C0E7"
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: "easeOut" as const
        }
    }
};

export default function ServicesGridSection() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-[1200px] mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-[48px] font-syne font-semibold text-brand-primary max-sm:text-[32px]">
                        Bring Your Book to Life
                    </h2>
                </motion.div>

                {/* Services Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {services.map((service, index) => {
                        const IconComponent = service.icon;
                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ 
                                    y: -10, 
                                    scale: 1.02,
                                    transition: { duration: 0.3, ease: "easeOut" }
                                }}
                                className="group relative bg-gradient-to-br from-white to-gray-100 rounded-2xl p-8 overflow-hidden cursor-pointer"
                                style={{
                                    boxShadow: `0 12px 40px -8px #3F377440, 0 4px 12px -2px #3F377430, 0 2px 4px -1px #3F377420`,
                                    border: `1px solid ${service.color}25`
                                }}
                            >
                                {/* Animated Background Gradient on Hover */}
                                <div 
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{
                                        background: `linear-gradient(135deg, ${service.color}08 0%, transparent 50%, ${service.color}05 100%)`
                                    }}
                                />
                                
                                {/* Enhanced Shadow on Hover */}
                                <div 
                                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{
                                        boxShadow: `0 25px 60px -12px #3F377450, 0 12px 32px -8px #3F377440`
                                    }}
                                />
                                
                                {/* Top Border Accent */}
                                <div 
                                    className="absolute top-0 left-0 right-0 h-1 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                                    style={{ backgroundColor: service.color }}
                                />

                                {/* Content */}
                                <div className="relative z-10">
                                    {/* Icon with Pulse Animation */}
                                    <motion.div 
                                        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 relative"
                                        style={{ 
                                            background: `linear-gradient(135deg, ${service.color}20 0%, ${service.color}10 100%)`,
                                            border: `1px solid ${service.color}30`
                                        }}
                                        whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <IconComponent 
                                            className="w-8 h-8 transition-transform duration-300" 
                                            style={{ color: service.color }}
                                        />
                                        {/* Glow Effect */}
                                        <div 
                                            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                                            style={{ backgroundColor: `${service.color}40` }}
                                        />
                                    </motion.div>

                                    {/* Title */}
                                    <h3 className="text-xl font-syne font-bold text-brand-primary mb-3 group-hover:text-brand-primary transition-colors duration-300">
                                        {service.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-brand-gray text-sm font-poppins leading-relaxed mb-6">
                                        {service.description}
                                    </p>

                                    {/* Features List */}
                                    <ul className="space-y-3 mb-8">
                                        {service.features.map((feature, featureIndex) => (
                                            <motion.li 
                                                key={featureIndex} 
                                                className="flex items-start gap-3"
                                                initial={{ opacity: 0, x: -10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ delay: featureIndex * 0.1 }}
                                                viewport={{ once: true }}
                                            >
                                                <div 
                                                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110"
                                                    style={{ 
                                                        backgroundColor: `${service.color}15`,
                                                        border: `1px solid ${service.color}30`
                                                    }}
                                                >
                                                    <Check 
                                                        className="w-3 h-3" 
                                                        style={{ color: service.color }}
                                                    />
                                                </div>
                                                <span className="text-brand-gray text-sm font-poppins group-hover:text-brand-black transition-colors duration-300">
                                                    {feature}
                                                </span>
                                            </motion.li>
                                        ))}
                                    </ul>

                                    {/* Learn More Link with Animated Underline */}
                                    <Link 
                                        href={service.link}
                                        className="inline-flex items-center gap-2 text-sm font-syne font-semibold relative overflow-hidden group/link"
                                        style={{ color: service.color }}
                                    >
                                        <span className="relative">
                                            Learn more 
                                            <span 
                                                className="absolute bottom-0 left-0 w-0 h-0.5 group-hover/link:w-full transition-all duration-300"
                                                style={{ backgroundColor: service.color }}
                                            />
                                        </span>
                                        <motion.svg 
                                            className="w-4 h-4" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                            animate={{ x: [0, 4, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </motion.svg>
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
