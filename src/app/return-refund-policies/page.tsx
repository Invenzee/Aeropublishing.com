import { Metadata } from "next";

export const metadata : Metadata = {
    title: "Return & Refund Policy – Aero Publishing",
    description: "Review Aero Publishing’s refund and return policy, including eligibility, timelines, and conditions for services offered to authors.",
}

export default function ReturnRefundPolicy() {
    return (
        <section className="bg-brand-light pb-20 pt-60 max-sm:py-20">
            <div className="container mx-auto px-4 max-w-5xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-5xl font-bold text-brand-primary">
                        Return & Refund Policy
                    </h1>
                    <p className="text-brand-gray mt-3 text-sm md:text-base">
                        Please review our refund and cancellation policies carefully.
                    </p>
                </div>

                {/* Content Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 space-y-10 text-sm md:text-base leading-relaxed text-brand-gray">

                    {/* Refunds for Services Rendered */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-brand-black mb-3">
                            Refunds for Services Rendered
                        </h2>
                        <p>
                            Once a service has been rendered, initiated, or a deliverable has been provided (in part or in full), you are eligible for a 100% refund within 7 days of purchase, provided you request the refund within this period. After 7 days, all sales are final. This includes any consultation, digital service, or labor-based engagement.
                        </p>
                    </div>

                    {/* Booking Fees */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-brand-black mb-3">
                            Booking Fees / Deposits
                        </h2>
                        <p>
                            All deposits or booking fees are non-refundable. They secure your spot in our calendar and compensate for administrative costs and lost opportunities due to the reserved time.
                        </p>
                    </div>

                    {/* Subscription Consent */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-brand-black mb-3">
                            Subscription Consent Agreement
                        </h2>
                        <p>
                            I agree to the recurring billing subscription and give my express consent. I understand that I may cancel anytime through the easy online cancellation option
                        </p>
                    </div>

                    {/* Cancellations */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-brand-black mb-3">
                            Cancellations
                        </h2>

                        <ul className="list-disc pl-6 space-y-2">
                            <li>Clients must notify us at least [24 hours] in advance to reschedule or cancel a service.</li>
                            <li>Cancellations made within [24 hours] of the scheduled time may be subject to a cancellation fee of [50%].</li>
                            <li>Missed appointments or “no-shows” are not eligible for a refund or reschedule.</li>
                        </ul>
                    </div>

                    {/* Dissatisfaction */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-brand-black mb-3">
                            Dissatisfaction with Service
                        </h2>
                        <p>
                            If you are dissatisfied with your service, we encourage you to contact us within [e.g., 3 business days] of completion. While we do not guarantee refunds, we are open to:
                        </p>

                        <ul className="list-disc pl-6 mt-4 space-y-2">
                            <li>Clarifying any misunderstandings</li>
                            <li>Offering minor revisions or follow-up support (at our discretion)</li>
                            <li>Applying a discount or credit toward a future service, where appropriate</li>
                        </ul>

                        <p className="mt-3">
                            All resolutions are handled case-by-case and at our sole discretion.
                        </p>
                    </div>

                    {/* Digital Products */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-brand-black mb-3">
                            Digital Products or Downloads (if applicable)
                        </h2>
                        <p>
                            Any downloadable or digital content provided as part of a service package is non-returnable and non-refundable once accessed or delivered.
                        </p>
                    </div>

                    {/* Chargebacks */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-brand-black mb-3">
                            Chargebacks
                        </h2>
                        <p>
                            We consider chargebacks a form of fraud. If you believe a charge is in error, please contact us first we will work with you to resolve the matter. Unauthorized chargebacks may result in legal action and revocation of service access.
                        </p>
                    </div>

                    {/* Contact */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-brand-black mb-3">
                            Contacting Us
                        </h2>
                        <p>
                            Please do not hesitate to contact us <a href="mailto:admin@aeropublishing.com">admin@aeropublishing.com</a> regarding any matter relating to this policy.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
