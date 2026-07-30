"use client"
import Image from "next/image";
import Button from "@/components/Button";

export default function WhyChooseFrontline() {
    const listItems = [
        {
            title: "Focused Commitment:",
            desc: "Your book is treated with attention and care at every stage."
        },
        {
            title: "End-to-End Support:",
            desc: "Editing, design, and publishing handled in one place."
        },
        {
            title: "Quality Specialists:",
            desc: "Experienced professionals working on every detail."
        },
        {
            title: "Author-First Workflow:",
            desc: "You stay informed without feeling overwhelmed."
        },
        {
            title: "Results That Show:",
            desc: "Clean, credible publishing that builds reader trust."
        }
    ];

    return (
        <section className="w-full bg-white py-20 md:py-10">
            <div className="max-w-[1140px] mx-auto max-sm:px-4">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* Left Images Collage */}
                    <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end mb-16 lg:mb-0">
                        {/* Main background image of the book flatlay */}
                        <div className="relative w-full max-w-[480px] aspect-4/5 lg:mr-10">
                            <Image
                                src="/book-landing-page-12.webp" // placeholder for "Shadow's Mystery" book flatlay
                                alt="Book publishing process"
                                fill
                                className="object-cover"
                            />

                            {/* Overlapping bottom left image with green border effect */}
                            <div className="absolute -bottom-16 -left-4 md:-left-12 w-[70%] aspect-4/3 bg-[#21432c] p-2 shadow-2xl z-10">
                                <div className="relative w-full h-full">
                                    <Image
                                        src="/blog-2.webp" // placeholder for hands writing flatlay
                                        alt="Writing process"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="w-full lg:w-1/2 flex flex-col items-start z-20">

                        <h2 className="text-[40px] font-syne font-medium leading-[1.1] text-brand-primary mb-8 max-sm:text-[28px] max-sm:text-center">
                            Why Authors Choose  <span className="text-brand-secondary font-shaded max-sm:text-[40px] text-[50px] font-[300]">Aero Publishing</span>

                        </h2>

                        <p className="text-gray-700 font-poppins text-[16px] leading-relaxed mb-8 max-w-xl">
                            We combine publishing expertise with a clear and structured process. From manuscript refinement to final production, our focus is on delivering a book that feels professional and ready for real readers.
                        </p>

                        <ul className="space-y-4 mb-10 text-gray-800 font-poppins text-[15px] leading-relaxed">
                            {listItems.map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-800 shrink-0 mt-[10px]"></span>
                                    <p className="text-sm">
                                        <span className="font-bold text-gray-900">{item.title}</span> {item.desc}
                                    </p>
                                </li>
                            ))}
                        </ul>

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
