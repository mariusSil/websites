import { Hero } from './Hero'
import { Features } from './Features'
import { ServiceCards } from './ServiceCards'
import { PageHeader } from './PageHeader'
import { Content } from './Content'
import { ContactForm } from './ContactForm'

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
    case 'features':
      return <Features {...props} />
    case 'servicecards':
      return <ServiceCards {...props} />
    case 'page-header':
      return <PageHeader {...props} />
    case 'content':
      return <Content {...props} />
    case 'contact-form':
      return <ContactForm {...props} />
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
