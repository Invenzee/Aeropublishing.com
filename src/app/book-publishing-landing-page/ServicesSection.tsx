"use client"
import Image from "next/image";
import Button from "@/components/Button";
import { openZendeskChat } from "@/lib/zendesk";

export default function ServicesSection() {
    const services = [
        {
            num: "01.",
            title: "Manuscript Evaluation",
            desc: "We carefully review your manuscript to highlight strengths, identify gaps, and provide clear direction for improvement."
        },
        {
            num: "02.",
            title: "Quality Assurance",
            desc: "Our editing process ensures your book is free from grammatical errors, inconsistencies, and structural issues."
        },
        {
            num: "03.",
            title: "Book Cover Design",
            desc: "Our design team creates visually compelling covers that align with your genre and attract your target audience."
        },
        {
            num: "04.",
            title: "Interior Layout",
            desc: "We format your book for a seamless reading experience across print and digital platforms."
        },
        {
            num: "05.",
            title: "Distribution & Royalty Setup",
            desc: "We help set up your book across major platforms while ensuring you retain full ownership and control."
        },
        {
            num: "06.",
            title: "Ebook Creation And Distribution",
            desc: "Your book is converted into eBook formats and distributed globally for maximum reach."
        }
    ];

    return (
        <section className="w-full bg-white py-16 md:py-24">
            <div className="max-w-[1140px] mx-auto max-sm:px-4">

                {/* Header */}
                <div className="text-center max-w-4xl mx-auto mb-16">

                    <h2 className="text-[50px] text-brand-primary text-center font-syne font-bold leading-[1.1] max-sm:text-[32px] ">
                        <span className="text-brand-secondary font-shaded font-[300] text-[50px] max-sm:text-[36px]"> What</span>{" "}
                        Does Aero Publishing Services Consist Of?
                    </h2>
                    <p className="text-gray-700 w-2xl mx-auto font-poppins text-[15px]">
                        Our publishing services cover everything you need to transform your manuscript into a professionally published book.
                    </p>
                </div>

                {/* Main Content: Left Grid and Right Image */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* Left: Services Grid */}
                    <div className="lg:col-span-8 flex flex-col items-start">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mb-10 w-full">
                            {services.map((item, index) => (
                                <div key={index} className="flex flex-col">
                                    <span className="font-semibold text-brand-primary text-xl  font-syne mb-2">
                                        {item.num}
                                    </span>
                                    <div className="flex items-center gap-2 mb-3">
                                        <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="shrink-0 group-hover:scale-110 transition-transform">
                                            <circle cx="8" cy="8" r="7" stroke="#333" strokeWidth="1.5" />
                                            <circle cx="8" cy="8" r="3.5" fill="#333" />
                                        </svg>
                                        <h4 className="text-brand-secondary font-syne font-bold text-lg mb-4 leading-tight max-w-[80%] mx-auto">
                                            {item.title}
                                        </h4>
                                    </div>
                                    <p className="text-gray-600 text-[14px] leading-relaxed font-poppins pr-4">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Buttons as requested */}
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
                    </div>

                    {/* Right: Book Mockups Image */}
                    <div className="lg:col-span-4 relative flex justify-center lg:justify-end w-full">
                        <div className="relative w-full max-w-[400px] aspect-3/4">
                            {/* Using placeholder. Update to the Schizophrenia book image later */}
                            <Image
                                src="/book-landing-page-7.webp"
                                alt="Book Publishing Services"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
