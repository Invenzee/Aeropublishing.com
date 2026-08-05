"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { FaQuoteRight } from "react-icons/fa";

// Sample data for testimonials
const testimonials = [
    {
        id: 1,
        name: "Jodi Picoult",
        quote: "You can always edit a bad page. You can’t edit a blank page.",
        details: "This includes professional editing, cover design, formatting, and distribution strategies tailored to your genre.",
        authorImage: "/quote-1.webp",
        mainImage: "/why-aero-book.webp"
    },
    {
        id: 2,
        name: "Toni Morrison",
        quote: "If there’s a book that you want to read, but it hasn’t been written yet, then you must write it.",
        details: "Our team of experts will guide you through every step of the publishing process, ensuring your book reaches its full potential.",
        authorImage: "/quote-2.webp",
        mainImage: "/why-aero-book.webp"
    },
    {
        id: 3,
        name: "Jodi Picoult",
        quote: "The scariest moment is always just before you start.",
        details: "We provide comprehensive marketing plans to get your book in front of the right readers and maximize your sales.",
        authorImage: "/quote-3.webp",
        mainImage: "/why-aero-book.webp"
    }
];

export default function TestimonialsSection() {
    const [activeId, setActiveId] = useState(testimonials[0].id);

    const activeTestimonial = testimonials.find((t) => t.id === activeId) || testimonials[0];

    return (
        <section className="relative py-20 bg-brand-light overflow-hidden max-sm:py-12  overflow-x-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white via-transparent to-[#D4E9F7] opacity-50 pointer-events-none" />

            <div className="max-w-[1140px] mx-auto px-6 relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-center mb-16"
                >
                    <p className="text-md font-poppins text-brand-primary font-semibold tracking-wider uppercase mb-2">
                        Did you know                    </p>
                    <h2 className="text-[40px] font-syne font-[500] leading-[1.1] text-brand-primary max-sm:text-[32px]">
                        Why Most Books
                        <span className="text-brand-secondary text-[46px] font-shaded font-[400] max-sm:text-[36px]"> Never Reach</span><br />
                        Readers <span className="font-[700]"> And How We Change That</span>
                    </h2>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start mb-16">

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        className="relative lg:w-1/2 w-full min-w-0 flex justify-center lg:justify-end lg:pr-8"
                    >
                        <div className="absolute top-0 right-8 lg:right-24 w-[90%] h-[90%] bg-brand-secondary rounded-2xl -z-10 translate-y-[-1rem] shadow-lg max-w-[500px]" />

                        <div className="relative w-full max-w-[500px] aspect-[6/5] rounded-2xl overflow-hidden shadow-2xl z-10">
                            <Image
                                src={activeTestimonial.mainImage}
                                alt="Books stack"
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 768px) 400px, 500px"
                                quality={80}
                            />
                        </div>
                    </motion.div>

                    {/* Right Side: Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                        className="lg:w-1/2 w-full min-w-0 space-y-8 pl-0 lg:pl-4 mb-14"
                    >
                        <div className="flex items-center gap-4 max-sm:flex-col max-sm:items-start">
                            <div className="rounded-2xl z-20 bg-white p-4 border border-gray-300 relative max-w-[250px]">
                                <p className="text-sm font-syne text-brand-black">
                                    Helping  <span className="text-brand-secondary font-shaded !text-lg">Authors</span> Turn Manuscripts Into Published Books
                                </p>
                            </div>

                            {/* Author Profile Image */}
                            <div className="relative">
                                <div className="w-32 h-40 rounded-lg overflow-hidden border-2 border-white shadow-md">
                                    <Image src='/testimonial.webp' alt='Testimonial author' fill className="object-cover" loading="lazy" />
                                </div>
                                <div className="absolute -top-2 -right-2 text-brand-secondary bg-white leading-[1] text-xl p-2 rounded-sm font-serif">
                                    <FaQuoteRight />
                                </div>
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeId}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.4 }}
                            >
                                <p className="text-sm font-poppins text-brand-gray leading-relaxed mb-4">
                                Many great books never reach readers—not because the ideas aren’t powerful, but because the publishing process can be complex and overwhelming. Editing, formatting, design, and distribution often become barriers that stop authors before their work is ever seen.
                                </p>
                                <p className="text-sm font-poppins text-brand-gray leading-relaxed">
                                At Aero Publishing, we simplify the journey. From professional editing to wide distribution, we help authors transform their manuscripts into professionally published books that reach readers across the U.S. and beyond.
                                </p>
                            </motion.div>
                        </AnimatePresence>

                    </motion.div>
                </div>

                {/* Bottom Carousel / Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-20 z-[9999] relative">
                    {testimonials.map((testimonial) => (
                        <motion.div
                            key={testimonial.id}
                            onClick={() => setActiveId(testimonial.id)}
                            whileHover={{ y: -5 }}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5, delay: 0.6 + (testimonial.id * 0.1) }}
                            className={`bg-white rounded-2xl p-8 border-2 cursor-pointer transition-all duration-300 flex flex-col items-center text-center shadow-lg relative group overflow-hidden
                        ${activeId === testimonial.id ? "border-brand-primary ring-1 ring-brand-primary" : "border-[#D4E9F7]"}
                    `}
                        >
                            <p className="text-sm font-poppins text-brand-gray mb-6 leading-relaxed italic relative z-10">
                                "{testimonial.quote}"
                            </p>

                            <div className="mt-auto flex flex-col items-center gap-2 relative z-10">
                                <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200">
                                    <Image src={testimonial.authorImage} alt={testimonial.name} width={48} height={48} className="object-cover" loading="lazy" quality={75} />
                                </div>
                                <span className="font-syne font-bold text-brand-primary text-sm">
                                    {testimonial.name}
                                </span>
                            </div>

                            {/* Hover Gradient Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-b from-transparent to-brand-light/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}