export const PRIMAL_PATHS = ['berserker', 'totem-warrior'];

export function translatePrimalPath(primalPath) {
  if (primalPath === 'berserker')
    return 'Berserker';
  if (primalPath === 'totem-warrior')
    return 'Guerrero Totémico';
  return 'unknown primal path';
}

export function getPrimalPath(pc) {
  return pc.classAttrs?.primalPath;
}
