const doc = typeof document !== 'undefined' ? document : null;

export const PATHS = {
  summary: (pcName, isForPlayers) =>
    `/characters/pc/${pcName}${isForPlayers ? '/players' : ''}/summary`,
  bio: (pcName, isForPlayers) =>
    `/characters/pc/${pcName}${isForPlayers ? '/players' : ''}/bio`,
  spells: (pcName, isForPlayers) =>
    `/characters/pc/${pcName}${isForPlayers ? '/players' : ''}/spells`,
};

export function getCurrentPcPage() {
  return doc?.location.pathname.match(/\/characters\/pc\/(.+?)\//)?.[1];
}
