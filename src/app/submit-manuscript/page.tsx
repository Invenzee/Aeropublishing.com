import type { Metadata } from "next";
import ManuscriptForm from "@/components/SubmitManuscript/ManuscriptForm";

export const metadata: Metadata = {
    title: "Submit Your Manuscript – Aero Publishing",
    description:
        "Submit your manuscript to Aero Publishing. Share your author details, address, book information, and upload your file. Our team will review your work and follow up by email.",
};

export default function SubmitManuscriptPage() {
    return (
        <main className="min-h-screen bg-[#FBFBFD] overflow-x-clip">
            <section className="relative pt-[140px] sm:pt-[160px] pb-10 sm:pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/hero-bg.webp')] bg-cover bg-center opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/70 to-[#FBFBFD]" />
                <div className="absolute top-24 -left-16 w-64 h-64 bg-brand-primary/8 rounded-full blur-3xl" />
                <div className="absolute top-40 right-0 w-72 h-72 bg-brand-secondary/8 rounded-full blur-3xl" />

                <div className="relative max-w-[1140px] mx-auto px-5 sm:px-6 text-center">
                    <p className="text-[11px] sm:text-xs tracking-[0.22em] uppercase font-poppins font-semibold text-brand-secondary mb-4">
                        Author submissions
                    </p>
                    <h1 className="text-[36px] sm:text-[52px] lg:text-[60px] font-syne font-semibold leading-[1.1] text-brand-primary">
                        Submit Your{" "}
                        <span className="font-shaded font-light text-brand-secondary text-[42px] sm:text-[60px] lg:text-[68px]">
                            Manuscript
                        </span>
                    </h1>
                    <p className="mt-4 sm:mt-5 max-w-2xl mx-auto text-sm sm:text-base font-poppins text-gray-600 leading-relaxed">
                        Share your details, tell us about your book, and upload your manuscript. Our publishing team will review your work in confidence and send you a confirmation as soon as it arrives.
                    </p>
                </div>
            </section>

            <ManuscriptForm />
        </main>
    );
}
