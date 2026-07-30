"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function LogoCarousel() {
    // Logo data - will be replaced with actual logo images
    const logos = [
        { id: 1, src: "/client-logo-1.webp", alt: "Silicon Angle" },
        { id: 2, src: "/client-logo-2.webp", alt: "WSJ" },
        { id: 3, src: "/client-logo-3.webp", alt: "Startup Rise America" },
        { id: 4, src: "/client-logo-4.webp", alt: "Publishers Weekly" },
        { id: 5, src: "/client-logo-5.webp", alt: "Fortune" },
    ];

    // Duplicate logos for seamless infinite scroll
    const duplicatedLogos = [...logos, ...logos, ...logos];

    return (
        <section className="relative py-12 overflow-hidden bg-[#F2F2F2] max-sm:py-8 w-full  overflow-x-hidden">
            <div className="max-w-full mx-auto">
                {/* Gradient Overlays for fade effect */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 max-sm:w-16" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 max-sm:w-16" />

                {/* Infinite Scrolling Container */}
                <div className="relative overflow-hidden">
                    <motion.div
                        className="flex gap-16 max-sm:gap-12"
                        animate={{
                            x: [0, -100 * (logos.length / 3) + "%"],
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 20,
                                ease: "linear",
                            },
                        }}
                    >
                        {duplicatedLogos.map((logo, index) => (
                            <div
                                key={`${logo.id}-${index}`}
                                className="flex-shrink-0 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                            >
                                <Image
                                    src={logo.src}
                                    alt={logo.alt}
                                    className="w-auto object-contain"
                                    width={100}
                                    height={100}
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
