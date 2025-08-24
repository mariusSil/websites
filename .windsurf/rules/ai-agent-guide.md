# AI Agent Project Guide - Next.js Template

## Project Overview
This is a modern Next.js 14 template with TypeScript, internationalization (i18n), and a content-driven architecture. The project is designed for building multilingual websites with SEO optimization and component-based content management.

## Critical Architecture Rules

### 1. Framework & Versions
- **Next.js**: 14.0.3 (App Router)
- **React**: ^18
- **TypeScript**: ^5
- **Node.js**: Compatible with Next.js 14
- **Package Manager**: npm (based on package-lock.json presence)

### 2. Project Structure
```
template/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Dynamic locale routing
│   │   ├── layout.tsx     # Locale-specific layout
│   │   └── page.tsx       # Homepage with i18n
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout (minimal)
│   └── favicon.ico/       # Favicon directory
├── components/            # React components
├── content/               # Content management system
│   ├── lib/              # Content utilities
│   ├── pages/            # Page content definitions
│   ├── shared/           # Shared content (nav, footer)
│   └── routes.json       # Route configuration
├── lib/                  # Utility libraries
└── public/               # Static assets
```

### 3. Internationalization (i18n) System

#### Supported Locales
- **Primary**: `en` (English) - Default locale
- **Secondary**: `lt` (Lithuanian) 
- **Additional**: `pl` (Polish) - Found in content but not in lib/i18n.ts

#### i18n Implementation
- **Library**: Custom implementation in `lib/i18n.ts`
- **Routing**: Dynamic `[locale]` parameter in app directory
- **Content**: JSON-based content system in `content/` directory
- **Fallback**: Always falls back to English (`en`)

#### Critical i18n Rules
1. **Always validate locales** using `isValidLocale()` function
2. **Use `defaultLocale`** for invalid locales
3. **Content structure**: Each content file has locale-specific sections
4. **URL structure**: `/{locale}/path` or `/path` for default locale
5. **SEO metadata**: Locale-specific meta tags and Open Graph data

### 4. Content Management System

#### Content Architecture
- **JSON-based**: All content stored in JSON files
- **Page Content**: `content/pages/{pageId}.json`
- **Shared Content**: `content/shared/{type}.json` (nav, footer, etc.)
- **Routes**: Centralized in `content/routes.json`
- **Resolver**: `content/lib/content-resolver.ts`

#### Content Import & Usage Patterns

**In Components - Import Content Resolver:**
```tsx
// Import the content resolver functions
import { 
  getPageContent, 
  getSharedContent, 
  getPageSEO 
} from '@/content/lib/content-resolver'
import { Locale } from '@/lib/i18n'

// In component or page
const MyPage = ({ params }: { params: { locale: Locale } }) => {
  // Get page content with locale
  const content = getPageContent('about', params.locale)
  const seoData = getPageSEO('about', params.locale)
  
  // Get shared content (navigation, footer)
  const navContent = getSharedContent('navigation', params.locale)
  
  return (
    <div>
      <h1>{content.hero.title}</h1>
      <p>{content.hero.description}</p>
    </div>
  )
}
```

**In Layout - SEO Metadata Generation:**
```tsx
// app/[locale]/layout.tsx
import { getPageSEO } from '@/content/lib/content-resolver'
import { Locale } from '@/lib/i18n'

export async function generateMetadata({
  params
}: {
  params: { locale: Locale }
}) {
  const seo = getPageSEO('home', params.locale)
  
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    openGraph: {
      title: seo.title,
      description: seo.description,
      images: seo.ogImage ? [{
        url: seo.ogImage,
        alt: seo.ogImageAlt
      }] : []
    }
  }
}
```

