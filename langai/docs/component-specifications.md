# Reusable Component Specifications for Window Company

## Component Library Overview
This document defines reusable components based on the analyzed design, specifically tailored for a window sales and repair company targeting middle-class clients.

## Core Components

### 1. Hero Component (`HeroSection`)

**Purpose**: Primary conversion driver with immediate impact

**Layout Structure**:
```
┌─────────────────────────────────────────────────────────┐
│                 Full-width Hero Container               │
│  ┌─────────────────────────────────────────────────┐   │
│  │            Background Image + Overlay           │   │
│  │  ┌─────────────────────────────────────────┐   │   │
│  │  │         Content Container (max-width)   │   │   │
│  │  │  ┌─────────────────────────────────┐   │   │   │
│  │  │  │        Main Headline (H1)       │   │   │   │
│  │  │  └─────────────────────────────────┘   │   │   │
│  │  │  ┌─────────────────────────────────┐   │   │   │
│  │  │  │      Subheadline (H2/P)         │   │   │   │
│  │  │  └─────────────────────────────────┘   │   │   │
│  │  │  ┌─────────────────────────────────┐   │   │   │
│  │  │  │      Primary CTA Button         │   │   │   │
│  │  │  └─────────────────────────────────┘   │   │   │
│  │  │  ┌─────────────────────────────────┐   │   │   │
│  │  │  │   Trust Indicators (3-4 items)  │   │   │   │
│  │  │  │   [Icon] Text  [Icon] Text      │   │   │   │
│  │  │  └─────────────────────────────────┘   │   │   │
│  │  └─────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

**Responsive Behavior**:
- **Desktop**: Content left-aligned, 50% width, background image right
- **Tablet**: Content centered, 70% width, full background
- **Mobile**: Content centered, 90% width, stacked layout

**Props**:
```typescript
interface HeroSectionProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaAction: () => void;
  backgroundImage: string;
  trustIndicators?: Array<{
    icon: string;
    text: string;
  }>;
}
```

**Features**:
- Responsive background image with overlay
- Animated text entrance
- Prominent CTA button with hover effects
- Trust indicators (years in business, certifications)
- Mobile-optimized layout

**Window Company Adaptation**:
- Background: Professional window installer at work
- Headline: "Expert Window Solutions for Your Home"
- Trust indicators: "25+ Years Experience", "Licensed & Insured", "Free Estimates"

### 2. Service Card Grid (`ServiceGrid`)

**Purpose**: Clear service categorization and navigation

**Layout Structure**:
```
┌─────────────────────────────────────────────────────────┐
│                  Section Container                      │
│  ┌─────────────────────────────────────────────────┐   │
│  │              Section Header (H2)               │   │
│  └─────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────┐   │
│  │                Grid Container                   │   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐         │   │
│  │  │  Card 1 │  │  Card 2 │  │  Card 3 │         │   │
│  │  │ ┌─────┐ │  │ ┌─────┐ │  │ ┌─────┐ │         │   │
│  │  │ │Icon │ │  │ │Icon │ │  │ │Icon │ │         │   │
│  │  │ └─────┘ │  │ └─────┘ │  │ └─────┘ │         │   │
│  │  │  Title  │  │  Title  │  │  Title  │         │   │
│  │  │ Descrip │  │ Descrip │  │ Descrip │         │   │
│  │  │ ┌─────┐ │  │ ┌─────┐ │  │ ┌─────┐ │         │   │
│  │  │ │ CTA │ │  │ │ CTA │ │  │ │ CTA │ │         │   │
│  │  │ └─────┘ │  │ └─────┘ │  │ └─────┘ │         │   │
│  │  └─────────┘  └─────────┘  └─────────┘         │   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐         │   │
│  │  │  Card 4 │  │  Card 5 │  │  Card 6 │         │   │
│  │  └─────────┘  └─────────┘  └─────────┘         │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

**Responsive Behavior**:
- **Desktop**: 3-4 columns, equal height cards
- **Tablet**: 2 columns, maintained aspect ratio
- **Mobile**: 1 column, full-width cards

**Props**:
```typescript
interface ServiceGridProps {
  services: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    link: string;
    featured?: boolean;
  }>;
  columns?: 2 | 3 | 4;
  showCTA?: boolean;
}
```

**Features**:
- Responsive grid layout (2-4 columns)
- Hover animations and effects
- Icon + title + description format
- Optional "Learn More" CTAs
- Featured service highlighting

