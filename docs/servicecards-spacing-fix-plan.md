# ServiceCards Component Spacing & Background Fix Plan

## PROMPT for AI Agent: Fix ServiceCards Component Spacing and Background

You need to update the ServiceCards component located at `/langu-remontas/components/shared/ServiceCards.tsx` to fix spacing issues and add a grey background. Follow these specific requirements:

## Current Issues Analysis

**Spacing Problems:**
- Card content padding inconsistent (currently p-6)
- Grid gap may be too tight on mobile (currently gap-6)
- Section spacing around component needs improvement
- Emergency notice spacing needs adjustment

**Background Requirements:**
- Add subtle grey background to entire section
- Use theme color: `bg-neutral-50` or `bg-accent` (#F3F4F6)
- Maintain card contrast with white backgrounds

## Required Changes

### 1. Section Background & Spacing
```tsx
// Update main section wrapper
<section className={`py-space-section bg-neutral-50 ${className}`}>
  <div className="container-custom">
    // Content stays the same
  </div>
</section>
```

**Reasoning:** `bg-neutral-50` (#fafafa) provides subtle grey background that maintains readability while adding visual separation. The `py-space-section` (5rem) provides consistent vertical spacing.

### 2. Grid Spacing Improvements
```tsx
// Update grid with responsive gaps
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
```

**Reasoning:** Progressive gap sizing improves mobile experience (gap-4 = 1rem on mobile, gap-6 = 1.5rem on tablet, gap-8 = 2rem on desktop).

### 3. Card Content Padding Optimization
```tsx
// Update card content padding
<div className="p-4 sm:p-6 flex flex-col flex-grow">
```

**Reasoning:** Responsive padding reduces crowding on mobile (p-4 = 1rem) while maintaining desktop spacing (p-6 = 1.5rem).

### 4. Section Header Spacing
```tsx
// Update section header margin
<div className="text-center mb-8 sm:mb-space-component">
```

**Reasoning:** Responsive margin provides better mobile spacing (mb-8 = 2rem on mobile, mb-space-component = 3rem on desktop).

### 5. Emergency Notice Spacing
```tsx
// Update emergency notice margin
<div className="mt-8 sm:mt-space-element text-center">
```

**Reasoning:** Consistent with header spacing pattern for visual balance.

### 6. Card Content Internal Spacing
```tsx
// Update internal card spacing
<h3 className="text-h3 text-secondary mb-2 sm:mb-3">{service.title}</h3>
<p className="text-body text-neutral-600 flex-grow mb-3 sm:mb-4 leading-relaxed">
  {service.description}
</p>
<div className="mt-auto">
  <p className="text-lg font-semibold text-secondary mb-3 sm:mb-4">{service.priceFrom}</p>
```

**Reasoning:** Tighter spacing on mobile improves content density while maintaining desktop readability.

## Implementation Steps

1. **Update section wrapper** with `bg-neutral-50` background
2. **Modify grid gaps** to be responsive (gap-4 sm:gap-6 lg:gap-8)
3. **Adjust card padding** to be responsive (p-4 sm:p-6)
4. **Fix section header spacing** (mb-8 sm:mb-space-component)
5. **Update emergency notice spacing** (mt-8 sm:mt-space-element)
6. **Refine internal card spacing** for mobile optimization

## Visual Impact

**Before:**
- White background throughout
- Inconsistent spacing on mobile
- Cards may feel cramped on smaller screens

**After:**
- Subtle grey section background for visual separation
- Progressive spacing that adapts to screen size
- Better mobile experience with optimized padding
- Maintained desktop spacing for professional appearance

## Design System Compliance

- Uses theme colors: `bg-neutral-50` from Tailwind config
- Follows responsive spacing patterns
- Maintains card contrast with white backgrounds
- Preserves existing hover effects and emergency styling
- Consistent with project's mobile-first approach

## Testing Requirements

1. **Mobile (320px-640px):** Verify cards don't feel cramped
2. **Tablet (640px-1024px):** Check grid layout and spacing
3. **Desktop (1024px+):** Ensure professional appearance maintained
4. **Accessibility:** Verify contrast ratios remain compliant
5. **Emergency cards:** Confirm ring styling still visible against grey background

## Files to Update

- `/langu-remontas/components/shared/ServiceCards.tsx` - Main component file

## Expected Outcome

A ServiceCards component with:
- Subtle grey background for visual separation
- Responsive spacing that works across all devices
- Improved mobile experience with optimized padding
- Professional desktop appearance maintained
- Better visual hierarchy and content organization