#### Content Structure Pattern
```json
{
  "pageId": "about",
  "template": "default",
  "seo": {
    "en": {
      "title": "About Us - Company Name",
      "description": "Learn about our company...",
      "keywords": "about, company, services",
      "ogImage": "/images/about-og.jpg",
      "ogImageAlt": "About us page image"
    },
    "lt": {
      "title": "Apie mus - Įmonės pavadinimas",
      "description": "Sužinokite apie mūsų įmonę...",
      "keywords": "apie, įmonė, paslaugos",
      "ogImage": "/images/about-og-lt.jpg",
      "ogImageAlt": "Apie mus puslapio nuotrauka"
    }
  },
  "content": {
    "en": {
      "hero": {
        "title": "About Our Company",
        "description": "We are a leading provider...",
        "image": "/images/about-hero.jpg"
      },
      "sections": [
        {
          "title": "Our Mission",
          "content": "To provide excellent services..."
        }
      ]
    },
    "lt": {
      "hero": {
        "title": "Apie mūsų įmonę",
        "description": "Mes esame pirmaujantis teikėjas...",
        "image": "/images/about-hero.jpg"
      },
      "sections": [
        {
          "title": "Mūsų misija",
          "content": "Teikti puikias paslaugas..."
        }
      ]
    }
  },
  "components": [
    { "type": "Hero", "contentKey": "hero", "required": true },
    { "type": "Content", "contentKey": "sections", "required": false }
  ]
}
```

#### Content Resolver Functions
```tsx
// Available resolver functions from content/lib/content-resolver.ts

// Get page content by pageId and locale
getPageContent(pageId: string, locale: Locale): any

// Get shared content (nav, footer) by type and locale  
getSharedContent(type: string, locale: Locale): any

// Get SEO metadata for a page
getPageSEO(pageId: string, locale: Locale): SEOData

// Get all routes configuration
getRoutes(): RouteConfig[]

// Get specific route by pageId
getRoute(pageId: string): RouteConfig | undefined
```

#### Content Resolution Features
- **Caching**: In-memory caching for performance
- **Fallbacks**: Automatic fallback to English content if locale missing
- **Type Safety**: TypeScript interfaces for all content structures
- **SEO Generation**: Automatic SEO metadata generation per locale

### 5. Component Architecture

#### Component System
- **Renderer**: `ComponentRenderer.tsx` - Central component dispatcher
- **Pattern**: Props-based components with TypeScript interfaces
- **Registration**: Components must be registered in `ComponentRenderer.tsx`

#### Available Components
- `Hero` - Hero sections with CTA
- `Features` - Feature listings
- `ServiceCards` - Service/product cards
- `PageHeader` - Page headers
- `Content` - Generic content blocks
- `ContactForm` - Contact forms
- `Header` - Site header with navigation
- `Footer` - Site footer
- `LanguageSwitcher` - Locale switching

#### Component Import & Registration Patterns

**Component Registration in ComponentRenderer.tsx:**
```tsx
// Import all components at the top
import Hero from './Hero'
import Features from './Features'
import ServiceCards from './ServiceCards'
import ContactForm from './ContactForm'
import Content from './Content'
import PageHeader from './PageHeader'
// ... other components

// Register in the switch statement
function SingleComponentRenderer({ type, props }: { type: string; props: any }) {
  switch (type.toLowerCase()) {
    case 'hero':
      return <Hero {...props} />
    case 'features':
      return <Features {...props} />
    case 'servicecards':
      return <ServiceCards {...props} />
    case 'contactform':
      return <ContactForm {...props} />
    case 'content':
      return <Content {...props} />
    case 'pageheader':
      return <PageHeader {...props} />
    default:
      console.warn(`Unknown component type: ${type}`)
      return null
  }
}
```

**Using ComponentRenderer in Pages:**
```tsx
// Import ComponentRenderer
import ComponentRenderer from '@/components/ComponentRenderer'
import { getPageContent } from '@/content/lib/content-resolver'
import { Locale } from '@/lib/i18n'

const MyPage = ({ params }: { params: { locale: Locale } }) => {
  const content = getPageContent('about', params.locale)
  
  return (
    <div>
      {/* Render components from content definition */}
      <ComponentRenderer 
        components={content.components || []} 
        content={content} 
      />
    </div>
  )
}
```

