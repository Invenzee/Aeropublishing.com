"use client";

import { motion } from "framer-motion";
import Button from "../Button";
import Image from "next/image";

interface FeatureSectionProps {
    subtitle?: string;
    title: {
        prefix: string;
        highlight: string;
        suffix?: string;
    };
    description: string;
    features?: string[];
    ctaText?: string;
    ctaLink?: string;
    imageSrc: string;
    imageAlt?: string;
    isReversed?: boolean; // To swap image and content side
    hasFeatures?: boolean;
    noImageRadius?: boolean;
    imageContain?: boolean;
    imageWidthPercent?: number;
}

export default function FeatureSection({
    subtitle = "Self-Publishing Made Effortless:",
    title,
    description,
    features = [],
    ctaText = "Start Now",
    ctaLink = "/contact-us",
    imageSrc,
    imageAlt = "Feature Image",
    isReversed = false,
    hasFeatures = false,
    noImageRadius = false,
    imageContain = false,
    imageWidthPercent,
}: FeatureSectionProps) {
    return (
        <section className="py-20 bg-white overflow-hidden bg-[url('/why-aero-gradient-bg.webp')] bg-contain bg-no-repeat bg-left">
            <div className={`max-w-[1140px] mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${isReversed ? 'lg:flex-row-reverse' : ''}`}>

                {/* Content Side */}
                <motion.div
                    initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex-1 space-y-3"
                >
                    {subtitle && (
                        <h4 className="text-brand-primary font-syne font-medium text-lg md:text-xl">
                            {subtitle}
                        </h4>
                    )}

                    <h2 className="text-4xl md:text-[40px] font-syne font-semibold text-brand-primary leading-[1.1]">
                        {title.prefix}{" "}
                        <span className="text-brand-secondary font-shaded font-light text-[44px] md:text-[46px]">
                            {title.highlight}
                        </span>
                        {title.suffix && <span className="block md:inline"> {title.suffix}</span>}
                    </h2>

                    <p className="text-brand-gray font-poppins text-sm leading-relaxed text-justify">
                        {description}
                    </p>

                    {
                        hasFeatures &&
                        <div className="text-sm font-medium text-brand-black">
                            What you can expect:
                        </div>
                    }

                    {features.length > 0 && (
                        <ul className="space-y-3 pt-2">
                            {features.map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-3 text-sm font-medium text-brand-black">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-black shrink-0" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    )}

                    <div className="pt-6">
                        <Button href={ctaLink} variant="secondary" className="">
                            {ctaText}
                        </Button>
                    </div>
                </motion.div>

                {/* Image Side */}
                <motion.div
                    initial={{ opacity: 0, x: isReversed ? -50 : 50, scale: 0.95 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className={`flex-1 relative w-full max-w-[500px] h-full ${imageWidthPercent ? "flex justify-center" : ""}`}
                >

                    <div
                        className="relative"
                        style={imageWidthPercent ? { width: `${imageWidthPercent}%` } : { width: "100%" }}
                    >
                        <Image
                            width={500}
                            height={500}
                            src={imageSrc}
                            alt={imageAlt}
                            className={`w-full ${
                                imageContain
                                    ? "object-contain h-auto"
                                    : "object-cover min-h-[500px] max-h-[500px] max-sm:min-h-full max-sm:max-h-full"
                            } ${
                                noImageRadius
                                    ? "rounded-none"
                                    : "rounded-[40px] max-sm:rounded-lg"
                            }`}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
