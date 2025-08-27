# Hero Parallax Background Implementation Plan

## PROMPT for AI Coding Assistant:

**Task:** Implement parallax scrolling effect for Hero.tsx section background to enhance visual appeal and user engagement on the langu-remontas homepage.

## Current Implementation Analysis

### Existing Hero.tsx Structure (Lines 90-98):
```tsx
<section 
  className={`relative min-h-[600px] flex items-center text-white py-12 md:py-12 lg:py-16 ${className}`}
  style={{
    backgroundImage: `linear-gradient(135deg, rgba(17, 24, 39, 0.9) 0%, rgba(17, 24, 39, 0.6) 100%), url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}
>
```

### Current Background Setup:
- **Static background image** with CSS `background-image` property
- **Gradient overlay** for text readability (rgba(17, 24, 39, 0.9) to 0.6)
- **Fixed positioning** with `backgroundSize: 'cover'` and `backgroundPosition: 'center'`
- **Default image**: Storage URL from Google Cloud
- **Responsive height**: `min-h-[600px]` with responsive padding

## Parallax Implementation Approaches

### Option 1: CSS-Only Transform Parallax (Recommended)
**Pros:** Lightweight, no dependencies, good performance
**Cons:** Limited to transform-based effects

### Option 2: Intersection Observer API
**Pros:** Modern browser API, precise control, performance-optimized
**Cons:** More complex implementation

### Option 3: React-Spring Library
**Pros:** Smooth animations, extensive features
**Cons:** Additional dependency, larger bundle size

### Option 4: Framer Motion
**Pros:** Powerful animation library, excellent TypeScript support
**Cons:** Heavy dependency, may be overkill

## Recommended Implementation: CSS Transform + Intersection Observer

### Technical Requirements

#### 1. Performance Considerations
- **Throttled scroll events** to prevent performance issues
- **Transform-based animations** instead of changing background-position
- **Will-change CSS property** for GPU acceleration
- **Reduced motion support** for accessibility compliance

#### 2. Browser Compatibility
- **Modern browsers** with Intersection Observer support
- **Fallback** to static background for older browsers
- **Mobile optimization** with reduced parallax intensity

#### 3. Accessibility Requirements
- **Respect prefers-reduced-motion** media query
- **Keyboard navigation** not affected
- **Screen reader compatibility** maintained

## Implementation Steps

### Step 1: Create Parallax Hook
**File:** `/hooks/useParallax.ts`

```typescript
'use client';

import { useEffect, useRef, useState } from 'react';

interface UseParallaxOptions {
  speed?: number;
  offset?: number;
  disabled?: boolean;
}

export function useParallax({ 
  speed = 0.5, 
  offset = 0, 
  disabled = false 
}: UseParallaxOptions = {}) {
  const elementRef = useRef<HTMLElement>(null);
  const [transform, setTransform] = useState('translateY(0px)');

  useEffect(() => {
    if (disabled || !elementRef.current) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const element = elementRef.current;
    let animationId: number;

    const updateParallax = () => {
      const rect = element.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const rate = scrolled * -speed;
      const yPos = Math.round(rate + offset);
      
      setTransform(`translateY(${yPos}px)`);
    };

    const handleScroll = () => {
      animationId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateParallax(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [speed, offset, disabled]);

  return { elementRef, transform };
}
```

### Step 2: Update Hero.tsx Component
**File:** `/components/shared/Hero.tsx`

#### Add Imports:
```typescript
import { useParallax } from '@/hooks/useParallax';
```

#### Modify Component Structure:
```tsx
export function Hero({ 
  locale,
  translations,
  backgroundImage = 'https://storage.googleapis.com/uxpilot-auth.appspot.com/d13f0792a2-b2486b2cccf0c1039aa4.png',
  className = '',
  parallaxSpeed = 0.5,
  enableParallax = true
}: HeroProps) {
  
  const { elementRef, transform } = useParallax({ 
    speed: parallaxSpeed, 
    disabled: !enableParallax 
  });

  // ... existing validation logic ...

  return (
    <section 
      ref={elementRef}
      className={`relative min-h-[600px] flex items-center text-white py-12 md:py-12 lg:py-16 overflow-hidden ${className}`}
    >
      {/* Parallax Background Layer */}
      <div 
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transform: transform,
          willChange: 'transform'
        }}
      />
      
      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.9) 0%, rgba(17, 24, 39, 0.6) 100%)'
        }}
      />

      {/* Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* ... existing content ... */}
      </div>
    </section>
  );
}
```

#### Update TypeScript Interface:
```typescript
interface HeroProps {
  locale: Locale;
  translations: {
    // ... existing properties ...
  };
  backgroundImage?: string;
  className?: string;
  parallaxSpeed?: number;
  enableParallax?: boolean;
}
```

### Step 3: CSS Optimizations
**File:** `/app/globals.css` (Add these optimizations)

```css
/* Parallax performance optimizations */
.parallax-container {
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}

