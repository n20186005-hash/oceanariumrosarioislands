import { setRequestLocale, getMessages } from 'next-intl/server';
import { TOPIC_SLUGS, TOPIC_ORDER, topicSlug } from '@/lib/topics';

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
  const homeLabel = messages.header?.home || 'Home';

  const faq = (topic.faq || []) as Array<{ q: string; a: string }>;

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
              </div>
            ))}
          </div>

          {faq.length > 0 && (
            <div className="mt-14">
              <h2
                className="font-display text-2xl font-semibold mb-6"
                style={{ color: 'var(--text-primary)' }}
              >
                FAQ
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

          <div className="mt-14">
            <h2
              className="font-display text-xl font-semibold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              {messages.topics?.linksTitle || 'Related pages'}
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
