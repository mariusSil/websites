'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { locales, type Locale } from '@/lib/i18n';

interface LanguageSwitcherProps {
  currentLocale: Locale;
  className?: string;
}

const localeNames: Record<Locale, { name: string; flag: string }> = {
  en: { name: 'English', flag: '🇺🇸' },
  lt: { name: 'Lietuvių', flag: '🇱🇹' },
};

export function LanguageSwitcher({ currentLocale, className = '' }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const switchLanguage = (newLocale: Locale) => {
    if (newLocale === currentLocale) {
      setIsOpen(false);
      return;
    }

    // Extract the current path without locale
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '') || '';
    
    // Map current path to new locale path
    let newPath = `/${newLocale}${pathWithoutLocale}`;
    
    // Handle localized URLs mapping
    if (pathWithoutLocale) {
      const pathSegments = pathWithoutLocale.split('/').filter(Boolean);
      if (pathSegments.length > 0) {
        const currentSlug = pathSegments[0];
        
        // Map common localized slugs
        const slugMapping: Record<string, Record<Locale, string>> = {
          'about': { en: 'about', lt: 'apie-mus' },
          'apie-mus': { en: 'about', lt: 'apie-mus' },
          'contact': { en: 'contact', lt: 'kontaktai' },
          'kontaktai': { en: 'contact', lt: 'kontaktai' },
        };

        // Find the page ID from current slug
        let pageId = currentSlug;
        for (const [id, mapping] of Object.entries(slugMapping)) {
          if (Object.values(mapping).includes(currentSlug as any)) {
            pageId = id;
            break;
          }
        }

        // Get the new slug for target locale
        const mapping = slugMapping[pageId];
        if (mapping && mapping[newLocale]) {
          newPath = `/${newLocale}/${mapping[newLocale]}`;
        }
      }
    }

    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors duration-200"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="text-lg">{localeNames[currentLocale].flag}</span>
        <span className="hidden sm:block">{localeNames[currentLocale].name}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1" role="menu">
            {locales.map((locale) => (
              <button
                key={locale}
                onClick={() => switchLanguage(locale)}
                className={`flex items-center space-x-3 w-full px-4 py-2 text-sm transition-colors duration-200 ${
                  locale === currentLocale
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                }`}
                role="menuitem"
              >
                <span className="text-lg">{localeNames[locale].flag}</span>
                <span>{localeNames[locale].name}</span>
                {locale === currentLocale && (
                  <svg className="w-4 h-4 ml-auto text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
