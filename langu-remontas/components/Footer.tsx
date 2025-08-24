import Link from 'next/link';
import { type Locale } from '@/lib/i18n';

interface FooterProps {
  locale: Locale;
  translations: {
    footer: Record<string, string>;
    navigation: Record<string, string>;
  };
  className?: string;
  companyName?: string;
  socialLinks?: Array<{
    name: string;
    href: string;
    icon: string;
  }>;
}

export function Footer({ 
  locale, 
  translations, 
  className = '',
  companyName = 'AI Website Template',
  socialLinks = []
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { key: 'home', href: `/${locale}`, label: translations.navigation.home || 'Home' },
    { key: 'about', href: `/${locale}/${locale === 'lt' ? 'apie-mus' : 'about'}`, label: translations.navigation.about || 'About' },
    { key: 'contact', href: `/${locale}/${locale === 'lt' ? 'kontaktai' : 'contact'}`, label: translations.navigation.contact || 'Contact' },
  ];

  return (
    <footer className={`bg-navy-900 text-white ${className}`}>
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4 text-white">{companyName}</h3>
            <p className="text-neutral-300 mb-4">
              {locale === 'lt' 
                ? 'Modernus svetainės šablonas sukurtas su Next.js ir AI technologijomis.'
                : 'Modern website template built with Next.js and AI technology.'
              }
            </p>
            
            {/* Trust Indicators */}
            <div className="mb-4 space-y-2">
              <div className="trust-indicator">
                <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-neutral-300">
                  {locale === 'lt' ? 'Licencijuota ir apdraustas' : 'Licensed & Insured'}
                </span>
              </div>
              <div className="trust-indicator">
                <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-neutral-300">
                  {locale === 'lt' ? '10+ metų patirtis' : '10+ Years Experience'}
                </span>
              </div>
              <div className="trust-indicator">
                <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-neutral-300">
                  {locale === 'lt' ? 'Garantija 5 metai' : '5-Year Warranty'}
                </span>
              </div>
            </div>

            {socialLinks.length > 0 && (
              <div className="flex space-x-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                    aria-label={link.name}
                  >
                    <span className="text-xl">{link.icon}</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white">
              {locale === 'lt' ? 'Nuorodos' : 'Quick Links'}
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-neutral-300 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white">
              {locale === 'lt' ? 'Kontaktai' : 'Contact'}
            </h4>
            <ul className="space-y-2 mb-6">
              <li className="trust-indicator">
                <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="text-neutral-300">(555) 123-4567</span>
              </li>
              <li className="trust-indicator">
                <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="text-neutral-300">info@example.com</span>
              </li>
            </ul>
            
            <h5 className="text-xs font-semibold uppercase tracking-wider mb-2 text-neutral-400">
              {locale === 'lt' ? 'Teisinė informacija' : 'Legal'}
            </h5>
            <ul className="space-y-1">
              <li>
                <Link
                  href={`/${locale}/privacy`}
                  className="text-neutral-400 hover:text-primary-400 transition-colors duration-200 text-sm"
                >
                  {translations.footer.privacyPolicy || 'Privacy Policy'}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/terms`}
                  className="text-neutral-400 hover:text-primary-400 transition-colors duration-200 text-sm"
                >
                  {translations.footer.termsOfService || 'Terms of Service'}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-navy-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm">
            {translations.footer.copyright?.replace('{year}', currentYear.toString()) || 
             `© ${currentYear} ${companyName}. All rights reserved.`}
          </p>
          <div className="flex items-center space-x-4 mt-2 sm:mt-0">
            <p className="text-neutral-400 text-sm">
              {locale === 'lt' ? 'Sukurta su' : 'Built with'} ❤️ {locale === 'lt' ? 'ir' : 'and'} Next.js
            </p>
            <div className="trust-badge">
              {locale === 'lt' ? 'A+ BBB reitingas' : 'A+ BBB Rating'}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