**Window Services**:
- Window Installation
- Window Repair
- Window Replacement
- Energy Efficiency Upgrades
- Emergency Glass Repair
- Maintenance Services

### 3. Value Proposition (`ValueProposition`)

**Purpose**: Build trust and explain key benefits

**Layout Structure**:
```
┌─────────────────────────────────────────────────────────┐
│                  Section Container                      │
│  ┌─────────────────────┐  ┌─────────────────────────┐   │
│  │    Content Side     │  │      Image Side         │   │
│  │  ┌───────────────┐  │  │  ┌─────────────────┐   │   │
│  │  │   Title (H2)  │  │  │  │                 │   │   │
│  │  └───────────────┘  │  │  │   Hero Image    │   │   │
│  │  ┌───────────────┐  │  │  │                 │   │   │
│  │  │  Description  │  │  │  │                 │   │   │
│  │  └───────────────┘  │  │  └─────────────────┘   │   │
│  │  ┌───────────────┐  │  │                         │   │
│  │  │ ✓ Benefit 1   │  │  │                         │   │
│  │  │ ✓ Benefit 2   │  │  │                         │   │
│  │  │ ✓ Benefit 3   │  │  │                         │   │
│  │  │ ✓ Benefit 4   │  │  │                         │   │
│  │  └───────────────┘  │  │                         │   │
│  │  ┌───────────────┐  │  │                         │   │
│  │  │   CTA Button  │  │  │                         │   │
│  │  └───────────────┘  │  │                         │   │
│  └─────────────────────┘  └─────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

**Responsive Behavior**:
- **Desktop**: 50/50 split layout, image can be left or right
- **Tablet**: 60/40 split, content priority
- **Mobile**: Stacked layout, image above content

**Props**:
```typescript
interface ValuePropositionProps {
  title: string;
  description: string;
  benefits: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  image: string;
  imagePosition: 'left' | 'right';
  ctaText?: string;
  ctaAction?: () => void;
}
```

**Features**:
- Split layout with content and visual
- Animated benefit list with icons
- Professional imagery
- Optional CTA integration
- Mobile-responsive stacking

**Window Company Benefits**:
- Energy Savings (up to 30% on heating/cooling)
- Increased Home Value
- Professional Installation
- Lifetime Warranty
- Local Service & Support

### 4. Process Steps (`ProcessSteps`)

**Purpose**: Explain service delivery process

**Layout Structure (Horizontal)**:
```
┌─────────────────────────────────────────────────────────┐
│                  Section Container                      │
│  ┌─────────────────────────────────────────────────┐   │
│  │              Section Header (H2)               │   │
│  └─────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────┐   │
│  │               Steps Container                   │   │
│  │  ┌─────┐────┌─────┐────┌─────┐────┌─────┐      │   │
│  │  │  1  │────│  2  │────│  3  │────│  4  │      │   │
│  │  │ ┌─┐ │    │ ┌─┐ │    │ ┌─┐ │    │ ┌─┐ │      │   │
│  │  │ │I│ │    │ │I│ │    │ │I│ │    │ │I│ │      │   │
│  │  │ └─┘ │    │ └─┘ │    │ └─┘ │    │ └─┘ │      │   │
│  │  │Title│    │Title│    │Title│    │Title│      │   │
│  │  │Desc │    │Desc │    │Desc │    │Desc │      │   │
│  │  └─────┘    └─────┘    └─────┘    └─────┘      │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

**Layout Structure (Vertical - Mobile)**:
```
┌─────────────────────────────────┐
│        Section Container        │
│  ┌─────────────────────────┐   │
│  │    Section Header       │   │
│  └─────────────────────────┘   │
│  ┌─────────────────────────┐   │
│  │ ┌─┐ Step 1              │   │
│  │ │1│ Title               │   │
│  │ └─┘ Description         │   │
│  │  │                     │   │
│  │ ┌─┐ Step 2              │   │
│  │ │2│ Title               │   │
│  │ └─┘ Description         │   │
│  │  │                     │   │
│  │ ┌─┐ Step 3              │   │
│  │ │3│ Title               │   │
│  │ └─┘ Description         │   │
│  └─────────────────────────┘   │
└─────────────────────────────────┘
```

**Responsive Behavior**:
- **Desktop**: Horizontal layout with connecting lines
- **Tablet**: Horizontal with smaller spacing
- **Mobile**: Vertical layout with left-aligned numbers

