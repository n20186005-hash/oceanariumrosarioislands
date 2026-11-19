import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { nearbyPlaces, type NearbyKey, type NearbyLocale } from '@/lib/nearby';
import { nearbyDetails } from '@/lib/nearbyDetails';

const base = 'https://www.oceanariumrosarioislands.com';
const locales: NearbyLocale[] = ['zh', 'en', 'es'];
const names = {
  en: { nearby: 'Nearby places', management: 'About the place and management', facts: 'Essential information', location: 'Location', access: 'Access', hours: 'Opening and access', fees: 'Tickets and costs', transport: 'Getting there', highlights: 'What makes it special', background: 'Landscape and context', route: 'Suggested visit route', photography: 'Photo spots', stay: 'Accommodation', reviews: 'Visitor reviews', maps: 'View location and current reviews on Google Maps', sources: 'Place and photo references', faq: 'Frequently asked questions', other: 'Other nearby places', home: 'Oceanario home', current: 'For current ratings and review counts, use this place’s own map listing. We do not substitute the Oceanario’s rating.', source: 'Public travel information and protected-area guidance', details: 'Access depends on local conditions; confirm with your chosen operator.', feesText: 'Public-space access and private services have different conditions. Confirm local fees, transfers, and package inclusions before paying.' },
  es: { nearby: 'Lugares cercanos', management: 'Sobre el lugar y su gestión', facts: 'Información básica', location: 'Ubicación', access: 'Acceso', hours: 'Horarios y acceso', fees: 'Entradas y costos', transport: 'Cómo llegar', highlights: 'Qué lo hace especial', background: 'Paisaje y contexto', route: 'Recorrido sugerido', photography: 'Puntos para fotografías', stay: 'Alojamiento', reviews: 'Opiniones de visitantes', maps: 'Ver ubicación y reseñas actuales en Google Maps', sources: 'Fuentes del lugar y la fotografía', faq: 'Preguntas frecuentes', other: 'Otros lugares cercanos', home: 'Inicio del Oceanario', current: 'Consulta la ficha de este lugar para conocer su calificación y número de reseñas actuales. No usamos la valoración del Oceanario.', source: 'Información turística y orientaciones del área protegida', details: 'El acceso depende de las condiciones locales; confirma con tu operador.', feesText: 'El acceso al espacio público y los servicios privados tienen condiciones distintas. Verifica tasas, transporte y servicios incluidos antes de pagar.' },
  zh: { nearby: '周边景点', management: '地点背景与管理主体', facts: '基本信息', location: '所在地', access: '到达方式', hours: '开放与进入条件', fees: '门票与费用', transport: '交通方式', highlights: '景点特色', background: '地形与背景', route: '建议游览路线', photography: '拍摄机位', stay: '住宿建议', reviews: '游客评价', maps: '在 Google 地图查看位置及最新评价', sources: '地点及照片来源', faq: '常见问答', other: '其他周边景点', home: '返回海洋馆首页', current: '该地点的评分与评价数量请查看专属 Google 地图地点页；这里不会套用海洋馆评分。', source: '公开旅游资料及保护区管理指引', details: '进入条件可能随现场安排变化，请出发前向经营者核实。', feesText: '公共空间与私人服务收费方式不同，请分别核对现场费用、交通和套票包含项目。' }
};
const extraLabels = {
  en: { history: 'Historical and community background', landscape: 'Coastal landscape and built features', observation: 'What to observe', tips: 'Visit tips', guidelines: 'Visitor guidelines', gallery: 'Place photography', route: 'Step-by-step visit' },
  es: { history: 'Historia y comunidad', landscape: 'Paisaje costero y construcciones', observation: 'Puntos de observación', tips: 'Consejos de visita', guidelines: 'Recomendaciones para visitantes', gallery: 'Fotografías del lugar', route: 'Ruta paso a paso' },
  zh: { history: '历史与社区背景', landscape: '海岸地貌与建筑特色', observation: '观察重点', tips: '游览建议', guidelines: '游览须知', gallery: '景点实景照片', route: '分步骤游览路线' }
};
const practical = {
  en: { rating: 'Rating & reviews', ratingNote: 'See the live Google Maps listing; no unverified score is displayed.', hours: 'Access by confirmed transport arrangement; private services set their own hours.', prices: 'No single combined admission ticket. Boat transport, conservation charges where applicable, meals and private facilities may be charged separately.', intro: 'Explore the place', highlights: 'Top reasons to visit', transportGuide: 'Address and directions', road: 'Arrival point', map: 'Open this place in Google Maps', guide: 'Visit planning', ecology: 'Culture, landscape and experiences' },
  es: { rating: 'Calificación y opiniones', ratingNote: 'Consulta la ficha actual en Google Maps; no mostramos una puntuación sin verificar.', hours: 'Acceso sujeto al transporte confirmado; cada servicio privado tiene su propio horario.', prices: 'No hay una entrada combinada única. Transporte, tasas de conservación cuando procedan, comidas e instalaciones privadas pueden cobrarse aparte.', intro: 'Descubre el lugar', highlights: 'Razones para visitarlo', transportGuide: 'Dirección y cómo llegar', road: 'Punto de llegada', map: 'Abrir este lugar en Google Maps', guide: 'Planifica tu visita', ecology: 'Cultura, paisaje y experiencias' },
  zh: { rating: '评分与评价', ratingNote: '请以该景点 Google 地图最新评价为准；不展示未经核实的评分数字。', hours: '按已确认的交通安排进入；私人设施各有营业时间。', prices: '没有统一涵盖所有项目的门票。船只交通、适用的保护区费用、餐饮及私人设施可能分别收费。', intro: '探索景点', highlights: '景区特色', transportGuide: '交通指南与详细地址', road: '抵达地点', map: '在 Google 地图打开该景点', guide: '行前游览建议', ecology: '历史、建筑、文化与核心体验' }
};

