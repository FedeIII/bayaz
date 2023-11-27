const doc = typeof document !== 'undefined' ? document : null;

export const PATHS = {
  summary: id => `/characters/pc/${id}/summary`,
  bio: id => `/characters/pc/${id}/bio`,
  spells: id => `/characters/pc/${id}/spells`,
};

export function getCurrentPcPage() {
  return doc?.location.pathname.match(/\/characters\/pc\/(.+?)\//)?.[1];
}
