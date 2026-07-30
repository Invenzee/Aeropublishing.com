"use client";

import { motion } from "framer-motion";
import Button from "./Button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { sendEmail } from "@/app/actions/email";
import { getFormTrackingPayload } from "@/lib/tracking";
import { useRouter } from "next/navigation";

const badges = [
    "/hero-badge-1.webp",
    "/hero-badge-2.webp",
    "/hero-badge-3.webp",
    "/hero-badge-4.webp",
]

export default function HeroSection() {
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
        console.log("Submitting form...");
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
            console.log(result)
            console.log(result.success)
            if (result.success) {
                console.log("Form submission successful.");
                router.push("/thank-you");
            } else {
                console.log("Form submission failed.");
                setStatus({
                    submitting: false,
                    success: false,
                    message: "Failed to send. Try again.",
                });
            }
        } catch (error) {
            console.error("Error sending email:", error);
            setStatus({
                submitting: false,
                success: false,
                message: "An error occurred.",
            });
        }
    };

    return (
        <section className="relative min-h-screen flex items-center pt-[120px] overflow-hidden bg-[url('/hero-bg.webp')] bg-cover bg-center">
            <div className="max-w-[1140px] mx-auto my-24 relative z-10 w-full flex gap-12 items-start max-sm:flex-col max-sm:my-12 max-sm:px-6">

                {/* Left Column: Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-2"
                >
                    <h1 className="text-[60px] font-syne font-semibold leading-[1.1] text-brand-primary max-sm:text-[40px] max-sm:pt-8">
                        <span className="font-shaded font-[300] text-brand-secondary mr-3 text-[56px] max-sm:text-[42px]">Trusted</span> Partner for Self-Publishing Success
                    </h1>

                    <p className="text-black font-poppins text-sm leading-relaxed max-w-lg max-sm:text-[14px]">
                        If you’re unsure where to begin, you’re not alone. We help authors transform manuscripts into professionally published books by managing editing, design, publishing, and distribution—so you can focus on your story while we handle the rest.
                    </p>

                    {/* Badges Placeholder */}
                    <div className="flex gap-4 items-center py-2">
                        {badges.map((badge, i) => (
                            <Image key={i} src={badge} alt="Badge" width={i === 1 && !isMobile ? 70 : isMobile ? 60 : 80} height={i === 1 && !isMobile ? 70 : isMobile ? 60 : 80} priority={i === 0} quality={80} />
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-4 pt-4">
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
                </motion.div>

                {/* Right Column: form */}
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
                                placeholder="Name"
                                className="w-full h-14 px-6 bg-transparent border border-[#818181] focus:outline-none focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary transition-all font-poppins"
                            />
                            <input
                                name="email"
                                type="email"
                                required
                                placeholder="Email"
                                className="w-full h-14 px-6 bg-transparent border border-[#818181] focus:outline-none focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary transition-all font-poppins"
                            />
                            <input
                                name="phone"
                                type="tel"
                                required
                                placeholder="Phone Number"
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

            </div>
        </section>
    );
}
