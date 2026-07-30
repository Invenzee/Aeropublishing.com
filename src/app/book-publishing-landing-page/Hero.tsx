"use client";

import { useState } from "react";
import Button from "@/components/Button";
import { sendEmail } from "@/app/actions/email";
import { getFormTrackingPayload } from "@/lib/tracking";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Hero() {
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

        // Collect checked services
        const serviceKeys = ["selfPublishing", "editing", "coverDesign", "printing", "interiorFormatting", "illustration"];
        const selectedServices = serviceKeys.filter(key => formData.get(key) === "on").join(", ");

        const data = {
            name: formData.get("name") as string,
            phone: formData.get("phone") as string,
            email: formData.get("email") as string,
            message: `Manuscript Ready: ${formData.get("manuscriptReady")}, Published Before: ${formData.get("publishedBefore")}, Book Type: ${formData.get("bookType")}, Services: ${selectedServices}`,
            formType: "Book Publishing Landing Page Form"
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
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[url('/hero-bg.webp')] bg-cover bg-center">
            <div className="max-w-[1240px] mx-auto max-sm:px-4 py-12 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Column: Content */}
                    <div className="space-y-8">
                        <h1 className="text-[60px] font-syne font-semibold leading-[1.1] text-brand-primary max-sm:text-[40px]">
                            Premium Publishing Services
                        </h1>

                        <p className="text-black font-poppins text-base leading-relaxed max-w-xl">
                            OurYour story deserves more than just publication — it deserves to be presented the right way. At Aero Publishing, we combine your ideas with professional expertise into a polished, publish-ready book.
                        </p>

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
                    </div>

                    {/* Right Column: Form */}
                    <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md ml-auto">
                        <h2 className="text-3xl font-syne font-bold text-[#3F3774] mb-6">
                            Start Your Publishing Journey
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Dropdown Fields */}
                            <select
                                name="manuscriptReady"
                                className="w-full h-12 px-4 bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#0099FF] focus:ring-1 focus:ring-[#0099FF] transition-all font-poppins text-sm"
                                required
                            >
                                <option value="">Do you have a manuscript ready?</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>

                            <select
                                name="publishedBefore"
                                className="w-full h-12 px-4 bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#0099FF] focus:ring-1 focus:ring-[#0099FF] transition-all font-poppins text-sm"
                                required
                            >
                                <option value="">Have you published before?</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>

                            <select
                                name="bookType"
                                className="w-full h-12 px-4 bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#0099FF] focus:ring-1 focus:ring-[#0099FF] transition-all font-poppins text-sm"
                                required
                            >
                                <option value="">What type of book do you plan on publishing?</option>
                                <option value="fiction">Fiction</option>
                                <option value="non-fiction">Non-Fiction</option>
                                <option value="children">Children's Book</option>
                                <option value="memoir">Memoir/Biography</option>
                                <option value="other">Other</option>
                            </select>

                            {/* Services Checkboxes */}
                            <div className="pt-2">
                                <label className="block text-sm font-semibold text-gray-800 mb-3">
                                    What Services Are You Looking For?
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { name: "selfPublishing", label: "Self Publishing" },
                                        { name: "editing", label: "Editing" },
                                        { name: "coverDesign", label: "Cover Design" },
                                        { name: "printing", label: "Printing" },
                                        { name: "interiorFormatting", label: "Interior Formatting" },
                                        { name: "illustration", label: "Illustration" },
                                    ].map((service) => (
                                        <label key={service.name} className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name={service.name}
                                                className="w-4 h-4 text-[#0099FF] border-gray-300 rounded focus:ring-[#0099FF]"
                                            />
                                            <span className="text-sm text-gray-700">{service.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Name and Phone */}
                            <div className="grid grid-cols-2 gap-3">
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    placeholder="Name:"
                                    className="w-full h-12 px-4 bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#0099FF] focus:ring-1 focus:ring-[#0099FF] transition-all font-poppins text-sm"
                                />
                                <div className="flex">
                                    <span className="inline-flex items-center px-3 h-12 bg-gray-50 border border-r-0 border-gray-200 text-gray-500 text-sm">
                                        {/* <Image src="https://flagcdn.com/w40/us.png" alt="US Flag" className="h-4 w-6 object-cover mr-2" width={20} height={12} /> */}
                                        +1
                                    </span>
                                    <input
                                        name="phone"
                                        type="tel"
                                        required
                                        placeholder="201-555-0123"
                                        className="w-full h-12 px-4 bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#0099FF] focus:ring-1 focus:ring-[#0099FF] transition-all font-poppins text-sm"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <input
                                name="email"
                                type="email"
                                required
                                placeholder="Email:"
                                className="w-full h-12 px-4 bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#0099FF] focus:ring-1 focus:ring-[#0099FF] transition-all font-poppins text-sm"
                            />

                            {/* Terms Agreement */}
                            <label className="flex items-start space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    required
                                    className="w-4 h-4 text-[#0099FF] border-gray-300 rounded focus:ring-[#0099FF] mt-0.5"
                                />
                                <span className="text-xs text-gray-600">
                                    By Submitting you agree to our{" "}
                                    <a href="/terms-and-conditions" className="text-[#0099FF] hover:underline">
                                        Terms Of Service
                                    </a>{" "}
                                    and{" "}
                                    <a href="/privacy-policy" className="text-[#0099FF] hover:underline">
                                        Privacy Policy
                                    </a>
                                </span>
                            </label>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={status.submitting}
                                className="w-full h-14 bg-[#FE695B] hover:bg-[#3F3774] text-white font-syne font-semibold rounded transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status.submitting ? "Submitting..." : "Submit"}
                            </button>

                            {status.message && (
                                <p className={`text-center text-sm ${status.success ? 'text-green-600' : 'text-red-600'}`}>
                                    {status.message}
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