**Direct Component Usage:**
```tsx
// Import specific components directly
import Hero from '@/components/Hero'
import ServiceCards from '@/components/ServiceCards'
import { getPageContent } from '@/content/lib/content-resolver'

const HomePage = ({ params }: { params: { locale: Locale } }) => {
  const content = getPageContent('home', params.locale)
  
  return (
    <div>
      <Hero {...content.hero} />
      <ServiceCards services={content.services} />
    </div>
  )
}
```

### 6. Theme & Styling System

#### Tailwind CSS Configuration
- **Framework**: Tailwind CSS ^3.3.0
- **Config File**: `tailwind.config.js` in project root
- **Custom Theme**: Comprehensive design system with semantic tokens
- **Font**: Inter font family with Next.js optimization

#### Theme Implementation

**Color System Usage:**
```tsx
// Import not needed - Tailwind classes are global
// Use semantic color classes in components:

// Primary colors (Green palette)
<button className="bg-primary-500 hover:bg-primary-600 text-white">
<div className="text-primary-700 border-primary-200">

// Secondary colors (Blue palette)
<button className="bg-secondary-500 text-white">
<span className="text-secondary-600">

// Accent colors (Teal palette)
<div className="bg-accent-50 border-accent-200">
<button className="bg-accent-500 hover:bg-accent-600">

// Neutral colors (Gray palette)
<div className="bg-neutral-100 text-neutral-800">
<p className="text-neutral-600">

// Navy colors (Dark navy palette)
<footer className="bg-navy-900 text-white">
<div className="bg-navy-50 text-navy-800">
```

**Typography Classes:**
```tsx
// Hero text (48px, bold)
<h1 className="text-hero font-bold text-neutral-900">

// Main headings (32px, semibold)
<h1 className="text-h1 font-semibold text-neutral-900">

// Section headings (24px, semibold)
<h2 className="text-h2 font-semibold text-neutral-800">

// Subsection headings (18px, medium)
<h3 className="text-h3 font-medium text-neutral-700">

// Body text (16px, normal)
<p className="text-body text-neutral-700">

// CTA text (18px, semibold)
<button className="text-cta font-semibold">
```

**Spacing Classes:**
```tsx
// Section spacing (80px)
<section className="py-section">
<div className="mb-section">

// Large section spacing (120px)
<section className="py-section-lg">

// Component spacing (48px)
<div className="space-y-component">
<div className="mb-component">

// Element spacing (24px)
<div className="space-y-element">
<div className="gap-element">

// Tight spacing (8px)
<div className="space-x-tight">
<div className="gap-tight">
```

**Shadow & Border Radius:**
```tsx
// Card shadows
<div className="shadow-card hover:shadow-card-hover">

// Button shadows
<button className="shadow-button">

// Border radius
<div className="rounded-card">  // 12px
<button className="rounded-button">  // 8px
```

#### Complete Color Palette Reference
```javascript
// Primary (Green) - Brand color
primary: {
  50: '#e8f5e8',   100: '#c8e6c9',   200: '#a5d6a7',
  300: '#81c784',  400: '#66bb6a',   500: '#4caf50', // Main
  600: '#43a047',  700: '#388e3c',   800: '#2e7d32',  900: '#1b5e20'
}

// Secondary (Blue) - Secondary actions
secondary: {
  50: '#e3f2fd',   100: '#bbdefb',   200: '#90caf9',
  300: '#64b5f6',  400: '#42a5f5',   500: '#2196f3', // Main
  600: '#1e88e5',  700: '#1976d2',   800: '#1565c0',  900: '#0d47a1'
}

// Accent (Teal) - Accent elements
accent: {
  50: '#e0f7fa',   100: '#b2ebf2',   200: '#80deea',
  300: '#4dd0e1',  400: '#26c6da',   500: '#00bcd4', // Main
  600: '#00acc1',  700: '#0097a7',   800: '#00838f',  900: '#006064'
}

// Neutral (Gray) - Text and backgrounds
neutral: {
  50: '#fafafa',   100: '#f5f5f5',   200: '#eeeeee',
  300: '#e0e0e0',  400: '#bdbdbd',   500: '#9e9e9e',
  600: '#757575',  700: '#616161',   800: '#424242',  900: '#212121'
}

// Navy - Dark contrast elements
navy: {
  50: '#e8eaf6',   100: '#c5cae9',   200: '#9fa8da',
  300: '#7986cb',  400: '#5c6bc0',   500: '#3f51b5',
  600: '#3949ab',  700: '#303f9f',   800: '#283593',  900: '#1a237e'
}
```

