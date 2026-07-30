"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

interface CounterProps {
    end: number;
    duration?: number;
    suffix?: string;
}

function Counter({ end, duration = 2, suffix = "" }: CounterProps) {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        if (!hasAnimated) return;

        let startTime: number | null = null;
        const animateCount = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = (timestamp - startTime) / (duration * 1000);

            if (progress < 1) {
                setCount(Math.floor(end * progress));
                requestAnimationFrame(animateCount);
            } else {
                setCount(end);
            }
        };

        requestAnimationFrame(animateCount);
    }, [hasAnimated, end, duration]);

    return (
        <motion.div
            onViewportEnter={() => setHasAnimated(true)}
            viewport={{ once: true, amount: 0.3 }}
            className="text-[60px] font-syne font-bold text-brand-primary leading-none max-sm:text-[40px]"
        >
            {count}{suffix}
        </motion.div>
    );
}

export default function CounterSection() {
    const stats = [
        {
            icon: (
                <Image src="/book.svg" alt="Book icon" width={48} height={48} className="w-12 h-12 max-sm:w-10 max-sm:h-10" />
            ),
            number: 800,
            suffix: "+",
            label: "Books Published"
        },
        {
            icon: (
                <Image src="/reload.svg" alt="Reload icon" width={48} height={48} className="w-12 h-12 max-sm:w-10 max-sm:h-10" />
            ),
            number: 100,
            suffix: "+",
            label: "Authors published manuscripts with us"
        },
        {
            icon: (
                <Image src="/growth.svg" alt="Growth icon" width={48} height={48} className="w-12 h-12 max-sm:w-10 max-sm:h-10" />
            ),
            number: 200,
            suffix: "+",
            label: "Annual growth in manuscript"
        }
    ];

    return (
        <section className="relative bg-brand-light py-10 max-sm:py-12 overflow-x-hidden">
            {/* Triangle Decoration */}
            <motion.div
                className="absolute left-20 -top-16 w-44 h-44 max-sm:w-20 max-sm:h-20 max-sm:left-10 max-sm:-top-8"
                animate={{
                    y: [0, -20, 0],
                    x: [0, 10, 0]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <Image
                    src="/triangle.webp"
                    alt="Triangle decoration"
                    width={176}
                    height={176}
                    className="w-full h-full object-contain"
                />
            </motion.div>

            <div className="max-w-[1140px] mx-auto px-6">
                <div className="grid grid-cols-3 gap-12 max-sm:grid-cols-1 max-sm:gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.2,
                                ease: "easeOut"
                            }}
                            className="flex flex-col items-center text-center"
                        >
                            {/* Icon */}
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.2 + 0.2,
                                    ease: "backOut"
                                }}
                                className=""
                            >
                                {stat.icon}
                            </motion.div>

                            {/* Counter */}
                            <Counter end={stat.number} suffix={stat.suffix} duration={2.5} />

                            {/* Label */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.2 + 0.4
                                }}
                                className="text-[14px] font -poppins text-brand-primary leading-relaxed max-sm:text-[13px]"
                            >
                                {stat.label}
                            </motion.p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
