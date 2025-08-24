# New Page Creation Thought Process Guide

## Overview
This guide outlines the systematic approach for creating new pages in the Next.js template. Follow this thought process to ensure consistency, proper internationalization, and optimal user experience.

## Phase 1: Strategic Planning & Analysis

### 1.1 Page Purpose & Goals Definition
**Before any implementation, define:**
- **Primary objective**: What is the main goal of this page?
- **Target audience**: Who will use this page?
- **User journey**: Where does this page fit in the user flow?
- **Success metrics**: How will you measure page effectiveness?

### 1.2 Content Strategy & Information Architecture
**Plan the content hierarchy:**
```
1. Hero Section (Primary message)
   ├── Main headline (value proposition)
   ├── Supporting subtitle (elaboration)
   └── Primary CTA (main action)

2. Supporting Sections (Evidence/Details)
   ├── Features/Benefits
   ├── Social proof/Testimonials
   ├── Process/How it works
   └── Secondary CTAs

3. Conversion Elements
   ├── Contact forms
   ├── Newsletter signup
   └── Trust indicators
```

### 1.3 CTA Strategy & Prioritization
**Define Call-to-Action hierarchy:**

**Primary CTA (1 per page):**
- Most important action for business goals
- Prominent placement (hero, above fold)
- Strong action verbs ("Get Started", "Contact Us", "Book Now")

**Secondary CTAs (2-3 max):**
- Supporting actions that nurture users
- Less prominent styling
- Alternative paths ("Learn More", "Download Guide")

**Micro CTAs:**
- Small engagement actions
- Newsletter signup, social follows
- Bottom of page or sidebar

## Phase 2: Content Structure Planning

### 2.1 Section Breakdown Strategy
**For each planned section, define:**

```typescript
interface SectionPlan {
  name: string           // "hero", "features", "testimonials"
  purpose: string        // Why this section exists
  priority: 'high' | 'medium' | 'low'
  component: string      // Which component to use
  contentKeys: string[]  // What content it needs
  cta?: {
    type: 'primary' | 'secondary' | 'micro'
    text: string
    action: string
  }
}
```

**Example Planning:**
```typescript
const sectionsPlan: SectionPlan[] = [
  {
    name: "hero",
    purpose: "Capture attention and communicate main value",
    priority: "high",
    component: "Hero",
    contentKeys: ["title", "subtitle", "ctaText", "ctaLink"],
    cta: { type: "primary", text: "Get Started", action: "/contact" }
  },
  {
    name: "features",
    purpose: "Demonstrate key benefits and capabilities",
    priority: "high", 
    component: "ServiceCards",
    contentKeys: ["title", "subtitle", "items"]
  },
  {
    name: "testimonials",
    purpose: "Build trust through social proof",
    priority: "medium",
    component: "Testimonials", 
    contentKeys: ["title", "reviews"]
  }
]
```

### 2.2 Component Selection Matrix

**Available Components Analysis:**

| Component | Best For | Content Structure | CTA Support |
|-----------|----------|-------------------|-------------|
| `Hero` | Landing sections, main value prop | title, subtitle, cta | Primary CTA |
| `ServiceCards` | Features, services, benefits | title, items array | Secondary CTAs |
| `Features` | Feature listings, comparisons | title, items with icons | Micro CTAs |
| `Content` | Text-heavy content, articles | flexible content blocks | Text links |
| `ContactForm` | Lead generation, inquiries | form fields, validation | Form submission |
| `PageHeader` | Simple page intros | title, subtitle only | No CTA |
| `Testimonials` | Social proof, reviews | reviews array, ratings | Trust building |

**Component Selection Criteria:**
1. **Content complexity**: Simple (PageHeader) vs Complex (Hero)
2. **CTA requirements**: Primary action needed vs informational
3. **Visual impact**: High impact (Hero) vs Supporting (Content)
4. **User engagement**: Interactive (ContactForm) vs Passive (Content)

