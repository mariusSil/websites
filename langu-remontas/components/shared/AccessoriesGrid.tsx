import React from 'react';
import { Button } from '@/components/ui/Button';
import { RequestTechnicianButton } from './RequestTechnicianButton';
import Icon from '@/components/ui/Icon';
import Image from 'next/image';
import { loadSharedContent, getLocalizedSharedContent } from '@/content/lib/content-resolver';
import { isValidLocale, type Locale } from '@/lib/i18n';

interface AccessoryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  priceFrom: string;
  category: 'handles' | 'security' | 'ventilation' | 'protection' | 'hardware';
}

interface ModalTranslations {
  triggerButton: string;
  title: string;
  nameLabel: string;
  namePlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  cityLabel: string;
  cityPlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  privacyPolicyText: string;
  privacyPolicyLink: string;
  submitButton: string;
}

interface AccessoriesGridProps {
  locale: Locale;
  modalTranslations?: ModalTranslations;
}

interface AccessoriesContent {
  title: string;
  subtitle: string;
  priceFrom: string;
  items: AccessoryItem[];
}

const AccessoryCard: React.FC<{
  item: AccessoryItem;
  translations: { priceFrom: string };
  locale: Locale;
  modalTranslations: ModalTranslations;
}> = ({ item, translations, locale, modalTranslations }) => {

  return (
    <div className="bg-white rounded-card border border-neutral-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Product Image */}
      <div className="w-full h-48 relative bg-neutral-100 rounded-t-card overflow-hidden">
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-h3 text-neutral-900 mb-2">{item.title}</h3>
        <p className="text-body text-neutral-600 mb-4 line-clamp-3 min-h-[4.5rem]">
          {item.description}
        </p>
        
        {/* Price */}
        <div className="mb-4">
          <span className="text-sm text-neutral-500">{translations.priceFrom} </span>
          <span className="text-lg font-semibold text-primary">{item.priceFrom}</span>
        </div>
        
        {/* Actions */}
        <div className="flex flex-col gap-2">
          <RequestTechnicianButton
            variant="default" 
            size="sm" 
            className="w-full"
            locale={locale}
            prefillMessage={`I'm interested in ${item.title} - ${item.description}`}
            showIcon={true}
          />
        </div>
      </div>
    </div>
  );
};

export default async function AccessoriesGrid({ locale, modalTranslations }: AccessoriesGridProps) {
  if (!isValidLocale(locale)) {
    return <div>Invalid locale</div>;
  }

  // Load content internally
  const content = await loadSharedContent('components/accessoriesgrid');
  
  if (!content) {
    return <div>Content not found</div>;
  }

  const localizedContent = getLocalizedSharedContent(content, locale) as AccessoriesContent;

  if (!localizedContent || !localizedContent.items) {
    return <div>No accessories content available</div>;
  }

  return (
    <section className="py-20">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-h1 text-neutral-900 mb-4">
            {localizedContent.title}
          </h2>
          <p className="text-body text-neutral-600 max-w-2xl mx-auto">
            {localizedContent.subtitle}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {localizedContent.items.map((item) => (
            <AccessoryCard
              key={item.id}
              item={item}
              translations={{
                priceFrom: localizedContent.priceFrom,
              }}
              modalTranslations={modalTranslations || {
                triggerButton: '',
                title: '',
                nameLabel: '',
                namePlaceholder: '',
                phoneLabel: '',
                phonePlaceholder: '',
                cityLabel: '',
                cityPlaceholder: '',
                emailLabel: '',
                emailPlaceholder: '',
                messageLabel: '',
                messagePlaceholder: '',
                privacyPolicyText: '',
                privacyPolicyLink: '',
                submitButton: ''
              }}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
