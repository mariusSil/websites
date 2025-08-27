import { type Locale } from '@/lib/i18n';
import Icon from '@/components/ui/Icon';

interface ArticleContentProps {
  translations: {
    content: string;
    tableOfContents?: Array<{
      id: string;
      title: string;
      level: number;
    }>;
    relatedLinks?: Array<{
      title: string;
      url: string;
      description?: string;
    }>;
    tags?: string[];
  };
  locale: Locale;
}

export default function ArticleContent({ translations, locale }: ArticleContentProps) {
  if (!translations || !translations.content) {
    return (
      <section className="py-20 bg-white">
        <div className="container-custom text-center">
          <h2 className="text-h1 text-secondary mb-4">
            {locale === 'lt' ? 'Kraunamas turinys...' : 
             locale === 'pl' ? 'Ładowanie treści...' : 
             locale === 'uk' ? 'Завантаження контенту...' : 
             'Loading content...'}
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section className="pb-20">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Table of Contents - Desktop Sidebar */}
            {translations.tableOfContents && translations.tableOfContents.length > 0 && (
              <aside className="lg:w-64 lg:flex-shrink-0">
                <div className="lg:sticky lg:top-8">
                  <div className="bg-neutral-50 rounded-lg p-6">
                    <h3 className="font-semibold text-secondary mb-4 flex items-center gap-2">
                      <Icon name="List" className="w-5 h-5" />
                      {locale === 'lt' ? 'Turinys' : 
                       locale === 'pl' ? 'Spis treści' : 
                       locale === 'uk' ? 'Зміст' : 
                       'Table of Contents'}
                    </h3>
                    <nav className="space-y-2">
                      {translations.tableOfContents.map((item, index) => (
                        <a
                          key={index}
                          href={`#${item.id}`}
                          className={`block text-sm hover:text-primary transition-colors ${
                            item.level === 1 ? 'font-medium' : 
                            item.level === 2 ? 'pl-4' : 'pl-8'
                          }`}
                        >
                          {item.title}
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>
              </aside>
            )}

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Article Content */}
              <div 
                className="prose prose-lg max-w-none prose-headings:text-secondary prose-p:text-neutral-700 prose-a:text-primary prose-strong:text-secondary prose-ul:text-neutral-700 prose-ol:text-neutral-700"
                dangerouslySetInnerHTML={{ __html: translations.content }}
              />

              {/* Related Links */}
              {translations.relatedLinks && translations.relatedLinks.length > 0 && (
                <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-secondary mb-4 flex items-center gap-2">
                    <Icon name="ExternalLink" className="w-5 h-5" />
                    {locale === 'lt' ? 'Susiję straipsniai' : 
                     locale === 'pl' ? 'Powiązane artykuły' : 
                     locale === 'uk' ? 'Пов\'язані статті' : 
                     'Related Articles'}
                  </h3>
                  <div className="space-y-3">
                    {translations.relatedLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        className="block p-3 bg-white rounded-lg hover:shadow-md transition-shadow"
                      >
                        <h4 className="font-medium text-secondary mb-1">{link.title}</h4>
                        {link.description && (
                          <p className="text-sm text-neutral-600">{link.description}</p>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {translations.tags && translations.tags.length > 0 && (
                <div className="mt-8 pt-8 border-t border-neutral-200">
                  <h3 className="font-semibold text-secondary mb-4 flex items-center gap-2">
                    <Icon name="Tag" className="w-5 h-5" />
                    {locale === 'lt' ? 'Žymos' : 
                     locale === 'pl' ? 'Tagi' : 
                     locale === 'uk' ? 'Теги' : 
                     'Tags'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {translations.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm hover:bg-primary hover:text-white transition-colors cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Article Footer */}
              <div className="mt-12 pt-8 border-t border-neutral-200">
                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <Icon name="MessageSquare" className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-secondary mb-2">
                        {locale === 'lt' ? 'Turite klausimų?' : 
                         locale === 'pl' ? 'Masz pytania?' : 
                         locale === 'uk' ? 'Маєте питання?' : 
                         'Have Questions?'}
                      </h3>
                      <p className="text-neutral-600 mb-4">
                        {locale === 'lt' ? 'Mūsų ekspertai pasiruošę padėti. Susisiekite su mumis dėl nemokamos konsultacijos.' : 
                         locale === 'pl' ? 'Nasi eksperci są gotowi pomóc. Skontaktuj się z nami w sprawie bezpłatnej konsultacji.' : 
                         locale === 'uk' ? 'Наші експерти готові допомогти. Зв\'яжіться з нами для безкоштовної консультації.' : 
                         'Our experts are ready to help. Contact us for a free consultation.'}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                          {locale === 'lt' ? 'Kviesti meistrą' : 
                           locale === 'pl' ? 'Wezwać technika' : 
                           locale === 'uk' ? 'Викликати техніка' : 
                           'Call a Technician'}
                        </button>
                        <button className="border-2 border-primary text-primary px-6 py-2 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors">
                          {locale === 'lt' ? 'Konsultacija' : 
                           locale === 'pl' ? 'Konsultacja' : 
                           locale === 'uk' ? 'Консультація' : 
                           'Consultation'}
                        </button>
                      </div>
                    </div>
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
