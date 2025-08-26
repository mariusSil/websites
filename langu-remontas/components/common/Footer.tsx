import Link from 'next/link';
import Icon from '@/components/ui/Icon';

interface FooterLink {
  text: string;
  href: string;
}

interface SocialLink {
  name: string;
  icon: string;
  href: string;
}

interface FooterProps {
  translations: {
    redesign: {
      footer: {
        logoText: string;
        description: string;
        navigationTitle: string;
        servicesTitle: string;
        contactTitle: string;
        copyright: string;
        contactInfo: {
          address: string;
          phone: string;
          email: string;
        };
        socialLinks: SocialLink[];
      };
    };
    navigation: {
      items: FooterLink[];
    };
    services: {
      items: FooterLink[]; 
    };
  };
  className?: string;
}

// Map string icon names to Lucide icons
const socialIconMap: { [key: string]: string } = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  linkedin: 'Linkedin'
};

export function Footer({ translations, className = '' }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const { footer, navigation, services } = translations.redesign ? 
    { 
      footer: translations.redesign.footer,
      navigation: translations.navigation.items,
      services: translations.services.items
    } : {
      footer: {} as any, 
      navigation: [], 
      services: []
    };

  if (!translations.redesign) return null; // Or render legacy footer

  return (
    <footer className={`bg-secondary text-white ${className}`}>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <h3 className="text-xl font-bold mb-4 text-white">{footer.logoText}</h3>
            <p className="text-gray-400 text-sm">{footer.description}</p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white">{footer.navigationTitle}</h4>
            <ul className="space-y-2">
              {navigation?.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white">{footer.servicesTitle}</h4>
            <ul className="space-y-2">
              {services?.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white">{footer.contactTitle}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <Icon name="MapPin" className="h-4 w-4 text-primary mr-3 mt-1" />
                <span className="text-gray-400">{footer.contactInfo.address}</span>
              </li>
              <li className="flex items-center">
                <Icon name="Phone" className="h-4 w-4 text-primary mr-3" />
                <a href={`tel:${footer.contactInfo.phone}`} className="text-gray-400 hover:text-white">{footer.contactInfo.phone}</a>
              </li>
              <li className="flex items-center">
                <Icon name="Mail" className="h-4 w-4 text-primary mr-3" />
                <a href={`mailto:${footer.contactInfo.email}`} className="text-gray-400 hover:text-white">{footer.contactInfo.email}</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            {footer.copyright?.replace('{year}', currentYear.toString())}
          </p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            {footer.socialLinks?.map((link: SocialLink) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label={link.name}
              >
                <Icon name={socialIconMap[link.icon] as any} className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
