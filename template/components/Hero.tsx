interface HeroProps {
  title: string
  subtitle: string
  primaryCta?: {
    text: string
    url: string
  }
  secondaryCta?: {
    text: string
    url: string
  }
  emergencyCta?: {
    text: string
    phone: string
  }
  trustIndicators?: string[]
  backgroundImage?: string
  className?: string
}

export function Hero({ 
  title, 
  subtitle, 
  primaryCta,
  secondaryCta,
  emergencyCta,
  trustIndicators = [],
  backgroundImage,
  className = ''
}: HeroProps) {
  return (
    <section className={`gradient-primary text-white section-lg relative overflow-hidden ${className}`}>
      {/* Background Image Overlay */}
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      
      <div className="container-custom relative z-10">
        <div className="text-center">
          <h1 className="hero-title">{title}</h1>
          <p className="hero-subtitle">
            {subtitle}
          </p>
          
          {/* Trust Indicators */}
          {trustIndicators.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {trustIndicators.map((indicator, index) => (
                <div key={index} className="trust-indicator text-primary-100">
                  <svg className="w-4 h-4 text-primary-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{indicator}</span>
                </div>
              ))}
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            {primaryCta && (
              <a
                href={primaryCta.url}
                className="btn-primary bg-white text-primary-600 hover:bg-neutral-100 shadow-lg"
              >
                {primaryCta.text}
              </a>
            )}
            {secondaryCta && (
              <a
                href={secondaryCta.url}
                className="btn-secondary border-white text-white hover:bg-white hover:text-primary-600"
              >
                {secondaryCta.text}
              </a>
            )}
          </div>

          {/* Emergency CTA */}
          {emergencyCta && (
            <div className="text-center">
              <p className="text-primary-100 text-sm mb-2">Need immediate help?</p>
              <a
                href={`tel:${emergencyCta.phone}`}
                className="btn-emergency inline-flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                {emergencyCta.text}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
