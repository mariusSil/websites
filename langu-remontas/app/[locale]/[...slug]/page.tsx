import { ComponentRenderer } from '@/components/ComponentRenderer';
import { isValidLocale, defaultLocale, type Locale } from '@/lib/i18n';
import { resolvePageBySlug, getLocalizedContent, generatePageMetadata, type PageContent, type CollectionItem } from '@/content/lib/content-resolver';
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
  return 'pageId' in content && 'components' in content;
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
    const components = content.components.map((component: any) => {
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
            props: contentData
          };
      }
    });

    return <ComponentRenderer components={components} />;
  } 
  
  if (isCollectionItem(content)) {
    // Collection item (service, news article, etc.)
    const localizedContent = content.content[locale] || content.content.en || {};
    
    // For collection items, create a simple page structure
    const components = [
      {
        type: 'PageHeader',
        props: {
          title: content.seo[locale]?.title || content.seo.en?.title || 'Article',
          subtitle: content.seo[locale]?.description || content.seo.en?.description || ''
        }
      },
      {
        type: 'Content',
        props: {
          content: localizedContent.components ? 
            localizedContent.components.map((comp: any) => comp.content || '').join('\n\n') :
            'Content coming soon...'
        }
      }
    ];

    return <ComponentRenderer components={components} />;
  }

  // Fallback
  notFound();
}
