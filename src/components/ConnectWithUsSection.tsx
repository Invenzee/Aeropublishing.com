"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Button from "./Button";
import { Check } from "lucide-react";
import { sendEmail } from "@/app/actions/email";
import { getFormTrackingPayload } from "@/lib/tracking";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ConnectWithUsSection() {
    const router = useRouter();
    const [status, setStatus] = useState<{
        submitting: boolean;
        success: boolean | null;
        message: string;
    }>({
        submitting: false,
        success: null,
        message: "",
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        setStatus({ submitting: true, success: null, message: "" });
        const formData = new FormData(form);
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            formType: "Connect With Us Form"
        };

        try {
            const result = await sendEmail({ ...data, ...getFormTrackingPayload() });
            if (result.success) {
                router.push("/thank-you");
            } else {
                setStatus({
                    submitting: false,
                    success: false,
                    message: "Error subscribing.",
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
        <section
            className="relative py-10 bg-cover bg-center overflow-hidden max-sm:py-12  overflow-x-hidden"
            style={{ backgroundImage: "url('/connect-with-us.webp')" }}
        >
            <div className="max-w-[1140px] mx-auto px-6 relative z-10">
                <div className="flex items-center gap-12 max-lg:flex-col max-lg:gap-8">

                    {/* Left Side: Logo */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="w-1/3 flex justify-center max-lg:w-full"
                    >
                        <div className="relative w-full">
                            <Image
                                src="/connect-with-us-logo.webp"
                                alt="Connect with us logo"
                                width={500}
                                height={500}
                                className="object-cover"
                                loading="lazy"
                                sizes="(max-width: 768px) 200px, 300px"
                                quality={75}
                            />
                        </div>
                    </motion.div>

                    {/* Right Side: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        className="w-2/3 max-lg:w-full border-l border-white/70 pl-12 max-lg:pl-0 max-lg:border-l-0"
                    >
                        <h2 className="text-[40px] font-syne font-medium leading-[1.1] text-white mb-8 max-sm:text-[28px] max-sm:text-center">
                            Connect With <span className="text-brand-secondary font-shaded max-sm:text-[36px] text-[46px] font-[300]">Leading</span> Book<br className="max-sm:hidden" /> Publishers in USA Today
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1">
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    placeholder="Full Name"
                                    className="w-full h-12 px-6 bg-transparent border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary transition-all font-poppins text-sm"
                                />
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="Email*"
                                    className="w-full h-12 px-6 bg-transparent border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary transition-all font-poppins text-sm"
                                />
                            </div>

                            <div className="flex items-start gap-4 justify-between max-sm:flex-col max-sm:gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="flex items-start gap-3 cursor-pointer group max-w-lg">
                                        <div className="relative flex-shrink-0 w-5 h-5 border border-white/30 rounded mt-0.5 group-hover:border-white transition-colors">
                                            <input type="checkbox" required className="peer absolute opacity-0 w-full h-full cursor-pointer" />
                                            <div className="absolute inset-0 bg-white opacity-0 peer-checked:opacity-100 transition-opacity flex items-center justify-center">
                                                <Check className="w-3.5 h-3.5 text-brand-primary" />
                                            </div>
                                        </div>
                                        <span className="text-xs font-poppins text-white/70 leading-relaxed group-hover:text-white/90 transition-colors">
                                            We will add your info to our CRM for contacting you regarding your request. For more info please consult our privacy policy.
                                        </span>
                                    </label>
                                    {status.message && (
                                        <p className={`text-xs ${status.success ? 'text-green-400' : 'text-red-400'}`}>
                                            {status.message}
                                        </p>
                                    )}
                                </div>

                                <Button
                                    variant="secondary"
                                    className="max-sm:w-full"
                                    disabled={status.submitting}
                                >
                                    {status.submitting ? "Processing..." : "Subscribe"}
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
