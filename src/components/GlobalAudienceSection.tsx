"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Swiper as SwiperType } from 'swiper';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/navigation';

export default function GlobalAudienceSection() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

   const books = [
        {
            id: 1,
            image: "/book-landing-page-11.webp",
            title: "Book 1"
        },
        {
            id: 2,
            image: "/book-landing-page-4.webp",
            title: "Book 2"
        },
        {
            id: 3,
            image: "/book-landing-page-5.webp",
            title: "Book 3"
        },
        {
            id: 4,
            image: "/book-landing-page-6.webp",
            title: "Book 4"
        },
        {
            id: 5,
            image: "/book-landing-page-7.webp",
            title: "Book 5"
        },
        {
            id: 6,
            image: "/book-landing-page-8.webp",
            title: "Book 6"
        },
        {
            id: 7,
            image: "/book-landing-page-9.webp",
            title: "Book 7"
        },
        {
            id: 8,
            image: "/book-landing-page-10.webp",
            title: "Book 8"
        }
    ];

    return (
        <section className="relative py-20 max-sm:py-12 bg-[url('/carousel-bg.webp')] bg-contain bg-right bg-no-repeat  overflow-x-hidden">

            <div ref={containerRef} className="max-w-[1140px] mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-center mb-16 max-sm:mb-10"
                >
                    <h2 className="text-[50px] font-syne font-bold leading-[1.1] max-sm:text-[32px]">
                        <span className="text-brand-primary font-[500]">Your Book </span>
                        <span className="text-brand-secondary font-shaded font-[300] text-[50px] max-sm:text-[36px]">Deserves</span>
                        <span className="text-brand-primary font-[500]"> a</span>
                        <br />
                        <span className="text-brand-primary">Global Audience</span>
                    </h2>
                </motion.div>

                {/* Carousel Container */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="relative"
                >
                    {/* Previous Button */}
                    <button
                        onClick={() => swiperInstance?.slidePrev()}
                        className="absolute -left-16 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center hover:bg-brand-secondary transition-all duration-300 hover:scale-110 max-sm:w-10 max-sm:h-10 max-sm:-translate-x-2 cursor-pointer"
                        aria-label="Previous books"
                    >
                        <ChevronLeft className="w-6 h-6 text-white max-sm:w-5 max-sm:h-5" />
                    </button>

                    {/* Swiper Carousel */}
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={32}
                        slidesPerView={4}
                        loop={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        speed={600}
                        onSwiper={setSwiperInstance}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 24,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 32,
                            },
                        }}
                        className="!py-4"
                    >
                        {books.map((book, index) => (
                            <SwiperSlide key={book.id}>
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                        ease: "easeOut"
                                    }}
                                    whileHover={{
                                        y: -10,
                                        transition: { duration: 0.3 }
                                    }}
                                    className="flex justify-center"
                                >
                                    <div className="relative w-full max-w-[200px] aspect-[2/3] rounded-lg overflow-hidden mx-auto">
                                        <Image
                                            src={book.image}
                                            alt={book.title}
                                            fill
                                            className="object-cover"
                                            loading="lazy"
                                            sizes="(max-width: 640px) 300px, (max-width: 1024px) 250px, 300px"
                                            quality={75}
                                        />
                                    </div>
                                </motion.div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Next Button */}
                    <button
                        onClick={() => swiperInstance?.slideNext()}
                        className="absolute -right-16 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center hover:bg-brand-secondary transition-all duration-300 hover:scale-110 max-sm:w-10 max-sm:h-10 max-sm:translate-x-2 cursor-pointer"
                        aria-label="Next books"
                    >
                        <ChevronRight className="w-6 h-6 text-white max-sm:w-5 max-sm:h-5" />
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