.parallax-element {
  will-change: transform;
  transform: translate3d(0, 0, 0);
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .parallax-element {
    transform: none !important;
  }
}
```

### Step 4: Mobile Optimization
**Enhanced Hook with Mobile Detection:**

```typescript
export function useParallax({ 
  speed = 0.5, 
  offset = 0, 
  disabled = false,
  mobileSpeed = 0.2 
}: UseParallaxOptions = {}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const effectiveSpeed = isMobile ? mobileSpeed : speed;
  
  // ... rest of hook logic with effectiveSpeed
}
```

## Advanced Features (Optional)

### 1. Multiple Layer Parallax
```tsx
// Background layers with different speeds
<div className="absolute inset-0">
  <div style={{ transform: `translateY(${transform1})` }}>Background Layer 1</div>
  <div style={{ transform: `translateY(${transform2})` }}>Background Layer 2</div>
</div>
```

### 2. Intersection Observer Integration
```typescript
const useIntersectionParallax = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  // Only apply parallax when visible
  return isVisible;
};
```

### 3. Dynamic Background Loading
```typescript
const [imageLoaded, setImageLoaded] = useState(false);

useEffect(() => {
  const img = new Image();
  img.onload = () => setImageLoaded(true);
  img.src = backgroundImage;
}, [backgroundImage]);
```

## Testing Strategy

### 1. Performance Testing
- **Lighthouse audit** before and after implementation
- **Frame rate monitoring** during scroll
- **Memory usage** tracking
- **Mobile device testing** on various screen sizes

### 2. Browser Compatibility Testing
- **Chrome, Firefox, Safari, Edge** latest versions
- **Mobile browsers** (iOS Safari, Chrome Mobile)
- **Fallback behavior** for unsupported browsers

### 3. Accessibility Testing
- **Reduced motion preference** respect
- **Screen reader compatibility**
- **Keyboard navigation** functionality
- **Color contrast** maintained with overlay

## Performance Benchmarks

### Target Metrics:
- **Scroll FPS**: Maintain 60fps during parallax
- **Bundle Size**: <5KB additional JavaScript
- **LCP Impact**: <100ms increase
- **CLS**: No layout shift introduction

### Optimization Techniques:
- **RequestAnimationFrame** for smooth animations
- **Passive event listeners** for better performance
- **Transform-only animations** (no layout/paint)
- **GPU acceleration** with transform3d

## Implementation Timeline

### Phase 1 (Day 1): Core Implementation
- [ ] Create useParallax hook
- [ ] Update Hero.tsx with basic parallax
- [ ] Add CSS optimizations
- [ ] Test on desktop browsers

### Phase 2 (Day 2): Mobile & Accessibility
- [ ] Implement mobile-specific optimizations
- [ ] Add reduced motion support
- [ ] Cross-browser testing
- [ ] Performance optimization

### Phase 3 (Day 3): Polish & Testing
- [ ] Fine-tune parallax speed and effects
- [ ] Comprehensive testing across devices
- [ ] Performance benchmarking
- [ ] Documentation updates

## Potential Issues & Solutions

### Issue 1: Performance on Low-End Devices
**Solution:** Implement device detection and disable parallax on low-performance devices

### Issue 2: iOS Safari Scroll Issues
**Solution:** Use transform3d and specific iOS optimizations

### Issue 3: Accessibility Concerns
**Solution:** Respect prefers-reduced-motion and provide toggle option

### Issue 4: SEO Impact
**Solution:** Ensure background images have proper alt attributes and structured data

## Success Criteria

1. **Visual Enhancement**: Smooth parallax effect enhances user experience
2. **Performance**: No significant impact on Core Web Vitals
3. **Accessibility**: Full compliance with WCAG 2.1 AA guidelines
4. **Browser Support**: Works across all target browsers
5. **Mobile Optimization**: Appropriate behavior on mobile devices
6. **Maintainability**: Clean, documented code following project patterns

## Files to Modify

1. **New File**: `/hooks/useParallax.ts` - Custom parallax hook
2. **Update**: `/components/shared/Hero.tsx` - Add parallax implementation
3. **Update**: `/app/globals.css` - Add performance optimizations
4. **Update**: Hero component interface for new props

## Dependencies Required

**None** - Pure CSS and JavaScript implementation using existing project dependencies.

---

**Implementation Priority**: High - Visual enhancement that significantly improves user engagement without compromising performance or accessibility.

**Estimated Effort**: 2-3 days for complete implementation including testing and optimization.

**Risk Level**: Low - Non-breaking change with proper fallbacks and performance considerations.
