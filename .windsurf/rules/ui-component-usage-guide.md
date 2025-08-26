---
trigger: always_on
---

# UI Component Usage Guide

This document provides instructions and examples for using the reusable UI components in the `langu-remontas` project. These components are located in `langu-remontas/components/ui/` and are globally exported.

## Installation

All necessary dependencies have been added to `package.json`. The core dependencies for these components are `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`, and various `@radix-ui` packages.

## `cn` Utility

A utility function `cn` has been created in `lib/utils.ts` to efficiently merge Tailwind CSS classes. It should be used when you need to conditionally apply classes to a component.

---

## Button

The `Button` component supports multiple visual styles and sizes.

**Import:**
```tsx
import { Button } from '@/components/ui/Button';
```

**Usage:**

```tsx
// Default Button
<Button>Click Me</Button>

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="accent">Accent</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon">
  <YourIconComponent />
</Button>
```

### Button Variants and UX Reasoning

-   **Default (Red `destructive`)**: The primary Call to Action (CTA). Use this for the most important action on a page, such as "Request a Technician" or "Submit Form". Its high visibility draws the user's attention to the main conversion goal.
-   **Primary (Green)**: For positive, secondary actions that are not the main CTA. Use for actions like "Learn More" or "See Features". It indicates a positive but less critical step.
-   **Secondary (Blue)**: For alternative, less emphasized actions. Use alongside a primary or default button to offer a secondary choice, like "Cancel" or "Go Back".
-   **Accent (Teal)**: Use for special promotions, new features, or actions that need to stand out from the primary and secondary color palette.
-   **Destructive (Red)**: Use for actions that have significant, often irreversible consequences, such as deleting data. The red color serves as a warning.
-   **Outline**: For tertiary actions that should be less prominent than solid buttons. Useful in toolbars or as a secondary option in a button group.
-   **Ghost**: For low-emphasis actions, often used within components like headers or cards. They are subtle and don't distract from the content.
-   **Link**: Styles the button to look like a hyperlink. Use for navigation or when an action is conceptually a link to another page or resource.

---

## Input

A styled text input field.

**Import:**
```tsx
import { Input } from '@/components/ui/Input';
```

**Usage:**

```tsx
<Input type="email" placeholder="Email" />
```

---

## Label

An accessible label for form elements.

**Import:**
```tsx
import { Label } from '@/components/ui/Label';
```

**Usage:**

```tsx
<div>
  <Label htmlFor="email-input">Your Email</Label>
  <Input id="email-input" type="email" placeholder="Email" />
</div>
```

---

## Textarea

A styled multi-line text input field.

**Import:**
```tsx
import { Textarea } from '@/components/ui/Textarea';
```

**Usage:**

```tsx
<Textarea placeholder="Type your message here." />
```

---

## Select

A customizable select component.

**Import:**
```tsx
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"
```

**Usage:**

```tsx
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Fruits</SelectLabel>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
      <SelectItem value="blueberry">Blueberry</SelectItem>
      <SelectItem value="grapes">Grapes</SelectItem>
      <SelectItem value="pineapple">Pineapple</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
```

---

## Icon

A dynamic `Icon` component that can render any icon from the `lucide-react` library by name.

**Import:**
```tsx
import { Icon } from '@/components';
```

**Usage:**

To use an icon, pass its name (in PascalCase) from the [Lucide Icons](https://lucide.dev/icons/) library to the `name` prop. You can also pass any standard SVG props like `className`, `width`, `height`, or `strokeWidth`.

```tsx
// Renders a phone icon
<Icon name="Phone" className="w-5 h-5 text-primary" />

// Renders a settings icon with a different stroke width
<Icon name="Settings" strokeWidth={1.5} />

// Example inside a button
<Button>
  <Icon name="LogOut" className="mr-2 h-4 w-4" />
  Logout
</Button>
```

This component eliminates the need to import each icon individually.

### Available Icons

Based on the project design, the following icons have been mapped and are available for use. Pass the `name` prop with the value from the "Lucide Name" column.

| Icon Description | Lucide Name |
| --- | --- |
| Phone | `Phone` |
| Telegram / Send | `Send` |
| WhatsApp / Message | `MessageSquare` |
| Map Marker | `MapPin` |
| Tools / Wrench | `Wrench` |
| Clock / Time | `Clock` |
| Shield / Guarantee | `ShieldCheck` |
| Info | `Info` |
| Star | `Star` |
| Certificate / Badge | `Award` |
| Dollar Sign / Price | `DollarSign` |
| Search / Magnifying Glass | `Search` |
| Fast / Bolt | `Zap` |
| Tidy / Leaf | `Leaf` |
| All Brands / Users | `Users` |
| Payment / Credit Card | `CreditCard` |
| Satisfied Clients | `UserCheck` |
| Minus | `Minus` |
| Plus | `Plus` |
| Email / Mail | `Mail` |
| Facebook | `Facebook` |
| Instagram | `Instagram` |
| LinkedIn | `Linkedin` |
| On-Site Repairs / Toolbox | `Briefcase` |


## 🚨 CRITICAL FIXES

### Next.js Link Error
```typescript
// ❌ NEVER - Causes "Invalid <Link> with <a> child" error
<Link href="/about"><a>About</a></Link>

// ✅ ALWAYS - Direct styling on Link
<Link href="/about" className="button">About</Link>
```

## ⚠️ TOP ERROR PATTERNS TO AVOID

1. **Link/Anchor Nesting**: `<Link><a>` combinations
2. **Missing Translations**: Not handling missing locale keys
3. **Hardcoded Locales**: Use `isValidLocale()` instead
4. **No Form Validation**: Always validate client + server side
5. **Missing ARIA**: Add `aria-*` attributes to modals/forms
6. **Tiny Touch Targets**: Minimum 44px (`min-h-11`)
7. **No Loading States**: Always show loading/submitting feedback
8. **Exposed Secrets**: Never put API keys in client code
9. **Any Types**: Use proper TypeScript interfaces
10. **No Error Boundaries**: Wrap components in error handling

## 📋 QUICK RULES

**Forms:**
- Always associate `<Label htmlFor>` with `<Input id>`
- Phone validation by locale: `+48` (PL), `+370` (LT), `+380` (UK)
- Sanitize inputs with `DOMPurify.sanitize()`

**Modals:**
- Required: `aria-labelledby`, `aria-describedby`, `role="dialog"`
- ESC key closes modal
- Mobile-responsive: `max-w-lg mx-4 sm:mx-auto`

**Performance:**
- Use `React.memo()` for stable props
- Next.js `Image` with proper `width`/`height`
- Loading states: `disabled={isSubmitting}`

**Security:**
- Environment variables: `NEXT_PUBLIC_*` only for client
- Validate all inputs server-side
- Never expose sensitive data

---

**Priority: Fix Link errors and missing translations first, then accessibility and mobile issues.**