**Props**:
```typescript
interface ProcessStepsProps {
  steps: Array<{
    number: number;
    title: string;
    description: string;
    icon?: string;
  }>;
  layout: 'horizontal' | 'vertical';
  animated?: boolean;
}
```

**Features**:
- Numbered step indicators
- Progress line connecting steps
- Icon support for each step
- Animation on scroll
- Mobile-friendly vertical layout

**Window Service Process**:
1. Free In-Home Consultation
2. Custom Measurement & Quote
3. Professional Installation
4. Quality Inspection & Cleanup
5. Warranty Registration

### 5. Trust Indicators Bar (`TrustBar`)

**Purpose**: Display certifications and social proof

**Layout Structure**:
```
┌─────────────────────────────────────────────────────────┐
│                  Trust Bar Container                    │
│  ┌─────────────────────────────────────────────────┐   │
│  │           Indicators Container                  │   │
│  │  ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐   │   │
│  │  │ Logo1 │  │ Logo2 │  │ Logo3 │  │ Logo4 │   │   │
│  │  │ ┌───┐ │  │ ┌───┐ │  │ ┌───┐ │  │ ┌───┐ │   │   │
│  │  │ │ L │ │  │ │ L │ │  │ │ L │ │  │ │ L │ │   │   │
│  │  │ └───┘ │  │ └───┘ │  │ └───┘ │  │ └───┘ │   │   │
│  │  │ Text  │  │ Text  │  │ Text  │  │ Text  │   │   │
│  │  └───────┘  └───────┘  └───────┘  └───────┘   │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

**Responsive Behavior**:
- **Desktop**: Horizontal row, all indicators visible
- **Tablet**: Horizontal with slight overlap
- **Mobile**: Horizontal scroll, 2-3 visible at once

**Props**:
```typescript
interface TrustBarProps {
  indicators: Array<{
    type: 'logo' | 'stat' | 'certification';
    image?: string;
    text: string;
    subtitle?: string;
  }>;
  scrollable?: boolean;
  backgroundColor?: string;
}
```

**Features**:
- Horizontal scrolling on mobile
- Multiple indicator types
- Grayscale logos with color on hover
- Responsive sizing
- Subtle background options

**Window Company Indicators**:
- Better Business Bureau A+ Rating
- EPA Energy Star Partner
- Local Contractor License #
- 500+ Happy Customers
- 10-Year Warranty

### 6. Testimonial Carousel (`TestimonialCarousel`)

**Purpose**: Social proof through customer reviews

**Layout Structure**:
```
┌─────────────────────────────────────────────────────────┐
│                Testimonial Section                      │
│  ┌─────────────────────────────────────────────────┐   │
│  │              Section Header (H2)               │   │
│  └─────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────┐   │
│  │              Carousel Container                 │   │
│  │  ┌─────────────────────────────────────────┐   │   │
│  │  │            Active Testimonial           │   │   │
│  │  │  ┌─────┐  ┌─────────────────────────┐  │   │   │
│  │  │  │     │  │    ★★★★★ Rating        │  │   │   │
│  │  │  │Photo│  │  "Customer testimonial  │  │   │   │
│  │  │  │     │  │   text goes here..."    │  │   │   │
│  │  │  │     │  │                         │  │   │   │
│  │  │  └─────┘  │   - Customer Name       │  │   │   │
│  │  │           │     Location, Service   │  │   │   │
│  │  │           └─────────────────────────┘  │   │   │
│  │  └─────────────────────────────────────────┘   │   │
│  │  ┌─────────────────────────────────────────┐   │   │
│  │  │        Navigation Dots/Arrows           │   │   │
│  │  │         ● ○ ○ ○  ← →                   │   │   │
│  │  └─────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

**Responsive Behavior**:
- **Desktop**: Single testimonial with large text, side navigation
- **Tablet**: Single testimonial, bottom navigation
- **Mobile**: Single testimonial, swipe gestures, dots navigation

**Props**:
```typescript
interface TestimonialCarouselProps {
  testimonials: Array<{
    id: string;
    name: string;
    location: string;
    rating: number;
    text: string;
    image?: string;
    serviceType?: string;
  }>;
  autoplay?: boolean;
  showRating?: boolean;
  itemsPerView?: number;
}
```

**Features**:
- Swipeable carousel interface
- Star rating display
- Customer photos (optional)
- Auto-rotation with pause on hover
- Mobile-optimized touch controls

**Window Testimonial Focus**:
- Energy savings achieved
- Installation quality
- Customer service experience
- Before/after satisfaction
- Local neighborhood references

