'use client';

import React, { useState } from 'react';
import Icon from '../ui/Icon';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqProps {
  translations: {
    title: string;
    items: FaqItem[];
  };
  locale: string;
}

const Faq = ({ translations, locale }: FaqProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Handle undefined content gracefully
  if (!translations || !translations.title || !translations.items) {
    console.error('FAQ component received invalid translations:', translations);
    return (
      <section className="bg-white py-12 sm:py-16">
        <div className="container-custom mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">FAQ</h2>
            <p className="mt-4 text-gray-600">FAQ content is loading...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="container-custom mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">{translations.title}</h2>
        </div>
        <div className="mt-12 mx-auto max-w-4xl">
          <div className="divide-y divide-gray-200">
            {translations.items.map((item: FaqItem, index: number) => (
              <div key={index} className="py-6">
                <dt>
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex w-full items-start justify-between text-left text-gray-900"
                  >
                    <span className="text-base font-semibold leading-7">{item.question}</span>
                    <span className="ml-6 flex h-7 items-center">
                      <Icon name={openIndex === index ? 'Minus' : 'Plus'} className="h-6 w-6" />
                    </span>
                  </button>
                </dt>
                {openIndex === index && (
                  <dd className="mt-2 pr-12">
                    <p className="text-base leading-7 text-gray-600">{item.answer}</p>
                  </dd>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
