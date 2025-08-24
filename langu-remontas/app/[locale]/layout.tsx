import type { Metadata } from 'next';
import { isValidLocale, defaultLocale, type Locale } from '@/lib/i18n';
import { loadPageContent, getPageSEO, loadSharedContent, getLocalizedSharedContent, generateFallbackSEO } from '@/content/lib/content-resolver';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

// Static metadata to avoid hydration issues
export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon.svg', type: 'image/svg+xml' }
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.webmanifest',
};

export default async function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  const validLocale: Locale = isValidLocale(locale) ? locale : defaultLocale;
  
  // Load homepage content for structured data
  const pageContent = await loadPageContent('homepage');
  const structuredData = pageContent?.seo[validLocale]?.structuredData ? 
    JSON.stringify(pageContent.seo[validLocale].structuredData) : '';
  
  // Load shared content for header and footer
  const navigationContent = await loadSharedContent('navigation');
  const commonContent = await loadSharedContent('common');
  const footerContent = await loadSharedContent('footer');
  
  const localizedNavigation = getLocalizedSharedContent(navigationContent, validLocale);
  const localizedCommon = getLocalizedSharedContent(commonContent, validLocale);
  const localizedFooter = getLocalizedSharedContent(footerContent, validLocale);

  return (
    <>
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredData }}
        />
      )}
      <div className="min-h-screen bg-white flex flex-col">
        <Header 
          locale={validLocale}
          translations={{
            navigation: localizedNavigation || {},
            common: localizedCommon || {}
          }}
        />
        <main className="flex-1">
          {children}
        </main>
        <Footer 
          locale={validLocale}
          translations={{
            footer: localizedFooter || {},
            navigation: localizedNavigation || {}
          }}
        />
      </div>
    </>
  );
}
