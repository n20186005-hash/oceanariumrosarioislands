import { getMessages } from 'next-intl/server';
import { TOPIC_ORDER, topicSlug } from '@/lib/topics';

export default async function TopicLinks({ locale }: { locale: string }) {
  const messages = (await getMessages()) as any;
  const topics = messages.topics;
  if (!topics) return null;

  const items = TOPIC_ORDER.map((k) => ({
    slug: topicSlug(k, locale),
    title: topics[k]?.card || topics[k]?.title,
    desc: topics[k]?.cardDesc || '',
  }));

  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {topics.linksTitle}
        </h2>
        <p className="mb-8 text-sm" style={{ color: 'var(--text-muted)' }}>
          {topics.linksSubtitle}
        </p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <a
              key={item.slug}
              href={`/${locale}/${item.slug}`}
              className="group rounded-2xl p-6 flex flex-col transition-shadow hover:shadow-md"
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
              }}
            >
              <h3
                className="font-display text-lg font-semibold mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-secondary)' }}>
                {item.desc}
              </p>
              <span
                className="mt-4 text-sm font-medium inline-flex items-center gap-1"
                style={{ color: 'var(--accent)' }}
              >
                {topics.linksCta}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="group-hover:translate-x-1 transition-transform"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
