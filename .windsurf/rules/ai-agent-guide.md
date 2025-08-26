---
trigger: always_on
---

# AI Agent Project Guide - Langu-Remontas

## Project Overview
Next.js 14 template with TypeScript, i18n, content-driven architecture for multilingual websites.

## 🚨 CRITICAL RULES - NEVER VIOLATE

### Framework & Versions
- **Next.js**: 14.0.3 (App Router)
- **React**: ^18, **TypeScript**: ^5
- **Package Manager**: npm (yarn also supported)

### Project Structure
```
app/[locale]/          # Dynamic locale routing
components/            # React components  
├── ui/               # Reusable UI components
content/              # Content management
├── lib/              # Content utilities
├── pages/            # Page definitions
├── shared/           # Shared content
└── routes.json       # Route config
lib/                  # Utilities
docs/                 # Documentation
public/               # Static assets
```

### Internationalization
**Supported Locales**: `['en', 'pl', 'lt', 'uk']`
**Primary**: `en` (default), **Secondary**: `pl`, `lt`, `uk`

**MANDATORY LOCALE VALIDATION:**
```typescript
import { isValidLocale, type Locale } from '@/lib/i18n';
// ALWAYS validate
if (isValidLocale(locale)) { /* proceed */ }
```

**TRANSLATION LOADING - NEVER IMPORT JSON DIRECTLY:**
```typescript
// ✅ CORRECT
import { loadSharedContent, getLocalizedSharedContent } from '@/content/lib/content-resolver';
const content = await loadSharedContent('common');
const localized = getLocalizedSharedContent(content, locale);

// ❌ NEVER DO THIS
import commonData from '@/content/shared/common.json';
```

### Content Management System
**JSON-based content** in `content/` directory

**MANDATORY PAGE LOADING PATTERN:**
```typescript
export default async function Page({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  if (!isValidLocale(locale)) notFound();
  
  const pageContent = await loadPageContent('homepage');
  const commonContent = await loadSharedContent('common');
  
  if (!pageContent) return <div>Page not found</div>;
  
  const localizedContent = getLocalizedContent(pageContent, locale);
  const localizedCommon = getLocalizedSharedContent(commonContent, locale);
  
  return (
    <>
      <Header translations={localizedCommon} />
      <ComponentRenderer components={localizedContent.components} />
      <Footer translations={localizedCommon} />
    </>
  );
}
```

**MANDATORY CONTENT STRUCTURE:**
```json
{
  "pageId": "about",
  "seo": {
    "en": {
      "title": "Page Title",
      "description": "Description...",
      "keywords": "keywords",
      "ogImage": "/image.jpg"
    }
    // All locales: lt, pl, uk
  },
  "content": {
    "en": { /* content */ }
    // All locales
  },
  "components": [
    { "type": "Hero", "contentKey": "hero", "required": true }
  ]
}
```

### Component Architecture
**ComponentRenderer.tsx** - Central dispatcher, ALL components must be registered

**COMPONENT REGISTRATION:**
```typescript
// Import components
import Hero from './Hero'
import Features from './Features'

// Register in switch
function SingleComponentRenderer({ type, props }) {
  switch (type.toLowerCase()) {
    case 'hero': return <Hero {...props} />
    case 'features': return <Features {...props} />
    default: return null
  }
}
```

**Available Components**: Hero, Features, ServiceCards, PageHeader, Content, ContactForm, Header, Footer, LanguageSwitcher, ValueProposition, ProcessSteps, Testimonials, WhyChooseUs, Partners, Faq, CtaBanner

### UI Component System
**ALWAYS lowercase imports for UI components:**
```typescript
// ✅ CORRECT
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// ❌ INCORRECT
import { Button } from '@/components/ui/Button';
```

**Available UI Components:**
- Button (with variants: default, primary, destructive, outline, secondary, success, green, ghost, link, accent)
- Input, Label, Textarea
- Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
- Select, SelectContent, SelectItem, SelectTrigger, SelectValue
- Checkbox
- Icon (unified Lucide icons component)

### Button Component Variants & Sizes
```typescript
// Button variants
variant: {
  default: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  success: "bg-success text-white hover:bg-success/90",
  green: "bg-success text-success-foreground hover:bg-success/90",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  link: "text-primary underline-offset-4 hover:underline",
  accent: "bg-accent text-accent-foreground hover:bg-accent/90",
}

// Button sizes
size: {
  default: "h-10 px-4 py-2",     // 40px height
  sm: "h-9 rounded-md px-3",     // 36px height  
  lg: "h-11 rounded-md px-8",    // 44px height
  icon: "h-10 w-10",             // Square 40px
}

// Success variant with optional check icon
<Button variant="success" showIcon={true}>Completed</Button>
```

### Theme System
**COLOR HIERARCHY:**
- **primary**: `#DC2626` (Red) - Main CTAs
- **secondary**: `#1F2937` (Dark Gray) - Secondary elements  
- **success**: `#059669` (Green) - Success states, positive actions
- **info**: `#2563EB` (Blue) - Information
- **accent**: `#F3F4F6` (Light Gray) - Subtle backgrounds
- **navy**: `#1A237E` - Professional elements
- **neutral**: Gray scale 50-900

**TYPOGRAPHY SCALE:**
```css
text-hero    /* 3rem, bold */
text-h1      /* 2rem, semibold */
text-h2      /* 1.5rem, semibold */
text-h3      /* 1.125rem, medium */
text-body    /* 1rem, normal */
text-cta     /* 1.125rem, semibold */
```

