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
  
  // Load page and shared content
  const pageContent = await loadPageContent('homepage');
  const requestTechnicianModalContent = await loadSharedContent('components/requestTechnicianModal');

  if (!pageContent) {
    return <div>Page not found</div>;
  }
  
  // Get localized content for the current locale
  const localizedPageContent = getLocalizedContent(pageContent, locale);
  const localizedModalContent = getLocalizedSharedContent(requestTechnicianModalContent, locale);

  // Build component props from content with shared content resolution
  const components = await Promise.all(pageContent.components.map(async (component) => {
    let contentData = localizedPageContent[component.contentKey] || {};
    
    // Handle shared content references
    if (typeof contentData === 'string' && contentData.startsWith('shared:')) {
      const sharedContentKey = contentData.replace('shared:', '');
      const sharedContent = await loadSharedContent(`components/${sharedContentKey}`);
      contentData = getLocalizedSharedContent(sharedContent, locale);
    }
    
    let props: { [key: string]: any } = { 
      translations: contentData, 
      locale: locale 
    };

    // Add modal translations to components that need them
    if (component.type === 'Hero' || component.type === 'FreeDiagnostics' || component.type === 'Features' || component.type === 'Testimonials' || component.type === 'WhyChooseUs') {
      props.translations = {
        ...contentData,
        request_technician_modal: localizedModalContent
      };
    }

    return {
      type: component.type,
      props: props
    };
  }));

  return (
    <ComponentRenderer components={components} />
  );
}
