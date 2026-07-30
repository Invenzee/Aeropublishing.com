"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Button from "../Button";

const wordCountOptions = [
    { label: "25,000 or fewer", value: 25000 },
    { label: "50,000", value: 50000 },
    { label: "75,000", value: 75000 },
    { label: "100,000", value: 100000 },
];

const categories = ["Fiction/Non-fiction", "Children's book"];

const features = [
    "50 Assets",
    "Unlimited users",
    "Email Support",
    "Chat Support",
    "API & Integrations",
    "50 Assets",
    "Unlimited users",
    "Email Support",
    "Chat Support",
    "API & Integrations"
];

// Simplified pricing tiers logic
const getPrice = (tierIdx: number, wordCount: number, category: string) => {
    // Base prices
    let base = 3100;
    // In a real app, this logic would be more complex

    // Multiplier for wordCount
    const multiplier = wordCount / 25000;

    // Custom logic for demo
    let price = base * (0.8 + (multiplier * 0.2));

    if (category === "Children's book") {
        price *= 1.2; // Slightly more expensive
    }

    return Math.round(price / 100) * 100; // Round to nearest 100
};

export default function PricingSection() {
    const router = useRouter();
    const [wordCount, setWordCount] = useState(50000);
    const [category, setCategory] = useState("Fiction/Non-fiction");
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <section className="py-20 bg-white overflow-hidden bg-[url('/why-aero-gradient-bg.webp')] bg-contain bg-no-repeat bg-left">
            <div className="max-w-[1140px] mx-auto px-6">

                {/* Header Section */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative inline-block"
                    >
                        <ImageDecorator />
                        <h2 className="text-4xl md:text-5xl font-syne font-semibold text-brand-primary mb-12 relative z-10 leading-[1.1]">
                            How many words does {isMobile ? "" : <br />}
                            your <span className="text-brand-secondary italic font-shaded font-[300] text-[50px] max-sm:text-[36px]">book</span> have?
                        </h2>
                    </motion.div>

                    {/* Slider */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-center max-w-3xl mx-auto mb-4 relative px-8"
                    >
                        <div className="relative h-2 max-sm:h-1 bg-gray-200 rounded-full mb-8">
                            <div
                                className="absolute top-0 left-0 h-full bg-brand-secondary rounded-full transition-all duration-300"
                                style={{ width: `${((wordCount - 25000) / 75000) * 100}%` }}
                            />
                            {/* Custom Thumb */}
                            <div
                                className="absolute -top-1/2 -translate-y-1/2 w-6 h-6 max-sm:w-4 max-sm:h-4 max-sm:border-2 bg-white border-4 border-brand-secondary rounded-full shadow-lg cursor-grab active:cursor-grabbing hover:scale-110 transition-transform z-10"
                                style={{ left: `${((wordCount - 25000) / 75000) * 100}%`, transform: `translate(-25%, -50%)` }}
                            />

                            {/* Steps */}
                            {wordCountOptions.map((option, idx) => {
                                const position = (idx / (wordCountOptions.length - 1)) * 100;
                                return (
                                    <div
                                        key={option.value}
                                        className="absolute top-1/2 -translate-y-1/2 cursor-pointer group"
                                        style={{ left: `${position}%` }}
                                        onClick={() => setWordCount(option.value)}
                                    >
                                        <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${wordCount >= option.value ? 'bg-brand-secondary' : 'bg-gray-300'}`} />
                                        <span
                                            className={`absolute top-6 left-1/2 -translate-x-1/2 text-xs font-poppins font-medium whitespace-nowrap transition-colors duration-300 max-sm:text-[9px] ${wordCount === option.value ? 'text-brand-black font-bold' : 'text-gray-400'
                                                }`}
                                        >
                                            {option.label}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>

                        <input
                            type="range"
                            min="25000"
                            max="100000"
                            step="25000"
                            value={wordCount}
                            onChange={(e) => setWordCount(Number(e.target.value))}
                            className="absolute inset-0 w-full h-12 opacity-0 cursor-pointer z-20"
                        />
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-gray-500 text-sm mt-12 mb-10"
                    >
                        More than 125,000 words? <a href="#" className="underline hover:text-brand-secondary transition-colors max-sm:text-xs">Contact our publishing consultants</a>
                    </motion.p>

                    {/* Toggle */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="inline-flex bg-gray-200 p-1.5 rounded-lg relative"
                    >
                        {/* Sliding Background */}
                        <motion.div
                            className="absolute top-1.5 bottom-1.5 bg-white rounded-lg shadow-sm z-0 cursor-pointer"
                            initial={false}
                            animate={{
                                left: category === categories[0] ? "6px" : "50%",
                                width: "calc(50% - 6px)",
                                x: category === categories[0] ? 0 : 0
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />

                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                className={`relative z-10 px-8 py-3 rounded-lg text-sm max-sm:text-xs max-sm:px-6 font-semibold transition-colors duration-300 cursor-pointer ${category === cat ? "text-brand-primary" : "text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </motion.div>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-8 items-center !mt-20 max-sm:!mt-8">
                    {/* Card 1 */}
                    <PricingCard
                        title="Signature"
                        description="Distribute your title worldwide with access to 100 channels, copyright protection and essential publishing tools."
                        price={getPrice(0, wordCount, category)}
                        features={features}
                        variant="light"
                        router={router}
                    />

                    {/* Card 2 (Featured) */}
                    <PricingCard
                        title="Signature"
                        description="Distribute your title worldwide with access to 100 channels, copyright protection and essential publishing tools."
                        price={getPrice(1, wordCount, category)}
                        features={features}
                        variant="dark"
                        isPopular
                        router={router}
                    />

                    {/* Card 3 */}
                    <PricingCard
                        title="Signature"
                        description="Distribute your title worldwide with access to 100 channels, copyright protection and essential publishing tools."
                        price={getPrice(2, wordCount, category)}
                        features={features}
                        variant="light"
                        router={router}
                    />
                </div>
            </div>
        </section>
    );
}

interface PricingCardProps {
    title: string;
    description: string;
    price: number;
    features: string[];
    variant?: "light" | "dark";
    isPopular?: boolean;
    router: any;
}

function PricingCard({ title, description, price, features, variant = "light", isPopular = false, router }: PricingCardProps) {
    const isDark = variant === "dark";

    return (
        <motion.div
            whileHover={{ y: -10 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className={`
                relative px-8 py-6 rounded-2xl flex flex-col h-full border transition-all duration-300
                ${isDark
                    ? 'bg-[#18181b] border-[#18181b] text-white shadow-2xl shadow-brand-secondary/20 scale-105 z-10'
                    : 'bg-white border-gray-300 text-brand-black shadow-xl hover:shadow-2xl'
                }
                ${isPopular ? 'md:scale-110' : ''}
            `}
        >
            {isPopular && (
                <div className="absolute inset-0 rounded-[2.5rem] border-2 border-transparent bg-gradient-to-b from-brand-secondary/20 to-brand-accent/20 -z-10 blur-xl opacity-50" />
            )}

            <h3 className={`text-2xl font-syne font-bold mb-4 ${isDark ? 'text-brand-secondary' : 'text-brand-secondary'}`}>
                {title}
            </h3>

            <p className={`text-sm mb-6 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                {description}
            </p>

            <div className="mb-2">
                <span className="text-4xl font-syne font-bold">${price.toLocaleString()}</span>
            </div>
            <p className={`text-xs mb-8 ${isDark ? 'text-gray-300' : 'text-gray-400'}`}>
                Three years of membership included<br />
                one-time payment
            </p>

            <ul className="space-y-4 mb-10 flex-grow">
                {features.slice(0, 8).map((feature: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-medium">
                        <div className={`mt-0.5 rounded-full p-0.5 flex-shrink-0 bg-[#00D084] text-white`}>
                            <Check size={10} strokeWidth={4} />
                        </div>
                        <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>{feature}</span>
                    </li>
                ))}
            </ul>

            <div className="mt-auto">
                <Button
                    variant={isDark ? "secondary" : "primary"}
                    className={`w-full !rounded-full !h-12 !text-base ${!isDark ? '!bg-transparent !border !border-gray-200 !text-brand-black hover:!bg-brand-black hover:!text-white hover:!border-brand-black' : ''}`}
                    onClick={() => router.push("/contact-us")}
                >
                    {isDark ? "Get Started" : "Start 14-day Trial"}
                </Button>
            </div>
        </motion.div>
    )
}

function ImageDecorator() {
    return (
        <div className="absolute top-0 right-10 -translate-y-full transform hidden md:block">
            {/* Simple Sparkle SVG */}
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30 0L33.5 26.5L60 30L33.5 33.5L30 60L26.5 33.5L0 30L26.5 26.5L30 0Z" fill="#36C0E7" fillOpacity="0.5" />
            </svg>
        </div>
    )
}
