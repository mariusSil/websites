/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand colors from design analysis
        primary: {
          50: '#e8f5e8',
          100: '#c8e6c9',
          200: '#a5d6a7',
          300: '#81c784',
          400: '#66bb6a',
          500: '#4caf50', // Primary Green
          600: '#43a047',
          700: '#388e3c',
          800: '#2e7d32',
          900: '#1b5e20',
        },
        secondary: {
          50: '#e3f2fd',
          100: '#bbdefb',
          200: '#90caf9',
          300: '#64b5f6',
          400: '#42a5f5',
          500: '#2196f3', // Secondary Blue
          600: '#1e88e5',
          700: '#1976d2',
          800: '#1565c0',
          900: '#0d47a1',
        },
        accent: {
          50: '#e0f7fa',
          100: '#b2ebf2',
          200: '#80deea',
          300: '#4dd0e1',
          400: '#26c6da',
          500: '#00bcd4', // Accent Teal
          600: '#00acc1',
          700: '#0097a7',
          800: '#00838f',
          900: '#006064',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5', // Neutral Gray
          200: '#eeeeee',
          300: '#e0e0e0',
          400: '#bdbdbd',
          500: '#9e9e9e',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
        },
        navy: {
          50: '#e8eaf6',
          100: '#c5cae9',
          200: '#9fa8da',
          300: '#7986cb',
          400: '#5c6bc0',
          500: '#3f51b5',
          600: '#3949ab',
          700: '#303f9f',
          800: '#283593',
          900: '#1a237e', // Dark Navy
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Typography hierarchy from design analysis
        'hero': ['3rem', { lineHeight: '1.1', fontWeight: '700' }], // 48px
        'h1': ['2rem', { lineHeight: '1.2', fontWeight: '600' }], // 32px
        'h2': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }], // 24px
        'h3': ['1.125rem', { lineHeight: '1.4', fontWeight: '500' }], // 18px
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }], // 16px
        'cta': ['1.125rem', { lineHeight: '1.4', fontWeight: '600' }], // 18px
      },
      spacing: {
        // Consistent spacing system from design analysis
        'section': '5rem', // 80px
        'section-lg': '7.5rem', // 120px
        'component': '3rem', // 48px
        'element': '1.5rem', // 24px
        'tight': '0.5rem', // 8px
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'button': '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'card': '0.75rem', // 12px
        'button': '0.5rem', // 8px
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#212121',
            lineHeight: '1.6',
          },
        },
      },
    },
  },
  plugins: [],
}
