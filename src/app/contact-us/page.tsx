import HeroSection from "@/components/Contact/HeroSection";
import FOrm from "@/components/Contact/Form";
import CounterSection from "@/components/Contact/tringle";
import { Metadata } from "next";

export const metadata : Metadata = {
    title: "Contact Aero Publishing – Start Your Author Journey",
    description: "Have a book idea or manuscript? Get in touch with Aero Publishing to start your journey with professional ghostwriting, editing, or publishing help.",
}

export default function About() {
    return (
        <main className="min-h-screen">
            <HeroSection />
            <CounterSection />
            <FOrm />
        </main>
    );
}
