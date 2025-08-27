# Unified Content Pages Implementation Plan

## PROMPT for AI Coding Assistant:

**Task:** Implement comprehensive content pages system including Services, Blog (News), and Accessories with custom sections plus all default shared components.

## 🎯 COMPLETE SCOPE

### Services (8 SEO-focused pages):
1. **window-adjustment** - Window Adjustment (€45+)
2. **gasket-replacement** - Gasket Replacement (€35+) 
3. **mechanism-replacement** - Mechanism Replacement (€65+)
4. **window-sealing** - Window Sealing (€30+)
5. **cleaning-lubrication** - Cleaning & Lubrication (€40+)
6. **glass-replacement** - Glass Unit Replacement (€120+)
7. **geometry-restoration** - Geometry Restoration (€75+)
8. **emergency-opening** - Emergency Opening (€95+)

### Blog/News (3-5 articles):
- Winter window maintenance
- Energy efficiency tips
- New product announcements
- Seasonal maintenance guides

### Accessories (3-5 products):
- Ventilation systems
- Window handles
- Security locks
- Mosquito nets

## 🔍 SEO IMPACT

### Total New URLs: 64-72 pages
- **Services**: 32 URLs (8 services × 4 locales)
- **Blog**: 12-20 URLs (3-5 articles × 4 locales)
- **Accessories**: 12-20 URLs (3-5 products × 4 locales)

### URL Structure:
- **EN**: `/services/{slug}`, `/news/{slug}`, `/accessories/{slug}`
- **LT**: `/paslaugos/{slug}`, `/naujienos/{slug}`, `/priedai/{slug}`
- **PL**: `/uslugi/{slug}`, `/aktualnosci/{slug}`, `/akcesoria/{slug}`
- **UK**: `/poslugy/{slug}`, `/novyny/{slug}`, `/aksesuary/{slug}`

## 📋 IMPLEMENTATION ARCHITECTURE

### 1. Dynamic Page Routes (3 files)
```typescript
// /app/[locale]/services/[slug]/page.tsx
export default async function ServiceItemPage({ params }: { params: { locale: Locale; slug: string } }) {
  const { locale, slug } = params;
  if (!isValidLocale(locale)) notFound();
  
  const serviceItem = await loadCollectionItem('services', slug, locale);
  if (!serviceItem) notFound();
  
  const localizedContent = getLocalizedContent(serviceItem, locale);
  const finalComponents = getFinalPageComponents(serviceItem);
  
  return <ComponentRenderer components={components} />;
}

// /app/[locale]/news/[slug]/page.tsx - Same pattern
// /app/[locale]/accessories/[slug]/page.tsx - Same pattern
```

### 2. Content Structure Template
```json
{
  "itemId": "window-adjustment",
  "collection": "services",
  "template": "service-item",
  "slugs": { "en": "window-adjustment", "lt": "langu-reguliavimas", "pl": "regulacja-okien", "uk": "regulyuvannya-vikon" },
  "seo": {
    "en": {
      "title": "Professional Window Adjustment Services | €45+ | Same-Day Service",
      "description": "Expert window alignment and mechanism adjustment for smooth operation. Professional technicians, 5-year warranty.",
      "keywords": "window adjustment, window alignment, window mechanism repair",
      "ogImage": "/images/og/en-window-adjustment.jpg"
    }
  },
  "content": {
    "en": {
      "hero": { "title": "...", "subtitle": "...", "priceFrom": "From €45", "features": [...] },
      "serviceDetails": { "title": "...", "services": [...] },
      "processSteps": { "title": "...", "steps": [...] }
    }
  },
  "components": [
    { "type": "ServiceHero", "contentKey": "hero", "required": true },
    { "type": "ServiceDetails", "contentKey": "serviceDetails", "required": true },
    { "type": "ProcessSteps", "contentKey": "processSteps", "required": true }
  ],
  "componentOverrides": {
    "ServiceCards": { "contentKey": "shared:related-services" },
    "Testimonials": { "contentKey": "shared:service-testimonials" },
    "Faq": { "contentKey": "shared:service-faq" }
  }
}
```

### 3. Required Components (7 new)

#### Service Components:
- **ServiceHero.tsx** - Hero with pricing, features, CTA
- **ServiceDetails.tsx** - Service grid with icons
- **ProcessSteps.tsx** - 4-step process visualization

#### Blog Components:
- **ArticleHeader.tsx** - Title, author, date, featured image
- **ArticleContent.tsx** - Article body with typography

#### Accessory Components:
- **ProductHeader.tsx** - Product showcase with pricing
- **ProductSpecs.tsx** - Technical specifications table

### 4. Content Resolver Updates
```typescript
// Add to /content/lib/content-resolver.ts
export async function loadCollectionItem(collection: string, slug: string, locale: Locale): Promise<CollectionItem | null> {
  try {
    const items = await loadCollectionItems(collection);
    return items.find(item => item.slugs[locale] === slug) || null;
  } catch (error) {
    console.error(`Error loading ${collection} item ${slug}:`, error);
    return null;
  }
}

export async function loadCollectionItems(collection: string): Promise<CollectionItem[]> {
  // Load all items from collection directory
}
```

