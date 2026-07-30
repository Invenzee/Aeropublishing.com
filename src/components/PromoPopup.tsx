"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Button from "./Button";
import { sendEmail } from "@/app/actions/email";
import { getFormTrackingPayload } from "@/lib/tracking";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function PromoPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Show popup after 3 seconds (reduced from 8s for better UX)
        const timer = setTimeout(() => {
            const hasSeenPopup = sessionStorage.getItem("hasSeenPromoPopup");
            if (!hasSeenPopup) {
                setIsOpen(true);
            }
        }, 9000);

        return () => clearTimeout(timer);
    }, []);

    const closePopup = () => {
        setIsOpen(false);
        sessionStorage.setItem("hasSeenPromoPopup", "true");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            genre: formData.get("genre"),
            pages: formData.get("pages"),
            formType: "Promo Popup Form"
        };

        try {
            const result = await sendEmail({ ...data, ...getFormTrackingPayload() });
            if (result.success) {
                closePopup();
                router.push("/thank-you");
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closePopup}
                        className="absolute inset-0 bg-white/20 backdrop-blur-sm"
                    />

                    {/* Popup Container */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-[900px] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[400px]"
                    >
                        {/* Left Side: Brand Promo with Image */}
                        <div className="w-full md:w-[50%] bg-brand-primary text-white flex flex-col justify-between relative overflow-hidden max-sm:hidden">
                            {/* OPTIMIZED: eager loading, fetchPriority="high", quality optimized for LCP */}
                            <Image
                                src="/popup-image.webp"
                                alt="Book cover"
                                fill
                                className="w-full h-full object-cover filter drop-shadow-2xl brightness-110"
                                sizes="(max-width: 768px) 400px, 450px"
                                quality={65}
                                priority={true}
                                fetchPriority="high"
                            />
                        </div>

                        {/* Right Side: Form */}
                        <div className="w-full md:w-[50%] bg-brand-white p-4 md:p-10 text-black relative">
                            <button
                                onClick={closePopup}
                                className="absolute top-4 right-4 text-black/50 hover:text-black transition-colors p-2 cursor-pointer z-10"
                                aria-label="Close popup"
                            >
                                <X size={24} />
                            </button>

                            <div className="max-w-md mx-auto">
                                <div className="mb-8">
                                    <h3 className="text-2xl md:text-3xl font-syne font-bold mb-3">
                                        Ready to Publish <span className="text-brand-secondary">Your Book?</span>
                                    </h3>
                                    <p className="text-sm font-poppins text-black/60 leading-relaxed">
                                        We help authors publish with confidence. Whether it's your first book or your next bestseller, we provide expert solutions tailored for success.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <input
                                        name="name"
                                        type="text"
                                        required
                                        placeholder="Your Full Name*"
                                        className="w-full h-12 px-5 bg-white/5 border border-black/10 rounded-xl focus:outline-none focus:border-brand-secondary transition-all text-sm font-poppins"
                                        autoComplete="name"
                                    />
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="Email Address*"
                                        className="w-full h-12 px-5 bg-white/5 border border-black/10 rounded-xl focus:outline-none focus:border-brand-secondary transition-all text-sm font-poppins"
                                        autoComplete="email"
                                    />
                                    <input
                                        name="phone"
                                        type="tel"
                                        required
                                        placeholder="Phone Number*"
                                        className="w-full h-12 px-5 bg-white/5 border border-black/10 rounded-xl focus:outline-none focus:border-brand-secondary transition-all text-sm font-poppins"
                                        autoComplete="tel"
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            name="genre"
                                            type="text"
                                            placeholder="Genre"
                                            className="w-full h-12 px-5 bg-white/5 border border-black/10 rounded-xl focus:outline-none focus:border-brand-secondary transition-all text-sm font-poppins"
                                        />
                                        <input
                                            name="pages"
                                            type="number"
                                            placeholder="No. of Pages"
                                            className="w-full h-12 px-5 bg-black/5 border border-black/10 rounded-xl focus:outline-none focus:border-brand-secondary transition-all text-sm font-poppins [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                    </div>

                                    <div className="pt-4">
                                        <Button
                                            variant="secondary"
                                            className="!text-md !font-bold rounded-xl shadow-lg shadow-brand-secondary/20 group"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? "Processing..." : "Get Started Now"}
                                        </Button>
                                    </div>

                                    <p className="text-[10px] text-center text-white/30 font-poppins mt-4">
                                        By clicking "Get Started Now", you agree to our Terms and Privacy Policy.
                                    </p>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}