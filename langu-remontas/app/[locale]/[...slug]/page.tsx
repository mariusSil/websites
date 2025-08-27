import { ComponentRenderer } from '@/components/ComponentRenderer';
import { isValidLocale, defaultLocale, type Locale } from '@/lib/i18n';
import { resolvePageBySlug, getLocalizedContent, generatePageMetadata, getFinalPageComponents, loadSharedContent, getLocalizedSharedContent, type PageContent, type CollectionItem } from '@/content/lib/content-resolver';
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
  const content = await resolvePageBySlug(locale, slugPath);
  
  if (!content) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
    };
  }

  // Handle both regular pages and collection items
  const seoData = content.seo[locale] || content.seo.en;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com';
  
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
      siteName: 'Langu Remontas',
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

function isPageContent(content: PageContent | CollectionItem): content is PageContent {
  return 'pageId' in content;
}

function isCollectionItem(content: PageContent | CollectionItem): content is CollectionItem {
  return 'itemId' in content && 'collection' in content;
}

export default async function DynamicPage({ params }: PageProps) {
  const locale: Locale = isValidLocale(params.locale) ? params.locale : defaultLocale;
  const slugPath = params.slug?.join('/') || '';
  
  // Resolve page content by slug
  const content = await resolvePageBySlug(locale, slugPath);
  
  if (!content) {
    notFound();
  }

  // Handle different content types
  if (isPageContent(content)) {
    // Regular page with components
    const localizedContent = getLocalizedContent(content, locale);
    
    // Get final components (page-specific + defaults with overrides)
    const finalComponents = getFinalPageComponents(content);
    
    const components = await Promise.all(finalComponents.map(async (component: any) => {
      let contentData = localizedContent[component.contentKey] || {};
      
      // Handle custom content from overrides
      if (component.customContent) {
        const customContent = component.customContent;
        contentData = customContent[locale] || customContent.en || customContent;
      }
      // Handle shared content references (like homepage does)
      else if (typeof contentData === 'string' && contentData.startsWith('shared:')) {
        const sharedContentKey = contentData.replace('shared:', '');
        const sharedContent = await loadSharedContent(`components/${sharedContentKey}`);
        contentData = getLocalizedSharedContent(sharedContent, locale);
      }
      // Handle direct shared content references in contentKey (About page pattern)
      else if (typeof component.contentKey === 'string' && component.contentKey.startsWith('shared:')) {
        const sharedContentKey = component.contentKey.replace('shared:', '');
        const sharedContent = await loadSharedContent(`components/${sharedContentKey}`);
        contentData = getLocalizedSharedContent(sharedContent, locale);
      }
      
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
                : contentData
            }
          };
        case 'ContactForm':
          return {
            type: 'ContactForm',
            props: contentData
          };
        case 'PrivacyPolicy':
          return {
            type: 'PrivacyPolicy',
            props: {
              locale,
              sections: contentData || []
            }
          };
        default:
          return {
            type: component.type,
            props: {
              translations: contentData,
              locale: locale
            }
          };
      }
    }));

    return <ComponentRenderer components={components} />;
  } 
  
  if (isCollectionItem(content)) {
    // Collection item (service, news article, etc.) - use full component system
    const localizedContent = content.content[locale] || content.content.en || {};
    
    // Import collection-specific functions
    const { getFinalCollectionComponents } = await import('@/content/lib/content-resolver');
    const finalComponents = getFinalCollectionComponents(content);

    // Process components similar to regular pages
    const components = await Promise.all(finalComponents.map(async (component: any) => {
      let contentData = localizedContent[component.contentKey] || {};
      
      // Handle custom content from overrides
      if (component.customContent) {
        const customContent = component.customContent;
        contentData = customContent[locale] || customContent.en || customContent;
      }
      // Handle shared content references
      else if (typeof contentData === 'string' && contentData.startsWith('shared:')) {
        const sharedContentKey = contentData.replace('shared:', '');
        const sharedContent = await loadSharedContent(`components/${sharedContentKey}`);
        contentData = getLocalizedSharedContent(sharedContent, locale);
      }
      // Handle direct shared content references in contentKey
      else if (typeof component.contentKey === 'string' && component.contentKey.startsWith('shared:')) {
        const sharedContentKey = component.contentKey.replace('shared:', '');
        const sharedContent = await loadSharedContent(`components/${sharedContentKey}`);
        contentData = getLocalizedSharedContent(sharedContent, locale);
      }
      
      return {
        type: component.type,
        props: {
          translations: contentData,
          locale: locale
        }
      };
    }));

    // Add structured data for collection items
    const structuredData = content.collection === 'services' ? {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": localizedContent.hero?.title || content.seo[locale]?.title,
      "description": localizedContent.hero?.subtitle || content.seo[locale]?.description,
      "provider": {
        "@type": "Organization",
        "name": "Langu Remontas",
        "url": process.env.NEXT_PUBLIC_BASE_URL || 'https://langu-remontas.com'
      }
    } : null;

    return (
      <>
        {structuredData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(structuredData),
            }}
          />
        )}
        <ComponentRenderer components={components} />
      </>
    );
  }

  // Fallback
  notFound();
}
