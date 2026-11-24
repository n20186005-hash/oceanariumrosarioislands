import { portPlaces } from '@/lib/portPlaces';
import { nearbyPlaces, type NearbyLocale } from '@/lib/nearby';
import { useTranslations } from 'next-intl';

export default function NearbyLinks({ locale }: { locale: string }) {
  const loc = locale as NearbyLocale;
  const t = useTranslations('nearbyUi');
  const cards = [
    ...Object.entries(nearbyPlaces).map(([key, place]) => ({key, image:place.image, title:place.text[loc].title, summary:place.text[loc].tagline})),
    ...Object.entries(portPlaces).map(([key, place]) => ({key, image:place.image, title:place.copy[loc].title, summary:place.copy[loc].subtitle})),
  ];
  return <section id="nearby" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
    <div className="max-w-5xl mx-auto">
      <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-2">{t('title')}</h2>
      <p className="mb-8 text-sm" style={{ color: 'var(--text-muted)' }}>{t('desc')}</p>
      <div className="grid sm:grid-cols-2 gap-5">
        {cards.map(({key,image,title,summary}) => {
          return <a href={`/${locale}/nearby/${key}`} key={key} className="rounded-2xl overflow-hidden transition-shadow hover:shadow-md" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
            <img src={image} alt={title} className="w-full h-48 object-cover" loading="lazy" />
            <div className="p-5">
              <h3 className="font-display text-xl font-semibold mb-2">{title}</h3>
              <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>{summary}</p>
              <span className="text-sm font-medium" style={{ color: 'var(--accent)' }}>{t('action')} →</span>
            </div>
          </a>;
        })}
      </div>
    </div>
  </section>;
}
