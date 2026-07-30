"use client";

import { motion } from "framer-motion";
import { Handshake, Copyright, UserCheck, Store, Share2, Target } from "lucide-react";

const features = [
    {
        icon: Handshake,
        title: "Pre-Order Campaign Support",
        description: "We help you build early momentum through structured pre-order planning that supports visibility and reader interest before launch.",
        highlight: false
    },
    {
        icon: Copyright,
        title: "ISBN, Copyright & Publishing Compliance",
        description: "All required publishing identifiers and compliance steps are handled correctly, ensuring your book meets industry and retailer standards.",
        highlight: false
    },
    {
        icon: UserCheck,
        title: "Genre-Specialized Editors and Designers",
        description: "All required publishing identifiers and compliance steps are handled correctly, ensuring your book meets industry and retailer standards.",
        highlight: false
    },
    {
        icon: Store,
        title: "Print & Online Distribution",
        description: "Your book is prepared for distribution across major print and online retailers, making it accessible to readers in the U.S. and worldwide.",
        highlight: false
    },
    {
        icon: Share2,
        title: "Social Media Marketing Setup",
        description: "We help set up the foundation for author branding and book promotion across key social media platforms.",
        highlight: false
    },
    {
        icon: Target,
        title: "Author Royalty Tracking Portal",
        description: "You maintain clear visibility into your sales and earnings through a dedicated royalty tracking system.",
        highlight: false
    }
];

export default function WhyChooseUsSection() {
    return (
        <section className="relative py-20 bg-brand-light overflow-hidden max-sm:py-12  overflow-x-hidden">
            {/* Subtle background glow effect if needed, similar to image light blue tint */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100 rounded-full blur-[100px] opacity-30 pointer-events-none -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100 rounded-full blur-[100px] opacity-30 pointer-events-none translate-y-1/2 -translate-x-1/2" />


            <div className="max-w-[1140px] mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-center mb-16"
                >
                    <h2 className="text-[50px] mb-4 font-syne font-medium leading-[1.1] text-brand-primary max-sm:text-[32px]">
                          Why Authors Choose<span className="text-brand-secondary font-shaded font-[400]"> Aero Publishing</span> Over <span className="font-bold">Generic Publishing Platforms</span>
                    </h2>
                    <p className="text-black text-center font-poppins text-sm leading-relaxed max-w-4xl max-sm:text-[14px] mx-auto">
                    We offer more than tools—we provide guided support, professional expertise, and transparency at every stage of publishing.
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5 }}
                            whileHover={{ y: -10 }}
                            className={`rounded-[30px] p-8 text-center flex flex-col items-center transition-all duration-300 shadow-sm hover:shadow-xl hover:bg-brand-primary hover:text-white group cursor-pointer
                ${feature.highlight
                                    ? "bg-brand-primary text-white"
                                    : "bg-white text-brand-primary"
                                }
              `}
                        >
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-3xl
                ${feature.highlight
                                    ? "bg-white text-brand-primary"
                                    : "bg-brand-light text-brand-primary"
                                }
              `}>
                                <feature.icon className="group-hover:text-brand-secondary" strokeWidth={1.5} size={32} />
                            </div>

                            <h3 className={`text-xl font-syne font-bold mb-4 whitespace-pre-line leading-tight group-hover:text-white
                 ${feature.highlight ? "text-white" : "text-brand-primary"}
              `}>
                                {feature.title}
                            </h3>

                            <p className={`text-[13px] font-poppins leading-relaxed group-hover:!text-white
                ${feature.highlight ? "text-white/80" : "text-brand-gray"}
              `}>
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
