import { ComponentRenderer } from '@/components/ComponentRenderer';
import { isValidLocale, defaultLocale, type Locale } from '@/lib/i18n';
import { resolvePageBySlug, getLocalizedContent, generatePageMetadata } from '@/content/lib/content-resolver';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    locale: string;
    slug: string[];
  };
}

// Generate metadata for dynamic pages
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale: Locale = isValidLocale(params.locale) ? params.locale : defaultLocale;
  const slugPath = params.slug?.join('/') || '';
  const pageContent = await resolvePageBySlug(locale, slugPath);
  
  // Use centralized metadata generation with fallback support
  const pageId = pageContent?.pageId || 'unknown';
  const seoData = await generatePageMetadata(pageId, locale);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  return {
    metadataBase: new URL(baseUrl),
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    
    // Open Graph
    openGraph: {
      title: seoData.title,
      description: seoData.description,
      type: 'website',
      locale: locale === 'lt' ? 'lt_LT' : 'en_US',
      siteName: seoData.siteName,
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

export default async function DynamicPage({ params }: PageProps) {
  const locale: Locale = isValidLocale(params.locale) ? params.locale : defaultLocale;
  const slugPath = params.slug?.join('/') || '';
  
  // Resolve page content by slug
  const pageContent = await resolvePageBySlug(locale, slugPath);
  
  if (!pageContent) {
    notFound();
  }

  // Get localized content for the current locale
  const localizedContent = getLocalizedContent(pageContent, locale);

  // Build component props from content
  const components = pageContent.components.map(component => {
    const contentData = localizedContent[component.contentKey] || {};
    
    switch (component.type) {
      case 'PageHeader':
        return {
          type: 'PageHeader',
          props: {
            title: contentData.title || 'Page Title',
            subtitle: contentData.subtitle || ''
          }
        };
      case 'Content':
        return {
          type: 'Content',
          props: {
            content: typeof contentData === 'string' 
              ? contentData 
              : Object.values(contentData).join('\n\n')
          }
        };
      case 'ContactForm':
        return {
          type: 'ContactForm',
          props: contentData
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
