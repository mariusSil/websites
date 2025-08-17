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
- **Shared Content**: `content/shared/{type}.json`
- **Routes**: Centralized in `content/routes.json`

#### Content Structure Pattern
```json
{
  "pageId": "string",
  "template": "string",
  "seo": {
    "en": { "title": "", "description": "", "keywords": "", "ogImage": "", "ogImageAlt": "" },
    "lt": { /* localized SEO */ }
  },
  "content": {
    "en": { /* page content */ },
    "lt": { /* localized content */ }
  },
  "components": [
    { "type": "ComponentName", "contentKey": "contentSection", "required": true }
  ]
}
```

#### Content Resolution
- **Resolver**: `content/lib/content-resolver.ts`
- **Caching**: In-memory caching for performance
- **Fallbacks**: Automatic fallback to English content
- **SEO Generation**: Automatic SEO metadata generation

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

#### Component Registration Pattern
```tsx
function SingleComponentRenderer({ type, props }: { type: string; props: any }) {
  switch (type.toLowerCase()) {
    case 'componentname':
      return <ComponentName {...props} />
    default:
      console.warn(`Unknown component type: ${type}`)
      return null
  }
}
```

### 6. Styling System

#### Tailwind CSS Configuration
- **Framework**: Tailwind CSS ^3.3.0
- **Custom Theme**: Comprehensive design system implemented
- **Colors**: Professional palette with semantic naming

#### Color Palette
```javascript
primary: '#4caf50' (Green) - Primary brand color
secondary: '#2196f3' (Blue) - Secondary actions
accent: '#00bcd4' (Teal) - Accent elements
neutral: Grayscale palette
navy: '#1a237e' - Dark navy for contrast
```

#### Typography Scale
```javascript
hero: 3rem (48px) - Hero headings
h1: 2rem (32px) - Main headings
h2: 1.5rem (24px) - Section headings
h3: 1.125rem (18px) - Subsection headings
body: 1rem (16px) - Body text
cta: 1.125rem (18px) - Call-to-action text
```

#### Spacing System
```javascript
section: 5rem (80px) - Section spacing
section-lg: 7.5rem (120px) - Large section spacing
component: 3rem (48px) - Component spacing
element: 1.5rem (24px) - Element spacing
tight: 0.5rem (8px) - Tight spacing
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

### 10. File Modification Guidelines

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
