"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function WhyAeroSection({ features, highlightTitle, normalTitle, boldTitle, description, imageUrl = "/why-aero-book.webp", eyebrowTitle = "Why Aero", noImageRadius = false, imageContain = false, imageWidthPercent }: { features: any[], highlightTitle: string, normalTitle: string, boldTitle: string, description: string, imageUrl?: string, eyebrowTitle?: string, noImageRadius?: boolean, imageContain?: boolean, imageWidthPercent?: number }) {
    return (
        <section
            className="relative py-20 bg-contain bg-top bg-no-repeat max-sm:py-12 w-full max-w-full overflow-x-clip overflow-hidden"
            style={{ backgroundImage: "url('/why-aero-bg.webp')" }}
        >
            <div className="max-w-[1140px] mx-auto max-sm:px-4 relative w-full min-w-0">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="space-y-3 flex flex-col items-center mb-16"
                >
                    <p className="text-md font-poppins text-brand-primary font-semibold tracking-wider uppercase">
                        {eyebrowTitle}
                    </p>
                    <h2 className="text-[50px] text-brand-primary text-center font-syne font-bold leading-[1.1] max-sm:text-[32px] max-w-2xl">
                        <span className="text-brand-secondary font-shaded font-[300] text-[50px] max-sm:text-[36px]">{highlightTitle}</span>{" "}
                        {normalTitle && <span className="font-[500]">{normalTitle}</span>}
                        {boldTitle}
                    </h2>
                    <p className="text-black text-center font-poppins text-sm leading-relaxed max-w-4xl max-sm:text-[14px]">
                        {description}
                    </p>
                </motion.div>
                <div className="grid grid-cols-2 gap-16 items-stretch max-lg:grid-cols-1 max-lg:gap-12">
                    {/* Left Column: Content */}
                    <div className="space-y-8 min-h-0">
                        {/* Features List */}
                        <div className="space-y-4">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: 0.2 + index * 0.1,
                                        ease: "easeOut"
                                    }}
                                    className="flex items-start gap-4 p-4 rounded-xl border border-black hover:border-brand-secondary transition-colors duration-300"
                                >
                                    {/* Icon */}
                                    <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center">
                                        <Image
                                            src={feature.icon}
                                            alt={feature.title}
                                            width={50}
                                            height={50}
                                            className="object-cover rounded-xl"
                                            loading="lazy"
                                            quality={75}
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <h3 className="text-[16px] font-poppins font-semibold text-black mb-1 max-sm:text-[14px]">
                                            {feature.title}
                                        </h3>
                                        <p className="text-[13px] font-poppins text-brand-gray leading-relaxed max-sm:text-[12px]">
                                            {feature.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.3,
                            ease: "easeOut"
                        }}
                        className={`relative max-lg:order-first flex h-full min-h-0 ${imageWidthPercent ? "justify-center max-lg:justify-center" : "justify-end"}`}
                    >
                        <div
                            className={`relative h-full max-lg:h-auto max-lg:aspect-[4/5] max-lg:max-h-[420px] ${
                                noImageRadius ? "" : "rounded-2xl overflow-hidden shadow-2xl"
                            }`}
                            style={imageWidthPercent ? { width: `${imageWidthPercent}%` } : { width: "90%" }}
                        >
                            <Image
                                src={imageUrl}
                                alt="Open book"
                                fill
                                className={`${
                                    imageContain
                                        ? "object-contain"
                                        : "object-cover"
                                } ${
                                    noImageRadius
                                        ? "rounded-none"
                                        : "rounded-[40px] max-sm:rounded-lg"
                                }`}
                                priority
                                sizes="(max-width: 768px) 400px, 500px"
                                quality={80}
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