### 7. Development Workflow

#### Scripts
```json
{
  "dev": "next dev",           // Development server
  "build": "next build",       // Production build
  "start": "next start",       // Production server
  "lint": "next lint",         // ESLint
  "export": "next build && next export"  // Static export
}
```

#### Linting & Code Quality
- **ESLint**: ^8 with Next.js config
- **Prettier**: ^3.6.2 with ESLint integration
- **Config**: `eslint-config-next` + `eslint-config-prettier`
- **TypeScript**: Strict mode enabled

#### Path Aliases
```json
{
  "@/*": ["./*"],
  "@/content/*": ["content/*"]
}
```

### 8. SEO & Performance

#### SEO Features
- **Dynamic Metadata**: Locale-specific meta tags
- **Open Graph**: Complete OG and Twitter Card support
- **Structured Data**: JSON-LD implementation
- **Sitemap**: Multi-locale sitemap generation
- **Canonical URLs**: Proper canonicalization

#### Performance Optimizations
- **Next.js Image**: Optimized image component
- **Static Generation**: SSG for all pages
- **Code Splitting**: Automatic with App Router
- **Font Optimization**: Inter font with Next.js optimization

### 9. Common Pitfalls & Anti-Patterns

#### ❌ DON'T DO
1. **Don't hardcode locales** - Always use the locale system
2. **Don't bypass content resolver** - Use the centralized content system
3. **Don't add components without registration** - Must register in ComponentRenderer
4. **Don't ignore TypeScript errors** - Strict mode is enabled
5. **Don't modify core i18n logic** - It's battle-tested
6. **Don't create pages outside [locale] structure** - Breaks i18n
7. **Don't hardcode URLs** - Use the route resolution system

#### ✅ DO
1. **Use content resolver functions** for all content loading
2. **Validate locales** with `isValidLocale()`
3. **Follow component registration pattern**
4. **Use TypeScript interfaces** for all props
5. **Leverage the caching system** in content resolver
6. **Follow the established content structure**
7. **Use semantic Tailwind classes** from the design system

### 10. Design Planning & Image Strategy

#### Image Placeholder Strategy
When planning and implementing designs, always consider image placement and use placeholder blocks instead of actual images during development:

**Design Planning Checklist:**
1. **Identify image locations** - Map out where images will be needed in the layout
2. **Define image purposes** - Hero images, product photos, testimonials, backgrounds, icons
3. **Specify dimensions** - Plan exact sizes for different screen breakpoints
4. **Create placeholder blocks** - Use sized divs with descriptive text instead of `<Image>` components

**Placeholder Block Implementation:**
```tsx
// Instead of using Next.js Image component initially
// <Image src="/hero-image.jpg" alt="Hero" width={800} height={400} />

// Use placeholder blocks with exact dimensions
<div className="w-full h-96 bg-neutral-200 rounded-card flex items-center justify-center">
  <span className="text-neutral-600 font-medium">
    Hero Image - 800x400px
  </span>
</div>

// For different image types
<div className="w-64 h-64 bg-neutral-100 rounded-full flex items-center justify-center">
  <span className="text-neutral-500 text-sm text-center">
    Profile Photo<br/>256x256px
  </span>
</div>

<div className="aspect-video bg-neutral-200 rounded-lg flex items-center justify-center">
  <span className="text-neutral-600">
    Video Thumbnail - 16:9 Aspect Ratio
  </span>
</div>
```

