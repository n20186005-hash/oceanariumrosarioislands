import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { nearbyPlaces, type NearbyKey, type NearbyLocale } from '@/lib/nearby';
import NearbyVisitorGuide from '@/components/NearbyVisitorGuide';
import type { GuideSlug } from '@/lib/visitorGuide';
import { portPlaces, isPortSlug } from '@/lib/portPlaces';

const base = 'https://www.oceanariumrosarioislands.com';
const locales: NearbyLocale[] = ['zh', 'en', 'es'];
export function generateStaticParams() {
  return locales.flatMap(locale => [...Object.keys(nearbyPlaces), ...Object.keys(portPlaces)].map(slug => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!locales.includes(locale as NearbyLocale)) return {};
  if (isPortSlug(slug)) {
    const entry = portPlaces[slug];
    const c = entry.copy[locale as NearbyLocale];
    const canonical = `${base}/${locale}/nearby/${slug}`;
    return { title:c.title, description:c.subtitle, alternates:{ canonical, languages:Object.fromEntries([...locales.map(l=>[l,`${base}/${l}/nearby/${slug}`]),['x-default',`${base}/en/nearby/${slug}`]]) }, openGraph:{ title:c.title,description:c.subtitle,url:canonical,images:[base+entry.image] } };
  }
  if (!Object.prototype.hasOwnProperty.call(nearbyPlaces,slug)) return {};
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
  if (!locales.includes(locale as NearbyLocale)) notFound();
  setRequestLocale(locale);
  if (!isPortSlug(slug) && !Object.prototype.hasOwnProperty.call(nearbyPlaces,slug)) notFound();
  return <NearbyVisitorGuide slug={slug as GuideSlug} locale={locale as NearbyLocale}/>;
}