export function generateStaticParams() {
  return locales.flatMap(locale => (Object.keys(nearbyPlaces) as NearbyKey[]).map(slug => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!locales.includes(locale as NearbyLocale) || !(slug in nearbyPlaces)) return {};
  const entry = nearbyPlaces[slug as NearbyKey];
  const info = entry.text[locale as NearbyLocale];
  const canonical = `${base}/${locale}/nearby/${slug}`;
  return {
    metadataBase: new URL(base),
    title: `${info.title} | Oceanarium Rosario Islands`,
    description: info.introduction,
    alternates: { canonical, languages: Object.fromEntries([...locales.map(l => [l, `${base}/${l}/nearby/${slug}`]), ['x-default', `${base}/en/nearby/${slug}`]]) },
    openGraph: { title: info.title, description: info.introduction, url: canonical, images: [entry.image] }
  };
}

export default async function NearbyPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!locales.includes(locale as NearbyLocale) || !(slug in nearbyPlaces)) notFound();
  setRequestLocale(locale);
  const place = nearbyPlaces[slug as NearbyKey];
  const info = place.text[locale as NearbyLocale];
  const t = names[locale as NearbyLocale];
  const extra = extraLabels[locale as NearbyLocale];
  const p = practical[locale as NearbyLocale];
  const detail = nearbyDetails[slug as NearbyKey][locale as NearbyLocale];
  const self = `${base}/${locale}/nearby/${slug}`;
  const other = (Object.keys(nearbyPlaces) as NearbyKey[]).filter(k => k !== slug);
  const faqLd = info.faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }));
  const structured = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'TouristAttraction', name: info.title, url: self, image: `${base}${place.image}`, description: info.introduction, address: { '@type': 'PostalAddress', addressLocality: 'Cartagena de Indias', addressRegion: 'Bolívar', addressCountry: 'CO' }, hasMap: place.mapsUrl },
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: t.home, item: `${base}/${locale}` },
      { '@type': 'ListItem', position: 2, name: t.nearby, item: `${base}/${locale}#nearby` },
      { '@type': 'ListItem', position: 3, name: info.title, item: self }
    ]},
    { '@type': 'FAQPage', mainEntity: faqLd }
  ] };
  const panel = 'rounded-2xl p-6 sm:p-8';
  return (
    <>
      <Header />
      <main className="pt-20 pb-16">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured) }} />
        <article className="max-w-5xl mx-auto px-4 sm:px-6 space-y-9">
          <nav className="text-sm" style={{ color: 'var(--accent)' }}><a href={`/${locale}`} className="underline">{t.home}</a> / <a href={`/${locale}#nearby`} className="underline">{t.nearby}</a></nav>
          <header>
            <p className="uppercase tracking-widest text-xs mb-3" style={{ color: 'var(--accent)' }}>{t.nearby}</p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">{info.title}</h1>
            <p className="text-lg mb-4" style={{ color: 'var(--text-secondary)' }}>{info.tagline}</p>
            <div className="flex flex-wrap gap-3 text-sm">
              <a href={place.mapsUrl} target="_blank" rel="noopener noreferrer" className="rounded-full px-4 py-2" style={{ border: '1px solid var(--accent)', color: 'var(--accent)' }}>{t.maps} ↗</a>
              <span className="rounded-full px-4 py-2" style={{ background: 'var(--bg-tertiary)' }}>{place.location}</span>
            </div>
            <div className="grid sm:grid-cols-3 gap-3 mt-6">
              <div className="rounded-xl p-4" style={{ background: 'var(--bg-tertiary)' }}><p className="text-sm font-semibold mb-1">{p.rating}</p><a className="underline text-sm" href={place.mapsUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>{p.map}</a></div>
              <div className="rounded-xl p-4" style={{ background: 'var(--bg-tertiary)' }}><p className="text-sm font-semibold mb-1">{t.hours}</p><p className="text-sm">{p.hours}</p></div>
              <div className="rounded-xl p-4" style={{ background: 'var(--bg-tertiary)' }}><p className="text-sm font-semibold mb-1">{t.location}</p><p className="text-sm">{place.location}</p></div>
            </div>
          </header>
          <figure>
            <img src={place.image} alt={info.title} className="w-full max-h-[480px] object-cover rounded-2xl" />
            <figcaption className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}><a href={place.photoSource} target="_blank" rel="noopener noreferrer" className="underline">{t.sources} ↗</a></figcaption>
          </figure>
          <section className={panel} style={{ background: 'var(--bg-secondary)' }}><h2 className="text-2xl font-semibold mb-3">{p.intro}</h2><p className="text-lg leading-relaxed">{info.introduction}</p></section>
          <section className={panel} style={{ background: 'var(--bg-tertiary)' }}><h2 className="text-2xl font-semibold mb-3">{p.guide}</h2><ul className="space-y-3 list-disc pl-5">{detail.visitTips.map(tip => <li key={tip}>{tip}</li>)}</ul></section>
          <section className={panel} style={{ border: '1px solid var(--border-color)' }}><h2 className="text-2xl font-semibold mb-3">{p.highlights}</h2><p className="leading-relaxed">{info.highlights}</p></section>
          <section className={panel} style={{ background: 'var(--bg-tertiary)' }}>
            <h2 className="text-2xl font-semibold mb-3">{t.management}</h2>
            <p className="leading-relaxed mb-3">{detail.about}</p>
            <a className="text-sm underline" style={{ color: 'var(--accent)' }} href={place.source} target="_blank" rel="noopener noreferrer">{t.source} ↗</a>
          </section>
          <section className={panel} style={{ border: '1px solid var(--border-color)' }}>
            <h2 className="text-2xl font-semibold mb-5">{t.facts}</h2>
            <dl className="grid sm:grid-cols-2 gap-5 text-sm">
              <div><dt className="font-semibold mb-1">{t.location}</dt><dd>{place.location}</dd></div>
              <div><dt className="font-semibold mb-1">{t.access}</dt><dd>{locale === 'en' ? place.access : info.transport}</dd></div>
              <div><dt className="font-semibold mb-1">{t.hours}</dt><dd>{p.hours} {t.details}</dd></div>
              <div><dt className="font-semibold mb-1">{t.fees}</dt><dd>{p.prices} {t.feesText}</dd></div>
              <div><dt className="font-semibold mb-1">{t.transport}</dt><dd>{info.transport}</dd></div>
              <div><dt className="font-semibold mb-1">{p.road}</dt><dd>{place.location}</dd></div>
            </dl>
          </section>
          <section className={panel} style={{ border: '1px solid var(--border-color)' }}><h2 className="text-2xl font-semibold mb-3">{t.hours}</h2><p>{p.hours}</p><p className="mt-2">{t.details}</p></section>
          <section className={panel} style={{ background: 'var(--bg-tertiary)' }}><h2 className="text-2xl font-semibold mb-3">{t.fees}</h2><p>{p.prices}</p><p className="mt-2">{t.feesText}</p></section>
          <section className={panel} style={{ border: '1px solid var(--border-color)' }}><h2 className="text-2xl font-semibold mb-3">{t.transport}</h2><p>{info.transport}</p></section>
          <h2 className="text-2xl font-semibold">{p.ecology}</h2>
          {([
            [extra.history, detail.history], [extra.landscape, detail.landscape],
            [extra.observation, detail.observation], [t.stay, info.stay]
          ] as [string, string][]).map(([heading, body]) => (
            <section key={heading} className={panel} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
              <h2 className="text-2xl font-semibold mb-3">{heading}</h2>
              <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{body}</p>
            </section>
          ))}
          <section className={panel} style={{ background: 'var(--bg-tertiary)' }}>
            <h2 className="text-2xl font-semibold mb-3">{extra.route}</h2>
            <p className="mb-5" style={{ color: 'var(--text-secondary)' }}>{info.route}</p>
            <ol className="space-y-4">
              {detail.routeSteps.map((step, i) => <li key={step} className="flex gap-4 items-start"><span className="w-8 h-8 rounded-full flex items-center justify-center font-semibold shrink-0" style={{ background: 'var(--accent)', color: '#fff' }}>{i + 1}</span><p className="pt-1">{step}</p></li>)}
            </ol>
          </section>
          <section className={panel} style={{ border: '1px solid var(--border-color)' }}>
            <h2 className="text-2xl font-semibold mb-4">{t.photography}</h2>
            <p className="mb-5" style={{ color: 'var(--text-secondary)' }}>{info.photoTip}</p>
            <div className="grid sm:grid-cols-3 gap-4">
              {detail.photoSpots.map((spot, i) => <div key={spot.title} className="rounded-xl p-4" style={{ background: 'var(--bg-tertiary)' }}><span className="text-xs font-semibold" style={{ color: 'var(--accent)' }}>{i + 1}</span><h3 className="font-semibold my-2">{spot.title}</h3><p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{spot.detail}</p></div>)}
            </div>
          </section>
          <section className={panel} style={{ border: '1px solid var(--border-color)' }}>
            <h2 className="text-2xl font-semibold mb-4">{extra.guidelines}</h2>
            <ul className="space-y-3 list-disc pl-5" style={{ color: 'var(--text-secondary)' }}>
              {detail.notes.map(note => <li key={note}>{note}</li>)}
            </ul>
          </section>
          <section className={panel} style={{ background: 'var(--bg-tertiary)' }}>
            <h2 className="text-2xl font-semibold mb-3">{t.reviews}</h2>
            <p className="mb-3">{p.ratingNote}</p>
            <p className="mb-4">{t.current}</p>
            <a className="underline" style={{ color: 'var(--accent)' }} href={place.mapsUrl} target="_blank" rel="noopener noreferrer">{t.maps} ↗</a>
          </section>
          <section className={panel} style={{ border: '1px solid var(--border-color)' }}>
            <h2 className="text-2xl font-semibold mb-4">{t.faq}</h2>
            <div className="space-y-5">{info.faq.map(f => <div key={f.q}><h3 className="font-semibold mb-1">{f.q}</h3><p style={{ color: 'var(--text-secondary)' }}>{f.a}</p></div>)}</div>
          </section>
          <section className={panel} style={{ background: 'var(--bg-tertiary)' }}><h2 className="text-2xl font-semibold mb-3">{p.transportGuide}</h2><p className="mb-3">{place.location}</p><p className="mb-4">{info.transport}</p><a href={place.mapsUrl} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: 'var(--accent)' }}>{p.map} ↗</a></section>
          <section className={panel} style={{ background: 'var(--bg-tertiary)' }}>
            <h2 className="text-2xl font-semibold mb-3">{t.sources}</h2>
            <a href={place.source} target="_blank" rel="noopener noreferrer" className="underline block mb-2" style={{ color: 'var(--accent)' }}>{t.source} ↗</a>
            <a href={place.photoSource} target="_blank" rel="noopener noreferrer" className="underline block" style={{ color: 'var(--accent)' }}>{t.sources} ↗</a>
          </section>
          <section><h2 className="text-2xl font-semibold mb-4">{t.other}</h2><div className="grid sm:grid-cols-2 gap-4">{other.map(k => <a key={k} className="rounded-2xl p-4 flex gap-4 items-center" style={{ border: '1px solid var(--border-color)', color: 'var(--accent)' }} href={`/${locale}/nearby/${k}`}><img src={nearbyPlaces[k].image} alt="" className="w-24 h-20 rounded-lg object-cover" /><span className="font-semibold">{nearbyPlaces[k].text[locale as NearbyLocale].title}</span></a>)}</div></section>
        </article>
      </main>
      <Footer />
    </>
  );
}
