# AI Website Template

A Next.js website template optimized for AI-powered development with JSON-based content management.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Export static site
npm run export
```

## 📁 Project Structure

```
template/
├── app/                  # Next.js App Router pages
├── components/          # Reusable components
├── content/            # JSON content files
│   └── site.json      # Main content configuration
├── public/             # Static assets
└── package.json       # Dependencies
```

## 🎨 Customizing Content

Edit `content/site.json` to update your website content:

```json
{
  "site": {
    "name": "Your Website Name",
    "description": "Your website description"
  },
  "pages": {
    "/": {
      "title": "Home Page Title",
      "components": [
        {
          "type": "hero",
          "data": {
            "title": "Your Hero Title",
            "subtitle": "Your subtitle"
          }
        }
      ]
    }
  }
}
```

## 🤖 AI-Powered Development

This template is optimized for use with AI coding assistants like Windsurf and Cursor:

### Ask AI to create components:

- "Create a testimonials section with customer quotes"
- "Build a pricing table with 3 tiers"
- "Add a newsletter signup form"

### AI understands the structure:

- JSON-based content system
- Component-driven architecture
- TypeScript for type safety
- Tailwind for styling

## 📦 Available Components

- `hero` - Hero section with title, subtitle, CTA
- `features` - Feature grid with icons and descriptions
- `page-header` - Page header with title and subtitle
- `content` - Simple text content blocks
- `contact-form` - Contact form with configurable fields

## 🔍 SEO Features

- ✅ Automatic sitemap generation (`/sitemap.xml`)
- ✅ Robots.txt generation (`/robots.txt`)
- ✅ Meta tags and Open Graph
- ✅ Structured data ready
- ✅ Performance optimized
- ✅ Static export support

## 🛠 Adding New Components

1. Create component in `components/` folder
2. Add to `ComponentRenderer.tsx`
3. Update your JSON content to use the new component

## 📱 Responsive Design

All components are mobile-first and responsive using Tailwind CSS utility classes.

---

Built for AI-first web development with Next.js 14+ and TypeScript.
