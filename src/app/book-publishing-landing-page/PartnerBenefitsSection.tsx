"use client"
import Button from "@/components/Button";
import { openZendeskChat } from "@/lib/zendesk";
import Image from "next/image";

export default function PartnerBenefitsSection() {
    const listItems = [
        {
            title: "High Standards At Every Step",
            desc: "From editing to layout, we focus on the details that shape reader experience and credibility."
        },
        {
            title: "Strategy Built Around Your Goals",
            desc: "Your publishing journey is tailored to your timeline, audience, and long-term vision."
        },
        {
            title: "Experienced Publishing Support",
            desc: "Our team brings practical expertise across editing, design, and publishing execution."
        }
    ];

    return (
        <section className="w-full bg-[#f1f1f1] py-20 md:py-28 overflow-hidden">
            <div className="max-w-[1140px] mx-auto max-sm:px-4">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

                    {/* Left Content */}
                    <div className="w-full lg:w-1/2 flex flex-col items-start z-20">

                        <h2 className="text-[50px] mb-4 font-syne font-medium leading-[1.1] text-brand-primary max-sm:text-[32px]">
                            
                            What You Get When You <span className=" text-brand-secondary font-shaded font-[400] s"> Partner </span><span className="font-bold">With Us</span>
                        </h2>

                        <p className="text-gray-700 font-poppins text-[15.5px] leading-relaxed mb-12 max-w-[600px]">
                            We make publishing simple, structured, and results-driven. Our goal is to ensure your book is not only completed — but ready to perform in the real market.
                        </p>

                        <div className="space-y-8">
                            {listItems.map((item, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <div className="mt-1 shrink-0">
                                        {/* Circular Checkmark Icon matching the design */}
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="12" cy="12" r="10.5" stroke="#222" strokeWidth="1.5" />
                                            <path d="M7 12L10.5 15.5L17 8" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <div className="pl-1">
                                        <h4 className="font-syne font-bold text-gray-900 text-[18px] leading-tight mb-2">
                                            {item.title}
                                        </h4>
                                        <p className="text-gray-600 font-poppins text-[15px] leading-relaxed max-w-[550px]">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Mockup Collage */}
                    <div className="w-full lg:w-1/2 relative flex justify-center py-10 lg:py-0">
                        {/* Dark circular background */}
                        <div className="relative w-full max-w-[450px] aspect-square rounded-full  flex items-center justify-center">
                            {/* Tilted Book */}
                            <div className="absolute w-[75%] h-[115%] transform -rotate-12 hover:-translate-y-2 transition-transform duration-500 ease-in-out cursor-pointer z-10">
                                <Image
                                    src="/book-landing-page-4.webp" // placeholder for "Descent Into The Void"
                                    alt="Book Mockup"
                                    fill
                                    className="object-contain drop-shadow-2xl"
                                />
                            </div>
                        </div>
                    </div>


                </div>
                {/* Buttons as requested */}
                <div className="flex flex-wrap gap-4 pt-4 mt-10">
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
        </section>
    );
}
