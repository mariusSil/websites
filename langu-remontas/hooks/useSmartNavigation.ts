'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { type Locale } from '@/lib/i18n';

interface UseSmartNavigationReturn {
  handleNavigation: (key: string, href: string) => void;
}

export function useSmartNavigation(locale: Locale): UseSmartNavigationReturn {
  const pathname = usePathname();
  const router = useRouter();

  // Smooth scroll function with header offset
  const scrollToSection = useCallback((elementId: string) => {
    const element = document.getElementById(elementId);
    if (!element) {
      return false;
    }

    // Calculate header offset (header + navigation)
    const getHeaderOffset = () => {
      const header = document.querySelector('header');
      const nav = document.querySelector('nav');
      const headerHeight = header ? header.offsetHeight : 64;
      const navHeight = nav ? nav.offsetHeight : 48;
      return headerHeight + navHeight; // 20px buffer
    };

    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - getHeaderOffset();

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    return true;
  }, []);

  // Main navigation handler
  const handleNavigation = useCallback((key: string, href: string) => {
    // Define which navigation items should use smart scrolling
    const smartNavItems = ['services', 'accessories'];
    
    if (!smartNavItems.includes(key)) {
      // For non-smart nav items, use standard navigation
      router.push(href);
      return;
    }

    // If we're on homepage, try to scroll to section

      let sectionId = '';
      
      switch (key) {
        case 'services':
          sectionId = 'services';
          break;
        case 'accessories':
          sectionId = 'accessories';
          break;
        default:
          break;
      }

      if (sectionId) {
        // Try to scroll to section, fallback to page navigation if section not found
        const scrollSuccess = scrollToSection(sectionId);
        if (!scrollSuccess) {
          // Section not found, navigate to dedicated page
          router.push(href);
        }
     
    } else {
      // Not on homepage, navigate to dedicated page
      router.push(href);
    }
  }, [router, scrollToSection]);

  return {
    handleNavigation
  };
}
