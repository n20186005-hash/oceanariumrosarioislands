import { nearbyPlaces, type NearbyKey, type NearbyLocale } from '@/lib/nearby';

const headings = {
  en: { title: 'Explore nearby islands and beaches', desc: 'Distinct destinations around Cartagena, with their own access information and map locations.', action: 'Explore place' },
  es: { title: 'Explora islas y playas cercanas', desc: 'Destinos independientes cerca de Cartagena con acceso y mapas propios.', action: 'Explorar lugar' },
  zh: { title: '探索周边岛屿与海滩', desc: '卡塔赫纳周边可独立游览的地点，每篇均有自己的交通资料和地图位置。', action: '查看景点' }
};

export default function NearbyLinks({ locale }: { locale: string }) {
  const loc = locale as NearbyLocale;
  const t = headings[loc] || headings.en;
  return <section id="nearby" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
    <div className="max-w-5xl mx-auto">
      <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-2">{t.title}</h2>
      <p className="mb-8 text-sm" style={{ color: 'var(--text-muted)' }}>{t.desc}</p>
      <div className="grid sm:grid-cols-2 gap-5">
        {(Object.keys(nearbyPlaces) as NearbyKey[]).map(key => {
          const place = nearbyPlaces[key];
          return <a href={`/${locale}/nearby/${key}`} key={key} className="rounded-2xl overflow-hidden transition-shadow hover:shadow-md" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
            <img src={place.image} alt={place.text[loc].title} className="w-full h-48 object-cover" loading="lazy" />
            <div className="p-5">
              <h3 className="font-display text-xl font-semibold mb-2">{place.text[loc].title}</h3>
              <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>{place.text[loc].tagline}</p>
              <span className="text-sm font-medium" style={{ color: 'var(--accent)' }}>{t.action} →</span>
            </div>
          </a>;
        })}
      </div>
    </div>
  </section>;
}
