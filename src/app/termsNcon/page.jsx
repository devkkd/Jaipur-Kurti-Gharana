import CraftsmanshipSection from '@/components/CraftsmanshipSection';
import React from 'react';

const TermsAndConditions = () => {
    const lastUpdated = "01 January, 2026";

    const termsSections = [
        {
            id: 1,
            title: "Acceptance of Terms",
            content: "By visiting, browsing, or making a purchase from this website, you accept and agree to be bound by these Terms & Conditions and our Privacy Policy. If you do not agree with any part of these terms, please do not use our website."
        },
        {
            id: 2,
            title: "Eligibility",
            intro: "To use this website, you must be:",
            list: [
                "At least 18 years of age",
                "Legally capable of entering into binding contracts",
                "Using the site for business or wholesale purposes (not for personal resale or single pieces)"
            ]
        },
        {
            id: 3,
            title: "Products & Orders",
            list: [
                "All our products are sold in bulk or wholesale only, unless otherwise mentioned.",
                "Product colors, prints, and fabric details may slightly vary due to lighting and screen resolution.",
                "We reserve the right to accept or cancel any order at our sole discretion."
            ]
        },
        {
            id: 4,
            title: "Pricing & Payment",
            list: [
                "All prices are listed in INR (Indian Rupees) and are exclusive of applicable taxes and shipping unless mentioned.",
                "We accept online payments through secure third-party payment gateways.",
                "Full payment must be made before order dispatch."
            ]
        },
        {
            id: 5,
            title: "Shipping & Delivery",
            list: [
                "Orders are typically processed within 2–5 business days.",
                "Delivery timelines may vary based on order volume, location, and courier service.",
                "Avanta India is not responsible for delays caused by natural calamities, lockdowns, or third-party logistics."
            ]
        },
        {
            id: 6,
            title: "Return & Exchange Policy",
            list: [
                "Returns are not accepted for wholesale orders unless there is a manufacturing defect.",
                "If you receive a defective product, notify us within 48 hours of delivery with proof (images/video).",
                "We do not offer refunds; only replacements or store credit may be provided (if eligible)."
            ]
        },
        {
            id: 7,
            title: "Intellectual Property",
            content: "All content, including logos, images, designs, text, graphics, and software on this website, is the property of Avanta India or its licensors. You may not reproduce, distribute, or exploit any content without prior written permission."
        },
        {
            id: 8,
            title: "User Responsibilities",
            intro: "You agree not to misuse the website or services.",
            list: [
                "You must provide accurate and truthful information when placing orders.",
                "You may not use our website to conduct fraudulent, harmful, or unlawful activity."
            ]
        },
        {
            id: 9,
            title: "Limitation of Liability",
            content: "We shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our website or products."
        },
        {
            id: 10,
            title: "Changes to Terms",
            content: "We may update these Terms & Conditions at any time without prior notice. It is your responsibility to review them periodically. Continued use of the site after changes means you accept the updated terms."
        },
        {
            id: 11,
            title: "Governing Law",
            content: "These Terms & Conditions are governed by the laws of Rajasthan, India. Any disputes will be subject to the exclusive jurisdiction of the courts in Jaipur."
        }
    ];

    return (
        <div className="bg-white min-h-screen font-sans text-gray-800">
            <div className="max-w-7xl mx-auto px-6 py-16">

                {/* Header Section */}
                <header className="text-center mb-12">
                    <p className="text-sm font-bold tracking-widest uppercase mb-2">Terms and Conditions</p>
                    <h1 className="text-4xl md:text-5xl font-cinzel font-bold tracking-tight text-gray-900 uppercase">
                        Terms and Conditions
                    </h1>
                </header>

                <div className="mb-8">
                    <p className="text-sm font-bold">Last updated: {lastUpdated}</p>
                </div>

                <div className="space-y-6 text-sm md:text-base leading-relaxed mb-12">
                    <p>
                        Welcome to Avanta India – a brand by Jaipur Kurti Gharana. By accessing or using our website https://avantaindia.com, you agree to be bound by the following terms and conditions. Please read them carefully before using our services.
                    </p>
                </div>

                {/* Dynamic Sections using Map */}
                <div className="space-y-10">
                    {termsSections.map((section) => (
                        <section key={section.id}>
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                                {section.id}. {section.title}
                            </h2>

                            {section.content && <p className="mb-4">{section.content}</p>}

                            {section.intro && <p className="mb-3">{section.intro}</p>}

                            {section.list && (
                                <ul className="list-disc pl-5 space-y-2">
                                    {section.list.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            )}
                        </section>
                    ))}
                </div>

                {/* Final Contact Section */}
                <section className="mt-16 pt-10 border-t border-gray-100">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">12. Contact Us</h2>
                    <p className="mb-4">For any questions regarding these Terms & Conditions, you can reach us at:</p>
                    <ul className="space-y-2">
                        <li><span className="font-bold">Email:</span> jaipurkurtigharana@gmail.com</li>
                        <li><span className="font-bold">Phone:</span> +91-9784562130</li>
                        <li><span className="font-bold">Website:</span> https://avantaindia.com/contact-us/</li>
                    </ul>
                </section>
            </div>
            <CraftsmanshipSection />
        </div>
    );
};

export default TermsAndConditions;