"use client"
import Image from "next/image";
import Button from "@/components/Button";
import { openZendeskChat } from "@/lib/zendesk";

export default function PromoBanner() {
    return (
        <section
            className="relative py-10 bg-cover bg-center overflow-hidden max-sm:py-12  overflow-x-hidden"
            style={{ backgroundImage: "url('/connect-with-us.webp')" }}
        >

            <div className="max-w-[1140px] mx-auto max-sm:px-4 px-6 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">

                {/* Left Book Mockup */}
                <div className="hidden lg:flex flex-1 justify-start">
                    <div className="relative w-[240px] aspect-2/3">
                        {/* Placeholder. Replace with 'New Girl In Town' cover */}
                        <Image
                            src="/book-landing-page-11.webp"
                            alt="Book Mockup"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>

                {/* Center Content */}
                <div className="flex-2 text-center max-w-[800px] mx-auto flex flex-col items-center py-8">
                    <h2 className="text-[40px] font-syne font-medium leading-[1.1] text-white mb-8 max-sm:text-[28px] max-sm:text-center">
                        Don’t Let A Great  <span className="text-brand-secondary font-shaded max-sm:text-[40px] text-[50px] font-[300]">Book Get Held</span> Back By A Weak Launch
                    </h2>
                    <p className="text-gray-200 font-poppins text-[16px] leading-relaxed mb-8 max-w-[700px] mx-auto">
                        A strong manuscript needs an equally strong presentation. Editing, design, formatting, and publishing setup all influence how readers perceive your book. We help you build a release that gives your work the attention it deserves.
                    </p>
                    {/* Buttons as requested */}
                    <div className="flex flex-wrap gap-4 pt-4">
                        <Button font="poppins" variant="secondary" className="max-sm:text-[14px] max-sm:px-4">
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

                {/* Right Book / Hand Mockup */}
                <div className="hidden lg:flex flex-1 justify-end">
                    <div className="relative w-[300px] aspect-square rotate-[-5deg]">
                        {/* Placeholder. Replace with the hand-held book image */}
                        <Image
                            src="/book-landing-page-10.webp"
                            alt="Hand holding book"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}