### 7. Contact Form (`ContactForm`)

**Purpose**: Lead generation and quote requests

**Layout Structure**:
```
┌─────────────────────────────────────────────────────────┐
│                  Contact Section                        │
│  ┌─────────────────────────────────────────────────┐   │
│  │              Section Header (H2)               │   │
│  │            "Get Your Free Quote"               │   │
│  └─────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────┐   │
│  │               Form Container                    │   │
│  │  ┌─────────────────────────────────────────┐   │   │
│  │  │  ┌─────────────┐  ┌─────────────┐      │   │   │
│  │  │  │    Name     │  │    Phone    │      │   │   │
│  │  │  │ [_________] │  │ [_________] │      │   │   │
│  │  │  └─────────────┘  └─────────────┘      │   │   │
│  │  │  ┌─────────────────────────────────┐   │   │   │
│  │  │  │           Email                 │   │   │   │
│  │  │  │       [_________________]       │   │   │   │
│  │  │  └─────────────────────────────────┘   │   │   │
│  │  │  ┌─────────────────────────────────┐   │   │   │
│  │  │  │        Service Type             │   │   │   │
│  │  │  │      [▼ Select Service]         │   │   │   │
│  │  │  └─────────────────────────────────┘   │   │   │
│  │  │  ┌─────────────────────────────────┐   │   │   │
│  │  │  │        Message/Details          │   │   │   │
│  │  │  │    [___________________]        │   │   │   │
│  │  │  │    [___________________]        │   │   │   │
│  │  │  └─────────────────────────────────┘   │   │   │
│  │  │  ┌─────────────────────────────────┐   │   │   │
│  │  │  │      [Submit Button]            │   │   │   │
│  │  │  └─────────────────────────────────┘   │   │   │
│  │  │  ┌─────────────────────────────────┐   │   │   │
│  │  │  │      Privacy Notice             │   │   │   │
│  │  │  └─────────────────────────────────┘   │   │   │
│  │  └─────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

**Responsive Behavior**:
- **Desktop**: 2-column layout for name/phone, single column for rest
- **Tablet**: Single column, optimized spacing
- **Mobile**: Single column, larger touch targets

**Props**:
```typescript
interface ContactFormProps {
  title: string;
  fields: Array<{
    name: string;
    type: 'text' | 'email' | 'phone' | 'select' | 'textarea';
    label: string;
    required: boolean;
    options?: string[]; // for select fields
  }>;
  submitText: string;
  onSubmit: (data: FormData) => void;
  showPrivacyNote?: boolean;
}
```

**Features**:
- Progressive form validation
- Mobile-optimized inputs
- Service type selection
- Privacy compliance
- Success/error states

**Window Company Fields**:
- Name (required)
- Phone (required)
- Email
- Service Type (dropdown)
- Number of Windows
- Preferred Contact Time
- Additional Details

### 8. Service Area Map (`ServiceAreaMap`)

**Purpose**: Geographic coverage and local presence

**Layout Structure**:
```
┌─────────────────────────────────────────────────────────┐
│                Service Area Section                     │
│  ┌─────────────────────────────────────────────────┐   │
│  │              Section Header (H2)               │   │
│  │           "Areas We Serve"                     │   │
│  └─────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────┐   │
│  │               Content Container                 │   │
│  │  ┌─────────────────┐  ┌─────────────────────┐  │   │
│  │  │   Map Container │  │   Info Panel        │  │   │
│  │  │  ┌───────────┐  │  │  ┌───────────────┐  │  │   │
│  │  │  │           │  │  │  │ Contact Info  │  │  │   │
│  │  │  │    🗺️     │  │  │  │ Phone: xxx    │  │  │   │
│  │  │  │  Service  │  │  │  │ Email: xxx    │  │  │   │
│  │  │  │   Areas   │  │  │  │ Address: xxx  │  │  │   │
│  │  │  │   with    │  │  │  └───────────────┘  │  │   │
│  │  │  │  Markers  │  │  │  ┌───────────────┐  │  │   │
│  │  │  │           │  │  │  │ Service Areas │  │  │   │
│  │  │  │           │  │  │  │ • Area 1      │  │  │   │
│  │  │  └───────────┘  │  │  │ • Area 2      │  │  │   │
│  │  │                 │  │  │ • Area 3      │  │  │   │
│  │  └─────────────────┘  │  └───────────────┘  │  │   │
│  │                      │  ┌───────────────┐  │  │   │
│  │                      │  │ [Check Area]  │  │  │   │
│  │                      │  └───────────────┘  │  │   │
│  │                      └─────────────────────┘  │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

