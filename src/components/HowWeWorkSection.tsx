"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import Button from "./Button";
import { ChevronRight, Dot } from "lucide-react";
import Image from "next/image";

export default function HowWeWorkSection() {
    const router = useRouter();
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        {
            id: 1,
            label: "Upload Manuscript",
            title: "Submit Your Manuscript for Review",
            description: [
                "Upload your manuscript through our secure submission system and provide a few essential details about your project. Our publishing team carefully reviews your work to understand your goals, assess readiness, and recommend clear, practical next steps to move your book forward with confidence.",
            ],
            illustration: "/how_we_work_section.webp"
        },
        {
            id: 2,
            label: "Editorial & Design",
            title: "Editing, Design, and Formatting by Publishing Experts",
            description: [
                "Our experienced editors and designers collaborate closely to refine your manuscript’s language, structure, and overall presentation. We professionally format your book, design engaging interiors and covers, and ensure your final product meets industry standards for both print and digital publication.",
            ],
            illustration: "/how_we_work_section.webp"
        },
        {
            id: 3,
            label: "Publishing Setup",
            title: "ISBN Registration and Platform Setup",
            description: [
                "We manage ISBN registration and handle all technical publishing requirements on your behalf. Your book is properly prepared, formatted, and configured for release across major publishing platforms, ensuring accuracy, compliance, and smooth distribution in the correct formats."
            ],
            illustration: "/how_we_work_section.webp"
        },
        {
            id: 4,
            label: "Distribution & Launch",
            title: " Book Launch and Global Availability",
            description: [
                "Your book is launched across leading online retailers, making it available to readers throughout the United States and worldwide. We ensure your title is accessible in both print and digital editions, helping your work reach a broad and diverse audience."
            ],
            illustration: "/how_we_work_section.webp"
        }
    ];

    return (
        <section
            className="relative py-20 bg-contain bg-top bg-no-repeat max-sm:py-12  overflow-x-hidden"
            style={{ backgroundImage: "url('/why-aero-bg.webp')" }}
        >
            <div className="max-w-[1140px] mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-center mb-12 max-sm:mb-8"
                >
                    <p className="text-md font-poppins text-brand-primary font-semibold tracking-wider uppercase mb-3">
                        Why Aero
                    </p>
                    <h2 className="text-[50px] text-brand-primary font-syne font-[500] leading-[1.1] max-sm:text-[32px]">
                        How Our Book Publishing<span className="text-brand-secondary font-shaded font-[300] text-[50px] max-sm:text-[36px]"> Process</span>{" "}
                        <span className="font-[500]"> Works</span>
                        <br />
                        <span className="font-bold">From Manuscript to Market</span>
                    </h2>
                    <p className="text-sm font-poppins text-brand-gray mt-4 max-w-2xl mx-auto">
                        We follow a clear, step-by-step process that takes your book from submission to publication with transparency, professional support, and author-first guidance at every stage.
                    </p>
                </motion.div>

                <div className="bg-white rounded-3xl shadow-2xl py-12 px-16 max-sm:p-6 border-4 border-[#D4E9F7]">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        className="flex justify-between gap-4 mb-12 max-sm:grid max-sm:grid-cols-1 max-sm:gap-3"
                    >
                        {steps.map((step, index) => (
                            <button
                                key={step.id}
                                onClick={() => setActiveStep(index)}
                                className={`px-6 py-3 w-full rounded-lg font-poppins text-sm font-medium transition-all duration-300 max-sm:px-4 max-sm:py-2 max-sm:text-xs cursor-pointer ${activeStep === index
                                    ? "bg-brand-primary text-white shadow-lg border border-brand-primary"
                                    : "bg-white text-brand-primary border border-brand-primary/20 hover:border-brand-primary/50"
                                    }`}
                            >
                                <div className="text-xs opacity-70 mb-1">Step {step.id}</div>
                                <div className="whitespace-nowrap">{step.label}</div>
                            </button>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                        className=""
                    >
                        <div className="grid grid-cols-2 gap-12 items-start max-lg:grid-cols-1 max-lg:gap-8">
                            <motion.div
                                key={activeStep}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="space-y-6"
                            >
                                <h3 className="text-[32px] font-syne font-bold text-black leading-tight max-sm:text-[24px] whitespace-pre-line">
                                    {steps[activeStep].title}
                                </h3>

                                <ul className="space-y-3">
                                    {steps[activeStep].description.map((item, idx) => (
                                        <motion.li
                                            key={idx}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: idx * 0.1 }}
                                            className="flex items-start gap-3"
                                        >
                                            <span className="text-[15px] font-poppins text-brand-gray leading-relaxed max-sm:text-[14px]">
                                                {item}
                                            </span>
                                        </motion.li>
                                    ))}
                                </ul>

                                <div className="pt-4">
                                    <Button
                                        variant="secondary"
                                        className="max-sm:text-[14px] max-sm:px-6"
                                        onClick={() => router.push("/contact-us")}
                                    >
                                        GET STARTED
                                    </Button>
                                </div>
                            </motion.div>

                            {/* Right: Illustration */}
                            <motion.div
                                key={`illustration-${activeStep}`}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="flex justify-center items-center max-lg:order-first"
                            >
                                <div className="relative w-full max-w-[350px] aspect-square">
                                    <Image
                                        src={steps[activeStep].illustration}
                                        alt={steps[activeStep].title}
                                        fill
                                        className="object-contain"
                                        loading="lazy"
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
