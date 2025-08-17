interface Service {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  href?: string
  features?: string[]
}

interface ServiceCardsProps {
  services: Service[]
  title?: string
  subtitle?: string
  className?: string
}

export function ServiceCards({ 
  services, 
  title = "Our Services",
  subtitle = "Professional window solutions for your home",
  className = ""
}: ServiceCardsProps) {
  return (
    <section className={`section ${className}`}>
      <div className="container-custom">
        <div className="section-header">
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-card-icon">
                {service.icon}
              </div>
              <h3 className="service-card-title">{service.title}</h3>
              <p className="service-card-description">{service.description}</p>
              
              {service.features && service.features.length > 0 && (
                <ul className="space-y-2 mb-4">
                  {service.features.map((feature, index) => (
                    <li key={index} className="trust-indicator text-sm">
                      <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-neutral-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              )}

              {service.href && (
                <a
                  href={service.href}
                  className="btn-secondary text-sm inline-flex items-center mt-auto"
                >
                  Learn More
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
