import { nearbyPlaces, type NearbyKey, type NearbyLocale } from './nearby';
import { nearbyDetails } from './nearbyDetails';
import { isPortSlug, portPlaces, type PortSlug } from './portPlaces';
import coastalVisits from './coastal-visits.json';

export type GuideSlug = NearbyKey | PortSlug;

export function visitorGuide(slug: GuideSlug, locale: NearbyLocale) {
  if (isPortSlug(slug)) {
    const p = portPlaces[slug];
    const c = p.copy[locale];
    return {
      c, group: p.group, address: p.address, entrance: p.address, authority: p.authority, localName: p.copy.es.title,
      image: p.image, photoSource: p.photoSource, sources: p.sources,
      map: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(p.address),
      related: p.related.map(k => ({ slug:k, title:portPlaces[k as PortSlug].copy[locale].title, image:'' })),
      introductions: [c.scene], advice: [c.advice], features: [c.feature], notices: [c.notice],
      routeIntro: '', additionalPhotos: [] as string[], stayIntro: '', historicalDetail: '', observation:'',
    };
  }
  const p = nearbyPlaces[slug];
  const d = nearbyDetails[slug][locale];
  const original = p.text[locale];
  const visit = coastalVisits[slug][locale];
  const group = slug.startsWith('fuerte-') || slug.startsWith('bateria-') ? 'heritage' :
    slug === 'cholon-baru' ? 'bay' :
    ['agua-azul-baru', 'playa-blanca-baru', 'playa-tranquila', 'punta-arena'].includes(slug) ? 'beach' : 'island';
  const related = (Object.entries(nearbyPlaces) as [NearbyKey, typeof p][])
    .filter(([key]) => key !== slug)
    .map(([key,place]) => ({ slug:key, title:place.text[locale].title, image:place.image }));
  const c = {
    ...visit, title: original.title, subtitle: original.tagline, about: visit.about,
    history: d.history, architecture: d.landscape, faq: visit.faq,
  };
  const isPrimary = slug === 'isla-grande' || slug === 'playa-blanca-baru';
  return {
    c, group, address:p.location, entrance:visit.entrance, authority:visit.manager, localName:p.text.es.title,
    image:p.image, photoSource:p.photoSource, map:p.mapsUrl, related,
    sources:[...new Set([...coastalVisits[slug].sources,p.source])],
    introductions:[visit.scene,original.introduction], advice:isPrimary ? d.visitTips : [visit.duration, visit.conditions],
    features:[original.highlights], notices:isPrimary ? d.notes : [visit.conditions, original.transport],
    routeIntro:original.route, additionalPhotos:isPrimary ? d.photoSpots.map(s => s.title + ' · ' + s.detail) : [original.photoTip],
    stayIntro: original.stay, historicalDetail:visit.historicalDetail, observation:d.observation,
  };
}
