export function getPartyMaxLevel(pcs) {
  return Math.max(...pcs.map(pc => pc.level));
}
