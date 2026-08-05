"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function LogoCarousel() {
    const logos = [
        { id: 1, src: "/client-logo-1.webp", alt: "Silicon Angle" },
        { id: 2, src: "/client-logo-2.webp", alt: "WSJ" },
        { id: 3, src: "/client-logo-3.webp", alt: "Startup Rise America" },
        { id: 4, src: "/client-logo-4.webp", alt: "Publishers Weekly" },
        { id: 5, src: "/client-logo-5.webp", alt: "Fortune" },
    ];

    const duplicatedLogos = [...logos, ...logos, ...logos];

    return (
        <section className="relative py-12 overflow-x-clip overflow-hidden bg-[#F2F2F2] max-sm:py-8 w-full max-w-full isolate">
            <div className="w-full max-w-full mx-auto overflow-x-clip overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#F2F2F2] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#F2F2F2] to-transparent z-10 pointer-events-none" />

                {/* Mobile: static logos — no wide animated track */}
                <div className="sm:hidden flex flex-wrap items-center justify-center gap-6 px-4">
                    {logos.map((logo) => (
                        <div
                            key={logo.id}
                            className="flex items-center justify-center grayscale opacity-60"
                        >
                            <Image
                                src={logo.src}
                                alt={logo.alt}
                                className="h-8 w-auto object-contain"
                                width={80}
                                height={32}
                            />
                        </div>
                    ))}
                </div>

                {/* Desktop: infinite scroll */}
                <div className="hidden sm:block relative w-full overflow-x-clip overflow-hidden">
                    <motion.div
                        className="flex gap-16 w-max will-change-transform"
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