## Phase 3: Translation Content File Creation

### 3.1 Content File Structure Planning

**File naming convention:**
```
content/pages/{pageId}.json
```

**Required structure template:**
```json
{
  "pageId": "string",
  "template": "homepage|standard-page|landing-page",
  "seo": {
    "en": { /* SEO metadata */ },
    "lt": { /* Lithuanian SEO */ },
    "pl": { /* Polish SEO */ }
  },
  "content": {
    "en": { /* English content */ },
    "lt": { /* Lithuanian content */ },
    "pl": { /* Polish content */ }
  },
  "components": [
    { "type": "ComponentName", "contentKey": "sectionName", "required": boolean }
  ]
}
```

### 3.2 SEO Metadata Creation Process

**For each locale, create comprehensive SEO:**

```json
{
  "title": "Primary Keyword - Brand Name (55-60 chars)",
  "description": "Compelling description with keywords (150-160 chars)",
  "keywords": "primary keyword, secondary keyword, brand terms",
  "ogImage": "/images/og/{locale}-{pageId}.jpg",
  "ogImageAlt": "Descriptive alt text for social sharing",
  "structuredData": {
    "@context": "https://schema.org",
    "@type": "WebPage|Article|Service",
    // Additional structured data based on page type
  }
}
```

**SEO Best Practices:**
- **Title**: Include primary keyword, keep under 60 characters
- **Description**: Compelling copy with call-to-action, 150-160 chars
- **Keywords**: 3-5 relevant terms, avoid keyword stuffing
- **OG Image**: Locale-specific if content differs significantly
- **Structured Data**: Use appropriate schema.org types

### 3.3 Content Creation Methodology

**Content creation priority order:**
1. **English (en)** - Primary content, most detailed
2. **Lithuanian (lt)** - Full translation with cultural adaptation
3. **Polish (pl)** - Complete localization

**Content structure per section:**
```json
{
  "sectionName": {
    "title": "Section heading",
    "subtitle": "Supporting text (optional)",
    "description": "Detailed description",
    "items": [
      {
        "title": "Item title",
        "description": "Item description",
        "features": ["Feature 1", "Feature 2"],
        "cta": {
          "text": "Action text",
          "link": "/target-page"
        }
      }
    ],
    "cta": {
      "text": "Main action",
      "link": "/contact",
      "style": "primary|secondary"
    }
  }
}
```

## Phase 4: Component Implementation Strategy

### 4.1 Component Selection Decision Tree

```
Start: What is the section's primary purpose?
│
├── Capture attention & drive action?
│   └── Use: Hero (primary CTA + visual impact)
│
├── Display multiple items/services?
│   ├── Need CTAs on each item? → ServiceCards
│   └── Just informational? → Features
│
├── Collect user information?
│   └── Use: ContactForm
│
├── Build trust/credibility?
│   └── Use: Testimonials
│
└── Present detailed content?
    ├── Simple intro? → PageHeader
    └── Rich content? → Content
```

### 4.2 New Component Creation Guidelines

**When to create a new component:**
- Existing components don't match the design requirements
- Content structure is significantly different
- Specific functionality is needed (animations, interactions)
- Reusability across multiple pages is expected

**New component creation process:**
1. **Design the interface:**
   ```typescript
   interface NewComponentProps {
     title: string
     subtitle?: string
     items: ItemType[]
     cta?: CTAType
     className?: string
   }
   ```

2. **Create the component file:**
   ```bash
   components/NewComponent.tsx
   ```

3. **Implement with theme system:**
   ```tsx
   import { ComponentProps } from './types'
   
   const NewComponent: React.FC<ComponentProps> = ({ 
     title, 
     subtitle, 
     items, 
     cta 
   }) => {
     return (
       <section className="py-section bg-neutral-50">
         <div className="container-custom">
           <h2 className="text-h1 font-semibold text-neutral-900 mb-element">
             {title}
           </h2>
           {/* Component implementation */}
         </div>
       </section>
     )
   }
   ```