**Responsive Behavior**:
- **Desktop**: Side-by-side map and info panel
- **Tablet**: Map above, info panel below
- **Mobile**: Stacked layout, smaller map, prominent contact info

**Props**:
```typescript
interface ServiceAreaMapProps {
  centerLocation: [number, number]; // lat, lng
  serviceAreas: Array<{
    name: string;
    coordinates: [number, number][];
    color?: string;
  }>;
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
  interactive?: boolean;
}
```

**Features**:
- Interactive map with service boundaries
- Location markers for service areas
- Contact information overlay
- Mobile-responsive design
- "Check if we serve your area" functionality

### 9. Before/After Gallery (`ProjectGallery`)

**Purpose**: Showcase work quality and results

**Layout Structure**:
```
┌─────────────────────────────────────────────────────────┐
│                Project Gallery Section                  │
│  ┌─────────────────────────────────────────────────┐   │
│  │              Section Header (H2)               │   │
│  │           "Our Recent Projects"                │   │
│  └─────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────┐   │
│  │              Filter Tabs                       │   │
│  │  [All] [Installation] [Repair] [Replacement]   │   │
│  └─────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────┐   │
│  │               Gallery Grid                     │   │
│  │  ┌─────────────────┐  ┌─────────────────┐     │   │
│  │  │   Project 1     │  │   Project 2     │     │   │
│  │  │  ┌───────────┐  │  │  ┌───────────┐  │     │   │
│  │  │  │  Before   │  │  │  │  Before   │  │     │   │
│  │  │  │   Image   │  │  │  │   Image   │  │     │   │
│  │  │  └───────────┘  │  │  └───────────┘  │     │   │
│  │  │  ┌───────────┐  │  │  ┌───────────┐  │     │   │
│  │  │  │   After   │  │  │  │   After   │  │     │   │
│  │  │  │   Image   │  │  │  │   Image   │  │     │   │
│  │  │  └───────────┘  │  │  └───────────┘  │     │   │
│  │  │  Project Title  │  │  Project Title  │     │   │
│  │  │  Location       │  │  Location       │     │   │
│  │  └─────────────────┘  └─────────────────┘     │   │
│  │  ┌─────────────────┐  ┌─────────────────┐     │   │
│  │  │   Project 3     │  │   Project 4     │     │   │
│  │  └─────────────────┘  └─────────────────┘     │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

**Responsive Behavior**:
- **Desktop**: 2-3 columns, hover effects reveal after image
- **Tablet**: 2 columns, tap to toggle before/after
- **Mobile**: 1 column, swipe gesture for before/after

**Props**:
```typescript
interface ProjectGalleryProps {
  projects: Array<{
    id: string;
    title: string;
    beforeImage: string;
    afterImage: string;
    description: string;
    serviceType: string;
    location?: string;
  }>;
  filterByService?: boolean;
  lightbox?: boolean;
}
```

**Features**:
- Before/after slider comparison
- Service type filtering
- Lightbox modal for detailed view
- Lazy loading for performance
- Mobile-optimized touch controls

### 10. Pricing Calculator (`PricingCalculator`)

**Purpose**: Transparent pricing for middle-class market

**Layout Structure**:
```
┌─────────────────────────────────────────────────────────┐
│                Pricing Calculator Section               │
│  ┌─────────────────────────────────────────────────┐   │
│  │              Section Header (H2)               │   │
│  │           "Estimate Your Project"              │   │
│  └─────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────┐   │
│  │               Calculator Container              │   │
│  │  ┌─────────────────┐  ┌─────────────────────┐  │   │
│  │  │  Input Panel    │  │   Results Panel     │  │   │
│  │  │  ┌───────────┐  │  │  ┌───────────────┐  │  │   │
│  │  │  │Window Type│  │  │  │   Subtotal    │  │  │   │
│  │  │  │[Dropdown] │  │  │  │   $X,XXX      │  │  │   │
│  │  │  └───────────┘  │  │  └───────────────┘  │  │   │
│  │  │  ┌───────────┐  │  │  ┌───────────────┐  │  │   │
│  │  │  │Window Size│  │  │  │   Add-ons     │  │  │   │
│  │  │  │[W] x [H]  │  │  │  │   $XXX        │  │  │   │
│  │  │  └───────────┘  │  │  └───────────────┘  │  │   │
│  │  │  ┌───────────┐  │  │  ┌───────────────┐  │  │   │
│  │  │  │ Quantity  │  │  │  │   Total       │  │  │   │
│  │  │  │ [1] [2]   │  │  │  │   $X,XXX      │  │  │   │
│  │  │  └───────────┘  │  │  └───────────────┘  │  │   │
│  │  │  ┌───────────┐  │  │  ┌───────────────┐  │  │   │
│  │  │  │ Add-ons   │  │  │  │  Financing    │  │  │   │
│  │  │  │ ☐ Screens │  │  │  │  $XXX/month   │  │  │   │
│  │  │  │ ☐ Grids   │  │  │  └───────────────┘  │  │   │
│  │  │  │ ☐ Trim    │  │  │  ┌───────────────┐  │  │   │
│  │  │  └───────────┘  │  │  │ [Get Quote]   │  │  │   │
│  │  └─────────────────┘  │  └───────────────┘  │  │   │
│  │                      └─────────────────────┘  │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

