import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import type { NearbyLocale } from '@/lib/nearby';
import { portPlaces, type PortSlug } from '@/lib/portPlaces';

const labels = {
  en: {
    home: 'Nearby places', explore: 'Explore', about: 'About', advice: 'Visit planning', features: 'Distinctive features',
    basic: 'Essential information', name: 'Local name', address: 'Address and entrance', kind: 'Site type', duration: 'Suggested visit', conditions: 'Terrain and access',
    hours: 'Opening hours', fees: 'Tickets and costs', transport: 'Getting there', discover: 'What to discover',
    history: 'History', architecture: 'Architecture and landscape', culture: 'Local life', experience: 'Try this on site',
    route: 'Three-stop itinerary', notice: 'Along the way', photo: 'Photo spots', stay: 'Where to stay', gallery: 'Photograph',
    reviews: 'Visitor reviews', openReviews: 'Read current Google Maps reviews', directions: 'Address and directions', map: 'Open in Google Maps',
    faq: 'Visitor questions', related: 'Continue exploring', sources: 'Sources and date checked', checked: 'Checked 24 November 2026', photoSource: 'Photo source',
    visitor: 'Visitor information', inventory: 'Heritage management inventory', context: 'History of the fortification', wall: 'Public wall access', tariff: 'Official fee schedule',
    boat: 'Island fort', castle: 'Hill fort', wallType: 'Historic fortifications', naval: 'Maritime museum', historyType: 'History museum', claver: 'Sanctuary and museum', zenu: 'Archaeological museum', aviary: 'Aviary',
  },
  es: {
    home: 'Lugares cercanos', explore: 'Descubre', about: 'Sobre', advice: 'Consejos de visita', features: 'Rasgos distintivos',
    basic: 'Información básica', name: 'Nombre local', address: 'Dirección y entrada', kind: 'Tipo de lugar', duration: 'Tiempo recomendado', conditions: 'Terreno y acceso',
    hours: 'Horario', fees: 'Entradas y costos', transport: 'Cómo llegar', discover: 'Qué descubrir',
    history: 'Historia', architecture: 'Arquitectura y paisaje', culture: 'Vida local', experience: 'Experiencia en el lugar',
    route: 'Recorrido en tres paradas', notice: 'Durante el recorrido', photo: 'Puntos para fotografiar', stay: 'Dónde alojarse', gallery: 'Fotografía',
    reviews: 'Opiniones de visitantes', openReviews: 'Leer las reseñas actuales en Google Maps', directions: 'Dirección y orientación', map: 'Abrir en Google Maps',
    faq: 'Preguntas frecuentes', related: 'Continúa la visita', sources: 'Fuentes y fecha de consulta', checked: 'Consultado el 24 de noviembre de 2026', photoSource: 'Fuente de la fotografía',
    visitor: 'Información para la visita', inventory: 'Inventario de bienes administrados', context: 'Historia de la fortificación', wall: 'Acceso público a las murallas', tariff: 'Política tarifaria oficial',
    boat: 'Fuerte insular', castle: 'Castillo en cerro', wallType: 'Fortificación histórica', naval: 'Museo marítimo', historyType: 'Museo de historia', claver: 'Santuario y museo', zenu: 'Museo arqueológico', aviary: 'Aviario',
  },
  zh: {
    home: '周边游览目录', explore: '探索', about: '关于', advice: '游览建议', features: '景区特色',
    basic: '基础信息', name: '当地名称', address: '地址与入口', kind: '景点类型', duration: '建议停留', conditions: '地形与到访条件',
    hours: '开放时间', fees: '门票与费用', transport: '交通方式', discover: '现场值得看什么',
    history: '历史沿革', architecture: '建筑与景观', culture: '当地生活与文化', experience: '核心体验',
    route: '三站游览路线', notice: '游览须知', photo: '拍照机位', stay: '住宿建议', gallery: '景点实景照片',
    reviews: '游客评价', openReviews: '查看这个地点的 Google 地图最新评价', directions: '交通指南与详细地址', map: '在 Google 地图中打开',
    faq: '常见问题', related: '相关专页', sources: '资料来源与核对日期', checked: '核对日期为2026年11月24日', photoSource: '照片出处',
    visitor: '官方参观资料', inventory: '管理机构遗产名录', context: '城防历史资料', wall: '公共城墙参观说明', tariff: '官方票价政策',
    boat: '岛屿堡垒', castle: '山地城堡', wallType: '历史城防建筑', naval: '海事博物馆', historyType: '历史博物馆', claver: '圣所与博物馆', zenu: '考古博物馆', aviary: '鸟类园区',
  },
};

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return <section id={id} className="rounded-2xl p-6 sm:p-8 space-y-4" style={{ background: 'var(--bg-secondary)' }}>
    <h2 className="font-display text-2xl sm:text-3xl font-semibold">{title}</h2>{children}
  </section>;
}

function Detail({ title, children }: { title: string; children: ReactNode }) {
  return <div><h3 className="text-lg font-semibold mb-1">{title}</h3><p>{children}</p></div>;
}

