import { type Locale } from '@/lib/i18n';

export interface RouteConfig {
  pageId: string;
  urls: Record<Locale, string>;
  priority: number;
  changefreq: string;
}

export interface PageContent {
  pageId: string;
  template: string;
  seo: Record<Locale, SEOData>;
  content: Record<Locale, any>;
  components: ComponentConfig[];
}

export interface ComponentConfig {
  type: string;
  contentKey: string;
  required: boolean;
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  ogImageAlt: string;
  structuredData?: any;
}

export interface RoutesConfig {
  routes: RouteConfig[];
  defaultLocale: Locale;
  supportedLocales: Locale[];
}

// Cache for loaded configurations
const routesConfigCache = new Map<string, RoutesConfig>();
const pageContentCache = new Map<string, PageContent>();
const sharedContentCache = new Map<string, any>();

// Load main routes configuration
export async function loadRoutesConfig(): Promise<RoutesConfig> {
  const cacheKey = 'routes';
  
  if (routesConfigCache.has(cacheKey)) {
    return routesConfigCache.get(cacheKey)!;
  }

  try {
    const config = await import('@/content/routes.json');
    const routesConfig = config.default as RoutesConfig;
    routesConfigCache.set(cacheKey, routesConfig);
    return routesConfig;
  } catch (error) {
    console.error('Failed to load routes configuration:', error);
    throw new Error('Routes configuration not found');
  }
}

// Load complete page content
export async function loadPageContent(pageId: string): Promise<PageContent | null> {
  if (pageContentCache.has(pageId)) {
    return pageContentCache.get(pageId)!;
  }

  try {
    const content = await import(`@/content/pages/${pageId}.json`);
    const pageContent = content.default as PageContent;
    pageContentCache.set(pageId, pageContent);
    return pageContent;
  } catch (error) {
    console.warn(`Page content not found: ${pageId}`);
    return null;
  }
}

// Load shared content
export async function loadSharedContent(contentType: string): Promise<any> {
  const cacheKey = contentType;
  
  if (sharedContentCache.has(cacheKey)) {
    return sharedContentCache.get(cacheKey)!;
  }

  try {
    const content = await import(`@/content/shared/${contentType}.json`);
    const sharedContent = content.default;
    sharedContentCache.set(cacheKey, sharedContent);
    return sharedContent;
  } catch (error) {
    console.warn(`Shared content not found: ${contentType}`);
    return {};
  }
}

// Resolve page by URL slug
export async function resolvePageBySlug(locale: Locale, slug: string): Promise<PageContent | null> {
  const routesConfig = await loadRoutesConfig();
  const route = routesConfig.routes.find(r => r.urls[locale] === slug);
  
  if (!route) return null;
  
  return await loadPageContent(route.pageId);
}

// Get localized content for a page
export function getLocalizedContent(pageContent: PageContent, locale: Locale): any {
  return pageContent.content[locale] || pageContent.content.en || {};
}

// Get SEO data for a page with fallback support
export function getPageSEO(pageContent: PageContent, locale: Locale, fallbackSEO?: Partial<SEOData>): SEOData {
  const pageSEO = pageContent.seo[locale] || pageContent.seo.en;
  
  // If no fallback provided, return page SEO as-is
  if (!fallbackSEO) {
    return pageSEO;
  }
  
  // Merge page SEO with fallback, prioritizing page data
  return {
    title: pageSEO?.title || fallbackSEO.title || 'Website',
    description: pageSEO?.description || fallbackSEO.description || '',
    keywords: pageSEO?.keywords || fallbackSEO.keywords || '',
    ogImage: pageSEO?.ogImage || fallbackSEO.ogImage || '/og.png',
    ogImageAlt: pageSEO?.ogImageAlt || fallbackSEO.ogImageAlt || fallbackSEO.title || 'Website',
    structuredData: pageSEO?.structuredData || fallbackSEO.structuredData
  };
}

