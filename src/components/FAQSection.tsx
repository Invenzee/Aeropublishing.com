"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowDownRight, ArrowRight } from "lucide-react";

export default function FAQSection({ faqs }: { faqs: { id: number; question: string; answer: string }[] }) {
    const [activeId, setActiveId] = useState<number | null>(2); // Default open second item as in image

    return (
        <section className="relative py-20 bg-white overflow-hidden max-sm:py-12  overflow-x-hidden">
            {/* Left Side Glow Effect */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#D4E9F7] rounded-full blur-[120px] opacity-60 -translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="max-w-[1140px] mx-auto px-6 relative z-10 flex max-lg:flex-col gap-12 lg:gap-24">

                {/* Left Side: Header */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="lg:w-1/3 pt-8"
                >
                    <h2 className="text-[50px] font-syne font-bold leading-[1.1] text-brand-primary mb-6 max-sm:text-[36px]">
                        A Few <span className="text-brand-secondary font-shaded font-[400]">Quick</span><br />
                        Answers
                    </h2>
                    <p className="text-sm font-poppins text-brand-gray leading-relaxed max-w-sm">
                        Some of the most common questions, answered simply and honestly.
                    </p>
                </motion.div>

                {/* Right Side: Accordion */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    className="lg:w-2/3 w-full"
                >
                    <div className="flex flex-col">
                        {faqs.map((faq) => (
                            <div
                                key={faq.id}
                                className="border-b border-gray-200"
                            >
                                <button
                                    onClick={() => setActiveId(activeId === faq.id ? null : faq.id)}
                                    className="w-full py-6 flex items-center justify-between gap-4 text-left group transition-colors cursor-pointer"
                                >
                                    <span className="text-lg font-syne font-medium text-brand-primary group-hover:text-brand-secondary transition-colors max-sm:text-[16px]">
                                        {faq.question}
                                    </span>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shrink-0
                                ${activeId === faq.id
                                            ? "bg-[#00C6E0] text-white"
                                            : "bg-gray-200 text-gray-500 group-hover:bg-gray-300"
                                        }
                            `}>
                                        {activeId === faq.id ? (
                                            <ArrowRight size={14} strokeWidth={2.5} />
                                        ) : (
                                            <ArrowDownRight size={14} strokeWidth={2.5} />
                                        )}
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {activeId === faq.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <p className="text-sm font-poppins text-brand-gray leading-relaxed pb-8 pr-8">
                                                {faq.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
