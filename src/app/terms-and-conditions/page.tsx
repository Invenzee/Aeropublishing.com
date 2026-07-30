import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Terms & Conditions – Aero Publishing Legal Info",
  description:
    "Read our terms of service outlining your rights, responsibilities, and how Aero Publishing delivers services, including ghostwriting, design, and publishing.",
};

export default function TermsAndConditions() {
    return (
        <section className="bg-brand-light pb-20 pt-60 max-sm:py-20">
            <div className="container mx-auto px-4 max-w-5xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-5xl font-bold text-brand-primary">
                        Terms & Conditions
                    </h1>
                    <p className="text-brand-gray mt-3 text-sm md:text-base">
                        Please read these terms carefully before using our services.
                    </p>
                </div>

                {/* Content Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 space-y-10 text-sm md:text-base leading-relaxed text-brand-gray">

                    {/* Revision Policy */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-brand-black mb-3">
                            Revision Policy
                        </h2>
                        <p>
                            We provide revision depending upon the package you selected. Customers can ask us for unlimited free revisions and we will revise their design without any additional charges provided that the design and concept remain the same. Revision Turnaround Time would be 48 hours.
                        </p>
                    </div>

                    {/* Fair Usage Policy */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-brand-black mb-3">
                            Fair Usage Policy
                        </h2>
                        <p>
                            Since we provide unlimited revision and to make sure you get maximum out of our services, with unlimited revision we mean maximum 30 revision on a project after which it will cost more.
                        </p>
                    </div>

                    {/* Refund Policy */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-brand-black mb-3">
                            Refund Policy / Money Back Guarantee
                        </h2>
                        <p>
                            Our refund and cancellation policies are designed to provide maximum security to the Client and Company both. The following terms will be applied in an event an order is cancelled unless The Book Publisher LLC cancels or terminates your contract for a reason other than breach or non-performance.
                        </p>

                        <ul className="list-disc pl-6 mt-4 space-y-2">
                            <li>If request for refund is made within 48 hours, you would be eligible for 100% refund (less 10% service & processing fee).</li>
                            <li>No refund request will be entertained if you have not taken any action on your order for 30 days after placing your order. However, if you want to reactivate your design order, you will be charged a certain fee depending on your project.</li>
                            <li>No refund requests will be entertained after the final files have been delivered.</li>
                            <li>For website packages no refund request will be entertained once website development has been completed or once the website has been deployed live.</li>
                            <li>For video animation packages no refund request will be entertained after the designing of the storyboard.</li>
                            <li>All refund requests should be communicated to the support department. The Book Publisher LLC, based on the violation of your user agreement reserves the right to approve/disapprove your request on an individual case to case basis.</li>
                            <li>For The Book Publisher LLC, custom packages refund will be applicable as it is on the single packages.</li>
                            <li>For example, if you order logo and web design service and approve the logo, you can claim refund for the website service at the time of initial design only.</li>
                            <li>A refund request will need to have a valid reason which must be qualified against the design brief and customer feedback for revisions. Unless a concept has not been designed according to the brief, a refund will not be given however further revisions will be provided until complete satisfaction.</li>
                            <li>Money back guarantee is based on the term that the order is placed in good faith. Where a customer has placed design orders with more than one design agency for the same job with the intention to claim refund, we do not consider it as a good faith. In such a case we reserve the right to decline a refund request.</li>
                            <li>All design jobs require customer feedback before finalizing the design therefore it is only fair that the customer gets involved and provides feedback in order to get the desired results.</li>
                            <li>100% unique design guarantee entitles you to re-draw if our designed logo is to be found considerably similar to another logo design that may already exist. Any resemblance to an existing design will be merely a coincidence and The Book Publisher LLC will not accept any responsibility or claim of any compensation in such a case. It is the client’s responsibility to get their art work copyrighted.</li>
                        </ul>
                    </div>

                    {/* How to Claim Refund */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-brand-black mb-3">
                            How to Claim Your Refund
                        </h2>
                        <p>To assure your refund request is approved, please make sure you meet the following requirements:</p>

                        <ul className="list-disc pl-6 mt-4 space-y-2">
                            <li>Claim your refund specifying your concern by contacting us via any of the following three modes:</li>
                            <li><a href="tel:+14242823304">Toll free #: +1424 282 3304</a></li>
                            <li>Live Chat</li>
                            <li><a href="mailto:admin@aeropublishing.com">admin@aeropublishing.com</a></li>
                        </ul>

                        <p className="mt-4">
                            We will try to resolve your concern by virtue of our revision policy immediately or else will email you a refund request approval from our refund department. After the refund, your design rights would be obtained by The Book Publisher LLC and you would not be able to display any version of the design sent by company.
                        </p>

                        <p className="mt-3">
                            Since the design rights would now be transferred to the company, you agree that you will have no right (direct or indirect) to use any response or other content, work product or media, nor will you have any ownership interest in or to the same.
                        </p>

                        <p className="mt-3">
                            Working in collaboration with the Government Copyright Agencies The Book Publisher LLC would share Copyright Acquisition information for the refunded designs that would restrict the re-use of the designs as original designs in the future.
                        </p>

                        <p className="mt-3">
                            If you have any questions or concerns about our Refund Policy, please contact us by clicking here <a href="mailto:admin@aeropublishing.com">admin@aeropublishing.com</a>
                        </p>
                    </div>

                    {/* My Account */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-brand-black mb-3">
                            My Account
                        </h2>
                        <p>
                            The My Account area is a convenient way to communicate. It is your sole responsibility to check the account area to address any queries, concerns, or additional instructions required by the designer. Not checking or using the Account Area frequently shall not provide you adequate grounds for a refund. However, if you are uncertain how to use the area, you may contact the customer support team at any time for assistance.
                        </p>
                    </div>

                    {/* Reactivation Policy */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-brand-black mb-3">
                            Reactivation Policy
                        </h2>
                        <p>
                            We won’t entertain or refund any orders if the client stays non-responsive for 45 Days but the client can send us an email to hold the project if there is some personal issue. Also, if the client is non-responsive for more than 45 Days then the client has to pay an extra caution fee i.e., $150 for re-initiating the project.
                        </p>
                    </div>

                    {/* Third Party Terms */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-brand-black mb-3">
                            Third Party Terms of Use
                        </h2>
                        <p>
                            Certain features of our services may utilize the services of third-party vendors and business partners, which services may include software, information or other services. Certain of these vendors and business partners require Users who utilize such features to agree to our terms and conditions. This clause identifies third-party terms and conditions that are required by such third-party vendors and business partners as they apply to the features set forth below. Your uses of such features constitute your agreement to be bound by these terms and conditions. These third-party terms are subject to change at such third party’s discretion.
                        </p>
                    </div>

                    {/* Customer Support */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-brand-black mb-3">
                            Customer Support
                        </h2>
                        <p>We offer 24-Hour Customer Support to address your queries and questions. You can contact us any time.</p>
                    </div>

                    {/* Quality Assurance */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-brand-black mb-3">
                            Quality Assurance Policy
                        </h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>In order to provide you the desired satisfaction, our designers don’t deviate from the specifications provided by you in the order form.</li>
                            <li>The designs are created after a thorough research which ensures the design quality and uniqueness.</li>
                        </ul>
                    </div>

                    {/* Satisfaction Guarantee */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-brand-black mb-3">
                            100% Satisfaction Guarantee
                        </h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>The free multiple revision offer as per specifications ensures that you get 100% satisfaction.</li>
                            <li>We rework the ordered design and keep on revising it until you are 100% satisfied.</li>
                            <li>We offer free complete coordination with your printing company, if required.</li>
                        </ul>
                    </div>

                    {/* Delivery Policy */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-brand-black mb-3">
                            Delivery Policy
                        </h2>
                        <p>
                            All design order files are delivered to Account Area as per the date specified on the Order Confirmation Email. An e-mail is also sent to inform the client about their design order delivery made to their specific account area. All policies pertaining to revision & refund are subject to date and time of design order delivered to client’s account area.
                        </p>

                        <p className="mt-3">
                            We provide a design order reference number soon after the order is placed, so that the customer may track the status of that order and post revisions against the reference number. We deliver all our customized design orders via e-mail within 2 to 3 days of receiving your order.
                        </p>

                        <p className="mt-3">
                            We offer a RUSH DELIVERY service through which you can have your first logo samples within 24 hours by paying just $100 extra! For further assistance, contact us at 24-Hour Customer Support Center.
                        </p>
                    </div>

                    {/* Communication Policy */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-brand-black mb-3">
                            Communication Policy
                        </h2>
                        <p>
                            YOU agree that The Book Publisher LLC is not liable for any correspondence from email address(es) other than the ones followed by our own domain. <a href="mailto:admin@aeropublishing.com">admin@aeropublishing.com</a> or/and any toll-free number that is not mentioned on our website. The Book Publisher LLC should not be held responsible for any damage(s) caused by such correspondence. We only take responsibility of any communication through email address(es) under our own domain name or/and via toll free number i.e., already mentioned on The Book Publisher LLC Website.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
