"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function MissionSection() {
    const section1Ref = useRef(null);
    const section2Ref = useRef(null);
    const isSection1InView = useInView(section1Ref, { once: true, margin: "-100px" });
    const isSection2InView = useInView(section2Ref, { once: true, margin: "-100px" });
    return (
        <section className="bg-white overflow-hidden">
            <div className="bg-[url('/why-aero-gradient-bg.webp')] bg-contain bg-no-repeat bg-left">
                {/* Section 1: Laptop with Books */}
                <div ref={section1Ref} className="max-w-[1140px] mx-auto py-20 max-md:py-12 max-sm:px-6">
                    <div className="flex items-center gap-16 max-lg:flex-col max-lg:gap-12">
                        {/* Left: Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={isSection1InView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                            transition={{ duration: 0.8 }}
                            className="relative w-1/2 max-lg:w-full flex justify-center"
                        >
                            <div className="relative w-full aspect-4/3">
                                <Image
                                    width={500}
                                    height={500}
                                    src="/booksabout.webp"
                                    alt="Laptop with books"
                                    className="object-contain"
                                />
                            </div>
                        </motion.div>

                        {/* Right: Text */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={isSection1InView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="w-1/2 max-lg:w-full space-y-6"
                        >
                            <h2 className="text-[50px] font-syne font-bold leading-[1.1] max-sm:text-[32px]">
                                <span className="text-brand-secondary font-shaded italic font-light text-[50px] max-md:text-[36px]">The </span>
                                <span className="text-brand-primary ">Mission is Shooting </span>
                                <span className="text-brand-primary ">For The </span>
                                <span className="text-brand-primary ">Moon Easier</span>
                            </h2>
                            {/* <div className="border-t border-brand-accent/30 w-1/3 pt-4"></div> */}
                            <p className="text-[14px] text-brand-gray font-poppins leading-[1.6] text-justify">
                                At Aero Publishing, our mission is simple: to remove barriers between authors and publication. We believe great stories shouldn’t be held back by complicated systems, hidden fees, or confusing processes.<br></br>
                                We work with authors across the United States to provide a modern, streamlined publishing experience—combining technology, creativity, and human expertise. From first-time writers to experienced authors, we help transform ideas into professionally published books that meet today’s publishing standards.<br></br>
                                Our team is driven by one goal: to make publishing accessible, transparent, and rewarding—so authors can focus on what matters most—writing.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
            <div className="bg-[url('/carousel-bg.webp')] bg-contain bg-no-repeat bg-right">
                {/* Section 2: Book House */}
                <div ref={section2Ref} className="max-w-[1140px] mx-auto px-6 py-20 max-md:py-12">
                    <div className="flex items-center gap-16 max-lg:flex-col-reverse max-lg:gap-12">
                        {/* Left: Text */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={isSection2InView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="w-1/2 max-lg:w-full space-y-6"
                        >
                            <h2 className="text-[50px] font-syne font-bold leading-[1.1] max-sm:text-[32px]">
                                <span className="text-brand-secondary font-shaded italic font-light text-[50px] max-md:text-[36px]">How </span>
                                <span className="text-brand-primary ">to Craft </span>
                                <span className="text-brand-primary ">Professional eBook</span>
                            </h2>
                            {/* <div className="border-t border-brand-accent/30 w-1/3 pt-4"></div> */}
                            <p className="text-[14px] text-brand-gray font-poppins leading-[1.6] text-justify">
                                Publishing a professional ebook doesn’t have to feel overwhelming. At Aero Publishing, we guide you through every step—from concept to completion—ensuring your book is polished, structured, and market-ready.<br></br>
                                Our process blends editorial expertise, design precision, and strategic planning to create ebooks that readers enjoy and platforms approve. Whether you’re writing fiction, nonfiction, or educational content, we help shape your manuscript into a high-quality digital book that reflects your voice and vision.<br></br>
                                With Aero, you’re never guessing—you’re guided, informed, and supported throughout the journey.
                            </p>
                        </motion.div>

                        {/* Right: Image */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={isSection2InView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                            transition={{ duration: 0.8 }}
                            className="relative w-1/2 max-lg:w-full"
                        >
                            <div className="relative w-full aspect-4/5  z-10 transition-transform duration-500 hover:scale-105">
                                <Image
                                    width={500}
                                    height={500}
                                    src="/rightbook2.webp"
                                    alt="Book house structure"
                                    className="object-contain"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
