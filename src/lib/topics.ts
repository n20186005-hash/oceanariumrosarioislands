// Central configuration for the long-tail topic pages (tickets, getting-there,
// tours, hours). Slugs are locale-specific so each language gets keyword-rich
// URLs while the language toggle can still map between them.

export type TopicKey = 'tickets' | 'getting-there' | 'tours' | 'hours' | 'cartagena-aquarium' | 'marine-life';

export const TOPIC_ORDER: TopicKey[] = ['tickets', 'getting-there', 'tours', 'hours', 'cartagena-aquarium', 'marine-life'];

export const TOPIC_SLUGS: Record<TopicKey, Record<string, string>> = {
  'tickets': { zh: 'piao-jia', en: 'tickets-prices', es: 'entradas-precios' },
  'getting-there': { zh: 'ru-he-qian-wang', en: 'getting-there', es: 'como-llegar' },
  'tours': { zh: 'tuan-you', en: 'tours', es: 'tours' },
  'hours': { zh: 'ying-ye-shi-jian', en: 'opening-hours', es: 'horarios' },
  'cartagena-aquarium': { zh: 'ka-ta-he-na-hai-yang-guan', en: 'cartagena-aquarium-guide', es: 'acuario-cartagena' },
  'marine-life': { zh: 'hai-yang-sheng-wu-bao-yu', en: 'marine-life-conservation', es: 'fauna-marina-conservacion' },
};

export function topicKeyForSlug(locale: string, slug: string): TopicKey | null {
  for (const key of TOPIC_ORDER) {
    if (TOPIC_SLUGS[key][locale] === slug) return key;
  }
  return null;
}

export function topicSlug(key: TopicKey, locale: string): string {
  return TOPIC_SLUGS[key][locale];
}
