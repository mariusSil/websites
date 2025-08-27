import { type Locale } from '@/lib/i18n';
import Icon from '@/components/ui/Icon';

interface ArticleHeaderProps {
  translations: {
    title: string;
    excerpt?: string;
    author?: string;
    publishDate?: string;
    readTime?: string;
    category?: string;
    featuredImage?: string;
    featuredImageAlt?: string;
  };
  locale: Locale;
}

export default function ArticleHeader({ translations, locale }: ArticleHeaderProps) {
  if (!translations || !translations.title) {
    return (
      <section className="py-20 bg-white">
        <div className="container-custom text-center">
          <h1 className="text-h1 text-secondary mb-4">
            {locale === 'lt' ? 'Kraunamas straipsnis...' : 
             locale === 'pl' ? 'Ładowanie artykułu...' : 
             locale === 'uk' ? 'Завантаження статті...' : 
             'Loading article...'}
          </h1>
        </div>
      </section>
    );
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    
    const localeMap = {
      'lt': 'lt-LT',
      'pl': 'pl-PL', 
      'uk': 'uk-UA',
      'en': 'en-US'
    };
    
    return date.toLocaleDateString(localeMap[locale], options);
  };

  return (
    <article className="py-20 bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 mb-6">
            {translations.category && (
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                {translations.category}
              </span>
            )}
            {translations.publishDate && (
              <div className="flex items-center gap-2">
                <Icon name="Calendar" className="w-4 h-4" />
                <span>{formatDate(translations.publishDate)}</span>
              </div>
            )}
            {translations.readTime && (
              <div className="flex items-center gap-2">
                <Icon name="Clock" className="w-4 h-4" />
                <span>{translations.readTime}</span>
              </div>
            )}
          </div>

          {/* Article Title */}
          <h1 className="text-hero font-bold text-secondary mb-6 leading-tight">
            {translations.title}
          </h1>

          {/* Article Excerpt */}
          {translations.excerpt && (
            <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
              {translations.excerpt}
            </p>
          )}

          {/* Author Info */}
          {translations.author && (
            <div className="flex items-center gap-3 mb-8 pb-8 border-b border-neutral-200">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-secondary">{translations.author}</p>
                <p className="text-sm text-neutral-500">
                  {locale === 'lt' ? 'Langu Remontas ekspertas' : 
                   locale === 'pl' ? 'Ekspert Langu Remontas' : 
                   locale === 'uk' ? 'Експерт Langu Remontas' : 
                   'Langu Remontas Expert'}
                </p>
              </div>
            </div>
          )}

          {/* Featured Image */}
          {translations.featuredImage && (
            <div className="mb-12">
              <img
                src={translations.featuredImage}
                alt={translations.featuredImageAlt || translations.title}
                className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
              />
              {translations.featuredImageAlt && (
                <p className="text-sm text-neutral-500 text-center mt-3 italic">
                  {translations.featuredImageAlt}
                </p>
              )}
            </div>
          )}

          {/* Social Share */}
          <div className="flex items-center justify-between py-6 border-y border-neutral-200 mb-8">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-neutral-600">
                {locale === 'lt' ? 'Dalintis:' : 
                 locale === 'pl' ? 'Udostępnij:' : 
                 locale === 'uk' ? 'Поділитися:' : 
                 'Share:'}
              </span>
              <button className="p-2 text-neutral-500 hover:text-primary transition-colors">
                <Icon name="Facebook" className="w-5 h-5" />
              </button>
              <button className="p-2 text-neutral-500 hover:text-primary transition-colors">
                <Icon name="Linkedin" className="w-5 h-5" />
              </button>
              <button className="p-2 text-neutral-500 hover:text-primary transition-colors">
                <Icon name="Mail" className="w-5 h-5" />
              </button>
            </div>
            
            <button className="flex items-center gap-2 text-sm text-neutral-500 hover:text-primary transition-colors">
              <Icon name="Bookmark" className="w-4 h-4" />
              <span>
                {locale === 'lt' ? 'Išsaugoti' : 
                 locale === 'pl' ? 'Zapisz' : 
                 locale === 'uk' ? 'Зберегти' : 
                 'Save'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
