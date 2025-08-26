# ServiceCards Component Redesign Implementation Plan

## PROMPT FOR AI CODING ASSISTANT

Redesign the ServiceCards component in the langu-remontas project to match the provided design mockup with the following specifications:

### 🎯 DESIGN ANALYSIS FROM IMAGE

**Layout Structure:**
- 8 service cards in 2 rows of 4 cards each
- Each card shows: Image, Title, Description, Price (From €X), Red CTA button
- Section title: "Comprehensive Window & Door Repair Services"
- Section subtitle: "Professional solutions for all your window and door needs"
- Navigation arrows on left/right sides for carousel functionality

**Card Design:**
- White background with subtle shadow
- Square/rectangular service images at top
- Service title in bold
- Brief description text
- Price starting from specific amount
- Red "REQUEST A TECHNICIAN" button (matches brand primary color)

**Services Shown:**
1. Window Adjustment (From €45)
2. Gasket Replacement (From €35) 
3. Mechanism Replacement (From €65)
4. Window Sealing (From €30)
5. Cleaning & Lubrication (From €40)
6. Glass Unit Replacement (From €120)
7. Geometry Restoration (From €75)
8. Emergency Opening (From €95) - highlighted with red border

### 🔧 TECHNICAL REQUIREMENTS

#### 1. Component Architecture Updates

**File:** `/components/shared/ServiceCards.tsx`

```typescript
interface ServiceCard {
  id: string;
  title: string;
  description: string;
  priceFrom: string;
  image: {
    src: string;
    alt: string;
  };
  isEmergency?: boolean; // For special highlighting
  prefillText: string; // For modal prefill
}

interface ServiceCardsProps {
  translations: {
    sectionTitle: string;
    sectionSubtitle: string;
    buttonText: string;
    services: ServiceCard[];
  };
  locale: Locale;
  className?: string;
}
```

#### 2. Modal Context Enhancement

**Update:** `/contexts/ModalContext.tsx`

Add service-specific prefill functionality:

```typescript
interface ModalContextType {
  openRequestTechnicianModal: (prefillText?: string) => void;
  openConsultationModal: () => void;
  closeModal: () => void;
  isModalOpen: boolean;
  modalTriggerType: 'technician' | 'consultation' | null;
  prefillMessage: string; // New field for prefilled text
}
```

#### 3. Content Structure

**Create:** `/content/shared/components/servicecards.json`

```json
{
  "en": {
    "sectionTitle": "Comprehensive Window & Door Repair Services",
    "sectionSubtitle": "Professional solutions for all your window and door needs",
    "buttonText": "REQUEST A TECHNICIAN",
    "services": [
      {
        "id": "window-adjustment",
        "title": "Window Adjustment",
        "description": "Precise window alignment and mechanism adjustment for smooth operation.",
        "priceFrom": "From €45",
        "image": {
          "src": "/images/services/window-adjustment.jpg",
          "alt": "Professional window adjustment service"
        },
        "prefillText": "I need window adjustment service. My windows are not closing properly and need professional alignment."
      },
      // ... 7 more services
    ]
  },
  "lt": {
    "sectionTitle": "Išsamūs langų ir durų remonto paslaugos",
    "sectionSubtitle": "Profesionalūs sprendimai visiems jūsų langų ir durų poreikiams",
    "buttonText": "KVIESTI MEISTRĄ",
    "services": [
      {
        "id": "window-adjustment", 
        "title": "Langų reguliavimas",
        "description": "Tikslus langų išlygiavimas ir mechanizmo reguliavimas sklandžiam veikimui.",
        "priceFrom": "Nuo €45",
        "image": {
          "src": "/images/services/window-adjustment.jpg",
          "alt": "Profesionalus langų reguliavimo paslaugos"
        },
        "prefillText": "Man reikia langų reguliavimo paslaugos. Mano langai tinkamai neužsidaro ir reikia profesionalaus išlygiavimo."
      }
      // ... translations for all services
    ]
  },
  "pl": {
    // Polish translations
  },
  "uk": {
    // Ukrainian translations  
  }
}
```

#### 4. Button Integration Standards

**CRITICAL:** Follow established button text standards from memory:

- **Primary Button Text:** 
  - EN: "CALL A TECHNICIAN" (not "REQUEST A TECHNICIAN")
  - LT: "KVIESTI MEISTRĄ" 
  - PL: "WEZWAĆ TECHNIKA"
  - UK: "ВИКЛИКАТИ ТЕХНІКА"

**Import required utilities:**
```typescript
import { useModal } from '@/contexts/ModalContext';
import { getButtonText } from '@/lib/button-constants';
```

