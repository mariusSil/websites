import { Hero } from './shared/Hero'
import { ServiceCards } from './shared/ServiceCards'
import { PageHeader } from './common/PageHeader'
import { Content } from './Content'
import { ContactForm } from './ContactForm';
import CtaBanner from './CtaBanner';
import Testimonials from './shared/Testimonials';
import WhyChooseUs from './shared/WhyChooseUs';
import Partners from './shared/Partners';
import Faq from './shared/Faq';
import { ValueProposition } from './shared/ValueProposition';
import { FreeDiagnostics } from './shared/FreeDiagnostics';
import AccessoriesGrid from './shared/AccessoriesGrid';
import TechnicianTeam from './shared/TechnicianTeam';
import Transformations from './shared/Transformations';
import PropertyTypes from './shared/PropertyTypes';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ServiceHero from './pages/ServiceHero';
import ServiceDetails from './pages/ServiceDetails';
import ProcessSteps from './pages/ProcessSteps';
import ArticleHeader from './pages/ArticleHeader';
import ArticleContent from './pages/ArticleContent';
import ProductHeader from './pages/ProductHeader';
import ProductSpecs from './pages/ProductSpecs';
import BusinessIntro from './pages/BusinessIntro';
import CommercialServices from './pages/CommercialServices';
import LargeCustomers from './pages/LargeCustomers';

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
    case 'pageheader':
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
    case 'servicehero':
      return <ServiceHero {...props} />;
    case 'servicedetails':
      return <ServiceDetails {...props} />;
    case 'articleheader':
      return <ArticleHeader {...props} />;
    case 'articlecontent':
      return <ArticleContent {...props} />;
    case 'productheader':
      return <ProductHeader {...props} />;
    case 'productspecs':
      return <ProductSpecs {...props} />;
    case 'freediagnostics':
      return <FreeDiagnostics {...props} />;
    case 'accessoriesgrid':
      return <AccessoriesGrid {...props} />;
    case 'technicianteam':
      return <TechnicianTeam {...props} />;
    case 'transformations':
      return <Transformations {...props} />;
    case 'propertytypes':
      return <PropertyTypes {...props} />;
    case 'privacypolicy':
      return <PrivacyPolicy {...props} />;
    case 'businessintro':
      return <BusinessIntro {...props} />;
    case 'commercialservices':
      return <CommercialServices {...props} />;
    case 'largecustomers':
      return <LargeCustomers {...props} />;
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
