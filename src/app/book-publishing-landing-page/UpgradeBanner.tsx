"use client"
import Image from "next/image";
import Button from "@/components/Button";
import { openZendeskChat } from "@/lib/zendesk";

export default function UpgradeBanner() {
    return (
        <section
            className="relative py-10 bg-cover bg-center overflow-hidden max-sm:py-12  overflow-x-hidden"
            style={{ backgroundImage: "url('/connect-with-us.webp')" }}
        >
            <div className="max-w-[1140px] mx-auto max-sm:px-4 px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">
                {/* Left Content */}
                <div className="w-full md:w-[60%] flex flex-col items-start">

                    <h2 className="text-[40px] font-syne font-medium leading-[1.1] text-white mb-8 max-sm:text-[28px] max-sm:text-center">
                        Let’s Upgrade Your Book From “Finished” To <span className="text-brand-secondary font-shaded max-sm:text-[40px] text-[50px] font-[300] mt-4"> “Publish-Ready”</span>
                    </h2>

                    <p className="text-gray-200 font-poppins text-[16px] leading-relaxed mb-8 max-w-[650px]">
                        You’ve written your book — now it’s time to prepare it for readers. With the right editing, design, and publishing setup, your work becomes something readers trust and value.
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

                {/* Right Books Image */}
                <div className="w-full md:w-[40%] flex justify-center md:justify-end">
                    <div className="relative w-full max-w-[320px] aspect-3/4 transform rotate-2">
                        {/* Placeholder. Update to the 'Between Love and Loathing' composite book image later */}
                        <Image
                            src="/book-landing-page-9.webp"
                            alt="Publish Ready Books"
                            fill
                            className="object-contain drop-shadow-2xl"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}
