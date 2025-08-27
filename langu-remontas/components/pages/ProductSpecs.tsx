import { type Locale } from '@/lib/i18n';
import Icon from '@/components/ui/Icon';

interface Specification {
  label: string;
  value: string;
  icon?: string;
}

interface SpecificationGroup {
  title: string;
  specs: Specification[];
}

interface ProductSpecsProps {
  translations: {
    title: string;
    subtitle?: string;
    specificationGroups: SpecificationGroup[];
    downloadLinks?: Array<{
      title: string;
      url: string;
      type: string;
      size?: string;
    }>;
    compatibilityNote?: string;
  };
  locale: Locale;
}

export default function ProductSpecs({ translations, locale }: ProductSpecsProps) {
  if (!translations || !translations.specificationGroups || translations.specificationGroups.length === 0) {
    return (
      <section className="py-20 bg-neutral-50">
        <div className="container-custom text-center">
          <h2 className="text-h1 text-secondary mb-4">
            {locale === 'lt' ? 'Kraunamos specifikacijos...' : 
             locale === 'pl' ? 'Ładowanie specyfikacji...' : 
             locale === 'uk' ? 'Завантаження специфікацій...' : 
             'Loading specifications...'}
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-neutral-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-h1 font-bold text-secondary mb-4">
            {translations.title}
          </h2>
          {translations.subtitle && (
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              {translations.subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Specifications */}
          <div className="lg:col-span-2 space-y-8">
            {translations.specificationGroups.map((group, groupIndex) => (
              <div key={groupIndex} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-h2 font-semibold text-secondary mb-6 flex items-center gap-3">
                  <Icon name="Settings" className="w-6 h-6 text-primary" />
                  {group.title}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {group.specs.map((spec, specIndex) => (
                    <div key={specIndex} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        {spec.icon && (
                          <Icon name={spec.icon as any} className="w-5 h-5 text-primary" />
                        )}
                        <span className="font-medium text-secondary">{spec.label}</span>
                      </div>
                      <span className="text-neutral-700 font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Compatibility Note */}
            {translations.compatibilityNote && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <Icon name="Info" className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">
                      {locale === 'lt' ? 'Suderinamumas' : 
                       locale === 'pl' ? 'Kompatybilność' : 
                       locale === 'uk' ? 'Сумісність' : 
                       'Compatibility'}
                    </h4>
                    <p className="text-blue-800">{translations.compatibilityNote}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Download Links */}
            {translations.downloadLinks && translations.downloadLinks.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-secondary mb-4 flex items-center gap-2">
                  <Icon name="Download" className="w-5 h-5 text-primary" />
                  {locale === 'lt' ? 'Atsisiuntimai' : 
                   locale === 'pl' ? 'Pobieranie' : 
                   locale === 'uk' ? 'Завантаження' : 
                   'Downloads'}
                </h3>
                <div className="space-y-3">
                  {translations.downloadLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg hover:bg-primary/5 transition-colors group"
                      download
                    >
                      <div className="flex items-center gap-3">
                        <Icon name="FileText" className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium text-secondary group-hover:text-primary transition-colors">
                            {link.title}
                          </p>
                          <p className="text-sm text-neutral-500">
                            {link.type}{link.size && ` • ${link.size}`}
                          </p>
                        </div>
                      </div>
                      <Icon name="Download" className="w-4 h-4 text-neutral-400 group-hover:text-primary transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Contact */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6">
              <h3 className="font-semibold text-secondary mb-3 flex items-center gap-2">
                <Icon name="MessageSquare" className="w-5 h-5 text-primary" />
                {locale === 'lt' ? 'Reikia pagalbos?' : 
                 locale === 'pl' ? 'Potrzebujesz pomocy?' : 
                 locale === 'uk' ? 'Потрібна допомога?' : 
                 'Need Help?'}
              </h3>
              <p className="text-neutral-600 mb-4 text-sm">
                {locale === 'lt' ? 'Mūsų ekspertai padės išrinkti tinkamą produktą ir atsakys į visus klausimus.' : 
                 locale === 'pl' ? 'Nasi eksperci pomogą wybrać odpowiedni produkt i odpowiedzą na wszystkie pytania.' : 
                 locale === 'uk' ? 'Наші експерти допоможуть вибрати підходящий продукт та відповідять на всі питання.' : 
                 'Our experts will help you choose the right product and answer all questions.'}
              </p>
              <div className="space-y-2">
                <button className="w-full bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm">
                  {locale === 'lt' ? 'Kviesti meistrą' : 
                   locale === 'pl' ? 'Wezwać technika' : 
                   locale === 'uk' ? 'Викликати техніка' : 
                   'Call a Technician'}
                </button>
                <button className="w-full border-2 border-primary text-primary px-4 py-2 rounded-lg font-medium hover:bg-primary hover:text-white transition-colors text-sm">
                  {locale === 'lt' ? 'Konsultacija' : 
                   locale === 'pl' ? 'Konsultacja' : 
                   locale === 'uk' ? 'Консультація' : 
                   'Consultation'}
                </button>
              </div>
            </div>

            {/* Technical Support */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-secondary mb-4 flex items-center gap-2">
                <Icon name="Headphones" className="w-5 h-5 text-primary" />
                {locale === 'lt' ? 'Techninis palaikymas' : 
                 locale === 'pl' ? 'Wsparcie techniczne' : 
                 locale === 'uk' ? 'Технічна підтримка' : 
                 'Technical Support'}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Icon name="Phone" className="w-4 h-4 text-primary" />
                  <span className="text-neutral-600">+370 600 12345</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Icon name="Mail" className="w-4 h-4 text-primary" />
                  <span className="text-neutral-600">info@langu-remontas.lt</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Icon name="Clock" className="w-4 h-4 text-primary" />
                  <span className="text-neutral-600">
                    {locale === 'lt' ? 'Pr-Pn 8:00-18:00' : 
                     locale === 'pl' ? 'Pn-Pt 8:00-18:00' : 
                     locale === 'uk' ? 'Пн-Пт 8:00-18:00' : 
                     'Mon-Fri 8:00-18:00'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
