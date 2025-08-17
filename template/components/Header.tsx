'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { type Locale } from '@/lib/i18n';

interface NavigationItem {
  key: string;
  href: string;
  label: string;
}

interface HeaderProps {
  locale: Locale;
  translations: {
    navigation: Record<string, string>;
    common: Record<string, string>;
  };
  navigationItems?: NavigationItem[];
  logo?: {
    text?: string;
    image?: string;
    href?: string;
  };
  className?: string;
}

export function Header({ 
  locale, 
  translations, 
  navigationItems = [],
  logo = { text: 'AI Template', href: `/${locale}` },
  className = ''
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Default navigation items if none provided
  const defaultNavItems: NavigationItem[] = [
    { key: 'home', href: `/${locale}`, label: translations.navigation.home || 'Home' },
    { key: 'about', href: `/${locale}/${locale === 'lt' ? 'apie-mus' : 'about'}`, label: translations.navigation.about || 'About' },
    { key: 'contact', href: `/${locale}/${locale === 'lt' ? 'kontaktai' : 'contact'}`, label: translations.navigation.contact || 'Contact' },
  ];

  const navItems = navigationItems.length > 0 ? navigationItems : defaultNavItems;

  const isActiveLink = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    }
    return pathname.startsWith(href);
  };

  return (
    <header className={`bg-white shadow-sm border-b border-neutral-200 ${className}`}>
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href={logo.href || `/${locale}`} className="flex items-center">
              {logo.image ? (
                <img 
                  src={logo.image} 
                  alt={logo.text || 'Logo'} 
                  className="h-8 w-auto"
                />
              ) : (
                <span className="text-xl font-bold text-navy-900">
                  {logo.text || 'AI Template'}
                </span>
              )}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`nav-link ${
                  isActiveLink(item.href)
                    ? 'nav-link-active'
                    : 'nav-link-inactive'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Language Switcher & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher currentLocale={locale} />
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-button text-neutral-700 hover:text-primary-600 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-colors duration-200"
              aria-expanded="false"
              aria-label={translations.common.openMenu || 'Open menu'}
            >
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-neutral-200">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${
                    isActiveLink(item.href)
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
