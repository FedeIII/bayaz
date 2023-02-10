export const FIGHTING_STYLES = [
  'archery',
  'defense',
  'dueling',
  'great-Weapon-fighting',
  'protection',
  'two-weapon-fighting',
];

export function translateFightingStyle(fightingStyle) {
  switch (fightingStyle) {
    case 'archery':
      return 'A distancia';
    case 'defense':
      return 'Defensa';
    case 'dueling':
      return 'Duelista';
    case 'great-Weapon-fighting':
      return 'Lucha con Arma a dos Manos';
    case 'protection':
      return 'Protección';
    case 'two-weapon-fighting':
      return 'Lucha con Dos Armas';

    default:
      return 'unknown fighting style';
  }
}

export function getFightingStyles(pc) {
  return pc.classAttrs?.fightingStyles;
}
