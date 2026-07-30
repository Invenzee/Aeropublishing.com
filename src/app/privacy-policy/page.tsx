import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy – How Aero Publishing Protects Your Data",
  description:
    "Read how Aero Publishing collects, uses, and protects your personal data when you use our website or services, in full compliance with data privacy laws.",
};

export default function PrivacyPolicy() {
    return (
        <section className="bg-brand-light pb-20 pt-60 max-sm:py-20">
            <div className="container mx-auto px-4 max-w-5xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-5xl font-bold text-brand-primary">
                        Privacy Policy
                    </h1>
                    <p className="text-brand-gray mt-3 text-sm md:text-base">
                        Your privacy is important to us. Please read this policy carefully.
                    </p>
                </div>

                {/* Content Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 space-y-10 text-sm md:text-base leading-relaxed text-brand-gray">

                    {/* Intro */}
                    <div>
                        <p>
                            At Aeropublishing we are committed to safeguarding and preserving the privacy of our visitors. This Privacy Policy explains what happens to any personal data that you provide to us, or that we collect from you whilst you visit our site.
                        </p>
                        <p className="mt-3">
                            We do update this Policy from time to time so please do review this Policy regularly.
                        </p>
                    </div>

                    {/* Information We Collect */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-brand-black mb-3">
                            Information We Collect
                        </h2>
                        <p>
                            In running and maintaining our website we may collect and process the following data about you:
                        </p>

                        <ul className="list-disc pl-6 mt-4 space-y-2">
                            <li>
                                Information about your use of our site including details of your visits such as pages viewed and the resources that you access. Such information includes traffic data, location data and other communication data.
                            </li>
                            <li>
                                Information provided voluntarily by you. For example, when you register for information or make a purchase.
                            </li>
                            <li>
                                Information that you provide when you communicate with us by any means.
                            </li>
                        </ul>
                    </div>

                    {/* Use of Cookies */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-brand-black mb-3">
                            Use of Cookies
                        </h2>
                        <p>
                            Cookies provide information regarding the computer used by a visitor. We may use cookies where appropriate to gather information about your computer fin order to assist us in improving our website.
                        </p>

                        <p className="mt-3">
                            We may gather information about your general internet use by using the cookie. Where used, these cookies are downloaded to your computer and stored on the computer’s hard drive. Such information will not identify you personally. It is statistical data. This statistical data does not identify any personal details.
                        </p>

                        <p className="mt-3">
                            You can adjust the settings on your computer to decline any cookies if you wish. This can easily be done by activating the reject cookies setting on your computer.
                        </p>

                        <p className="mt-3">
                            Advertisers may also use cookies, over which we have no control. Such cookies (if used) would be downloaded once you click on advertisements on our website.
                        </p>
                    </div>

                    {/* Use of Your Information */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-brand-black mb-3">
                            Use of Your Information
                        </h2>
                        <p>
                            We use the information that we collect from you to provide our services to you. In addition to this we may use the information for one or more of the following purposes:
                        </p>

                        <ul className="list-disc pl-6 mt-4 space-y-2">
                            <li>
                                To provide information to you that you request from us relating to our products or services.
                            </li>
                            <li>
                                To provide information to you relating to other products that may be of interest to you. Such additional information will only be provided where you have consented to receive such information.
                            </li>
                            <li>
                                To inform you of any changes to our website, services or goods and products.
                            </li>
                            <li>
                                If you have previously purchased goods or services from us we may provide to you details of similar goods or services, or other goods and services, that you may be interested in.
                            </li>
                        </ul>

                        <p className="mt-3">
                            Where your consent has been provided in advance we may allow selected third parties to use your data to enable them to provide you with information regarding unrelated goods and services which we believe may interest you. Where such consent has been provided it can be withdrawn by you at any time.
                        </p>
                    </div>

                    {/* Storing Personal Data */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-brand-black mb-3">
                            Storing Your Personal Data
                        </h2>
                        <p>
                            In operating our website it may become necessary to transfer data that we collect from you to locations outside of the European Union for processing and storing. By providing your personal data to us, you agree to this transfer, storing or processing. We do our upmost to ensure that all reasonable steps are taken to make sure that your data is treated stored securely.
                        </p>

                        <p className="mt-3">
                            Unfortunately the sending of information via the internet is not totally secure and on occasion such information can be intercepted. We cannot guarantee the security of data that you choose to send us electronically, Sending such information is entirely at your own risk.
                        </p>
                    </div>

                    {/* Disclosing Information */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-brand-black mb-3">
                            Disclosing Your Information
                        </h2>
                        <p>
                            We will not disclose your personal information to any other party other than in accordance with this policy and in the circumstances detailed below:
                        </p>

                        <ul className="list-disc pl-6 mt-4 space-y-2">
                            <li>In the event that we sell any or all of our business to the buyer.</li>
                            <li>Where we are legally required by law to disclose your personal information.</li>
                            <li>To further fraud protection and reduce the risk of fraud.</li>
                        </ul>
                    </div>

                    {/* Third Party Links */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-brand-black mb-3">
                            Third Party Links
                        </h2>
                        <p>
                            On occasion we include links to third parties on this website. Where we provide a link it does not mean that we endorse or approve that site’s policy towards visitor privacy. You should review their privacy policy before sending them any personal data.
                        </p>
                    </div>

                    {/* Access to Information */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-brand-black mb-3">
                            Access to Information
                        </h2>
                        <p>
                            In accordance with the Data Protection Act 1998 you have the right to access any information that we hold relating to you. Please note that we reserve the right to charge a fee of £10 to cover costs incurred by us in providing you with the information.
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
