# Client Reviews Section Implementation Plan - Langu-Remontas

## PROMPT for AI Coding Assistant

Implement a client reviews section after the services section on the homepage using existing Testimonials component with updated content and CTAButtons integration.

## Current Analysis

**Existing Structure:**
- `components/Testimonials.tsx` - Component exists with proper structure
- `content/shared/components/testimonials.json` - Content exists with 4 testimonials and CTA data
- Homepage already includes Testimonials component (currently positioned after AccessoriesGrid)
- Component supports avatar images, star ratings, and quotes

**Current Homepage Flow:**
Hero → FreeDiagnostics → ServiceCards → AccessoriesGrid → **Testimonials** → WhyChooseUs → Partners → FAQ

**Required Changes:**
1. Update Testimonials component to use CTAButtons instead of individual CTA handling
2. Extract avatar images from HTML mockup (if available) or use existing ones
3. Ensure proper positioning after services section
4. Configure CTAButtons with red/green styling like header

## Implementation Steps

### 1. Update Testimonials Component Integration

**File:** `/components/Testimonials.tsx`

**Changes Required:**
- Import CTAButtons component
- Replace existing CTA rendering with CTAButtons component
- Configure CTAButtons with proper red/green styling
- Ensure responsive layout for CTA buttons

**Key Updates:**
```tsx
import { CTAButtons } from './shared/CTAButtons';

// Replace CTA section with:
<div className="mt-12 flex justify-center">
  <CTAButtons
    locale={locale}
    translations={modalTranslations}
    technicianProps={{ 
      variant: "default", 
      size: "lg" 
    }}
    consultationProps={{ 
      variant: "outline-red", 
      size: "lg" 
    }}
    layout="horizontal"
    className="gap-4"
  />
</div>
```

### 2. Update Component Props Interface

**Current Interface Issues:**
- Component doesn't receive locale prop
- Missing modal translations for CTAButtons
- Need to align with project's CTA button standards

**Updated Interface:**
```tsx
interface TestimonialsProps {
  locale: Locale;
  content: {
    title: string;
    subtitle?: string;
    items: TestimonialItem[];
  };
  modalTranslations: ModalTranslations;
  className?: string;
}
```

### 3. Verify Content Structure

**Current Content Analysis:**
- 4 testimonials with proper names (Anna Kowalska, Piotr Nowak, Ewa Wiśniewska, Tomasz Jankowski)
- Existing avatar images from storage.googleapis.com
- All 4 locales properly translated
- CTA data exists but needs CTAButtons integration

**Content Updates (if needed):**
- Verify avatar images match the design
- Ensure testimonial content aligns with image mockup
- Update any missing translations

### 4. Homepage Component Registration

**File:** `/components/ComponentRenderer.tsx`

**Verification Required:**
- Ensure Testimonials component is registered
- Check if it receives proper props (locale, modalTranslations)
- Verify component positioning in homepage flow

**Expected Registration:**
```tsx
case 'testimonials':
  return (
    <Testimonials
      locale={locale}
      content={content}
      modalTranslations={modalTranslations}
    />
  );
```

### 5. Update Homepage Content Structure

**File:** `/content/pages/homepage.json`

**Current Structure:** ✅ Already includes Testimonials component
- Positioned after AccessoriesGrid (line 84)
- Proper contentKey reference to "shared:testimonials"
- All locales configured

**No changes needed** - component is already properly positioned after services.

### 6. CTAButtons Configuration

**Header Reference Analysis:**
Based on project standards, header uses:
- Primary button: `variant="default"` (red solid)
- Secondary button: `variant="outline-red"` (red outline)
- Size: `size="sm"` for header

**Testimonials Section Configuration:**
- Primary button: `variant="default"` (red solid) 
- Secondary button: `variant="outline-red"` (red outline)
- Size: `size="lg"` for prominence in testimonials section
- Layout: `horizontal` for desktop, automatic responsive behavior

### 7. Modal Translations Integration

**Required Translations:**
- Ensure testimonials component receives modal translations
- Use same translation structure as other components
- Verify all 4 locales have proper modal form labels

**Translation Structure:**
```tsx
interface ModalTranslations {
  triggerButton: string;
  title: string;
  nameLabel: string;
  // ... other modal fields
}
```

## Technical Implementation Details

### Updated Testimonials Component Structure

```tsx
export default function Testimonials({ 
  locale, 
  content, 
  modalTranslations, 
  className = '' 
}: TestimonialsProps) {
  return (
    <section className={`bg-accent py-20 ${className}`}>
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-h1 text-neutral-900 mb-4">
            {content.title}
          </h2>
          {content.subtitle && (
            <p className="text-body text-neutral-600 max-w-2xl mx-auto">
              {content.subtitle}
            </p>
          )}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {content.items.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex justify-center">
          <CTAButtons
            locale={locale}
            translations={modalTranslations}
            technicianProps={{ 
              variant: "default", 
              size: "lg" 
            }}
            consultationProps={{ 
              variant: "outline-red", 
              size: "lg" 
            }}
            layout="horizontal"
            className="gap-4"
          />
        </div>
      </div>
    </section>
  );
}
```

### Avatar Images from HTML Mockup

**Current Avatar URLs (from testimonials.json):**
1. Anna Kowalska: `https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg`
2. Piotr Nowak: `https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg`
3. Ewa Wiśniewska: `https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg`
4. Tomasz Jankowski: `https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg`

**Note:** HTML mockup doesn't contain testimonials section, so existing avatar images will be used.

## Validation Checklist

- [ ] Testimonials component updated to use CTAButtons
- [ ] Component receives locale and modalTranslations props
- [ ] CTAButtons configured with red/green styling like header
- [ ] Component positioned after services section (already ✅)
- [ ] All 4 locales properly supported
- [ ] Responsive design maintained
- [ ] Avatar images display correctly
- [ ] Star ratings render properly
- [ ] Modal integration works with both buttons

## Expected Outcome

**User Experience:**
- Clean testimonials section with 4 client reviews
- Professional avatar images and star ratings
- Dual CTA buttons (red "REQUEST A TECHNICIAN" + red outline "FREE CONSULTATION")
- Responsive layout that works on all devices
- Proper modal integration for technician requests

**Technical Result:**
- Updated Testimonials component with CTAButtons integration
- Consistent CTA styling across the site
- Proper locale and translation support
- Maintained component architecture standards

## Files to Update

1. **Primary:** `/components/Testimonials.tsx` - Add CTAButtons integration
2. **Verify:** Component registration in ComponentRenderer.tsx
3. **Test:** Homepage rendering with testimonials after services

## Success Criteria

✅ Testimonials section appears after services section  
✅ CTAButtons component used with red/green styling  
✅ All 4 testimonials display with proper avatars and ratings  
✅ Modal integration works for both CTA buttons  
✅ Responsive design maintained across devices  
✅ All 4 locales properly supported  
✅ Component follows project architectural standards
