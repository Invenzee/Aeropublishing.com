"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const reviews = [
    {
        id: 1,
        name: "Clifton Goodson",
        country: "US",
        rating: 5,
        date: "Feb 28, 2026",
        title: "My interaction with Aero Publishing was…",
        text: "My interaction with Aero Publishing was excellent. the staff was really helpful, and their service was seamless and professional. overall, I'm rather happy with the experience!",
        avatar: "/review-2.webp",
        width: "w-[420px] max-sm:w-[300px]"
    },
        {
        id: 2,
        name: "Piku Jergy",
        country: "US",
        rating: 5,
        date: "6 days ago",
        title: "I had a new and wonderful experience...",
        text: "I had a new and wonderful experience with Aero Publishing. the group produced high-caliber work on schedule and with professionalism and assistance. I truly value their commitment and service, and communication was clear. strongly advised. ",
        avatar: "/review-1.webp",
        width: "w-[420px] max-sm:w-[300px]"
    },
    {
        id: 3,
        name: "Kathleen Daniel",
        country: "US",
        rating: 5,
        date: "Feb 20, 2026",
        title: "Fantastic encounter with Aero…",
        text: "Fantastic encounter with Aero Publishing. Excellent service, a seamless process, and a really professional team. extremely happy and very impressive!",
        avatar: "/review-3.webp",
        width: "w-[420px] max-sm:w-[300px]"
    },
    {
        id: 4,
        name: "Betty Martinez",
        country: "US",
        rating: 5,
        date: "Feb 13, 2026",
        title: "My interaction with Aero Publishing was…",
        text: "My interaction with Aero Publishing was excellent throughout the process, their team demonstrated professionalism, assistance, and responsiveness. everything went smoothly and on schedule and the service quality was outstanding. I am truly pleased with the outcome and am quite pleased with their service. strongly advised.",
        avatar: "/review-4.webp",        
        width: "w-[420px] max-sm:w-[300px]"
    },
    {
        id: 5,
        name: "Roma Gagne",
        country: "US",
        rating: 5,
        date: "Jul 18, 2025",
        title: "After months of poor sales",
        text: "After months of poor sales, Aero Publishing marketing turned everything around. My book is now consistently ranking in its category.",
        avatar: "/review-5.webp",
        width: "w-[420px] max-sm:w-[300px]"
    },
    {
        id: 6,
        name: "Stella Bell",
        country: "US",
        rating: 5,
        date: "Jun 24, 2025",
        title: "I appreciated Aero Publishing attention…",
        text: "I appreciated Aero Publishing attention to detail and quick responses. Their editing improved my manuscript’s quality significantly.",
        avatar: "/review-6.webp",        
        width: "w-[420px] max-sm:w-[300px]"
    },
    {
        id: 7,
        name: "Isaac Stewart",
        country: "US",
        rating: 5,
        date: "Jun 24, 2025",
        title: "Aero Publishing helped me polish my…",
        text: "Aero Publishing helped me polish my paper and understand journal submission better. Their support reduced my stress and improved my chances of acceptance.",
        avatar: "/review-7.webp",        
        width: "w-[420px] max-sm:w-[300px]"
    },
    {
        id: 8,
        name: "Ahmed Schmeler",
        country: "US",
        rating: 5,
        date: "Jun 4, 2025",
        title: "I couldn't believe the difference once…",
        text: "I couldn't believe the difference once Aero Publishing got involved. Their book marketing services not only increased visibility but also amplified it. Sales increased significantly, as did engagement on my social media and Amazon pages.",
        avatar: "/review-8.webp",        
        width: "w-[420px] max-sm:w-[300px]"
    }
];

// Duplicate reviews to fill rows for seamless scrolling
const row1 = [...reviews, ...reviews, ...reviews];
const row2 = [...reviews].reverse().concat([...reviews].reverse());
const row3 = [...reviews, ...reviews, ...reviews];