**Placeholder Component Pattern:**
```tsx
// Create reusable placeholder component
interface ImagePlaceholderProps {
  width?: string
  height?: string
  aspectRatio?: string
  description: string
  className?: string
}

const ImagePlaceholder = ({ 
  width = "w-full", 
  height = "h-48", 
  aspectRatio,
  description,
  className = ""
}: ImagePlaceholderProps) => {
  const classes = aspectRatio 
    ? `${aspectRatio} ${width}` 
    : `${width} ${height}`
    
  return (
    <div className={`${classes} bg-neutral-200 rounded-card flex items-center justify-center ${className}`}>
      <span className="text-neutral-600 font-medium text-center px-4">
        {description}
      </span>
    </div>
  )
}

// Usage examples
<ImagePlaceholder 
  description="Company Logo - 200x80px" 
  width="w-50" 
  height="h-20" 
/>

<ImagePlaceholder 
  description="Product Gallery - Square Images" 
  aspectRatio="aspect-square" 
  width="w-full" 
/>
```

**Benefits of Placeholder Strategy:**
- **Visual Layout Planning** - See exact spacing and proportions
- **Content Planning** - Forces thinking about what images are needed
- **Performance** - No image loading during development
- **Responsive Design** - Test layouts without image constraints
- **Client Communication** - Clear visualization of image requirements

### 11. File Modification Guidelines

#### When Adding New Components
1. Create component in `components/` directory
2. Export from `components/index.ts`
3. Register in `ComponentRenderer.tsx`
4. Add TypeScript interfaces
5. Follow existing prop patterns

#### When Adding New Pages
1. Create content file in `content/pages/`
2. Add route to `content/routes.json`
3. Follow established content structure
4. Include all required locales
5. Add SEO metadata for each locale

#### When Modifying Content Structure
1. Update TypeScript interfaces in `content-resolver.ts`
2. Ensure backward compatibility
3. Update all existing content files
4. Test with all locales

### 11. Dependencies & Versions

#### Core Dependencies
```json
{
  "next": "14.0.3",
  "react": "^18",
  "react-dom": "^18"
}
```

#### Development Dependencies
```json
{
  "@types/node": "^20",
  "@types/react": "^18",
  "@types/react-dom": "^18",
  "autoprefixer": "^10.0.1",
  "eslint": "^8",
  "eslint-config-next": "14.0.3",
  "eslint-config-prettier": "^10.1.8",
  "eslint-plugin-prettier": "^5.5.4",
  "postcss": "^8",
  "prettier": "^3.6.2",
  "tailwindcss": "^3.3.0",
  "typescript": "^5"
}
```

### 12. Environment & Configuration

#### Next.js Configuration
- **Image Optimization**: AVIF and WebP formats
- **Device Sizes**: Responsive breakpoints configured
- **Image Sizes**: Optimized size variants

#### TypeScript Configuration
- **Strict Mode**: Enabled
- **Module Resolution**: Bundler
- **Path Mapping**: Configured for `@/` aliases
- **JSX**: Preserve mode for Next.js

### 13. Memory & Performance Considerations

#### Caching Strategy
- **Content Caching**: In-memory caching for all content
- **Route Caching**: Routes configuration cached
- **Shared Content**: Cached separately from page content

#### Bundle Optimization
- **Dynamic Imports**: Used for content loading
- **Tree Shaking**: Enabled through ES modules
- **Code Splitting**: Automatic with App Router

---

## Quick Reference Commands

```bash
# Development
npm run dev

# Production build
npm run build
npm run start

# Linting
npm run lint

# Static export
npm run export
```

## Emergency Debugging

1. **i18n Issues**: Check `lib/i18n.ts` and validate locale
2. **Content Not Loading**: Check `content-resolver.ts` cache
3. **Component Not Rendering**: Verify registration in `ComponentRenderer.tsx`
4. **Build Errors**: Check TypeScript interfaces and imports
5. **SEO Problems**: Verify content structure and metadata generation

---

*This guide should be updated whenever architectural changes are made to the project.*