#### 5. Component Implementation

**Key Features to Implement:**

1. **Grid Layout:** 2 rows × 4 columns on desktop, responsive stacking
2. **Card Hover Effects:** Subtle elevation and shadow changes
3. **Emergency Service Highlighting:** Red border for emergency services
4. **Image Placeholders:** Use consistent placeholder blocks during development
5. **Modal Integration:** Each button opens modal with service-specific prefilled text
6. **Carousel Navigation:** Left/right arrow navigation (optional enhancement)

**Responsive Breakpoints:**
- Mobile: 1 column
- Tablet: 2 columns  
- Desktop: 4 columns
- Large: 4 columns with max-width container

#### 6. Styling Requirements

**Follow Design System:**
- **Primary Color:** `#DC2626` (red) for CTA buttons
- **Card Background:** White with `shadow-card` and `hover:shadow-card-hover`
- **Typography:** Section title uses `text-h1`, card titles use `text-h3`
- **Spacing:** `space-section` between sections, `space-component` around cards
- **Border Radius:** `rounded-card` for consistent card styling

#### 7. Accessibility Requirements

- **ARIA Labels:** Proper labeling for all interactive elements
- **Keyboard Navigation:** Tab order through cards and buttons
- **Screen Reader Support:** Descriptive alt text for service images
- **Focus Management:** Visible focus indicators on buttons
- **Semantic HTML:** Use proper heading hierarchy and list structure

#### 8. Implementation Steps

1. **Update ModalContext** with prefill functionality
2. **Create servicecards.json** with all 8 services in 4 languages
3. **Redesign ServiceCards.tsx** component with new layout and functionality
4. **Add image placeholders** for all 8 services
5. **Register component** in ComponentRenderer.tsx (if not already)
6. **Update homepage content** to use new ServiceCards structure
7. **Test modal integration** with prefilled text for each service
8. **Verify responsive design** across all breakpoints
9. **Validate accessibility** with screen readers and keyboard navigation
10. **Test multilingual functionality** across all 4 locales

#### 9. Content Requirements

**8 Services to Implement:**

1. **Window Adjustment** (€45) - Alignment and mechanism tuning
2. **Gasket Replacement** (€35) - Weatherproofing seal renewal  
3. **Mechanism Replacement** (€65) - Full hardware component replacement
4. **Window Sealing** (€30) - Professional weatherproofing application
5. **Cleaning & Lubrication** (€40) - Maintenance service for smooth operation
6. **Glass Unit Replacement** (€120) - Complete glass panel replacement
7. **Geometry Restoration** (€75) - Frame alignment and structural repair
8. **Emergency Opening** (€95) - 24/7 urgent access service (highlighted)

**Prefill Text Examples:**
- Generic: "I need [service name] for my windows/doors. Please contact me to schedule an assessment."
- Specific: "My window mechanism is broken and needs replacement. The handle doesn't turn properly."
- Emergency: "I have an emergency situation - my window/door is stuck and I cannot open it. Please provide urgent assistance."

#### 10. Testing Checklist

- [ ] All 8 service cards display correctly
- [ ] Modal opens with service-specific prefilled text
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Emergency service card has red border highlighting
- [ ] Button text matches established standards
- [ ] All 4 languages display properly
- [ ] Images load with proper alt text
- [ ] Hover effects work smoothly
- [ ] Keyboard navigation functions correctly
- [ ] Screen reader compatibility verified

### 🚨 CRITICAL REQUIREMENTS

1. **Never use "REQUEST A TECHNICIAN"** - Use established "CALL A TECHNICIAN" standard
2. **Always validate locale** with `isValidLocale()` before processing
3. **Use content resolver functions** - Never import JSON directly
4. **Follow component registration** pattern in ComponentRenderer.tsx
5. **Implement proper TypeScript interfaces** - No `any` types
6. **Use lowercase UI component imports** - `@/components/ui/button`
7. **Restart dev server** after Tailwind config changes
8. **Test modal prefill functionality** thoroughly across all services

### 📋 DELIVERABLES

1. Updated `/contexts/ModalContext.tsx` with prefill support
2. New `/content/shared/components/servicecards.json` with complete translations
3. Redesigned `/components/shared/ServiceCards.tsx` component
4. Updated component registration in ComponentRenderer.tsx
5. Image placeholder implementation for all 8 services
6. Responsive design testing across breakpoints
7. Accessibility compliance verification
8. Multilingual functionality testing

**Timeline Estimate:** 4-6 hours for complete implementation and testing

---

**IMPLEMENTATION PRIORITY:** HIGH - This is a core conversion component that directly impacts user engagement and technician requests.
