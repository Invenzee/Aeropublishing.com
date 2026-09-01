"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, ChevronDown, ChevronRight, Phone, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

interface NavItem {
    name: string;
    href: string;
    subItems?: { name: string; href: string }[];
}

const navItems: NavItem[] = [
    { name: "Book Editing", href: "/book-editing" },
    { name: "Book Publishing", href: "/book-publishing" },
    { name: "Book Marketing", href: "/book-marketing" },
    {
        name: "Services",
        href: "/services",
        subItems: [
            { name: "Amazon Publishing", href: "/amazon-publishing" },
            { name: "Audio Book Narration", href: "/audio-book-narration" },
            { name: "Authors Website", href: "/authors-website" },
            { name: "Book Cover Design", href: "/book-cover-design" },
            { name: "Book Formatting", href: "/book-formatting" },
            { name: "Book Printing", href: "/book-printing" },
            { name: "Children Book", href: "/children-book" },
            { name: "Ebook Writing", href: "/ebook-writing" },
            { name: "Fiction Writing", href: "/fiction-writing" },
            { name: "Ghostwriting", href: "/ghost-writing" },
            { name: "Proof Reading", href: "/proof-reading" },
            { name: "Video Trailer", href: "/video-trailer" },
        ]
    },
    { name: "Portfolio", href: "/portfolio" },
    { name: "About Us", href: "/about" },
    { name: "Blog", href: "/blog" },
];

