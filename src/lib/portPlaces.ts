import places from './port-places.json';

export const portPlaces = places;
export type PortSlug = keyof typeof places;
export function isPortSlug(slug: string): slug is PortSlug {
  return Object.prototype.hasOwnProperty.call(places, slug);
}
