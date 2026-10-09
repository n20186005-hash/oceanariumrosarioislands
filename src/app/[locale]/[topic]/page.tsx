import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { TOPIC_SLUGS, TOPIC_ORDER, topicKeyForSlug } from '@/lib/topics';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TopicPage from '@/components/TopicPage';
import type { Metadata } from 'next';

const BASE_URL = 'https://www.oceanariumrosarioislands.com';

export function generateStaticParams() {
  const params: { locale: string; topic: string }[] = [];
  for (const locale of routing.locales) {
    for (const key of TOPIC_ORDER) {
      params.push({ locale, topic: TOPIC_SLUGS[key][locale] });
    }
  }
  return params;
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; topic: string }>;
}): Promise<Metadata> {
  const { locale, topic } = await params;
  const key = topicKeyForSlug(locale, topic);
  if (!key) return {};
  const messages = (await import(`@/messages/${locale}.json`)).default as any;
  const tm = messages.topics?.[key];
  if (!tm) return {};

  const selfUrl = `${BASE_URL}/${locale}/${topic}`;
  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = `${BASE_URL}/${loc}/${TOPIC_SLUGS[key][loc]}`;
  }
  languages['x-default'] = `${BASE_URL}/en/${TOPIC_SLUGS[key].en}`;

  const localeMap: Record<string, string> = { zh: 'zh_CN', en: 'en_US', es: 'es_ES' };

  return {
    title: tm.title,
    description: tm.description,
    alternates: {
      canonical: selfUrl,
      languages,
    },
    openGraph: {
      title: tm.title,
      description: tm.description,
      url: selfUrl,
      siteName: 'Oceanarium Rosario Islands',
      locale: localeMap[locale] || 'en_US',
      type: 'website',
    },
  };
}

export default async function TopicRoute({
  params,
}: {
  params: Promise<{ locale: string; topic: string }>;
}) {
  const { locale, topic } = await params;
  const key = topicKeyForSlug(locale, topic);
  if (!key) notFound();
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main>
        <TopicPage topicKey={key} locale={locale} />
      </main>
      <Footer />
    </>
  );
}