**Responsive Behavior**:
- **Desktop**: Side-by-side input and results panels
- **Tablet**: Stacked layout with sticky results
- **Mobile**: Single column, results update inline

**Props**:
```typescript
interface PricingCalculatorProps {
  windowTypes: Array<{
    type: string;
    basePrice: number;
    features: string[];
  }>;
  additionalOptions: Array<{
    name: string;
    price: number;
    description: string;
  }>;
  showFinancing?: boolean;
}
```

**Features**:
- Interactive price calculation
- Window type and size selection
- Add-on options (screens, grids, etc.)
- Financing options display
- "Get Exact Quote" CTA

## Design System

### Color Variables
```css
:root {
  --primary-green: #4CAF50;
  --primary-blue: #2196F3;
  --accent-teal: #00BCD4;
  --neutral-gray: #F5F5F5;
  --dark-navy: #1A237E;
  --white: #FFFFFF;
  --success: #4CAF50;
  --warning: #FF9800;
  --error: #F44336;
}
```

### Typography Scale
```css
:root {
  --font-family-primary: 'Inter', sans-serif;
  --font-family-heading: 'Poppins', sans-serif;
  
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 2rem;      /* 32px */
  --font-size-4xl: 2.5rem;    /* 40px */
}
```

### Spacing System
```css
:root {
  --spacing-xs: 0.5rem;   /* 8px */
  --spacing-sm: 0.75rem;  /* 12px */
  --spacing-md: 1rem;     /* 16px */
  --spacing-lg: 1.5rem;   /* 24px */
  --spacing-xl: 2rem;     /* 32px */
  --spacing-2xl: 3rem;    /* 48px */
  --spacing-3xl: 4rem;    /* 64px */
  --spacing-4xl: 5rem;    /* 80px */
}
```

### Responsive Breakpoints
```css
:root {
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}
```

## Component Usage Guidelines

### Accessibility Requirements
- All components must support keyboard navigation
- ARIA labels and roles for screen readers
- High contrast color combinations (4.5:1 minimum)
- Focus indicators on interactive elements
- Alt text for all images

### Performance Standards
- Components should lazy load below-fold content
- Images optimized with proper sizing and formats
- Minimal JavaScript for core functionality
- CSS-in-JS or CSS modules for styling
- Bundle size monitoring

### Mobile-First Approach
- Touch-friendly button sizes (44px minimum)
- Swipe gestures for carousels
- Optimized form inputs for mobile keyboards
- Readable font sizes without zooming
- Fast loading on slower connections

### SEO Considerations
- Semantic HTML structure
- Proper heading hierarchy
- Meta descriptions for dynamic content
- Schema markup for business information
- Fast Core Web Vitals scores

## Implementation Notes

### Technology Stack Recommendations
- **Framework**: Next.js or React with TypeScript
- **Styling**: Tailwind CSS or Styled Components
- **Forms**: React Hook Form with Zod validation
- **Maps**: Google Maps API or Mapbox
- **Images**: Next.js Image component with optimization
- **Analytics**: Google Analytics 4 with conversion tracking

### Content Management
- All text content should be externalized for easy updates
- Image assets organized by component and purpose
- Form configurations stored in JSON/database
- Service area data manageable through admin interface

### Testing Strategy
- Unit tests for component logic
- Integration tests for form submissions
- Visual regression testing for design consistency
- Accessibility testing with automated tools
- Performance testing on various devices

This component library provides a comprehensive foundation for building a professional, conversion-focused website that effectively serves middle-class homeowners seeking window services.
