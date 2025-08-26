import React from 'react';
import Image from 'next/image';

interface Partner {
  alt: string;
  src: string;
}

interface PartnersProps {
  content: {
    title: string;
    subtitle: string;
    logos: Partner[];
  };
  locale: string;
}

const Partners = ({ content, locale }: PartnersProps) => {

  if (!content || !Array.isArray(content.logos) || content.logos.length === 0) {
    return null;
  }

  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="container-custom mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{content.title}</h2>
        <p className="mt-4 text-lg text-gray-600">{content.subtitle}</p>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          {content.logos.map((partner: Partner, index: number) => (
            <Image
              key={index}
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              src={partner.src}
              alt={partner.alt}
              width={158}
              height={48}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partners;
