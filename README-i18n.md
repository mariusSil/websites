# Internationalization (i18n) & SEO Implementation Guide

This template includes a comprehensive internationalization system optimized for SEO performance.

## Features

### 🌍 Multi-language Support
- **English (en)** and **Lithuanian (lt)** locales
- Extensible structure for additional languages
- Type-safe translation utilities

### 🚀 SEO Optimization
- **Dynamic meta tags** per locale
- **Open Graph** and **Twitter Card** support
- **Structured data (JSON-LD)** for rich snippets
- **hreflang tags** for proper search engine indexing
- **Locale-specific sitemaps** with alternate language links
- **Canonical URLs** to prevent duplicate content

### 📁 File Structure
```
messages/
├── en/
│   ├── common.json     # UI elements, navigation, forms
│   ├── pages.json      # Page-specific content
│   └── seo.json        # SEO metadata, OG images
├── lt/
│   ├── common.json
│   ├── pages.json
│   └── seo.json
└── lib/i18n.ts         # Translation utilities
```

## Usage Examples

### Basic Page Implementation
```tsx
import { loadTranslations, useTranslations, isValidLocale, defaultLocale, type Locale } from '@/lib/i18n';

export default async function Page({ params }: { params: { locale: string } }) {
  const locale: Locale = isValidLocale(params.locale) ? params.locale : defaultLocale;
  const translations = await loadTranslations(locale);
  const { t, common } = useTranslations(translations);

  return (
    <div>
      <h1>{t('homepage.hero.title')}</h1>
      <button>{common('buttons.getStarted')}</button>
    </div>
  );
}
```

### SEO Metadata Generation
```tsx
import { generateSEOMetadata } from '@/lib/i18n';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const locale = isValidLocale(params.locale) ? params.locale : defaultLocale;
  return await generateSEOMetadata(locale, 'about', 'https://example.com');
}
```

## Translation File Structure

### SEO Configuration (`seo.json`)
```json
{
  "meta": {
    "title": "Page Title",
    "description": "Page description for search engines",
    "keywords": "relevant, keywords, for, seo"
  },
  "openGraph": {
    "title": "Social media title",
    "description": "Social media description",
    "image": "/images/og/en-homepage.jpg",
    "imageAlt": "Alt text for OG image"
  },
  "structuredData": {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Site Name"
  }
}
```

### Page Content (`pages.json`)
```json
{
  "homepage": {
    "hero": {
      "title": "Welcome Message",
      "subtitle": "Descriptive subtitle"
    }
  }
}
```

## SEO Best Practices Implemented

1. **Proper hreflang tags** - Search engines understand language variants
2. **Locale-specific OG images** - Better social media sharing
3. **Structured data** - Enhanced search result snippets
4. **Canonical URLs** - Prevents duplicate content penalties
5. **Dynamic sitemaps** - All locale pages indexed properly

## Adding New Languages

1. Create new locale folder: `messages/[locale]/`
2. Add translation files: `common.json`, `pages.json`, `seo.json`
3. Update `locales` array in `lib/i18n.ts`
4. Add OG images: `public/images/og/[locale]-*.jpg`

## Environment Variables

```env
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_NAME=Your Site Name
NEXT_PUBLIC_DEFAULT_LOCALE=en
```

## Generated URLs

- English: `/en`, `/en/about`, `/en/contact`
- Lithuanian: `/lt`, `/lt/about`, `/lt/contact`
- Sitemap: `/sitemap.xml` (includes all locales with hreflang)
- Robots: `/robots.txt`

This implementation ensures maximum SEO performance while maintaining clean, maintainable code structure.