export default function PortPlacePage({ slug, locale }: { slug: PortSlug; locale: NearbyLocale }) {
  const p = portPlaces[slug];
  const c = p.copy[locale];
  const w = labels[locale];
  const map = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(p.address);
  const url = 'https://www.oceanariumrosarioislands.com';
  const titleWith = (label: string) => label + (locale === 'zh' ? '' : ' ') + c.title;
  const types: Record<string, string> = { boat: w.boat, castle: w.castle, wall: w.wallType, naval: w.naval, history: w.historyType, claver: w.claver, zenu: w.zenu, aviary: w.aviary };
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'TouristAttraction', name: c.title, description: c.subtitle, image: url + p.image, hasMap: map, url: url + '/' + locale + '/nearby/' + slug, address: p.address },
      { '@type': 'FAQPage', mainEntity: c.faq.map(([q,a]) => ({ '@type':'Question', name:q, acceptedAnswer:{ '@type':'Answer', text:a } })) },
    ],
  };
  const link = 'underline underline-offset-4 decoration-1';
  const managerLabel = { en: 'Management', es: 'Responsable', zh: '管理主体' }[locale];
  const facts = [[w.name, p.copy.es.title], [w.address, p.address], [w.kind, types[p.group]], [managerLabel, p.authority], [w.duration, c.duration], [w.conditions, c.conditions]];
  function sourceLabel(source: string) {
    if (source.includes('bienes-administrados')) return w.inventory;
    if (source.includes('/historia/') || source.includes('/destination/')) return w.context;
    if (source.includes('murallas-de-cartagena')) return w.wall;
    if (source.endsWith('.pdf')) return w.tariff;
    return w.visitor;
  }
  return <>
    <Header/>
    <main className="pt-24 pb-16">
      <article className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6 leading-relaxed" style={{ color: 'var(--text-primary)' }}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schema).replace(/</g, '\\u003c')}}/>
        <nav><a className={link} href={'/'+locale+'#nearby'}>{w.home}</a></nav>
        <header className="space-y-4 pb-4">
          <h1 className="font-display text-4xl sm:text-5xl font-bold">{c.title}</h1>
          <p className="max-w-3xl text-lg">{c.subtitle}</p>
          <p><strong>{w.hours}</strong> · {c.hours.split(/(?<=[.!?。])\s*/u)[0]}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2"><a href={map} className={link}>{w.map} ↗</a><a className={link} href="#reviews">{w.reviews}</a></div>
        </header>
        <Section id="explore" title={titleWith(w.explore)}>
          <p>{c.scene}</p>
          <div><h3 className="text-lg font-semibold mb-1">{titleWith(w.about)}</h3><p>{c.manager}</p><p className="mt-2">{c.about}</p></div>
          <Detail title={w.advice}>{c.advice}</Detail><Detail title={w.features}>{c.feature}</Detail>
        </Section>
        <Section id="basics" title={w.basic}><dl className="divide-y" style={{ borderColor: 'var(--border-color)' }}>
          {facts.map(([label,value])=><div key={label} className="grid gap-1 py-3 sm:grid-cols-[12rem_1fr]"><dt className="font-semibold">{label}</dt><dd>{value}</dd></div>)}
        </dl></Section>
        <Section id="hours" title={w.hours}><p>{c.hours}</p></Section>
        <Section id="fees" title={w.fees}><p>{c.fees}</p></Section>
        <Section id="transport" title={w.transport}><p>{c.transport}</p></Section>
        <Section id="discover" title={w.discover}>
          <Detail title={w.history}>{c.history}</Detail><Detail title={w.architecture}>{c.architecture}</Detail>
          <Detail title={w.culture}>{c.culture}</Detail><Detail title={w.experience}>{c.experience}</Detail>
        </Section>
        <Section id="route" title={w.route}><ol className="list-decimal pl-6 space-y-3">{c.route.map(step=><li key={step}>{step}</li>)}</ol><Detail title={w.notice}>{c.notice}</Detail></Section>
        <Section id="photo-spots" title={w.photo}><ul className="list-disc pl-6 space-y-3">{c.photo.map(spot=><li key={spot}>{spot}</li>)}</ul></Section>
        <Section id="lodging" title={w.stay}>{c.stay.map(area=><p key={area}>{area}</p>)}</Section>
        <Section id="photograph" title={w.gallery}><figure><img src={p.image} alt={c.caption} loading="lazy" className="w-full max-h-[480px] object-contain rounded-2xl"/><figcaption className="text-sm mt-3">{c.caption} <a href={p.photoSource} className={link}>{w.photoSource} ↗</a></figcaption></figure></Section>
        <Section id="reviews" title={w.reviews}><a href={map} className={link}>{w.openReviews} · {c.title} ↗</a></Section>
        <Section id="directions" title={w.directions}><address className="not-italic">{p.address}</address><a href={map} className={link}>{w.map} · {p.copy.es.title} ↗</a></Section>
        <Section id="faq" title={w.faq}><dl className="space-y-4">{c.faq.map(([q,a])=><div key={q}><dt className="font-semibold">{q}</dt><dd className="mt-1">{a}</dd></div>)}</dl></Section>
        <Section id="related" title={w.related}><nav className="flex flex-wrap gap-x-6 gap-y-2"><a className={link} href={'/'+locale+'#nearby'}>{w.home}</a>{p.related.map(key=><a className={link} key={key} href={'/'+locale+'/nearby/'+key}>{portPlaces[key as PortSlug].copy[locale].title}</a>)}</nav></Section>
        <Section id="sources" title={w.sources}><time dateTime="2026-11-24">{w.checked}</time><ul className="space-y-2">{p.sources.map(s=><li key={s}><a href={s} className={link}>{sourceLabel(s)} · {new URL(s).hostname} ↗</a></li>)}</ul></Section>
      </article>
    </main>
    <Footer/>
  </>;
}
