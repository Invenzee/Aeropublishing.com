"use client";

import { motion } from "framer-motion";
import Button from "../Button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { openZendeskChat } from "@/lib/zendesk";

const badges = [
    "/hero-badge-1.webp",
    "/hero-badge-2.webp",
    "/hero-badge-3.webp",
    "/hero-badge-4.webp",
]

export default function HeroSection() {

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
        <section className="relative min-h-screen flex items-center pt-[120px] overflow-hidden bg-[url('/hero-bg.webp')] bg-cover bg-center">
            <div className="max-w-[1140px] mx-auto my-24 relative z-10 w-full flex gap-12 items-start max-sm:flex-col max-sm:my-12 max-sm:px-6">

                {/* Left Column: Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-2"
                >
                    <h1 className="text-[60px] font-syne font-semibold leading-[1.1] text-brand-primary max-sm:text-[40px]">
                        Contact Us
                    </h1>

                    <p className="text-black font-poppins text-md leading-relaxed max-w-xl max-sm:text-[14px]">
                        Connect with the Aero Publishing team to discuss your book publishing goals. Whether you need Amazon KDP support, editing, formatting, or complete publishing management, we’re here to guide you. Share your project details with us, and let’s take the next step toward bringing your book to life.
                    </p>


                    <div className="flex flex-wrap gap-4 pt-4">
                        <Button font="poppins" variant="primary" className="max-sm:text-[14px] max-sm:px-4">
                            <a href="tel:+14242823304">+1424 282 3304</a>
                        </Button>
                        <Button
                            variant="secondary"
                            className="max-sm:text-[14px] max-sm:px-4"
                            onClick={openZendeskChat}
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
                    className="flex flex-col items-center lg:items-end  mt-4"
                >
                    <div className="w-full max-w-md">


                        <Image src="/contactus.webp" alt="Contact Form" width={500} height={300} />
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
