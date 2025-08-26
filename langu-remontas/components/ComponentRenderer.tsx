import { Hero } from './shared/Hero'
import { ServiceCards } from './shared/ServiceCards'
import { PageHeader } from './common/PageHeader'
import { Content } from './Content'
import { ContactForm } from './ContactForm';
import CtaBanner from './CtaBanner';
import Testimonials from './shared/Testimonials';
import WhyChooseUs from './shared/WhyChooseUs';
import Partners from './Partners';
import Faq from './shared/Faq';
import { ValueProposition } from './shared/ValueProposition';
import ProcessSteps from './ProcessSteps';
import { FreeDiagnostics } from './shared/FreeDiagnostics';
import AccessoriesGrid from './shared/AccessoriesGrid';
import PrivacyPolicy from './pages/PrivacyPolicy';

interface Component {
  type: string;
  props: any;
}

interface ComponentRendererProps {
  components: Component[];
}

function SingleComponentRenderer({ type, props }: { type: string; props: any }) {
  switch (type.toLowerCase()) {
    case 'hero':
      return <Hero {...props} />
    case 'servicecards':
      return <ServiceCards {...props} />
    case 'page-header':
      return <PageHeader {...props} />
    case 'content':
      return <Content {...props} />
    case 'contact-form':
      return <ContactForm {...props} />;
    case 'ctabanner':
      return <CtaBanner {...props} />;
    case 'testimonials':
      return <Testimonials {...props} />;
    case 'whychooseus':
      return <WhyChooseUs {...props} />;
    case 'partners':
      return <Partners {...props} />;
    case 'faq':
      return <Faq {...props} />;
    case 'valueproposition':
      return <ValueProposition {...props} />;
    case 'processsteps':
      return <ProcessSteps {...props} />;
    case 'freediagnostics':
      return <FreeDiagnostics {...props} />;
    case 'accessoriesgrid':
      return <AccessoriesGrid {...props} />;
    case 'privacypolicy':
      return <PrivacyPolicy {...props} />;
    default:
      console.warn(`Unknown component type: ${type}`)
      return null
  }
}

export function ComponentRenderer({ components }: ComponentRendererProps) {
  return (
    <>
      {components.map((component, index) => (
        <SingleComponentRenderer
          key={`${component.type}-${index}`}
          type={component.type}
          props={component.props}
        />
      ))}
    </>
  );
}
