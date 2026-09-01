"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Button from "@/components/Button";
import { CheckCircle2, Sparkles } from "lucide-react";

function ThankYouContent() {
    const searchParams = useSearchParams();
    const isManuscript = searchParams.get("type") === "manuscript";

    return (
        <main className="min-h-screen bg-white flex flex-col mt-12">
            <div className="flex-grow flex items-center justify-center relative overflow-hidden pt-20">
                <div className="absolute top-1/4 -left-20 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-brand-secondary/5 rounded-full blur-3xl animate-pulse transition-all duration-1000" />

                <div className="max-w-[1140px] mx-auto px-6 relative z-10 w-full">
                    <div className="flex flex-col items-center text-center">
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                                delay: 0.2,
                            }}
                            className="relative mb-8"
                        >
                            <div className="absolute inset-0 bg-brand-secondary/20 rounded-full blur-xl animate-ping" />
                            <div className="relative bg-white p-6 rounded-full shadow-2xl border border-gray-100">
                                <CheckCircle2 size={80} className="text-brand-secondary" strokeWidth={1.5} />
                            </div>

                            <motion.div
                                animate={{
                                    rotate: [0, 10, -10, 0],
                                    scale: [1, 1.1, 1],
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 4,
                                    ease: "easeInOut",
                                }}
                                className="absolute -top-4 -right-4 text-brand-primary bg-white p-2 rounded-lg shadow-lg"
                            >
                                <Sparkles size={24} />
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <h1 className="text-6xl md:text-7xl font-syne font-bold text-brand-primary mb-6 leading-tight">
                                <span className="font-shaded font-light text-brand-secondary md:text-8xl text-6xl">Thank</span> You!
                            </h1>

                            <p className="text-lg max-sm:text-md font-poppins text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                                {isManuscript
                                    ? "Your manuscript has reached us safely. A confirmation email is on its way, and our publishing experts will review your submission and be in touch shortly."
                                    : "Your message has reached us safely. Our publishing experts are already reviewing your request and will be in touch with you shortly."}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-wrap gap-6 justify-center"
                        >
                            <Link href="/">
                                <Button variant="primary" className="!text-md gap-2 group">
                                    Back to Home
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default function ThankYouPage() {
    return (
        <Suspense
            fallback={
                <main className="min-h-screen bg-white flex items-center justify-center pt-20">
                    <p className="font-poppins text-gray-500">Loading…</p>
                </main>
            }
        >
            <ThankYouContent />
        </Suspense>
    );
}
