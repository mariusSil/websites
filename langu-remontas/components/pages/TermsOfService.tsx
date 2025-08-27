'use client';

import { type Locale } from '@/lib/i18n';

interface TermsOfServiceProps {
  translations: {
    pageHeader: {
      title: string;
      subtitle: string;
      lastUpdated: string;
    };
    sections: Array<{
      title: string;
      content: string;
    }>;
  };
  locale: Locale;
}

export default function TermsOfService({ translations, locale }: TermsOfServiceProps) {
  const { pageHeader, sections } = translations;

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {pageHeader.title}
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            {pageHeader.subtitle}
          </p>
          <p className="text-sm text-gray-500">
            {pageHeader.lastUpdated}
          </p>
        </div>

        {/* Terms Sections */}
        <div className="prose prose-lg max-w-none">
          {sections.map((section, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {section.title}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Questions About These Terms?
          </h3>
          <p className="text-gray-700">
            If you have any questions about these Terms of Service, please contact us using the information provided on our website.
          </p>
        </div>
      </div>
    </div>
  );
}
