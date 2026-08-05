"use client";

import { motion } from "framer-motion";
import Button from "./Button";
import { sendEmail } from "@/app/actions/email";
import { getFormTrackingPayload } from "@/lib/tracking";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function PromoSection() {
    const router = useRouter();

    return (
        <section className="relative py-20 overflow-x-clip overflow-hidden max-sm:py-12 w-full max-w-full">
            <div className="max-w-[1140px] mx-auto px-6 relative z-10 w-full min-w-0">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="bg-brand-light rounded-[30px] shadow-2xl overflow-hidden flex max-md:flex-col border border-gray-300 w-full min-w-0"
                >
                    {/* Left Side: Form */}
                    <div className="w-full md:w-1/2 p-12 max-md:w-full max-sm:p-8 bg-[#F8F9FA] min-w-0">
                        <div className="mb-8">
                            <h3 className="text-2xl font-syne font-medium text-brand-black mb-1 max-sm:text-[18px]">
                                Activate Your Coupon Now!
                            </h3>
                            <h2 className="text-3xl font-syne font-bold text-brand-black max-sm:text-[24px]">
                                Get Upto 50% Discount
                            </h2>
                        </div>

                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();
                                const form = e.currentTarget;
                                const formData = new FormData(form);
                                const data = {
                                    name: formData.get("name"),
                                    email: formData.get("email"),
                                    phone: formData.get("phone"),
                                    services: formData.get("services"),
                                    message: formData.get("description"),
                                    formType: "Promo Discount Form"
                                };

                                const submitBtn = form.querySelector('button');
                                if (submitBtn) submitBtn.disabled = true;

                                try {
                                    const result = await sendEmail({ ...data, ...getFormTrackingPayload() });
                                    if (result.success) {
                                        router.push("/thank-you");
                                    } else {
                                        alert("Failed to send. Please try again.");
                                    }
                                } catch (error) {
                                    alert("An error occurred.");
                                } finally {
                                    if (submitBtn) submitBtn.disabled = false;
                                }
                            }}
                            className="space-y-6"
                        >
                            <div>
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    placeholder="Name"
                                    className="w-full bg-transparent border-b border-gray-400 py-3 text-sm font-poppins focus:outline-none focus:border-brand-primary transition-colors placeholder:text-gray-500"
                                />
                            </div>
                            <div>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="Email"
                                    className="w-full bg-transparent border-b border-gray-400 py-3 text-sm font-poppins focus:outline-none focus:border-brand-primary transition-colors placeholder:text-gray-500"
                                />
                            </div>
                            <div>
                                <input
                                    name="phone"
                                    type="tel"
                                    required
                                    placeholder="Phone Number"
                                    className="w-full bg-transparent border-b border-gray-400 py-3 text-sm font-poppins focus:outline-none focus:border-brand-primary transition-colors placeholder:text-gray-500"
                                />
                            </div>
                            <div>
                                <input
                                    name="services"
                                    type="text"
                                    placeholder="Type of Services"
                                    className="w-full bg-transparent border-b border-gray-400 py-3 text-sm font-poppins focus:outline-none focus:border-brand-primary transition-colors placeholder:text-gray-500"
                                />
                            </div>
                            <div>
                                <input
                                    name="description"
                                    type="text"
                                    placeholder="Description"
                                    className="w-full bg-transparent border-b border-gray-400 py-3 text-sm font-poppins focus:outline-none focus:border-brand-primary transition-colors placeholder:text-gray-500"
                                />
                            </div>

                            <Button
                                variant="secondary"
                                className="w-full sm:w-auto"
                            >
                                Publish Worldwide
                            </Button>
                        </form>
                    </div>

                    {/* Right Side: Image */}
                    <div className="w-full md:w-1/2 relative bg-[#1A2E35] max-md:w-full min-h-[300px] min-w-0">
                        <Image
                            src="/popup-image.webp"
                            alt="Book cover"
                            className="w-full h-full object-cover filter drop-shadow-2xl brightness-110"
                            width={500}
                            height={300}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
