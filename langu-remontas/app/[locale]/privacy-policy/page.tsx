import { notFound } from 'next/navigation';
import { isValidLocale, type Locale } from '@/lib/i18n';
import { loadPageContent, getLocalizedContent } from '@/content/lib/content-resolver';
import PrivacyPolicy from '@/components/pages/PrivacyPolicy';

interface PageProps {
  params: { locale: Locale };
}

export default async function PrivacyPolicyPage({ params }: PageProps) {
  const { locale } = params;
  
  if (!isValidLocale(locale)) {
    notFound();
  }

  const pageContent = await loadPageContent('privacy-policy');
  if (!pageContent) {
    return <div>Page not found</div>;
  }

  const localizedContent = getLocalizedContent(pageContent, locale);

  return <PrivacyPolicy translations={localizedContent} locale={locale} />;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = params;
  
  if (!isValidLocale(locale)) {
    return {};
  }

  const pageContent = await loadPageContent('privacy-policy');
  if (!pageContent) {
    return {};
  }

  const seoData = pageContent.seo[locale] || pageContent.seo.en;
  
  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    alternates: {
      canonical: `https://languremontas.com/${locale}/privacy-policy`
    },
    openGraph: {
      title: seoData.title,
      description: seoData.description,
      type: 'website',
      images: seoData.ogImage ? [{ url: seoData.ogImage, alt: seoData.ogImageAlt }] : []
    }
  };
}
