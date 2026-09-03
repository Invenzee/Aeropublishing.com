"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import CookbookLogo from "./CookbookLogo";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Pricing", href: "#pricing" },
  { name: "Blog", href: "/blog" },
  { name: "Contact Us", href: "#contact" },
];

export default function CookbookHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-[64px] max-w-[1140px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-4">
        <Link href="/Cookbook/lp" aria-label="Aero Publishing Cookbook">
          <CookbookLogo />
        </Link>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="font-poppins text-[14px] font-semibold text-black transition-opacity hover:opacity-70"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <a
          href="#hire-form"
          className="hidden h-10 items-center justify-center rounded-full bg-[#f14814] px-5 font-syne text-[15px] font-bold text-white transition-all duration-300 hover:opacity-90 hover:brightness-110 active:scale-[0.98] sm:inline-flex"
        >
          Get Started
        </a>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 transition-colors hover:bg-black/5 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-black/5 bg-white lg:hidden"
          >
            <nav className="flex flex-col gap-3 px-5 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="font-poppins text-base font-semibold text-black transition-opacity hover:opacity-70"
                  onClick={() => setOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <a
                href="#hire-form"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex h-10 items-center justify-center rounded-full bg-[#f14814] font-syne text-[15px] font-bold text-white transition-all duration-300 hover:opacity-90"
              >
                Get Started
              </a>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
