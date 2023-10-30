import { NPC_RACES } from './npc/attrs/npcRaces';

export function t(key) {
  let translation = {
    Tiny: 'Diminuto',
    Small: 'Pequeño',
    Medium: 'Mediano',
    Large: 'Grande',
    Huge: 'Enorme',
    Gargantuan: 'Gigantesco',
    orc: 'orco',
    LG: 'Legal bueno',
    NG: 'Neutral bueno',
    CG: 'Caótico bueno',
    LN: 'Legal neutral',
    NN: 'Neutral',
    N: 'Neutral',
    CN: 'Caótico neutral',
    LE: 'Legal malvado',
    NE: 'Neutral malvado',
    CE: 'Caótico malvado',
    Humanoid: 'Humanoide',
    Fey: 'Feérico',
    Fiend: 'Infernal',
    Monstrosity: 'Monstruos',
    Undead: 'No-muerto',
    Beast: 'Bestia',
    Celestial: 'Celestial',
    Plant: 'Planta',
    Aberration: 'Aberración',
    Elemental: 'Elemental',
    Ooze: 'Cieno',
    Dragon: 'Dragón',
    Construct: 'Constructo',
    Giant: 'Gigante',
    Male: 'Varón',
    Female: 'Hembra',
    Matter: 'Materia',
    Energy: 'Energía',
    Spirit: 'Espiritu',
    Space: 'Espacio',
    None: 'Ninguno',
  }[key];

  if (translation) return translation;

  translation = NPC_RACES[key]?.translation;

  if (translation) return translation;

  return 'Unknown translation';
}
