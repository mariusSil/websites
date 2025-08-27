# Language Switching & Translation Logic Analysis & Fix Plan

## 🚨 CRITICAL ISSUES IDENTIFIED

### Issue 1: Dual Route System Conflict
**Problem:** Two different routing systems exist simultaneously:
- **Static Routes**: `/services/[slug]` (English paths)
- **Localized Routes**: `/paslaugos/[slug]` (Lithuanian paths)

**Current Behavior:**
- `http://localhost:3000/lt/services/langu-reguliavimas` ✅ Works (uses service collection)
- `http://localhost:3000/lt/paslaugos/langu-reguliavimas` ❌ Uses different template

### Issue 2: Language Switching Logic Broken
**Problem:** Language switching doesn't translate both category AND slug
- From: `http://localhost:3000/lt/services/langu-reguliavimas`
- To: `http://localhost:3000/en/paslaugos/langu-reguliavimas` ❌ Wrong!
- Should be: `http://localhost:3000/en/services/window-adjustment` ✅

### Issue 3: Collection vs Page Route Confusion
**Root Cause:** Collections use localized basePath but pages don't translate properly

## 📋 COMPLETE URL MAPPING ANALYSIS

### Services Collection URLs (Should Work)
```
EN: /services/window-adjustment
LT: /paslaugos/langu-reguliavimas  
PL: /uslugi/regulacja-okien
UK: /poslugy/regulyuvannya-vikon
```

### Current Routes.json Configuration
```json
"services": {
  "basePath": {
    "en": "services",
    "lt": "paslaugos", 
    "pl": "uslugi", 
    "uk": "poslugy"
  }
}
```

### Service Slugs from JSON Files
```json
"slugs": {
  "en": "window-adjustment",
  "lt": "langu-reguliavimas",
  "pl": "regulacja-okien", 
  "uk": "regulyuvannya-vikon"
}
```

## 🔄 LANGUAGE TRANSITION PATTERNS

### Pattern 1: Homepage Transitions
```
EN: / → LT: / → PL: / → UK: /
```

### Pattern 2: Static Page Transitions
```
EN: /about → LT: /apie-mus → PL: /o-nas → UK: /pro-nas
EN: /contact → LT: /kontaktai → PL: /kontakt → UK: /kontakty
```

### Pattern 3: Collection Category Transitions
```
EN: /services → LT: /paslaugos → PL: /uslugi → UK: /poslugy
EN: /news → LT: /naujienos → PL: /aktualnosci → UK: /novyny
```

### Pattern 4: Collection Item Transitions (BROKEN)
```
EN: /services/window-adjustment 
LT: /paslaugos/langu-reguliavimas
PL: /uslugi/regulacja-okien
UK: /poslugy/regulyuvannya-vikon
```

## 🛠️ COMPREHENSIVE FIX PLAN

### Phase 1: Route Resolution Logic (HIGH PRIORITY)

#### 1.1 Update Content Resolver
**File:** `/content/lib/content-resolver.ts`
**Add Functions:**
```typescript
// Get localized collection URL
export function getLocalizedCollectionURL(
  collection: string, 
  itemId: string, 
  targetLocale: Locale
): string

// Reverse lookup: URL → itemId + locale
export function parseCollectionURL(
  url: string
): { collection: string; itemId: string; locale: Locale } | null

// Get all URL variants for an item
export function getAllURLVariants(
  collection: string, 
  itemId: string
): Record<Locale, string>
```

#### 1.2 Create URL Translation Service
**File:** `/lib/url-translator.ts`
```typescript
export class URLTranslator {
  // Translate URL from one locale to another
  translateURL(currentURL: string, targetLocale: Locale): string
  
  // Get canonical item ID from any localized URL
  getCanonicalItemId(url: string): string | null
  
  // Build localized URL from canonical data
  buildLocalizedURL(collection: string, itemId: string, locale: Locale): string
}
```

### Phase 2: Language Switcher Component Fix (HIGH PRIORITY)

#### 2.1 Enhanced Language Switcher Logic
**File:** `/components/common/LanguageSwitcher.tsx`
**Required Logic:**
```typescript
const handleLanguageSwitch = (newLocale: Locale) => {
  const currentPath = pathname;
  
  // 1. Detect if current page is collection item
  const collectionMatch = parseCollectionURL(currentPath);
  
  if (collectionMatch) {
    // 2. Get target URL for same content in new locale
    const targetURL = getLocalizedCollectionURL(
      collectionMatch.collection,
      collectionMatch.itemId, 
      newLocale
    );
    router.push(targetURL);
  } else {
    // 3. Handle static pages via routes.json lookup
    const targetURL = getStaticPageURL(currentPath, newLocale);
    router.push(targetURL);
  }
};
```

