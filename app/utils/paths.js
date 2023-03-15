const doc = typeof document !== 'undefined' ? document : null;

export const PATHS = {
  summary: pcName => `/characters/pc/${pcName}/summary`,
  bio: pcName => `/characters/pc/${pcName}/bio`,
  spells: pcName => `/characters/pc/${pcName}/spells`,
};

export function getCurrentSummaryPage() {
  return doc?.location.pathname.match(/\/characters\/pc\/(.+)\/summary/)?.[1];
}

export function getCurrentBioPage() {
  return doc?.location.pathname.match(/\/characters\/pc\/(.+)\/bio/)?.[1];
}

export function getCurrentSpellsPage() {
  return doc?.location.pathname.match(/\/characters\/pc\/(.+)\/spells/)?.[1];
}
