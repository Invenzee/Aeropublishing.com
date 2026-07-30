"use client"
import Image from "next/image";
import Button from "@/components/Button";

export default function JourneySection() {
    return (
        <section className="w-full bg-[#f4f4f4] relative pt-0 pb-16 md:pb-24">
            <div className="max-w-[1140px] mx-auto max-sm:px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Book Mockup overlapping the section above */}
                    <div className="relative w-full flex justify-center lg:justify-start lg:-mt-32 z-20">
                        {/* We use an existing book image as a placeholder. The user can swap to the exact "History's Unsolved Mysteries" if needed. */}
                        <div className="relative w-full max-w-[800px] aspect-4/3">
                            <Image
                                src="/book-landing-page-hero.webp"
                                alt="Book Publishing Journey"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>

                    {/* Right: Text Content */}
                    <div className="space-y-6 lg:pl-4 z-10 pt-16 lg:pt-0">
                        <h2 className="text-4xl md:text-[40px] leading-[1.1] font-syne font-semibold text-brand-primary ">
                            Are You Ready To Take Your {" "}
                            <span className="text-brand-secondary font-shaded font-[300] text-[44px] md:text-[46px] ">
                                Publishing Journey
                            </span> {" "}
                            <br className="max-sm:hidden" />
                            To The Next Level?

                        </h2>

                        <p className="text-gray-600 font-poppins text-[17px] leading-relaxed max-w-xl">
                            Join Aero Publishing and take the next step toward becoming a published author. We guide you through every stage with clarity and confidence.
                        </p>

                        {/* Buttons as requested */}
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
                </div>
            </div>
        </section>
    );
}
