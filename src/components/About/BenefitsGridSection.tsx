"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from 'react';

interface BenefitCard {
    title: string;
    description: string;
}

interface BenefitsGridSectionProps {
    subtitle?: string;
    title: {
        text: React.ReactNode;
        highlight?: string;
    };
    benefits: BenefitCard[];
}

export default function BenefitsGridSection({
    subtitle,
    title,
    benefits
}: BenefitsGridSectionProps) {
    return (
        <section className="py-20 bg-white bg-[url('/carousel-bg.webp')] bg-contain bg-no-repeat bg-right">
            <div className="max-w-[1140px] mx-auto px-6">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 space-y-4"
                >
                    {subtitle && (
                        <p className="text-brand-primary font-syne font-medium text-lg">
                            {subtitle}
                        </p>
                    )}

                    <h2 className="text-3xl md:text-[50px] leading-[1.1] font-syne font-semibold text-brand-primary">
                        {title.text}
                        {title.highlight && (
                            <span className="relative inline-block">
                                <span className="text-brand-secondary font-shaded font-light text-4xl md:text-[50px]">
                                    {title.highlight}
                                </span>
                                {/* Decorative Underline matching the image style */}
                                <Image src="/title-underline.svg" className="absolute -bottom-5 left-0 w-full h-6" alt="" width={500} height={100} />
                            </span>
                        )}
                    </h2>
                </motion.div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            className="bg-[#F9F9F9] rounded-4xl p-8 text-center flex flex-col items-center justify-center hover:shadow-lg transition-all duration-300 min-h-[280px]"
                        >
                            <h3 className="text-brand-secondary font-syne font-bold text-lg mb-4 leading-tight max-w-[80%] mx-auto">
                                {benefit.title}
                            </h3>
                            <p className="text-brand-gray text-[13px] leading-relaxed">
                                {benefit.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
