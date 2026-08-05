import BlogSection from '@/components/Blog/BlogSection';
import React from 'react'
import HeroSection from '@/components/About/HeroSection'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Publishing Tips & Author Guides – Aero Publishing Blog",
  description: "Explore expert tips on writing, publishing, and marketing your book. Learn how to succeed as an author with Aero Publishing’s blog insights.",
};

export default function page() {
    return (
        <main className="min-h-screen bg-white pb-20 w-full max-w-full overflow-x-hidden">
            <HeroSection
                hasForm={false}
                title="Publishing Made Simple"
                description="All-inclusive packages with copyright protection and a 7-day money-back guarantee. Publish your book with ease."
            />
            <BlogSection />
        </main>
    )
}