// Generate fallback SEO data from common content
export function generateFallbackSEO(commonContent: any, locale: Locale, baseUrl: string): SEOData {
  const localizedCommon = getLocalizedSharedContent(commonContent, locale);
  const siteName = localizedCommon?.site?.name || 'Website';
  const siteDescription = localizedCommon?.site?.description || '';
  const siteKeywords = localizedCommon?.site?.keywords || '';
  
  return {
    title: siteName,
    description: siteDescription,
    keywords: siteKeywords,
    ogImage: '/og.png',
    ogImageAlt: siteName,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": siteName,
      "description": siteDescription,
      "url": baseUrl,
      "publisher": {
        "@type": "Organization",
        "name": siteName
      }
    }
  };
}

// Generate complete SEO metadata for any page with centralized fallback
export async function generatePageMetadata(
  pageId: string, 
  locale: Locale, 
  baseUrl?: string
): Promise<{
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  ogImageAlt: string;
  siteName: string;
  structuredData?: any;
}> {
  const resolvedBaseUrl = baseUrl || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  // Load common content for fallback
  const commonContent = await loadSharedContent('common');
  const fallbackSEO = generateFallbackSEO(commonContent, locale, resolvedBaseUrl);
  const localizedCommon = getLocalizedSharedContent(commonContent, locale);
  const siteName = localizedCommon?.site?.name || 'Website';
  
  // Try to load page content
  const pageContent = await loadPageContent(pageId);
  let seoData = fallbackSEO;
  
  if (pageContent) {
    seoData = getPageSEO(pageContent, locale, fallbackSEO);
  }
  
  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    ogImage: seoData.ogImage,
    ogImageAlt: seoData.ogImageAlt,
    siteName,
    structuredData: seoData.structuredData
  };
}

// Get localized shared content
export function getLocalizedSharedContent(sharedContent: any, locale: Locale): any {
  return sharedContent[locale] || sharedContent.en || {};
}

// Get all routes for sitemap generation
export async function getAllRoutes(): Promise<RouteConfig[]> {
  const routesConfig = await loadRoutesConfig();
  return routesConfig.routes;
}

// Get supported locales
export async function getSupportedLocales(): Promise<Locale[]> {
  const routesConfig = await loadRoutesConfig();
  return routesConfig.supportedLocales;
}

// Get default locale
export async function getDefaultLocale(): Promise<Locale> {
  const routesConfig = await loadRoutesConfig();
  return routesConfig.defaultLocale;
}

// Generate all localized URLs for sitemap
export async function generateAllLocalizedUrls(): Promise<Array<{ locale: Locale; slug: string; pageId: string; priority: number; changefreq: string }>> {
  const routes = await getAllRoutes();
  const urls: Array<{ locale: Locale; slug: string; pageId: string; priority: number; changefreq: string }> = [];
  
  for (const route of routes) {
    for (const locale of Object.keys(route.urls) as Locale[]) {
      urls.push({
        locale,
        slug: route.urls[locale],
        pageId: route.pageId,
        priority: route.priority,
        changefreq: route.changefreq
      });
    }
  }
  
  return urls;
}

// Get route configuration by page ID
export async function getRouteByPageId(pageId: string): Promise<RouteConfig | null> {
  const routesConfig = await loadRoutesConfig();
  return routesConfig.routes.find(route => route.pageId === pageId) || null;
}

// Get localized URL for a page
export async function getLocalizedUrl(pageId: string, locale: Locale): Promise<string | null> {
  const route = await getRouteByPageId(pageId);
  return route?.urls[locale] || null;
}

// Resolve page ID from current URL path
export async function resolvePageIdFromPath(locale: Locale, path: string): Promise<string | null> {
  // Remove leading slash and locale from path
  const cleanPath = path.replace(`/${locale}`, '').replace(/^\//, '') || '';
  
  const routesConfig = await loadRoutesConfig();
  const route = routesConfig.routes.find(r => r.urls[locale] === cleanPath);
  
  return route?.pageId || null;
}