### 5. Routes Configuration Update
```json
{
  "collections": {
    "services": { "basePath": { "en": "services", "lt": "paslaugos", "pl": "uslugi", "uk": "poslugy" } },
    "news": { "basePath": { "en": "news", "lt": "naujienos", "pl": "aktualnosci", "uk": "novyny" } },
    "accessories": { "basePath": { "en": "accessories", "lt": "priedai", "pl": "akcesoria", "uk": "aksesuary" } }
  }
}
```

## 🛠 IMPLEMENTATION PHASES

### Phase 1: Core Infrastructure (HIGH Priority - Week 1)
1. **Create 3 dynamic page routes** - services/[slug], news/[slug], accessories/[slug]
2. **Update content-resolver.ts** - Add loadCollectionItem() and loadCollectionItems()
3. **Update routes.json** - Add accessories collection configuration
4. **Create TypeScript interfaces** - CollectionItem, ServiceItem, NewsItem, AccessoryItem
5. **Test basic routing** - Verify dynamic routes work with existing content

### Phase 2: Service Pages (HIGH Priority - Week 2)
1. **Create service components** - ServiceHero, ServiceDetails, ProcessSteps
2. **Register components** - Update ComponentRenderer.tsx
3. **Create 8 service JSON files** - Complete content structure for all services
4. **Add all translations** - 4 locales × 8 services = 32 service pages
5. **Test service pages** - Verify all services load correctly

### Phase 3: Blog Pages (MEDIUM Priority - Week 3)
1. **Create blog components** - ArticleHeader, ArticleContent
2. **Create 3-5 blog JSON files** - Winter maintenance, energy tips, etc.
3. **Add blog translations** - Complete multilingual content
4. **Create blog-specific shared content** - Related articles, blog FAQ
5. **Test blog functionality** - Verify article rendering and navigation

### Phase 4: Accessory Pages (MEDIUM Priority - Week 4)
1. **Create accessory components** - ProductHeader, ProductSpecs
2. **Create accessories collection** - /content/collections/accessories/
3. **Create 3-5 accessory JSON files** - Ventilation, handles, locks, etc.
4. **Add accessory translations** - Complete product information
5. **Test accessory pages** - Verify product showcase and specs

### Phase 5: SEO & Optimization (LOW Priority - Week 5)
1. **Complete SEO metadata** - All services, blog, accessories
2. **Add structured data** - Service, Article, Product schemas
3. **Optimize images** - WebP format, proper alt text, OG images
4. **Generate service-specific FAQ** - Targeted FAQ content per service
5. **Test Core Web Vitals** - Performance optimization
6. **Verify sitemap generation** - All 64-72 URLs included

## 🎯 SUCCESS CRITERIA

### Technical Requirements
- ✅ 3 dynamic page routes working for all locales
- ✅ 16-18 collection JSON files with complete content
- ✅ 7 new page components registered and functional
- ✅ Content resolver handles collection items properly
- ✅ All pages include 9 default shared components + custom sections

### SEO Requirements
- ✅ 64-72 new indexed pages across all content types
- ✅ Complete SEO metadata for all 4 locales
- ✅ Structured data for services, articles, and products
- ✅ Multilingual hreflang implementation
- ✅ Sitemap includes all content pages

### Content Requirements
- ✅ Services: Hero + Details + Process + shared components
- ✅ Blog: Header + Content + shared components
- ✅ Accessories: Product + Specs + shared components
- ✅ Complete translations for en, lt, pl, uk
- ✅ Service-specific pricing and feature information

## 📁 FINAL FILE STRUCTURE

```
/content/collections/
├── services/
│   ├── window-adjustment.json
│   ├── gasket-replacement.json
│   ├── mechanism-replacement.json
│   ├── window-sealing.json
│   ├── cleaning-lubrication.json
│   ├── glass-replacement.json
│   ├── geometry-restoration.json
│   └── emergency-opening.json
├── news/
│   ├── winter-maintenance.json
│   ├── energy-efficiency.json
│   └── new-products.json
└── accessories/
    ├── ventilation-systems.json
    ├── window-handles.json
    └── security-locks.json

/app/[locale]/
├── services/[slug]/page.tsx
├── news/[slug]/page.tsx
└── accessories/[slug]/page.tsx

/components/pages/
├── ServiceHero.tsx
├── ServiceDetails.tsx
├── ProcessSteps.tsx
├── ArticleHeader.tsx
├── ArticleContent.tsx
├── ProductHeader.tsx
└── ProductSpecs.tsx
```

## 🚀 IMMEDIATE FIRST STEPS

1. **Create dynamic routes** - 3 page.tsx files for services, news, accessories
2. **Update content-resolver.ts** - Add collection item loading functions
3. **Create ServiceHero component** - First component to test with
4. **Generate window-adjustment.json** - First service as template
5. **Test single service page** - Verify complete flow works
6. **Scale to remaining content** - Complete all collections systematically

This unified plan creates a comprehensive content management system with 64-72 new SEO-optimized pages, significantly boosting search visibility while maintaining the established architecture patterns.
