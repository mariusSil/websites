interface FeatureItem {
  title: string
  description: string
  icon?: React.ReactNode
  features?: string[]
}

interface FeaturesProps {
  title: string
  subtitle?: string
  features?: FeatureItem[]
  items?: FeatureItem[]
  className?: string
}

export function Features({ title, subtitle, features, items, className = '' }: FeaturesProps) {
  // Handle both 'features' and 'items' prop names for backward compatibility
  const featureList = features || items || [];

  return (
    <section className={`section ${className}`}>
      <div className="container-custom">
        <div className="section-header">
          <h2 className="section-title">{title}</h2>
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureList.map((item, index) => (
            <div key={index} className="card text-center">
              {item.icon && (
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 text-primary-500">
                    {item.icon}
                  </div>
                </div>
              )}
              <h3 className="text-h3 text-navy-800 mb-3">
                {item.title}
              </h3>
              <p className="text-body text-neutral-600 mb-4">
                {item.description}
              </p>
              
              {item.features && item.features.length > 0 && (
                <ul className="space-y-2">
                  {item.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="trust-indicator text-sm">
                      <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-neutral-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
