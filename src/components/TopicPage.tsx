import { setRequestLocale, getMessages } from 'next-intl/server';
import { TOPIC_SLUGS, TOPIC_ORDER, topicSlug } from '@/lib/topics';
import { nearbyPlaces, type NearbyLocale, type NearbyKey } from '@/lib/nearby';

const BASE_URL = 'https://www.oceanariumrosarioislands.com';

export default async function TopicPage({
  topicKey,
  locale,
}: {
  topicKey: string;
  locale: string;
}) {
  setRequestLocale(locale);
  const messages = (await getMessages()) as any;
  const topic = messages.topics?.[topicKey];
  if (!topic) return null;

  const slug = topicSlug(topicKey as any, locale);
  const selfUrl = `${BASE_URL}/${locale}/${slug}`;
  const homeUrl = `${BASE_URL}/${locale}`;
  const homeLabel = messages.header.home;

  const faq = (topic.faq || []) as Array<{ q: string; a: string }>;
  const l = messages.topicUi;
  const basic = messages.basicInfo;
  const reviews = messages.reviews;
  const mapsUrl = 'https://maps.app.goo.gl/HqrToqDsNtcf7N7J6';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${selfUrl}#webpage`,
        url: selfUrl,
        name: topic.title,
        description: topic.description,
        inLanguage: locale,
        isPartOf: { '@type': 'WebSite', '@id': `${BASE_URL}#website` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: homeLabel,
            item: homeUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: topic.title,
            item: selfUrl,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };

  const related = TOPIC_ORDER.filter((k) => k !== topicKey).map((k) => ({
    slug: TOPIC_SLUGS[k][locale],
    title: messages.topics?.[k]?.card || messages.topics?.[k]?.title,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="section-padding pt-28">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
            <a href={homeUrl} className="hover:underline" style={{ color: 'var(--accent)' }}>
              {homeLabel}
            </a>
            <span className="mx-2">/</span>
            <span>{topic.title}</span>
          </nav>

          <h1
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            {topic.title}
          </h1>
          <p className="text-lg leading-relaxed mb-10" style={{ color: 'var(--text-secondary)' }}>
            {topic.intro}
          </p>
          <section className="rounded-2xl p-6 sm:p-8 mb-10" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
            <h2 className="text-2xl font-semibold mb-5">{l.facts}</h2>
            <dl className="grid sm:grid-cols-2 gap-5 text-sm">
              <div><dt className="font-semibold mb-1">{l.address}</dt><dd>{basic.addressValue}</dd></div>
              <div><dt className="font-semibold mb-1">{l.hours}</dt><dd>09:00–13:30 · {l.verify}</dd></div>
              <div><dt className="font-semibold mb-1">{l.ticket}</dt><dd>{l.included}</dd></div>
              <div><dt className="font-semibold mb-1">{l.transport}</dt><dd>{l.transportText}</dd></div>
            </dl>
          </section>
          <section className="rounded-2xl p-6 sm:p-8 mb-10" style={{ border: '1px solid var(--border-color)' }}>
            <h2 className="text-2xl font-semibold mb-3">{l.manager}</h2>
            <p className="mb-3" style={{ color: 'var(--text-secondary)' }}>{l.managerText}</p>
            <a className="underline text-sm" style={{ color: 'var(--accent)' }} href="https://oceanario.co/proyectos-de-investigacion/" target="_blank" rel="noopener noreferrer">CEINER ↗</a>
          </section>

          <div className="space-y-10">
            {(topic.sections || []).map((s: any, i: number) => (
              <div key={i}>
                <h2
                  className="font-display text-2xl font-semibold mb-3"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {s.heading}
                </h2>
                <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {s.body}
                </p>
                {s.source && (
                  <a href={s.source} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-sm underline underline-offset-4" style={{ color: 'var(--accent)' }}>
                    {s.sourceLabel || l.source} ↗
                  </a>
                )}
              </div>
            ))}
          </div>

          {faq.length > 0 && (
            <div className="mt-14">
              <h2
                className="font-display text-2xl font-semibold mb-6"
                style={{ color: 'var(--text-primary)' }}
              >
                {l.faq}
              </h2>
              <div className="space-y-4">
                {faq.map((f, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-5"
                    style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
                  >
                    <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                      {f.q}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {f.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <section className="mt-12 rounded-2xl p-6" style={{ background: 'var(--bg-tertiary)' }}>
            <h2 className="text-2xl font-semibold mb-3">{l.reviews}</h2>
            <p className="mb-2">{l.rating}: <strong>{reviews.ratingValue}/5</strong> · {reviews.reviewCount} · Google Maps</p>
            <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>{reviews.verifiedNote}</p>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="underline text-sm" style={{ color: 'var(--accent)' }}>{l.map} ↗</a>
          </section>
          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">{l.nearby}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {(Object.keys(nearbyPlaces) as NearbyKey[]).map(key => (
                <a key={key} href={`/${locale}/nearby/${key}`} className="rounded-xl overflow-hidden flex items-center gap-4" style={{ border: '1px solid var(--border-color)' }}>
                  <img src={nearbyPlaces[key].image} alt="" className="w-28 h-24 object-cover" loading="lazy" />
                  <span className="font-medium pr-3" style={{ color: 'var(--accent)' }}>{nearbyPlaces[key].text[locale as NearbyLocale].title}</span>
                </a>
              ))}
            </div>
          </section>

          <div className="mt-14">
            <h2
              className="font-display text-xl font-semibold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              {messages.topics.linksTitle}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {related.map((r) => (
                <a
                  key={r.slug}
                  href={`/${locale}/${r.slug}`}
                  className="rounded-xl p-4 text-sm font-medium hover:underline"
                  style={{
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--accent)',
                  }}
                >
                  {r.title}
                </a>
              ))}
            </div>
            <div className="mt-6">
              <a
                href={homeUrl}
                className="text-sm hover:underline"
                style={{ color: 'var(--text-secondary)' }}
              >
                ← {homeLabel}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
