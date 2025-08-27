import { type Locale } from '@/lib/i18n';
import { CTAButtons } from '@/components/common/CTAButtons';
import Icon from '@/components/ui/Icon';

interface ProductHeaderProps {
  translations: {
    title: string;
    description: string;
    price?: string;
    originalPrice?: string;
    availability?: string;
    sku?: string;
    category?: string;
    images?: Array<{
      url: string;
      alt: string;
    }>;
    keyFeatures?: string[];
    warranty?: string;
    installation?: string;
  };
  locale: Locale;
}

export default function ProductHeader({ translations, locale }: ProductHeaderProps) {
  if (!translations || !translations.title) {
    return (
      <section className="py-20 bg-white">
        <div className="container-custom text-center">
          <h1 className="text-h1 text-secondary mb-4">
            {locale === 'lt' ? 'Kraunamas produktas...' : 
             locale === 'pl' ? 'Ładowanie produktu...' : 
             locale === 'uk' ? 'Завантаження продукту...' : 
             'Loading product...'}
          </h1>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Product Images */}
          <div className="space-y-4">
            {translations.images && translations.images.length > 0 ? (
              <>
                {/* Main Image */}
                <div className="aspect-square bg-neutral-100 rounded-xl overflow-hidden">
                  <img
                    src={translations.images[0].url}
                    alt={translations.images[0].alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Thumbnail Images */}
                {translations.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {translations.images.slice(1, 5).map((image, index) => (
                      <div key={index} className="aspect-square bg-neutral-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                        <img
                          src={image.url}
                          alt={image.alt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              /* Placeholder Image */
              <div className="aspect-square bg-neutral-100 rounded-xl flex items-center justify-center">
                <Icon name="Package" className="w-24 h-24 text-neutral-400" />
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Category & SKU */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              {translations.category && (
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                  {translations.category}
                </span>
              )}
              {translations.sku && (
                <span className="text-neutral-500">
                  {locale === 'lt' ? 'Kodas:' : 
                   locale === 'pl' ? 'SKU:' : 
                   locale === 'uk' ? 'Артикул:' : 
                   'SKU:'} {translations.sku}
                </span>
              )}
            </div>

            {/* Product Title */}
            <h1 className="text-hero font-bold text-secondary leading-tight">
              {translations.title}
            </h1>

            {/* Product Description */}
            <p className="text-xl text-neutral-600 leading-relaxed">
              {translations.description}
            </p>

            {/* Pricing */}
            <div className="flex items-center gap-4">
              {translations.price && (
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-primary">
                    {translations.price}
                  </span>
                  {translations.originalPrice && (
                    <span className="text-xl text-neutral-400 line-through">
                      {translations.originalPrice}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Availability */}
            {translations.availability && (
              <div className="flex items-center gap-2">
                <Icon name="Package" className="w-5 h-5 text-green-600" />
                <span className="text-green-600 font-medium">{translations.availability}</span>
              </div>
            )}

            {/* Key Features */}
            {translations.keyFeatures && translations.keyFeatures.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold text-secondary">
                  {locale === 'lt' ? 'Pagrindinės savybės:' : 
                   locale === 'pl' ? 'Kluczowe cechy:' : 
                   locale === 'uk' ? 'Ключові особливості:' : 
                   'Key Features:'}
                </h3>
                <ul className="space-y-2">
                  {translations.keyFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Icon name="Check" className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-neutral-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Warranty & Installation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {translations.warranty && (
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                  <Icon name="ShieldCheck" className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-900">
                      {locale === 'lt' ? 'Garantija' : 
                       locale === 'pl' ? 'Gwarancja' : 
                       locale === 'uk' ? 'Гарантія' : 
                       'Warranty'}
                    </p>
                    <p className="text-sm text-blue-700">{translations.warranty}</p>
                  </div>
                </div>
              )}
              
              {translations.installation && (
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                  <Icon name="Wrench" className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900">
                      {locale === 'lt' ? 'Montavimas' : 
                       locale === 'pl' ? 'Instalacja' : 
                       locale === 'uk' ? 'Встановлення' : 
                       'Installation'}
                    </p>
                    <p className="text-sm text-green-700">{translations.installation}</p>
                  </div>
                </div>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="pt-6">
              <CTAButtons
                locale={locale}
                technicianProps={{ variant: "default", size: "lg" }}
                consultationProps={{ variant: "outline-red", size: "lg" }}
                layout="vertical"
              />
            </div>

            {/* Additional Info */}
            <div className="pt-6 border-t border-neutral-200">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center gap-2">
                  <Icon name="Truck" className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-medium text-secondary">
                      {locale === 'lt' ? 'Nemokamas pristatymas' : 
                       locale === 'pl' ? 'Darmowa dostawa' : 
                       locale === 'uk' ? 'Безкоштовна доставка' : 
                       'Free Delivery'}
                    </p>
                    <p className="text-sm text-neutral-600">
                      {locale === 'lt' ? 'Vilniuje ir apylinkėse' : 
                       locale === 'pl' ? 'W Wilnie i okolicach' : 
                       locale === 'uk' ? 'У Вільнюсі та околицях' : 
                       'In Vilnius area'}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col items-center gap-2">
                  <Icon name="Users" className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-medium text-secondary">
                      {locale === 'lt' ? 'Profesionalus montavimas' : 
                       locale === 'pl' ? 'Profesjonalny montaż' : 
                       locale === 'uk' ? 'Професійне встановлення' : 
                       'Professional Installation'}
                    </p>
                    <p className="text-sm text-neutral-600">
                      {locale === 'lt' ? 'Sertifikuoti specialistai' : 
                       locale === 'pl' ? 'Certyfikowani specjaliści' : 
                       locale === 'uk' ? 'Сертифіковані спеціалісти' : 
                       'Certified specialists'}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col items-center gap-2">
                  <Icon name="Phone" className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-medium text-secondary">
                      {locale === 'lt' ? '24/7 palaikymas' : 
                       locale === 'pl' ? 'Wsparcie 24/7' : 
                       locale === 'uk' ? 'Підтримка 24/7' : 
                       '24/7 Support'}
                    </p>
                    <p className="text-sm text-neutral-600">
                      {locale === 'lt' ? 'Visada pasiruošę padėti' : 
                       locale === 'pl' ? 'Zawsze gotowi pomóc' : 
                       locale === 'uk' ? 'Завжди готові допомогти' : 
                       'Always ready to help'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
