"use client";

import Image from "next/image";
import { useRef } from "react";
import Reveal from "./Reveal";

const books = [
  "/cookbook/lp/book-4.webp",
  "/cookbook/lp/book-1.webp",
  "/cookbook/lp/book-2.webp",
  "/cookbook/lp/book-3.webp",
  "/cookbook/lp/book-3.webp",
];

export default function CookbookOccasions() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: -1 | 1) => {
    scrollerRef.current?.scrollBy({
      left: dir * 280,
      behavior: "smooth",
    });
  };

  return (
    <section className="overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-4">
        <Reveal>
          <h2 className="mx-auto max-w-[820px] text-center font-syne text-[32px] font-semibold leading-[1.15] tracking-[-0.02em] text-[#89021a] sm:text-[48px] lg:text-[60px]">
            A cookbook <span className="text-[#f14814]">for every</span>
            <br />
            <span className="text-[#f14814]">occasion</span>
          </h2>

          <p className="mx-auto mt-4 max-w-[820px] text-center font-poppins text-[14px] leading-[1.7] text-black">
            Whether you need a gift for family and friends, a showcase for your
            culinary business, a fundraising cookbook for your organization, or a
            corporate team building project, Aero Publishing has a flexible
            cookbook publishing program for every occasion.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="relative mt-12 flex items-center gap-3 sm:gap-6">
          <button
            type="button"
            aria-label="Previous cookbooks"
            onClick={() => scrollBy(-1)}
            className="hidden shrink-0 transition-transform duration-300 hover:scale-105 sm:block"
          >
            <Image
              src="/cookbook/lp/arrow-left.svg"
              alt=""
              width={49}
              height={95}
              className="h-[48px] w-auto opacity-70 transition-opacity hover:opacity-100"
            />
          </button>

          <div
            ref={scrollerRef}
            className="flex flex-1 snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-6 [&::-webkit-scrollbar]:hidden"
          >
            {books.map((src, i) => (
              <div
                key={`${src}-${i}`}
                className="relative aspect-square w-[min(70vw,200px)] shrink-0 snap-center overflow-hidden transition-transform duration-300 hover:scale-[1.02] sm:w-[180px] lg:w-[200px]"
              >
                <Image
                  src={src}
                  alt={`Aero Publishing cookbook cover sample ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            aria-label="Next cookbooks"
            onClick={() => scrollBy(1)}
            className="hidden shrink-0 transition-transform duration-300 hover:scale-105 sm:block"
          >
            <Image
              src="/cookbook/lp/arrow-right.svg"
              alt=""
              width={49}
              height={95}
              className="h-[48px] w-auto opacity-70 transition-opacity hover:opacity-100"
            />
          </button>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-6 max-w-[720px] text-center font-poppins text-[14px] leading-[1.7] text-black">
            With professionally designed templates, high quality paper, and six
            binding options, Aero Publishing cookbooks look beautiful and are
            made to last.
          </p>

          <div className="mt-6 flex justify-center">
            <a
              href="#hire-form"
              className="inline-flex h-10 items-center justify-center rounded-full bg-[#89021a] px-6 font-syne text-[15px] font-semibold capitalize text-white transition-all duration-300 hover:opacity-90 hover:brightness-110 active:scale-[0.98]"
            >
              Get Free Consultation
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
