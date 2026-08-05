"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Book {
    id: number;
    image: string;
    title: string;
}

interface Category {
    id: string;
    label: string;
    books: Book[];
}

interface PortfolioSectionProps {
    title?: string;
    categories?: Category[];
}

export default function PortfolioSection({
    title = "Portfolio",
    categories = defaultCategories,
}: PortfolioSectionProps) {

    const [activeTab, setActiveTab] = useState<string>("");

    // ✅ FIX: sync active tab when categories load/change
    useEffect(() => {
        if (categories && categories.length > 0) {
            setActiveTab(categories[0].id);
        }
    }, [categories]);

    const activeCategory = categories.find(
        (cat) => cat.id === activeTab
    );

    return (
        <section className="w-full max-w-full bg-white py-16 px-4 md:px-8 lg:px-16 relative z-40 overflow-x-clip overflow-hidden">
            <div className="max-w-7xl mx-auto">

                {/* Title */}
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-brand-primary">
                    {title}
                </h2>

                {/* Tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveTab(category.id)}
                            className={`px-5 py-2 rounded-full text-sm font-medium border transition-colors cursor-pointer
                                ${
                                    activeTab === category.id
                                        ? "bg-brand-primary text-white border-brand-primary"
                                        : "bg-white text-brand-gray border-gray-300 hover:border-brand-primary hover:text-brand-primary"
                                }`}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>

                {/* Books Grid */}
                {activeCategory && activeCategory.books.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {activeCategory.books.map((book) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <p className="text-brand-muted">
                            No books in this category yet.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}

function BookCard({ book }: { book: Book }) {
    return (
        <div className="rounded-lg overflow-hidden border border-gray-200 bg-white">
            <div className="relative w-full aspect-[2/3] bg-brand-light">
                <Image
                    src={book.image}
                    alt={book.title}
                    fill
                    className="object-cover"
                />
            </div>
        </div>
    );
}


// ✅ Default Data
const defaultCategories: Category[] = [
    {
        id: "business",
        label: "Business",
        books: [
            { id: 1, image: "/business-1.webp", title: "Business Strategy Guide" },
            { id: 2, image: "/business-2.webp", title: "Entrepreneurship 101" },
            { id: 3, image: "/business-3.webp", title: "Corporate Excellence" },
            { id: 4, image: "/business-4.webp", title: "Leadership Mastery" },
        ],
    },
    {
        id: "adventure",
        label: "Adventure",
        books: [
            { id: 5, image: "/adventure-1.webp", title: "Journey to Unknown" },
            { id: 6, image: "/adventure-2.webp", title: "Wild Expeditions" },
            { id: 7, image: "/adventure-3.webp", title: "Adventure Awaits" },
            { id: 8, image: "/adventure-4.webp", title: "Explorer's Diary" },
        ],
    },
    {
        id: "religious",
        label: "Religious",
        books: [
            { id: 9, image: "/religious-1.webp", title: "Spiritual Awakening" },
            { id: 10, image: "/religious-2.webp", title: "Faith & Devotion" },
            { id: 11, image: "/religious-3.webp", title: "Sacred Wisdom" },
            { id: 12, image: "/religious-4.webp", title: "Divine Teachings" },
        ],
    },
    {
        id: "children",
        label: "Children's",
        books: [
            { id: 17, image: "/children-1.webp", title: "The Lost City" },
            { id: 19, image: "/children-2.webp", title: "Love & Betrayal" },
            { id: 20, image: "/children-3.webp", title: "Mystery Unfolded" },
            { id: 18, image: "/children-4.webp", title: "Whispers in the Dark" },
        ],
    },
    {
        id: "fiction",
        label: "Fiction",
        books: [
            { id: 17, image: "/fiction-1.webp", title: "The Lost City" },
            { id: 18, image: "/fiction-2.webp", title: "Whispers in the Dark" },
            { id: 19, image: "/fiction-3.webp", title: "Love & Betrayal" },
            { id: 20, image: "/fiction-4.webp", title: "Mystery Unfolded" },
        ],
    },
    {
        id: "biography",
        label: "Biography",
        books: [
            { id: 21, image: "/book-landing-page-7.webp", title: "Life Untold" },
            { id: 22, image: "/book-landing-page-8.webp", title: "Success Stories" },
            { id: 23, image: "/book-landing-page-9.webp", title: "Journey of a Legend" },
            { id: 24, image: "/book-landing-page-10.webp", title: "My Memoir" },
        ],
    },
    {
        id: "poetry",
        label: "Poetry",
        books: [
            { id: 26, image: "/book-landing-page-4.webp", title: "Verses & Dreams" },
            { id: 25, image: "/book-landing-page-11.webp", title: "Words of the Soul" },
            { id: 28, image: "/book-landing-page-6.webp", title: "Emotions in Verse" },
            { id: 27, image: "/book-landing-page-5.webp", title: "Poetry Collection" },
        ],
    },
];