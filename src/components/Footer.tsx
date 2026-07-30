"use client";

import { FaFacebookF, FaInstagram } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className=" max-sm:p-4 bg-white overflow-x-hidden max-w-[1240px] mx-auto mb-4">
            <div
                className="w-full mx-auto rounded-[50px] overflow-hidden relative bg-cover bg-center min-h-[400px] flex flex-col justify-between"
                style={{ backgroundImage: "url('/connect-with-us.webp')" }}
            >

                <div className="relative z-10 px-12 max-sm:px-6 max-sm:py-10 pt-20 pb-12 grid grid-cols-1 md:grid-cols-12 gap-12 text-white">
                    {/* Brand Column */}
                    <div className="md:col-span-4 space-y-6">
                        {/* Logo Placeholder - simplified text/icon match */}
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-26">
                                <Image src="/footer-logo.webp" alt="Aero Publishing" className="w-full h-auto object-contain cursor-pointer" 
                                width={100}
                                height={100}
                                onClick={() => window.location.href = "/"} />
                            </div>
                        </div>

                        <p className="text-sm font-poppins leading-relaxed opacity-90 max-w-[250px]">
                            Get An Idea. Get Published, Get Fame. Get Paid. Get Away And Explore.
                        </p>

                        <h4 className="text-[#36C0E7] font-syne font-bold text-lg mb-4">Secure Payment</h4>
                        <img src="/payment.webp" alt="" />
                        <h4 className="text-[#36C0E7] font-syne font-bold text-lg mb-4">Trusted By</h4>
                        <img src="/f-trust.webp" alt="" />

                    </div>

                    <div className="md:col-span-2 space-y-6">
                        <h4 className="text-[#36C0E7] font-syne font-bold text-lg mb-4">Quick Links</h4>
                        <ul className="space-y-4 font-poppins text-sm opacity-90">
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/about">About Us</Link></li>
                            <li><Link href="/portfolio">Portfolio</Link></li>
                            <li><Link href="/blog">Blog</Link></li>
                            <li><Link href="/contact-us">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div className="md:col-span-3 space-y-6">
                        <h4 className="text-[#36C0E7] font-syne font-bold text-lg mb-4">Services</h4>
                        <ul className="space-y-4 font-poppins text-sm opacity-90">
                            <li><Link href="/amazon-publishing">Amazon Publishing</Link></li>
                            <li><Link href="/book-editing">Book Editing</Link></li>
                            <li><Link href="/book-publishing">Book Publishing</Link></li>
                            <li><Link href="/book-marketing">Book Marketing</Link></li>
                            <li><Link href="/audio-book-narration">Audio Book Narration</Link></li>
                            <li><Link href="/authors-website">Authors Website</Link></li>
                            <li><Link href="/book-cover-design">Book Cover Design</Link></li>
                            <li><Link href="/book-formatting">Book Formatting</Link></li>
                            <li><Link href="/ghost-writing">Ghostwriting</Link></li>
                        </ul>
                    </div>

                    {/* Social Media Column */}
                    <div className="md:col-span-3 space-y-6">
                    <h4 className="text-[#36C0E7] font-syne font-bold text-lg mb-4">Contact</h4>
                        <div className="flex flex-col gap-4 font-poppins text-sm opacity-90 ">
                            <p>12508 Center St, South Gate,<br /> CA 90280, United States</p>
                            <a href="tel:+14242823304">+1424 282 3304</a>
                            <a href="mailto:admin@aeropublishing.com">admin@aeropublishing.com</a>
                        </div>
                        <h4 className="text-[#36C0E7] font-syne font-bold text-lg mb-4">Social Media</h4>
                        <div className="flex gap-4">
                            <a href="https://www.facebook.com/people/Aero-Publishing/100069250598189/" className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-brand-primary transition-all duration-300 group">
                                <FaFacebookF size={18} className="group-hover:scale-110 transition-transform" />
                            </a>
                            <a href="https://www.instagram.com/aeropublishingus/" className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-brand-primary transition-all duration-300 group">
                                <FaInstagram size={18} className="group-hover:scale-110 transition-transform" />
                            </a>
                        </div>

                        {/* Review Platform Badges with Tooltips */}
                        <div className="">
                            <h4 className="text-[#36C0E7] font-syne font-bold text-lg mb-4">Feedback Hubs</h4>
                            <div className="flex gap-3">
                                {/* Trustpilot */}
                                <div className="relative group">
                                    <a href="https://www.trustpilot.com/review/aeropublishing.us" target="_blank" rel="noopener noreferrer" className="block w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white transition-all duration-300">
                                        <Image src="/trustPilot.svg" alt="Trustpilot" className="w-10 h-10 object-contain group-hover:scale-110 transition-transform hover:invert" width={20} height={20} />
                                    </a>
                                    {/* Tooltip */}
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-white text-brand-primary text-xs font-syne font-bold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap shadow-lg">
                                        Trustpilot
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white"></div>
                                    </div>
                                </div>

                                {/* Sitejabber */}
                                <div className="relative group">
                                    <a href="https://www.smartcustomer.com/reviews/aeropublishing.us" target="_blank" rel="noopener noreferrer" className="block w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white transition-all duration-300">
                                        <Image src="/sitejabber.svg" alt="Sitejabber" className="w-10 h-10 object-contain group-hover:scale-110 transition-transform hover:invert" width={20} height={20} />
                                    </a>
                                    {/* Tooltip */}
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-white text-brand-primary text-xs font-syne font-bold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap shadow-lg">
                                        Sitejabber
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white"></div>
                                    </div>
                                </div>

                                {/* Bark */}
                                <div className="relative group">
                                    <a href="https://www.bark.com/en/us/company/aeropublishingus/E6Lb9D/?review_source=share_link" target="_blank" rel="noopener noreferrer" className="block w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white transition-all duration-300">
                                        <Image src="/Bark.svg" alt="Bark" className="w-10 h-10 object-contain group-hover:scale-110 transition-transform hover:invert" width={20} height={20} />
                                    </a>
                                    {/* Tooltip */}
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-white text-brand-primary text-xs font-syne font-bold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap shadow-lg">
                                        Bark
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white"></div>
                                    </div>
                                </div>

                                {/* Clutch */}
                                {/* <div className="relative group">
                                    <a href="https://clutch.co/profile/aero-publishing" target="_blank" rel="noopener noreferrer" className="block w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white transition-all duration-300">
                                        <Image src="/Clutch.svg" alt="Clutch" className="w-10 h-10 object-contain group-hover:scale-110 transition-transform hover:invert" width={20} height={20} />
                                    </a>
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-white text-brand-primary text-xs font-syne font-bold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap shadow-lg">
                                        Clutch
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white"></div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="relative z-10 border-t border-white/20 px-12 max-sm:px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] text-white/70 font-poppins">
                    <p>Powered by Aero Publishing . All rights reserved.</p>
                    <div className="flex gap-1">
                        <Link href="/terms-and-conditions" className="hover:text-white transition-colors ">Terms & Conditions</Link>
                        <span>|</span>
                        <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <span>|</span>
                        <Link href="/return-refund-policies" className="hover:text-white transition-colors">Return Refund Policies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
