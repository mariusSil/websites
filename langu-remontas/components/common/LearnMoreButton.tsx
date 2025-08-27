'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { RequestTechnicianModal } from './RequestTechnicianModal';
import { getButtonText } from '@/lib/button-constants';
import { loadSharedContent, getLocalizedSharedContent } from '@/content/lib/content-resolver';
import { type Locale } from '@/lib/i18n';

interface LearnMoreButtonProps {
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'outline-red' | 'success' | 'green' | 'blue' | 'ghost' | 'link' | 'accent';
  size?: 'sm' | 'lg' | 'xl' | 'default' | 'icon';
  className?: string;
  prefillMessage?: string;
  locale: Locale;
  showIcon?: boolean;
  customText?: string; // Allow custom text override
}

export function LearnMoreButton({ 
  variant = "success", // Green variant like in header
  size = "sm", 
  className = "",
  prefillMessage,
  locale,
  showIcon = false,
  customText
}: LearnMoreButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formsContent, setFormsContent] = useState<any>(null);
  const [commonContent, setCommonContent] = useState<any>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const [forms, common] = await Promise.all([
          loadSharedContent('forms'),
          loadSharedContent('common')
        ]);
        
        if (forms) {
          const localizedForms = getLocalizedSharedContent(forms, locale);
          setFormsContent(localizedForms);
        }
        
        if (common) {
          const localizedCommon = getLocalizedSharedContent(common, locale);
          setCommonContent(localizedCommon);
        }
      } catch (error) {
        console.error('Failed to load content:', error);
      }
    };
    loadContent();
  }, [locale]);

  // Use custom text if provided, otherwise use "Learn More" from common content
  const buttonText = customText || commonContent?.buttons?.learnMore || 'Learn More';
  
  // Default prefill message for learn more inquiries
  const defaultPrefillMessage = "I would like to learn more about your services and get additional information.";
  const finalPrefillMessage = formsContent?.learnMore?.prefillMessage || prefillMessage || defaultPrefillMessage;

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={() => setIsModalOpen(true)}
        showIcon={showIcon}
      >
        {buttonText}
      </Button>
      
      <RequestTechnicianModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        locale={locale}
        triggerType="learnMore"
        prefillMessage={finalPrefillMessage}
      />
    </>
  );
}
