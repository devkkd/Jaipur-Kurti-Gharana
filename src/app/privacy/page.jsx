import CraftsmanshipSection from '@/components/CraftsmanshipSection';
import React from 'react';

const PrivacyPolicy = () => {
  const lastUpdated = "01 January, 2026";

  const policySections = [
    {
      id: 1,
      title: "Introduction",
      content: [
        "This Privacy Policy applies to www.avantaindia.com (the \"Website\"), operated by Avanta India (\"Company\", \"we\", \"our\", or \"us\"). We respect the privacy of all visitors, customers, and business partners, and are committed to protecting personal data in accordance with applicable laws.",
        "This document explains the types of data we collect, the purposes for which we use it, and the measures implemented to safeguard it."
      ]
    },
    {
      id: 2,
      title: "Information We Collect",
      intro: "Depending on how you interact with our Website and services, we may collect the following categories of information:",
      subsections: [
        {
          head: "(a) Personal Identification Data",
          list: ["Name", "Email address", "Contact number", "Company name (if applicable)"]
        },
        {
          head: "(b) Communication & Inquiry Data",
          list: ["Messages or information submitted via forms, email, WhatsApp, or phone"]
        },
        {
          head: "(c) Technical & Log Data",
          intro: "When you browse the Website, certain information may be collected automatically, including:",
          list: ["Device information", "Browser type", "IP address", "Pages visited and interactions", "Session duration", "Referral URLs"]
        },
        {
          head: "(d) Cookies & Tracking Technologies",
          content: "We use cookies to improve user experience, analyze traffic, and enhance site performance. You may manage or disable cookies through your browser settings. Disabling certain cookies may affect site functionality."
        }
      ]
    },
    {
      id: 3,
      title: "Use of Personal Data",
      intro: "We may use your data for the following purposes:",
      list: [
        "To respond to business inquiries, quotations, product information requests, or customer support",
        "To communicate regarding orders, services, or business collaborations",
        "To improve Website performance, usability, and features",
        "To conduct analytics, audits, and internal research",
        "To provide marketing or promotional communications (only with consent where required)",
        "To detect, prevent, or investigate fraud and ensure compliance with policies"
      ],
      footer: "Users may opt out of marketing communications at any time."
    },
    {
      id: 4,
      title: "Data Sharing & Disclosure",
      intro: "We may share data with third-party service providers who support our operations, including:",
      list: [
        "Hosting and IT infrastructure providers",
        "CRM platforms",
        "Marketing and communication services",
        "Logistics and delivery partners (if applicable)"
      ],
      content: "These partners are restricted from using personal data for purposes beyond contracted services and are obligated to maintain confidentiality.",
      footerText: "We do not sell personal data."
    },
    {
      id: 5,
      title: "Data Security",
      content: "We deploy commercially reasonable administrative, technical, and physical security measures to protect personal data. However, no method of Internet transmission or electronic storage is entirely secure, and we cannot guarantee absolute protection."
    },
    {
      id: 6,
      title: "External Links",
      content: "Our Website may contain links or references to external websites. We are not responsible for their privacy practices or content. We recommend reviewing their respective privacy policies before sharing personal information."
    },
    {
      id: 7,
      title: "Children's Privacy",
      content: "Our Website and services are not intended for individuals under 13 years of age. We do not knowingly collect personal information from children. If such data is identified, it will be deleted promptly."
    },
    {
      id: 8,
      title: "Policy Updates",
      content: "We reserve the right to modify this Privacy Policy at any time. Revised versions will be posted on this page, and continued use of the Website will constitute acceptance of such changes."
    }
  ];

  return (
    <div className="bg-white min-h-screen font-sans text-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Header Section */}
        <header className="text-center mb-12">
          <p className="text-sm font-bold tracking-widest uppercase mb-2">Privacy Policy</p>
          <h1 className="text-4xl md:text-5xl font-cinzel font-bold tracking-tight text-gray-900 uppercase">
            Privacy Policy
          </h1>
        </header>

        <div className="mb-8">
          <p className="text-sm font-bold">Last updated: {lastUpdated}</p>
        </div>

        <div className="space-y-6 text-sm md:text-base leading-relaxed mb-12">
          <p>
            This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
          </p>
          <p>
            We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.
          </p>
        </div>

        {/* Dynamic Sections using Map */}
        <div className="space-y-12">
          {policySections.map((section) => (
            <section key={section.id}>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                {section.id}. {section.title}
              </h2>

              {/* General Content */}
              {section.content && (
                Array.isArray(section.content) 
                ? section.content.map((p, i) => <p key={i} className="mb-4">{p}</p>)
                : <p>{section.content}</p>
              )}

              {/* Intro Text */}
              {section.intro && <p className="mb-4">{section.intro}</p>}

              {/* Standard Unordered List */}
              {section.list && (
                <ul className="list-disc pl-5 space-y-2 mb-4">
                  {section.list.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              )}

              {/* Subsections (like in Point 2) */}
              {section.subsections && (
                <div className="space-y-4">
                  {section.subsections.map((sub, i) => (
                    <div key={i}>
                      <p className="font-bold mb-2">{sub.head}</p>
                      {sub.intro && <p className="mb-2">{sub.intro}</p>}
                      {sub.list && (
                        <ul className="list-disc pl-5 space-y-1 mb-2">
                          {sub.list.map((li, idx) => <li key={idx}>{li}</li>)}
                        </ul>
                      )}
                      {sub.content && <p>{sub.content}</p>}
                    </div>
                  ))}
                </div>
              )}

              {/* Footer Text for specific sections */}
              {(section.footer || section.footerText) && (
                <p className="mt-4">{section.footer || section.footerText}</p>
              )}
            </section>
          ))}
        </div>

        {/* Contact Information & Fraud Prevention (Static or separate map) */}
        <div className="mt-12 space-y-12">
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">9. Contact Information</h2>
            <p>For questions or concerns regarding this Privacy Policy or data handling practices, please contact us at:</p>
            <p className="font-semibold mt-2">support@avantaindia.com</p>
            <p className="text-gray-500 text-xs mt-1">(placeholder; can be changed)</p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">10. Important Notices and Fraud Prevention</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>We do not ask for sensitive financial details such as UPI IDs, passwords, or card information through unsolicited calls, messages, or emails.</li>
              <li>Be cautious of unofficial websites or individuals misrepresenting themselves as Avanta India.</li>
              <li>Report any suspicious communications or fraudulent activities to the email above.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
            <p className="mb-4">If you have any questions about this Privacy Policy, You can contact us:</p>
            <ul className="space-y-2">
              <li><span className="font-bold">By email:</span> jaipurkurtigharana@gmail.com</li>
              <li><span className="font-bold">By visiting this page on our website:</span> https://avantaindia.com/contact-us/</li>
              <li><span className="font-bold">By phone number:</span> +91-9784562130.</li>
            </ul>
          </section>
        </div>
      </div>
      <CraftsmanshipSection />
    </div>
  );
};

export default PrivacyPolicy;