4. **Register in ComponentRenderer:**
   ```tsx
   // Add import
   import NewComponent from './NewComponent'
   
   // Add case in switch statement
   case 'newcomponent':
     return <NewComponent {...props} />
   ```

### 4.3 Component Configuration in Content

**Add component to content file:**
```json
{
  "components": [
    {
      "type": "Hero",
      "contentKey": "hero",
      "required": true
    },
    {
      "type": "NewComponent", 
      "contentKey": "newSection",
      "required": false
    }
  ]
}
```

## Phase 5: Route Configuration & Testing

### 5.1 Route Registration

**Add route to `content/routes.json`:**
```json
{
  "pageId": "new-page",
  "urls": {
    "en": "new-page",
    "lt": "naujas-puslapis", 
    "pl": "nowa-strona"
  },
  "priority": 0.8,
  "changefreq": "monthly"
}
```

**Route priority guidelines:**
- `1.0`: Homepage
- `0.8-0.9`: Main pages (About, Services)
- `0.6-0.7`: Secondary pages (Contact, Blog)
- `0.4-0.5`: Utility pages (Privacy, Terms)

### 5.2 Page Implementation

**Create page file (if needed):**
```tsx
// app/[locale]/new-page/page.tsx
import ComponentRenderer from '@/components/ComponentRenderer'
import { getPageContent, getPageSEO } from '@/content/lib/content-resolver'
import { Locale } from '@/lib/i18n'

export async function generateMetadata({ 
  params 
}: { 
  params: { locale: Locale } 
}) {
  const seo = getPageSEO('new-page', params.locale)
  return {
    title: seo.title,
    description: seo.description,
    // ... other metadata
  }
}

export default function NewPage({ 
  params 
}: { 
  params: { locale: Locale } 
}) {
  const content = getPageContent('new-page', params.locale)
  
  return (
    <ComponentRenderer 
      components={content.components || []} 
      content={content} 
    />
  )
}
```

## Phase 6: Quality Assurance Checklist

### 6.1 Content Validation
- [ ] All required locales have complete translations
- [ ] SEO metadata is optimized for each locale
- [ ] CTAs are clear and action-oriented
- [ ] Content hierarchy supports user goals
- [ ] Images have proper alt text and are optimized

### 6.2 Technical Validation
- [ ] Components render correctly in all locales
- [ ] Routes are properly configured
- [ ] Page loads without TypeScript errors
- [ ] Content resolver functions work correctly
- [ ] SEO metadata generates properly

### 6.3 UX Validation
- [ ] Page serves its intended purpose
- [ ] CTA hierarchy guides users effectively
- [ ] Content is scannable and well-structured
- [ ] Mobile responsiveness is maintained
- [ ] Loading performance is acceptable

## Common Patterns & Templates

### Landing Page Pattern
```
Hero (Primary CTA) → Features/Benefits → Social Proof → Secondary CTA → Contact Form
```

### Service Page Pattern  
```
PageHeader → ServiceCards → Process Steps → Testimonials → Contact CTA
```

### About Page Pattern
```
PageHeader → Content (Mission/Vision) → Team → Values → Contact CTA
```

### Contact Page Pattern
```
PageHeader → ContactForm → Location/Hours → Trust Indicators
```

## Anti-Patterns to Avoid

### ❌ Don't Do
- Create pages without clear purpose or success metrics
- Use more than one primary CTA per page
- Skip SEO metadata or use duplicate content
- Create components without considering reusability
- Ignore mobile-first design principles
- Hardcode content instead of using the content system

### ✅ Do Instead
- Start with user goals and business objectives
- Plan content hierarchy before implementation
- Create comprehensive, localized SEO metadata
- Follow established component patterns
- Test across all supported locales
- Use the theme system consistently

---

*This guide should be followed for every new page creation to ensure consistency and quality across the website.*
