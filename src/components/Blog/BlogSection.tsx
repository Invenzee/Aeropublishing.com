"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Button from "../Button";
import { featuredPost, blogPosts, calculateReadTime } from "@/lib/blogData";

export default function BlogSection() {
    // Calculate read times dynamically
    const featuredWithReadTime = { ...featuredPost, readTime: calculateReadTime(featuredPost.content) };
    const postsWithReadTime = blogPosts.map(post => ({
        ...post,
        readTime: calculateReadTime(post.content)
    }));

    const displayPosts = postsWithReadTime;

    return (
        <section className="py-20 bg-white bg-[url('/why-aero-gradient-bg.webp')] bg-contain bg-no-repeat bg-left">
            <div className="max-w-[1140px] mx-auto px-6">

                <h1 className="text-3xl md:text-6xl max-auto mb-12 leading-[1.2] font-syne font-semibold text-brand-primary text-center">
                    Blog
                </h1>

                {/* Featured Post */}
                <div className="mb-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50, scale: 0.95 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 w-full"
                    >
                        <div className="relative">
                            <Image src={featuredPost.image} alt="Featured Blog" className="object-cover  rounded-2xl" width={500} height={300} />
                            {/* Decorative Sparkle */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute -top-10 -left-10 w-32 h-32 bg-brand-secondary/20 blur-3xl rounded-full"
                            />
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex-1 space-y-3"
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-[36px] leading-[1.2] font-syne font-semibold text-brand-primary">
                            {featuredWithReadTime.title}
                        </h2>

                        <p className="text-gray-600 font-poppins text-sm leading-relaxed whitespace-pre-line">
                            {featuredWithReadTime.description}
                        </p>

                        <Link href={`/blog/${featuredWithReadTime.slug}`} className="inline-block text-[#FE695B] font-medium text-sm hover:underline">
                            Read Now
                        </Link>

                        <div className="flex items-center gap-4 text-xs text-gray-400 font-poppins pt-2">
                            <span>{featuredWithReadTime.date}</span>
                            <span className="w-1 h-1 rounded-full bg-gray-300" />
                            <span>{featuredWithReadTime.readTime}</span>
                        </div>
                    </motion.div>
                </div>

                {/* Grid Posts */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {displayPosts.map((post, index) => (
                        <motion.article
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group flex flex-col h-full"
                        >
                            {/* Image Container */}
                            <div className="relative rounded-4xl overflow-hidden aspect-4/3 mb-6 shadow-md group-hover:shadow-xl transition-all duration-300">
                                <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />

                                {/* Badge */}
                                <div className="absolute top-4 right-4">
                                    <span className="bg-[#FE695B] text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                                        {post.category}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 flex flex-col text-center px-2">
                                <h3 className="text-lg font-syne font-bold text-brand-primary leading-tight mb-3 line-clamp-2">
                                    {post.title}
                                </h3>

                                <p className="text-xs text-gray-500 font-poppins leading-relaxed mb-4 line-clamp-3">
                                    {post.description}
                                </p>

                                <div className="mt-auto flex flex-col items-center gap-3">
                                    <Link href={`/blog/${post.slug || ''}`} className="text-[#FE695B] font-medium text-sm hover:underline">
                                        Read Now
                                    </Link>

                                    <div className="flex items-center gap-3 text-[10px] text-gray-400 font-poppins">
                                        <span>{post.date}</span>
                                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                                        <span>{post.readTime}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
