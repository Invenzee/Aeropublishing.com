"use client";

import { motion } from "framer-motion";
import Button from "../Button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { sendEmail } from "@/app/actions/email";
import { getFormTrackingPayload } from "@/lib/tracking";

const badges = [
    "/hero-badge-1.webp",
    "/hero-badge-2.webp",
    "/hero-badge-3.webp",
    "/hero-badge-4.webp",
]

export default function HeroSection({ title, description, showButton = true, className = "", hasForm = true }: { title: string, description: string, showButton?: boolean, className?: string, hasForm?: boolean }) {

    const router = useRouter();
    const [isMobile, setIsMobile] = useState(false);
    const [status, setStatus] = useState<{
        submitting: boolean;
        success: boolean | null;
        message: string;
    }>({
        submitting: false,
        success: null,
        message: "",
    });

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        setStatus({ submitting: true, success: null, message: "" });
        const formData = new FormData(form);
        const data = {
            name: formData.get("name"),
            phone: formData.get("phone"),
            email: formData.get("email"),
            message: formData.get("message"),
            formType: "Hero Section Form"
        };

        try {
            const result = await sendEmail({ ...data, ...getFormTrackingPayload() });
            if (result.success) {
                router.push("/thank-you");
            } else {
                setStatus({
                    submitting: false,
                    success: false,
                    message: "Failed to send. Try again.",
                });
            }
        } catch (error) {
            setStatus({
                submitting: false,
                success: false,
                message: "An error occurred.",
            });
        }
    };

    return (
        <section className={`${className} relative min-h-screen flex items-center pt-[120px] overflow-hidden bg-[url('/hero-bg.webp')] bg-cover bg-center`}>
            <div className="max-w-[1140px] mx-auto my-24 relative z-10 w-full flex justify-between gap-5 items-center max-sm:flex-col max-sm:my-12 max-sm:px-6">

                {/* Left Column: Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`space-y-2 ${hasForm ? '' : 'mx-auto'}`}
                >
                    <h1 className={`text-[60px] font-syne font-semibold leading-[1.1] text-brand-primary max-sm:text-[40px] ${hasForm ? 'text-left' : 'text-center'}`}>
                        {title}
                    </h1>

                    <p className={`text-black font-poppins text-md leading-relaxed max-sm:text-[14px] ${hasForm ? 'max-w-4xl text-left' : 'max-w-2xl text-center'}`}>
                        {description}
                    </p>

                    {showButton && (
                        <div className={`flex flex-wrap gap-4 pt-4 ${hasForm ? 'justify-start' : 'justify-center'}`}>
                            <Button font="poppins" variant="primary" className="max-sm:text-[14px] max-sm:px-4">
                                <a href="tel:+14242823304">+1424 282 3304</a>
                            </Button>
                            <Button
                                variant="secondary"
                                className="max-sm:text-[14px] max-sm:px-4"
                                onClick={() => (window as any).Tawk_API?.maximize()}
                            >
                                Chat Now
                            </Button>
                        </div>
                    )}
                </motion.div>

                {/* Right Column: form */}
                {hasForm && (
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="flex flex-col items-center lg:items-end w-full mt-4"
                    >
                        <div className="w-full max-w-md">
                            <div className="text-center mb-6">
                                <h2 className="text-2xl font-syne font-bold text-brand-black max-sm:text-[24px]">Talk to a Publishing Expert</h2>
                                <p className="text-lg font-syne text-black max-sm:text-[14px]">Speak with a dedicated publishing consultant today</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    placeholder="First Name"
                                    className="w-full h-14 px-6 bg-transparent border border-[#818181] focus:outline-none focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary transition-all font-poppins"
                                />
                                <input
                                    name="phone"
                                    type="tel"
                                    required
                                    placeholder="Phone Number"
                                    className="w-full h-14 px-6 bg-transparent border border-[#818181] focus:outline-none focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary transition-all font-poppins"
                                />
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="Email Address"
                                    className="w-full h-14 px-6 bg-transparent border border-[#818181] focus:outline-none focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary transition-all font-poppins"
                                />
                                <textarea
                                    name="message"
                                    required
                                    placeholder="Write A Message"
                                    className="w-full h-32 px-6 py-4 bg-transparent border border-[#818181] focus:outline-none focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary transition-all resize-none font-poppins"
                                />

                                {status.message && (
                                    <p className={`text-center text-sm ${status.success ? 'text-green-600' : 'text-red-600'}`}>
                                        {status.message}
                                    </p>
                                )}

                                <div className="flex justify-center pt-4">
                                    <Button
                                        variant="secondary"
                                        className="max-sm:text-[14px] max-sm:px-8"
                                        disabled={status.submitting}
                                    >
                                        {status.submitting ? "Submitting..." : "Submit"}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