export default function AuthorsShowcaseSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const row1Ref = useRef<HTMLDivElement>(null);
    const row2Ref = useRef<HTMLDivElement>(null);
    const row3Ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Row 1 & 3 move LEFT (negative X)
            gsap.to(row1Ref.current, {
                x: -500,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                }
            });

            gsap.to(row3Ref.current, {
                x: -600,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5,
                }
            });

            // Row 2 moves RIGHT (positive X) - start form left to allow movement
            gsap.fromTo(row2Ref.current,
                { x: -500 },
                {
                    x: 100,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1.2,
                    }
                }
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="relative py-20 bg-brand-light overflow-hidden">
            {/* Header */}
            <div className="text-center mb-16 relative z-10 px-6">
                <h2 className="text-[50px] font-syne font-[400] leading-[1.1] text-brand-primary max-sm:text-[32px]">
                    Authors Around the World Trust <br />
                    <span className="text-brand-secondary font-shaded font-[400] text-[50px] max-sm:text-[36px]"> Aero Publishing </span>
                    <span className="font-bold">With Their Books</span>
                </h2>
                <p className="text-black text-center font-poppins text-sm leading-relaxed max-w-4xl max-sm:text-[14px] mx-auto mt-4">
                Authors trust Aero Publishing for clear, professional publishing support—helping books reach readers in the U.S. and worldwide.
                </p>
            </div>

            {/* Scroll Container */}
            <div ref={containerRef} className="flex flex-col gap-6 relative pb-10">

                {/* Left Gradient Overlay - using brand-light color #F3F3F3 */}
                <div className="absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-[#F3F3F3] to-transparent z-20 pointer-events-none" />
                {/* Right Gradient Overlay */}
                <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-[#F3F3F3] to-transparent z-20 pointer-events-none" />


                {/* Row 1 */}
                <div ref={row1Ref} className="flex items-start gap-6 w-max pl-10">
                    {row1.map((item, i) => (
                        <ReviewCard key={`r1-${i}`} item={item} />
                    ))}
                </div>

                {/* Row 2 */}
                <div ref={row2Ref} className="flex items-start gap-6 w-max -ml-[500px]">
                    {row2.map((item, i) => (
                        <ReviewCard key={`r2-${i}`} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
                <svg
                    key={i}
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill={i < rating ? "#E96659" : "#E5E7EB"}
                >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            ))}
        </div>
    );
}

function getInitials(name: string): string {
    const words = name.trim().split(' ');
    if (words.length === 1) {
        return words[0].substring(0, 2).toUpperCase();
    }
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

function ReviewCard({ item }: { item: any }) {
    const hasAvatar = item.avatar && item.avatar.trim() !== '' && !item.avatar.includes('testimonial.webp');
    
    return (
        <div className={`bg-white p-5 max-sm:p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col gap-3 shrink-0 transition-all hover:shadow-md min-h-[320px] max-sm:min-h-auto ${item.width}`}>
            {/* Header: Avatar, Name, Review Count, Country */}
            <div className="flex items-center gap-3">
                <div 
                    className="w-10 h-10 rounded-full overflow-hidden shrink-0 flex items-center justify-center text-white font-syne font-bold text-sm"
                    style={{ backgroundColor: hasAvatar ? 'transparent' : '#E96659' }}
                >
                    {hasAvatar ? (
                        <Image src={item.avatar} alt={item.name} width={40} height={40} className="object-cover" loading="lazy" quality={75} />
                    ) : (
                        getInitials(item.name)
                    )}
                </div>
                <div className="flex flex-col">
                    <span className="font-syne font-bold text-sm text-brand-primary">{item.name}</span>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                <path d="M12 2v20" />
                            </svg>
                            {item.country}
                        </span>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100" />

            {/* Rating and Date Row */}
            <div className="flex items-center justify-between">
                <StarRating rating={item.rating} />
                <span className="text-xs text-gray-400 font-poppins">{item.date}</span>
            </div>

            {/* Review Title */}
            <h4 className="font-syne font-bold text-sm text-brand-primary leading-tight">
                {item.title}
            </h4>

            {/* Review Text */}
            <p className="text-[13px] font-poppins text-gray-600 leading-relaxed max-sm:text-[12px]">
                {item.text}
            </p>
        </div>
    )
}
