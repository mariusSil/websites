'use client';

import { type Locale } from '@/lib/i18n';
import { 
  parseCollectionURL, 
  getLocalizedCollectionURL, 
  getLocalizedStaticPageURL 
} from '@/content/lib/content-resolver';

export class URLTranslator {
  /**
   * Translate URL from current locale to target locale
   * Handles both collection items and static pages
   */
  static async translateURL(currentURL: string, targetLocale: Locale): Promise<string | null> {
    try {
      // First, try to parse as collection URL
      const collectionMatch = await parseCollectionURL(currentURL);
      
      if (collectionMatch) {
        // It's a collection item - get localized URL
        return await getLocalizedCollectionURL(
          collectionMatch.collection,
          collectionMatch.itemId,
          targetLocale
        );
      }

      // Not a collection item - try static page translation
      return await getLocalizedStaticPageURL(currentURL, targetLocale);
    } catch (error) {
      console.error('Error translating URL:', error);
      return null;
    }
  }

  /**
   * Get canonical item ID from any localized URL
   * Returns null if not a collection item
   */
  static async getCanonicalItemId(url: string): Promise<string | null> {
    try {
      const collectionMatch = await parseCollectionURL(url);
      return collectionMatch?.itemId || null;
    } catch (error) {
      console.error('Error getting canonical item ID:', error);
      return null;
    }
  }

  /**
   * Build localized URL from canonical data
   */
  static async buildLocalizedURL(
    collection: string, 
    itemId: string, 
    locale: Locale
  ): Promise<string | null> {
    try {
      return await getLocalizedCollectionURL(collection, itemId, locale);
    } catch (error) {
      console.error('Error building localized URL:', error);
      return null;
    }
  }

  /**
   * Check if URL is a collection item URL
   */
  static async isCollectionURL(url: string): Promise<boolean> {
    try {
      const collectionMatch = await parseCollectionURL(url);
      return collectionMatch !== null;
    } catch (error) {
      return false;
    }
  }

  /**
   * Extract locale from URL path
   */
  static extractLocale(url: string): Locale | null {
    const pathParts = url.replace(/^\//, '').split('/');
    const locale = pathParts[0];
    
    const validLocales: Locale[] = ['en', 'lt', 'pl', 'uk'];
    return validLocales.includes(locale as Locale) ? locale as Locale : null;
  }

  /**
   * Get all language variants for current URL
   */
  static async getAllLanguageVariants(currentURL: string): Promise<Record<Locale, string | null>> {
    const variants: Record<string, string | null> = {
      en: null,
      lt: null,
      pl: null,
      uk: null
    };

    const locales: Locale[] = ['en', 'lt', 'pl', 'uk'];

    for (const locale of locales) {
      variants[locale] = await this.translateURL(currentURL, locale);
    }

    return variants as Record<Locale, string | null>;
  }

  /**
   * Normalize URL path (remove trailing slashes, etc.)
   */
  static normalizePath(path: string): string {
    return path.replace(/\/+/g, '/').replace(/\/$/, '') || '/';
  }
}