**SPACING SYSTEM:**
```css
space-section     /* 5rem - Between sections */
space-section-lg  /* 7.5rem - Large gaps */
space-component   /* 3rem - Around components */
space-element     /* 1.5rem - Between elements */
space-tight       /* 0.5rem - Tight spacing */
```

### Responsive Design Patterns
**Breakpoint Usage:**
- `sm:` - 640px and up
- `md:` - 768px and up  
- `lg:` - 1024px and up
- `xl:` - 1280px and up (1200px+ equivalent)

**Common Responsive Patterns:**
```typescript
// Hide phone number on screens < 1200px
<span className="ml-2 hidden xl:inline text-sm">{phone}</span>

// Show only flag on screens < 1200px
<span className="hidden xl:block">{languageName}</span>

// Mobile menu toggle
<div className="md:hidden">Mobile content</div>
<div className="hidden md:flex">Desktop content</div>
```

### SEO & Metadata
**SEO Generation in Layout:**
```tsx
export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  const seo = getPageSEO('home', params.locale)
  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
      images: seo.ogImage ? [{ url: seo.ogImage }] : []
    }
  }
}
```

### Content Resolver Functions
```typescript
// Available from content/lib/content-resolver.ts
getPageContent(pageId: string, locale: Locale): any
getSharedContent(type: string, locale: Locale): any  
getPageSEO(pageId: string, locale: Locale): SEOData
getRoutes(): RouteConfig[]
getRoute(pageId: string): RouteConfig | undefined
```

### TypeScript Requirements
**NEVER use `any`** - Always define proper interfaces:
```typescript
interface ComponentProps {
  locale: Locale;
  translations: {
    title: string;
    description: string;
  };
  onSubmit: (data: FormData) => Promise<void>;
}
```

### Modal Component Pattern
```typescript
interface ModalProps {
  customTrigger?: React.ReactElement;
  translations: { title: string; triggerButton: string; /* ... */ };
}

export function ComponentModal({ customTrigger, translations }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {customTrigger || <Button size="sm">{translations.triggerButton}</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{translations.title}</DialogTitle>
        </DialogHeader>
        {/* Form content */}
      </DialogContent>
    </Dialog>
  );
}
```

### Icon System
**Use unified Icon component:**
```typescript
import Icon from '@/components/ui/Icon';

// Available icons (Lucide React)
<Icon name="Phone" className="w-5 h-5" />
<Icon name="Send" className="w-5 h-5" />        // Telegram
<Icon name="MessageSquare" className="w-5 h-5" /> // WhatsApp
<Icon name="MapPin" className="w-5 h-5" />
<Icon name="Check" className="w-4 h-4" />       // Success indicator
```

### Image Placeholder Strategy
**Use placeholder blocks during development:**
```tsx
// Instead of <Image> components initially
<div className="w-full h-96 bg-neutral-200 rounded-card flex items-center justify-center">
  <span className="text-neutral-600 font-medium">Hero Image - 800x400px</span>
</div>

// Reusable placeholder
const ImagePlaceholder = ({ width = "w-full", height = "h-48", description }) => (
  <div className={`${width} ${height} bg-neutral-200 rounded-card flex items-center justify-center`}>
    <span className="text-neutral-600 font-medium text-center px-4">{description}</span>
  </div>
)
```

## ⚠️ CRITICAL DON'Ts
1. **DON'T** hardcode locale strings
2. **DON'T** import JSON files directly  
3. **DON'T** bypass ComponentRenderer
4. **DON'T** create pages outside `[locale]` structure
5. **DON'T** use `any` types
6. **DON'T** use uppercase UI component imports
7. **DON'T** mix button sizes without consistency
8. **DON'T** forget to restart dev server after Tailwind config changes

## ✅ MANDATORY PRACTICES
1. **USE** content resolver functions for all content
2. **VALIDATE** locales with `isValidLocale()`
3. **FOLLOW** component registration pattern
4. **USE** TypeScript interfaces for all props
5. **PROVIDE** fallback content for missing translations
6. **USE** semantic Tailwind classes from design system
7. **HANDLE** loading and error states
8. **ENSURE** button size consistency (use `size="sm"` for header CTAs)
9. **RESTART** dev server after Tailwind configuration changes

## Dependencies
```json
{
  "next": "14.0.3",
  "react": "^18",
  "typescript": "^5",
  "tailwindcss": "^3.3.0",
  "lucide-react": "^0.541.0",
  "@radix-ui/react-*": "Latest",
  "class-variance-authority": "^0.7.1",
  "eslint": "^8",
  "prettier": "^3.6.2"
}
```

## Quick Commands
```bash
npm run dev      # Development (or yarn dev)
npm run build    # Production build  
npm run lint     # Linting
```

## Emergency Debugging
1. **i18n Issues**: Check `lib/i18n.ts` locale validation
2. **Content Not Loading**: Check `content-resolver.ts` cache
3. **Component Not Rendering**: Verify `ComponentRenderer.tsx` registration
4. **Build Errors**: Check TypeScript interfaces
5. **SEO Problems**: Verify content structure and metadata
6. **Button Styling Issues**: Restart dev server after Tailwind changes
7. **Size Inconsistencies**: Ensure all buttons use same size variant

## Priority Guidelines
**HIGH**: Locale validation, content resolver usage, component registration, type safety, button consistency
**MEDIUM**: Theme consistency, performance, SEO metadata, responsive design
**LOW**: Minor styling, non-critical features

## Recent Updates
- Added Button component variants (success, green) with optional check icon
- Implemented responsive design patterns for header elements
- Updated Tailwind config with proper success color structure
- Added comprehensive UI component documentation
- Enhanced modal patterns with consistent sizing

---
**Follow this guide strictly. Deviations cause system failures. Always refer when making decisions.**
