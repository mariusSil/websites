'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { RequestTechnicianModal } from './RequestTechnicianModal';
import { getButtonText } from '@/lib/button-constants';
import { loadSharedContent, getLocalizedSharedContent } from '@/content/lib/content-resolver';
import { type Locale } from '@/lib/i18n';

interface ConsultationButtonProps {
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'outline-red' | 'success' | 'green' | 'blue' | 'ghost' | 'link' | 'accent';
  size?: 'sm' | 'lg' | 'xl' | 'default' | 'icon';
  className?: string;
  prefillMessage?: string;
  locale: Locale;
  showIcon?: boolean;
}

export function ConsultationButton({ 
  variant = "outline-red",
  size = "sm", 
  className = "",
  prefillMessage,
  locale,
  showIcon = false
}: ConsultationButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formsContent, setFormsContent] = useState<any>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const content = await loadSharedContent('forms');
        if (content) {
          const localizedContent = getLocalizedSharedContent(content, locale);
          setFormsContent(localizedContent);
        }
      } catch (error) {
        console.error('Failed to load forms content:', error);
      }
    };
    loadContent();
  }, [locale]);

  // Use prefillMessage from translations if available, otherwise fall back to prop or default
  const defaultPrefillMessage = "I would like to schedule a free consultation to discuss my window/door needs.";
  const finalPrefillMessage = formsContent?.consultation?.prefillMessage || prefillMessage || defaultPrefillMessage;

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={() => setIsModalOpen(true)}
        showIcon={showIcon}
      >
        {getButtonText('CONSULTATION', locale)}
      </Button>
      
      <RequestTechnicianModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        locale={locale}
        triggerType="consultation"
        prefillMessage={finalPrefillMessage}
      />
    </>
  );
}
