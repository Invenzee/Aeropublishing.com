"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

interface CounterProps {
    end: number;
    duration?: number;
    suffix?: string;
}

function Counter({ end, duration = 2, suffix = "" }: CounterProps) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!isInView) return;

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
    }, [isInView, end, duration]);

    return (
        <div ref={ref} className="text-[60px] font-syne font-bold text-brand-primary leading-none max-sm:text-[40px]">
            {count}{suffix}
        </div>
    );
}

export default function CounterSection() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });


    return (
        <section className="relative">
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
                    className="w-full h-full object-contain"
                    width={100}
                    height={100}
                />
            </motion.div>

         
        </section>
    );
}
