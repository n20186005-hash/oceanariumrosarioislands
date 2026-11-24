import Header from './Header';
import Footer from './Footer';
import type { NearbyLocale } from '@/lib/nearby';
import { portPlaces, type PortSlug } from '@/lib/portPlaces';
import { practical } from '@/lib/portPractical';

const words = {
  en: { home: 'Nearby places', about: 'History and location', route: 'Walking route', look: 'What to look for', faq: 'Visitor questions', photo: 'Photograph', source: 'Visitor information', map: 'Open in Google Maps', manager: 'Who manages this site?', access: 'What should I check before visiting?', visit: 'Plan your visit' },
  es: { home: 'Lugares cercanos', about: 'Historia y ubicación', route: 'Recorrido a pie', look: 'Qué observar', faq: 'Preguntas frecuentes', photo: 'Fotografía', source: 'Información de visita', map: 'Abrir en Google Maps', manager: '¿Quién administra este lugar?', access: '¿Qué debo consultar antes de la visita?', visit: 'Organiza tu visita' },
  zh: { home: '周边景点', about: '历史与地理位置', route: '步行游线', look: '现场看点与拍摄位置', faq: '游客常见问题', photo: '实景照片来源', source: '参观资料', map: '在 Google 地图打开', manager: '这个地点由谁管理？', access: '出发前需要核对什么？', visit: '参观信息' },
};
export default function PortPlacePage({ slug, locale }: { slug: PortSlug; locale: NearbyLocale }) {
  const place = portPlaces[slug];
  const c = place.copy[locale];
  const w = words[locale];
  const [manager, access] = practical[place.group][['en', 'es', 'zh'].indexOf(locale)];
  const faq = [[c.q, c.a], [w.manager, manager], [w.access, access]];
  const map = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(place.address);
  const url = 'https://www.oceanariumrosarioislands.com';
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'TouristAttraction', name: c.title, description: c.intro, image: url + place.image, hasMap: map, url: url + '/' + locale + '/nearby/' + slug, address: place.address },
      { '@type': 'FAQPage', mainEntity: faq.map(([q,a]) => ({ '@type':'Question', name:q, acceptedAnswer:{ '@type':'Answer', text:a } })) },
    ],
  };
  return <>
    <Header/>
    <main className="pt-20 pb-16">
      <article className="max-w-5xl mx-auto px-4 sm:px-6 space-y-9">
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}/>
        <nav className="text-sm" style={{color:'var(--accent)'}}><a className="underline" href={'/'+locale+'#nearby'}>{w.home}</a></nav>
        <header><h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">{c.title}</h1><a href={map} className="underline" style={{color:'var(--accent)'}}>{place.address} ↗</a></header>
        <section className="rounded-2xl p-6 sm:p-8" style={{background:'var(--bg-secondary)'}}><h2 className="text-2xl font-semibold mb-3">{w.about}</h2><p className="leading-relaxed">{c.intro}</p></section>
        <figure><img src={place.image} alt={c.title} className="w-full max-h-[480px] object-contain rounded-2xl"/><figcaption className="text-xs mt-2"><a href={place.photoSource} className="underline">{w.photo} ↗</a></figcaption></figure>
        <section className="rounded-2xl p-6 sm:p-8" style={{background:'var(--bg-tertiary)'}}><h2 className="text-2xl font-semibold mb-3">{w.route}</h2><p className="leading-relaxed">{c.route}</p></section>
        <section><h2 className="text-2xl font-semibold mb-3">{w.look}</h2><p className="leading-relaxed">{c.look}</p></section>
        <section className="rounded-2xl p-6 sm:p-8" style={{border:'1px solid var(--border-color)'}}><h2 className="text-2xl font-semibold mb-4">{w.faq}</h2>
          <dl className="space-y-5">{faq.map(([q,a])=><div key={q}><dt className="font-semibold">{q}</dt><dd className="mt-1 leading-relaxed">{a}</dd></div>)}</dl>
        </section>
        <section><h2 className="text-2xl font-semibold mb-3">{w.visit}</h2>
          <div className="flex flex-wrap gap-4"><a href={map} className="underline">{w.map} ↗</a><a href={place.source} className="underline">{w.source} ↗</a><a href={'/'+locale+'#nearby'} className="underline">{w.home}</a></div>
        </section>
      </article>
    </main>
    <Footer/>
  </>;
}
