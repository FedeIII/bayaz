export const SORCERER_ORIGIN = ['draconic-bloodline', 'wild-magic'];

export function translateSorcererOrigin(origin) {
  switch (origin) {
    case 'draconic-bloodline':
      return 'Línea de sangre Dracónica';
    case 'wild-magic':
      return 'Magia Salvaje';

    default:
      return 'unknown sorcerer origin';
  }
}

export function getSorcererOrigin(pc) {
  return pc.classAttrs?.sorcererOrigin;
}

export const DRAGON_ANCESTORS = ['acid', 'cold', 'fire', 'lightning', 'poison'];

export function translateDragonAncestor(ancestor) {
  switch (ancestor) {
    case 'acid':
      return 'Dragón de Ácido';
    case 'cold':
      return 'Dragón de Frío';
    case 'fire':
      return 'Dragón de Fuego';
    case 'lightning':
      return 'Dragón Eléctrico';
    case 'poison':
      return 'Dragón Venenoso';

    default:
      return 'unknown dragon ancestor';
  }
}

export function getDragonAncestor(pc) {
  return pc.classAttrs?.dragonAncestor;
}
