import { ComponentRenderer } from '@/components/ComponentRenderer';
import { isValidLocale, defaultLocale, type Locale } from '@/lib/i18n';
import { loadPageContent, getLocalizedContent, loadSharedContent, getLocalizedSharedContent, generateFallbackSEO, getPageSEO } from '@/content/lib/content-resolver';
import { Metadata } from 'next';

// Generate static params for supported locales
export function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'lt' }
  ];
}

interface PageProps {
  params: {
    locale: string;
  };
}

// Generate metadata for homepage
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = isValidLocale(params.locale) ? params.locale : defaultLocale;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com';
  
  // Load shared content for fallback SEO data
  const commonContent = await loadSharedContent('common');
  const localizedCommon = getLocalizedSharedContent(commonContent, locale);
  const siteName = localizedCommon?.site?.name || 'Website';
  
  // Generate fallback SEO data from common content
  const fallbackSEO = generateFallbackSEO(commonContent, locale, baseUrl);
  
  // Try to load homepage content, but use fallback if not available
  const pageContent = await loadPageContent('homepage');
  let seoData = fallbackSEO;
  
  if (pageContent) {
    // Use page content with fallback support
    seoData = getPageSEO(pageContent, locale, fallbackSEO);
  }
  
  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    
    // Open Graph
    openGraph: {
      title: seoData.title,
      description: seoData.description,
      type: 'website',
      locale: locale === 'lt' ? 'lt_LT' : 'en_US',
      siteName: siteName,
      images: [{
        url: seoData.ogImage,
        alt: seoData.ogImageAlt,
        width: 1200,
        height: 630,
      }],
    },

    // Twitter
    twitter: {
      card: 'summary_large_image',
      title: seoData.title,
      description: seoData.description,
      images: [seoData.ogImage],
    },
  };
}

export default async function HomePage({ params }: PageProps) {
  const locale: Locale = isValidLocale(params.locale) ? params.locale : defaultLocale;
  
  // Load page content using new content system
  const pageContent = await loadPageContent('homepage');
  
  if (!pageContent) {
    return <div>Page not found</div>;
  }

  // Get localized content for the current locale
  const localizedContent = getLocalizedContent(pageContent, locale);

  // Build component props from content
  const components = pageContent.components.map(component => {
    const contentData = localizedContent[component.contentKey] || {};
    
    switch (component.type) {
      case 'Hero':
        return {
          type: 'Hero',
          props: {
            title: contentData.title || 'Welcome to Our Website',
            subtitle: contentData.subtitle || 'Building amazing experiences with modern technology',
            ctaText: contentData.ctaText || 'Get Started',
            ctaLink: `/${locale}${contentData.ctaLink || '/contact'}`
          }
        };
      case 'ServiceCards':
        return {
          type: 'ServiceCards',
          props: {
            title: contentData.title || 'Our Features',
            subtitle: contentData.subtitle || '',
            services: (contentData.items || []).map((item: any, index: number) => ({
              id: `service-${index}`,
              title: item.title || '',
              description: item.description || '',
              icon: <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-primary-500 rounded"></div>
              </div>,
              features: item.features || []
            }))
          }
        };
      default:
        return {
          type: component.type,
          props: contentData
        };
    }
  });

  return (
    <ComponentRenderer components={components} />
  );
}