### Phase 3: Route Conflict Resolution (MEDIUM PRIORITY)

#### 3.1 Consolidate Routing System
**Decision:** Use ONLY collection-based routing with localized paths

**Remove Conflicting Routes:**
- Delete: `/app/[locale]/services/page.tsx` (if exists)
- Keep: `/app/[locale]/services/[slug]/page.tsx` (collection route)

#### 3.2 Update Next.js Route Handlers
**File:** `/app/[locale]/[...slug]/page.tsx`
**Enhanced Logic:**
```typescript
// 1. Try collection resolution first
const collectionItem = await loadCollectionItem(collection, slug);
if (collectionItem) {
  return <CollectionItemPage item={collectionItem} />;
}

// 2. Fallback to static page resolution
const pageContent = await loadPageContent(pageId);
if (pageContent) {
  return <StaticPage content={pageContent} />;
}

// 3. 404 if nothing found
return notFound();
```

### Phase 4: Navigation Component Updates (MEDIUM PRIORITY)

#### 4.1 Update Navigation Links
**Files:** Header, Footer, Breadcrumbs
**Logic:** Always use localized URLs from routes.json + collection configs

#### 4.2 Smart Navigation Hook Enhancement
**File:** `/hooks/useSmartNavigation.ts`
**Add:** Collection-aware navigation that respects locale-specific URLs

### Phase 5: SEO & Sitemap Updates (LOW PRIORITY)

#### 5.1 Dynamic Sitemap Generation
**File:** `/app/sitemap.ts`
**Include:** All collection items with proper localized URLs

#### 5.2 Canonical URL Management
**Add:** Proper canonical URLs and hreflang tags for all variants

## 🧪 TESTING STRATEGY

### Test Cases to Verify

#### Language Switching Tests
```
✅ EN /services/window-adjustment → LT /paslaugos/langu-reguliavimas
✅ LT /paslaugos/langu-reguliavimas → EN /services/window-adjustment  
✅ PL /uslugi/regulacja-okien → UK /poslugy/regulyuvannya-vikon
✅ Static pages: /about → /apie-mus → /o-nas → /pro-nas
```

#### Direct URL Access Tests
```
✅ /lt/paslaugos/langu-reguliavimas (should work)
✅ /en/services/window-adjustment (should work)
✅ /pl/uslugi/regulacja-okien (should work)
✅ /uk/poslugy/regulyuvannya-vikon (should work)
❌ /lt/services/langu-reguliavimas (should redirect or 404)
```

#### Navigation Tests
```
✅ Header navigation uses correct localized URLs
✅ Footer links work in all locales
✅ Breadcrumbs show correct paths
✅ Internal links maintain locale context
```

## 📁 FILES TO MODIFY

### High Priority
1. `/content/lib/content-resolver.ts` - Add URL translation functions
2. `/lib/url-translator.ts` - New URL translation service
3. `/components/common/LanguageSwitcher.tsx` - Fix language switching
4. `/app/[locale]/[...slug]/page.tsx` - Enhanced route resolution

### Medium Priority  
5. `/hooks/useSmartNavigation.ts` - Collection-aware navigation
6. `/components/layouts/Header.tsx` - Use localized URLs
7. `/components/layouts/Footer.tsx` - Use localized URLs
8. `/app/[locale]/services/[slug]/page.tsx` - Verify collection routing

### Low Priority
9. `/app/sitemap.ts` - Dynamic sitemap with all variants
10. SEO components - Canonical URLs and hreflang tags

## 🎯 SUCCESS CRITERIA

1. **Language Switching**: All language switches preserve content context with correct URLs
2. **Direct Access**: All localized URLs work correctly  
3. **No 404s**: Proper fallbacks and redirects for edge cases
4. **SEO Compliance**: Proper canonical URLs and hreflang implementation
5. **User Experience**: Seamless navigation without broken links

## 🚀 IMPLEMENTATION ORDER

1. **Phase 1**: URL Translation Logic (2-3 hours)
2. **Phase 2**: Language Switcher Fix (1 hour)  
3. **Phase 3**: Route Conflict Resolution (1 hour)
4. **Phase 4**: Navigation Updates (1-2 hours)
5. **Phase 5**: SEO & Testing (1 hour)

**Total Estimated Time: 6-8 hours**

---

**Next Action:** Implement Phase 1 - URL Translation Logic in content-resolver.ts
