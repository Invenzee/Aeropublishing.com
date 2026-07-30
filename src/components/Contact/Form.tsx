"use client";

import { useState } from "react";
import Button from "../Button";
import { sendEmail } from "@/app/actions/email";
import { getFormTrackingPayload } from "@/lib/tracking";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface FormData {
  name: string;
  email: string;
  phone: string;
  website: string;
  services: string[];
  timeline: string;
  source: string;
  message: string;
}

const servicesList = [
  "E-book Writing",
  "Content/Copy Writing (Website, Blogs)",
  "Editing & Cover Design",
  "Formatting & Proofreading",
  "SEO & Publishing",
  "Book Marketing/Promotion",
];

export default function ContactForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    website: "",
    services: [],
    timeline: "",
    source: "",
    message: "",
  });

  const [status, setStatus] = useState<{
    submitting: boolean;
    success: boolean | null;
    message: string;
  }>({
    submitting: false,
    success: null,
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ submitting: true, success: null, message: "" });

    try {
      const result = await sendEmail({
        ...formData,
        formType: "Contact Page Form",
        ...getFormTrackingPayload(),
      });
      if (result.success) {
        router.push("/thank-you");
      } else {
        setStatus({
          submitting: false,
          success: false,
          message: "Oops! Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      console.error(error);
      setStatus({
        submitting: false,
        success: false,
        message: "An error occurred. Please try again later.",
      });
    }
  };

  return (
    <div className="bg-[url('/why-aero-gradient-bg.webp')] bg-contain bg-no-repeat bg-left">
      {/* <Image src="/carousel-bg.webp" className="absolute right-0" alt="" width={500} height={500} /> */}
      <form
        onSubmit={handleSubmit}
        className="max-w-[1140px] mx-auto bg-white p-8 rounded-xl shadow"
      >
        <h2 className="text-5xl font-syne font-bold text-brand-primary text-center mb-8">
          Let Us Help You Out!
        </h2>

        {/* Name */}
        <label className="block mb-4">
          <span className="text-sm font-medium">Name</span>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="mt-1 w-full h-14 px-6 bg-transparent border border-[#818181] focus:outline-none focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary transition-all font-poppins"
          />
        </label>

        {/* Email */}
        <label className="block mb-4">
          <span className="text-sm font-medium">
            Email
          </span>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="mt-1 w-full h-14 px-6 bg-transparent border border-[#818181] focus:outline-none focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary transition-all font-poppins"
          />
        </label>

        {/* Phone */}
        <label className="block mb-4">
          <span className="text-sm font-medium">
            Phone
          </span>
          <input
            type="text"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 w-full h-14 px-6 bg-transparent border border-[#818181] focus:outline-none focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary transition-all font-poppins"
          />
        </label>

        {/* Message */}
        <label className="block mb-6">
          <span className="text-sm font-medium">Message</span>
          <textarea
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="mt-1 w-full h-32 px-6 py-4 bg-transparent border border-[#818181] focus:outline-none focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary transition-all resize-none font-poppins"
          />
        </label>

        <div className="text-center">
          {status.message && (
            <p className={`mb-4 ${status.success ? 'text-green-600' : 'text-red-600'}`}>
              {status.message}
            </p>
          )}
          <Button
            className="mx-auto px-12"
            disabled={status.submitting}
          >
            {status.submitting ? "Sending..." : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
}
