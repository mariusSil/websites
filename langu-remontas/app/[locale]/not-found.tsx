import { Metadata } from 'next';
import Link from 'next/link';
import { type Locale } from '@/lib/i18n';
import { loadSharedContent, getLocalizedSharedContent, getFinalPageComponents } from '@/content/lib/content-resolver';
import { Button } from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import { CTAButtons } from '@/components/common/CTAButtons';
import { GoBackButton } from '@/components/common/GoBackButton';
import { ComponentRenderer } from '@/components/ComponentRenderer';
import { detectLocaleForNotFound } from '@/lib/locale-detection';

// SEO metadata for 404 page
export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for could not be found.',
  robots: 'noindex, nofollow',
};

export default async function NotFound() {
  // Detect locale using multiple strategies (referrer, headers, etc.)
  const locale: Locale = await detectLocaleForNotFound();
  
  // Load shared content for 404 translations
  const commonContent = await loadSharedContent('common');
  const localizedContent = getLocalizedSharedContent(commonContent, locale);
  const notFoundContent = localizedContent?.notFound;

  // Fallback content if translations are missing
  const fallbackContent = {
    title: 'Page Not Found',
    subtitle: '404 Error',
    description: "The page you're looking for doesn't exist or has been moved.",
    suggestions: {
      title: 'What can you do?',
      items: [
        'Check the URL for typos',
        'Go back to the previous page',
        'Visit our homepage',
        'Contact us for assistance'
      ]
    },
    navigation: {
      homepage: 'Go to Homepage',
      services: 'Our Services',
      contact: 'Contact Us',
      goBack: 'Go Back'
    }
  };

  const content = notFoundContent || fallbackContent;

  // Create mock page content for shared components integration
  const mock404PageContent = {
    pageId: 'not-found',
    template: 'default',
    seo: {
      en: { title: '404 - Page Not Found', description: 'The page you are looking for could not be found.', keywords: '404, not found', ogImage: '', ogImageAlt: '' },
      lt: { title: '404 - Puslapis nerastas', description: 'Ieškomas puslapis nerastas.', keywords: '404, nerasta', ogImage: '', ogImageAlt: '' },
      pl: { title: '404 - Strona nie znaleziona', description: 'Strona której szukasz nie została znaleziona.', keywords: '404, nie znaleziono', ogImage: '', ogImageAlt: '' },
      uk: { title: '404 - Сторінка не знайдена', description: 'Сторінка, яку ви шукаєте, не знайдена.', keywords: '404, не знайдено', ogImage: '', ogImageAlt: '' }
    },
    content: { en: {}, lt: {}, pl: {}, uk: {} },
    components: [],
    componentOverrides: {
      'ServiceCards': { contentKey: 'shared:servicecards' },
      'Testimonials': { contentKey: 'shared:testimonials' },
      'Faq': { contentKey: 'shared:faq' },
      'Partners': { disabled: true }, // Disable partners on 404
      'TechnicianTeam': { disabled: true } // Disable team on 404
    }
  };

  // Get final components with defaults
  const finalComponents = getFinalPageComponents(mock404PageContent);
  
  // Build component props from content with shared content resolution
  const components = await Promise.all(finalComponents.map(async (component) => {
    let contentData = {};
    
    // Handle shared content references
    if (typeof component.contentKey === 'string' && component.contentKey.startsWith('shared:')) {
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

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Main 404 Content */}
      <section className="py-section">
        <div className="container-custom max-w-4xl mx-auto text-center">
          {/* 404 Icon and Error Message */}
          <div className="mb-12">
          <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
            <Icon name="X" className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-6xl font-bold text-red-600 mb-2">
            {content.subtitle || '404'}
          </h1>
          
          <h2 className="text-h1 text-secondary mb-4">
            {content.title}
          </h2>
          
          <p className="text-body text-neutral-600 max-w-2xl mx-auto mb-8">
            {content.description}
          </p>
        </div>

          {/* Suggestions Section */}
          {content.suggestions && (
            <div className="mb-12">
            <h3 className="text-h2 text-secondary mb-6">
              {content.suggestions.title}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
              {content.suggestions.items.map((suggestion: string, index: number) => (
                <div key={index} className="flex items-center text-left p-4 bg-white rounded-lg shadow-sm">
                  <Icon name="Check" className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" />
                  <span className="text-body text-neutral-700">{suggestion}</span>
                </div>
              ))}
            </div>
          </div>
        )}

          {/* Navigation Buttons */}
          <div className="mb-12">
          

          {/* Go Back Button - Client-side only */}
          <div className="text-center">
            <GoBackButton text={content.navigation?.goBack || 'Go Back'} />
          </div>
        </div>

          {/* CTA Section */}
          <div className="bg-white rounded-lg shadow-sm p-8 max-w-2xl mx-auto mb-12">
          <h3 className="text-h2 text-secondary mb-4">
            Need Help Finding What You're Looking For?
          </h3>
          <p className="text-body text-neutral-600 mb-6">
            Our expert team is here to help. Get in touch for immediate assistance with your window and door needs.
          </p>
          
          {/* CTA Buttons with proper translations */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <CTAButtons
            locale={locale}
            translations={localizedContent}
            technicianProps={{ variant: "default", size: "default" }}
            consultationProps={{ variant: "outline-red", size: "default" }}
            layout="horizontal"
          />
          </div>
          </div>
        </div>
      </section>

      {/* Shared Components */}
      <ComponentRenderer components={components} />
    </div>
  );
}
