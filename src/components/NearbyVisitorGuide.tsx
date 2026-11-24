import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import type { NearbyLocale } from '@/lib/nearby';
import { visitorGuide, type GuideSlug } from '@/lib/visitorGuide';

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

export default function NearbyVisitorGuide({ slug, locale }: { slug: GuideSlug; locale: NearbyLocale }) {
  const p = visitorGuide(slug,locale);
  const c = p.c;
  const w = labels[locale];
  const map = p.map;
  const url = 'https://www.oceanariumrosarioislands.com';
  const titleWith = (label: string) => label + (locale === 'zh' ? '' : ' ') + c.title;
  const types: Record<string, string> = { boat: w.boat, castle: w.castle, wall: w.wallType, naval: w.naval, history: w.historyType, claver: w.claver, zenu: w.zenu, aviary: w.aviary, island: { en:'Inhabited island or island retreat', es:'Isla habitada o isla de estancia', zh:'居民岛或海岛游览区' }[locale], bay: { en:'Lagoon and anchorage',es:'Ciénaga y fondeadero',zh:'潟湖与停泊区' }[locale], beach: { en:'Coastal beach sector',es:'Sector de playa',zh:'沿岸沙滩区' }[locale], heritage:w.wallType };
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'TouristAttraction', name: c.title, description: c.subtitle, image: p.image.startsWith('/') ? url + p.image : p.image, hasMap: map, url: url + '/' + locale + '/nearby/' + slug, address: p.address },
      { '@type':'BreadcrumbList', itemListElement:[
        { '@type':'ListItem', position:1, name:'Oceanarium Rosario Islands', item:url+'/'+locale },
        { '@type':'ListItem', position:2, name:w.home, item:url+'/'+locale+'#nearby' },
        { '@type':'ListItem', position:3, name:c.title, item:url+'/'+locale+'/nearby/'+slug },
      ]},
      { '@type': 'FAQPage', mainEntity: c.faq.map(([q,a]) => ({ '@type':'Question', name:q, acceptedAnswer:{ '@type':'Answer', text:a } })) },
    ],
  };
  const link = 'underline underline-offset-4 decoration-1';
  const managerLabel = { en: 'Management', es: 'Responsable', zh: '管理主体' }[locale];
  const facts = [[w.name, p.localName], [w.address, p.entrance], [w.kind, types[p.group]], [managerLabel, p.authority], [w.duration, c.duration], [w.conditions, c.conditions], [w.hours, c.hours], [w.fees, c.fees], [w.transport, c.transport]];
  function sourceLabel(source: string) {
    if (source.includes('bienes-administrados')) return w.inventory;
    if (source.includes('/historia/') || source.includes('/destination/')) return w.context;
    if (source.includes('murallas-de-cartagena')) return w.wall;
    if (source.includes('POLITICA-TARIFA')) return w.tariff;
    return w.visitor;
  }
  return <>
    <Header/>
    <main className="pt-24 pb-16">
      <article className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6 leading-relaxed" style={{ color: 'var(--text-primary)' }}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schema).replace(/</g, '\\u003c')}}/>
        <nav><a className={link} href={'/'+locale+'#nearby'}>{w.home}</a></nav>
        <header className="overflow-hidden rounded-2xl" style={{background:'var(--bg-secondary)'}}>
          <div className="grid md:grid-cols-[1.1fr_1fr] items-stretch">
            <div className="p-6 sm:p-8 space-y-4">
              <h1 className="font-display text-4xl sm:text-5xl font-bold">{c.title}</h1>
              <p className="text-lg">{c.subtitle}</p>
              <a className={link} href={map}>{w.openReviews} ↗</a>
              <p><strong>{w.hours}</strong> · {c.hours.split(/(?<=[.!?。])\s*/u)[0]}</p>
              <p>{p.entrance}</p><a href={map} className={link}>{w.map} ↗</a>
            </div>
            <a href="#photograph" className="block self-stretch">
              <img src={p.image} alt={c.caption} fetchPriority="high" className="w-full h-52 md:h-full md:max-h-[440px] object-cover"/>
            </a>
          </div>
        </header>
        <Section id="explore" title={titleWith(w.explore)}>{p.introductions.map(txt=><p key={txt}>{txt}</p>)}
          <div id="visit-advice"><h3 className="text-lg font-semibold mb-2">{w.advice}</h3>{p.advice.map(tip=><p key={tip} className="mb-2">{tip}</p>)}</div>
          <div id="features"><h3 className="text-lg font-semibold mb-2">{w.features}</h3>{p.features.map(txt=><p key={txt}>{txt}</p>)}</div>
        </Section>
        <Section id="about" title={titleWith(w.about)}><p>{c.manager}</p><p>{c.about}</p></Section>
        <Section id="basics" title={w.basic}><dl className="divide-y" style={{ borderColor: 'var(--border-color)' }}>
          {facts.map(([label,value])=><div key={label} className="grid gap-1 py-3 sm:grid-cols-[12rem_1fr]"><dt className="font-semibold">{label}</dt><dd>{value}</dd></div>)}
        </dl></Section>
        <Section id="hours" title={w.hours}><p>{c.hours}</p></Section>
        <Section id="fees" title={w.fees}><p>{c.fees}</p></Section>
        <Section id="transport" title={w.transport}><p>{c.transport}</p></Section>
        <Section id="discover" title={w.discover}>
          <div><h3 className="text-lg font-semibold mb-1">{w.history}</h3><p>{c.history}</p>{p.historicalDetail && <p className="mt-2">{p.historicalDetail}</p>}</div><Detail title={w.architecture}>{c.architecture}</Detail>
          <Detail title={w.culture}>{c.culture}</Detail><div><h3 className="text-lg font-semibold mb-1">{w.experience}</h3><p>{c.experience}</p>{p.observation && <p className="mt-2">{p.observation}</p>}</div>
        </Section>
        <Section id="route" title={w.route}>{p.routeIntro && <p>{p.routeIntro}</p>}<ol className="list-decimal pl-6 space-y-3">{c.route.map(step=><li key={step}>{step}</li>)}</ol></Section>
        <Section id="guidelines" title={w.notice}>{p.notices.map(note=><p key={note}>{note}</p>)}</Section>
        <Section id="photo-spots" title={w.photo}><ul className="list-disc pl-6 space-y-3">{c.photo.map(spot=><li key={spot}>{spot}</li>)}</ul>{p.additionalPhotos.map(txt=><p key={txt}>{txt}</p>)}</Section>
        <Section id="photograph" title={w.gallery}><figure><img src={p.image} alt={c.caption} loading="lazy" className="w-full max-h-[480px] object-contain rounded-2xl"/><figcaption className="text-sm mt-3">{c.caption} <a href={p.photoSource} className={link}>{w.photoSource} ↗</a></figcaption></figure></Section>
        <Section id="lodging" title={w.stay}>{p.stayIntro && <p>{p.stayIntro}</p>}{c.stay.map(area=><p key={area}>{area}</p>)}</Section>
        <Section id="reviews" title={w.reviews}><a href={map} className={link}>{w.openReviews} · {c.title} ↗</a></Section>
        <Section id="directions" title={w.directions}><address className="not-italic">{p.address}</address>{p.entrance !== p.address && <p>{p.entrance}</p>}<a href={map} className={link}>{w.map} · {p.localName} ↗</a></Section>
        <Section id="faq" title={w.faq}><dl className="space-y-4">{c.faq.map(([q,a])=><div key={q}><dt className="font-semibold">{q}</dt><dd className="mt-1">{a}</dd></div>)}</dl></Section>
        <Section id="related" title={w.related}><nav className="flex flex-wrap gap-x-6 gap-y-2"><a className={link} href={'/'+locale+'#nearby'}>{w.home}</a>{p.related.map(item=><a className={'inline-flex items-center gap-2 '+link} key={item.slug} href={'/'+locale+'/nearby/'+item.slug}>{item.image && <img src={item.image} alt="" loading="lazy" className="w-20 h-14 object-cover rounded-lg"/>}{item.title}</a>)}</nav></Section>
        <Section id="sources" title={w.sources}><time dateTime="2026-11-24">{w.checked}</time><ul className="space-y-2">{p.sources.map(s=><li key={s}><a href={s} className={link}>{sourceLabel(s)} · {new URL(s).hostname} ↗</a></li>)}</ul></Section>
      </article>
    </main>
    <Footer/>
  </>;
}