export default function Header() {
    const router = useRouter();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [hoveredService, setHoveredService] = useState(false);
    const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <>
            <motion.header
                className="fixed top-0 left-0 right-0 z-50 w-full max-w-full bg-white/80 backdrop-blur-md border-b border-gray-100"
            >
                <div className="w-full min-h-10 bg-brand-primary flex items-center justify-between gap-2 px-4 sm:px-8 lg:px-24 py-1.5 sm:py-0 sm:h-10">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 min-w-0 flex-1">
                        <a
                            href="tel:+14242823304"
                            className="flex items-center gap-1.5 text-white text-[11px] sm:text-sm font-poppins hover:text-white/90 transition-colors"
                        >
                            <Phone size={13} className="shrink-0" />
                            <span>+1424 282 3304</span>
                        </a>
                        <a
                            href="mailto:admin@aeropublishing.com"
                            className="flex items-center gap-1.5 text-white text-[11px] sm:text-sm font-poppins hover:text-white/90 transition-colors min-w-0"
                        >
                            <Mail size={13} className="shrink-0" />
                            <span className="truncate">admin@aeropublishing.com</span>
                        </a>
                    </div>
                    <div className="hidden sm:flex gap-2 sm:gap-4 shrink-0">
                        <a href="https://www.facebook.com/people/Aero-Publishing/100069250598189/" className="w-7 h-7 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-brand-primary transition-all duration-300 group">
                            <FaFacebookF size={15} className="group-hover:scale-110 transition-transform text-white group-hover:text-brand-primary" />
                        </a>
                        <a href="https://www.instagram.com/aeropublishingus/" className="w-7 h-7 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-brand-primary transition-all duration-300 group">
                            <FaInstagram size={15} className="group-hover:scale-110 transition-transform text-white group-hover:text-brand-primary" />
                        </a>
                                                        {/* Trustpilot */}
                                <div className="relative group">
                                    <a href="https://www.trustpilot.com/review/aeropublishing.us" target="_blank" rel="noopener noreferrer" className="block w-7 h-7 rounded-full border border-white/30 flex items-center justify-center hover:bg-white transition-all duration-300">
                                        <Image src="/trustPilot.svg" alt="Trustpilot" width={28} height={28} className="object-contain group-hover:scale-110 transition-transform hover:invert" />
                                    </a>
                                </div>

                                {/* Sitejabber */}
                                <div className="relative group">
                                    <a href="https://www.smartcustomer.com/reviews/aeropublishing.us" target="_blank" rel="noopener noreferrer" className="block w-7 h-7 rounded-full border border-white/30 flex items-center justify-center hover:bg-white transition-all duration-300">
                                        <Image src="/sitejabber.svg" alt="Sitejabber" width={28} height={28} className="object-contain group-hover:scale-110 transition-transform hover:invert" />
                                    </a>
                                </div>

                                {/* Bark */}
                                <div className="relative group">
                                    <a href="https://www.bark.com/en/us/company/aeropublishingus/E6Lb9D/?review_source=share_link" target="_blank" rel="noopener noreferrer" className="block w-7 h-7 rounded-full border border-white/30 flex items-center justify-center hover:bg-white transition-all duration-300">
                                        <Image src="/Bark.svg" alt="Bark" width={28} height={28} className="object-contain group-hover:scale-110 transition-transform hover:invert" />
                                    </a>
                                </div>

                                {/* Clutch */}
                                {/* <div className="relative group">
                                    <a href="https://clutch.co/profile/aero-publishing" target="_blank" rel="noopener noreferrer" className="block w-7 h-7 rounded-full border border-white/30 flex items-center justify-center hover:bg-white transition-all duration-300">
                                        <Image src="/Clutch.svg" alt="Clutch" width={28} height={28} className="object-contain group-hover:scale-110 transition-transform hover:invert" />
                                    </a>
                                </div> */}
                    </div>

                </div>
                <div className="max-w-[1140px] mx-auto px-6 sm:px-6 lg:px-0 overflow-visible">
                    <div className="flex justify-between items-center h-20 overflow-visible">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
                            <Image src="/logo.webp" alt="Logo" width={100} height={100} onClick={() => window.location.href = "/"} />
                        </div>

                        {/* Desktop Navigation */}
                        <div className="flex items-center gap-12 overflow-visible">
                            <nav className="hidden md:flex space-x-8 items-center overflow-visible">
                                {navItems.map((item, index) => (
                                    <div
                                        key={item.name}
                                        className="relative group"
                                        onMouseEnter={() => item.subItems && setHoveredService(true)}
                                        onMouseLeave={() => item.subItems && setHoveredService(false)}
                                    >
                                        <div className="relative flex items-center gap-1 cursor-pointer">
                                            <Link
                                                href={item.href}
                                                className="text-[15px] font-poppins font-medium text-brand-black transition-colors relative group-hover:text-brand-secondary flex items-center gap-1"
                                            >
                                                {item.name}
                                                {item.subItems && (
                                                    <ChevronDown size={14} className={`transition-transform duration-300 ${hoveredService ? "rotate-180 text-brand-secondary" : ""}`} />
                                                )}
                                            </Link>

                                            {/* Animated underline (only for non-dropdown top-level items or general underline logic) */}
                                            <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-brand-secondary transition-all duration-300 group-hover:w-full" />
                                        </div>

                                        {/* Dropdown Menu */}
                                        <AnimatePresence>
                                            {item.subItems && hoveredService && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                                    className="absolute top-full -left-6 w-64 pt-6 bg-transparent z-[60]"
                                                >
                                                    <div className="bg-white max-h-96 rounded-xl shadow-xl border border-gray-100 p-2 overflow-y-auto">
                                                        {item.subItems.map((subItem, i) => (
                                                            <Link
                                                                key={subItem.name}
                                                                href={subItem.href}
                                                                className="block"
                                                            >
                                                                <motion.div
                                                                    initial={{ opacity: 0, x: -10 }}
                                                                    animate={{ opacity: 1, x: 0 }}
                                                                    transition={{ delay: i * 0.05 }}
                                                                    className="px-4 py-3 rounded-lg hover:bg-brand-light group/item transition-colors flex items-center justify-between"
                                                                >
                                                                    <span className="text-sm font-medium text-gray-600 group-hover/item:text-brand-secondary transition-colors">
                                                                        {subItem.name}
                                                                    </span>
                                                                    <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-brand-secondary" />
                                                                </motion.div>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </nav>

                            {/* CTA Button - Desktop */}
                            <div className="hidden md:flex items-center">
                                <Button variant="secondary" className="!px-6 !py-2.5 !text-base !max-w-none whitespace-nowrap" onClick={() => router.push("/submit-manuscript")}>
                                    Submit Manuscript
                                </Button>
                            </div>

                            <div className="flex items-center gap-1 md:hidden">
                                <Button
                                    variant="secondary"
                                    className="!px-3 !h-9 !text-xs !max-w-none whitespace-nowrap"
                                    onClick={() => router.push("/submit-manuscript")}
                                >
                                    Submit
                                </Button>
                                {/* Mobile Menu Button */}
                                <button
                                    onClick={toggleMobileMenu}
                                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    aria-label="Toggle menu"
                                >
                                <AnimatePresence mode="wait">
                                    {mobileMenuOpen ? (
                                        <motion.div
                                            key="close"
                                            initial={{ rotate: -90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: 90, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <X className="w-6 h-6 text-brand-black" />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="menu"
                                            initial={{ rotate: 90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: -90, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Menu className="w-6 h-6 text-brand-black" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
                            onClick={toggleMobileMenu}
                        />

                        {/* Mobile Menu Panel */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-[120px] right-0 bottom-0 w-[280px] bg-white shadow-2xl z-40 md:hidden flex flex-col"
                        >
                            <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                                {/* Mobile Navigation */}
                                <nav className="space-y-1">
                                    {navItems.map((item, index) => (
                                        <div key={item.name}>
                                            {item.subItems ? (
                                                <div className="space-y-1">
                                                    <button
                                                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                                                        className="w-full flex items-center justify-between px-4 py-3 rounded-lg font-poppins font-medium text-brand-black hover:bg-brand-light hover:text-brand-secondary transition-all"
                                                    >
                                                        {item.name}
                                                        <ChevronDown size={16} className={`transition-transform duration-300 ${mobileServicesOpen ? "rotate-180" : ""}`} />
                                                    </button>
                                                    <AnimatePresence>
                                                        {mobileServicesOpen && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: "auto", opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                className="overflow-y-hidden pl-4"
                                                            >
                                                                {item.subItems.map(subItem => (
                                                                    <Link
                                                                        key={subItem.name}
                                                                        href={subItem.href}
                                                                        onClick={toggleMobileMenu}
                                                                        className="block px-4 py-2 text-sm text-gray-600 hover:text-brand-secondary transition-colors"
                                                                    >
                                                                        {subItem.name}
                                                                    </Link>
                                                                ))}
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            ) : (
                                                <motion.div
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                >
                                                    <Link
                                                        href={item.href}
                                                        onClick={toggleMobileMenu}
                                                        className="block px-4 py-3 rounded-lg font-poppins font-medium text-brand-black hover:bg-brand-light hover:text-brand-secondary transition-all"
                                                    >
                                                        <motion.div
                                                            whileHover={{ x: 4 }}
                                                            transition={{ duration: 0.2 }}
                                                        >
                                                            {item.name}
                                                        </motion.div>
                                                    </Link>
                                                </motion.div>
                                            )}
                                        </div>
                                    ))}
                                </nav>

                                {/* Decorative Element */}
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.6, type: "spring" }}
                                    className="absolute bottom-6 right-6 w-32 h-32 bg-gradient-to-br from-brand-secondary/10 to-brand-accent/10 rounded-full blur-2xl -z-10"
                                />
                            </div>

                            {/* Mobile CTA — pinned so it stays visible */}
                            <div className="shrink-0 p-6 pt-4 border-t border-gray-200 bg-white">
                                <Button
                                    variant="secondary"
                                    className="w-full !text-base !max-w-none"
                                    onClick={() => {
                                        router.push("/submit-manuscript");
                                        toggleMobileMenu();
                                    }}
                                >
                                    Submit Manuscript
                                </Button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
