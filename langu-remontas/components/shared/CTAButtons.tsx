import { RequestTechnicianButton } from './RequestTechnicianButton';
import { ConsultationButton } from './ConsultationButton';
import { type Locale } from '@/lib/i18n';

interface CTAButtonsProps {
  showTechnician?: boolean;
  showConsultation?: boolean;
  technicianProps?: {
    variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'outline-red' | 'success' | 'green' | 'blue' | 'ghost' | 'link' | 'accent';
    size?: 'sm' | 'lg' | 'xl' | 'default' | 'icon';
    className?: string;
    prefillMessage?: string;
    showIcon?: boolean;
  };
  consultationProps?: {
    variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'outline-red' | 'success' | 'green' | 'blue' | 'ghost' | 'link' | 'accent';
    size?: 'sm' | 'lg' | 'xl' | 'default' | 'icon';
    className?: string;
    prefillMessage?: string;
    showIcon?: boolean;
  };
  locale: Locale;
  className?: string;
  layout?: 'horizontal' | 'vertical';
}

export function CTAButtons({
  showTechnician = true,
  showConsultation = true,
  technicianProps = {},
  consultationProps = {},
  locale,
  className = "",
  layout = 'horizontal'
}: CTAButtonsProps) {
  const containerClasses = layout === 'horizontal' 
    ? `flex flex-col sm:flex-row gap-3 ${className}`
    : `flex flex-col gap-3 ${className}`;

  return (
    <div className={containerClasses}>
      {showTechnician && (
        <RequestTechnicianButton
          locale={locale}
          {...technicianProps}
        />
      )}
      {showConsultation && (
        <ConsultationButton
          locale={locale}
          {...consultationProps}
        />
      )}
    </div>
  );
}
