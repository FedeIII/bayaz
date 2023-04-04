const doc = typeof document !== 'undefined' ? document : null;

export const PATHS = {
  summary: pcName => `/characters/pc/${pcName}/summary`,
  bio: pcName => `/characters/pc/${pcName}/bio`,
  spells: pcName => `/characters/pc/${pcName}/spells`,
};

export function getCurrentPcPage() {
  return doc?.location.pathname.match(/\/characters\/pc\/(.+?)\//)?.[1];
}
