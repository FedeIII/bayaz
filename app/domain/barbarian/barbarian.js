import { EXPLORERS_PACK } from '../equipment/packs';
import {
  getAllMartialMelee,
  getAllSimpleMelee,
  WEAPONS,
} from '../equipment/weapons';

export const BARBARIAN_TRAITS = {
  traits: {
    rage: 'Furia',
    unarmoredDefense: 'Defensa sin Armadura',
  },
  leveling: {
    2: {
      traits: {
        recklessAttack: 'Ataque Temerario',
        dangerSense: 'Sentido del Peligro',
      },
    },
    3: {
      traits: {
        primalPath: 'Senda Primaria',
      },
      primalPath: {
        berserker: {
          traits: {
            frenzy: 'Frenesí',
          },
        },
        'totem-warrior': {
          traits: {
            spiritSeeker: 'Buscador Espiritual',
            totemSpirit: 'Espíritu Tótem',
          },
        },
      },
    },
    4: {
      traits: {
        abilityScoreImprovement: 'Mejora de Puntuación de Característica',
      },
    },
    5: {
      traits: {
        extraAttack: 'Ataque Extra',
        fastMovement: 'Movimiento Rápido',
      },
    },
    6: {
      primalPath: {
        berserker: {
          traits: {
            mindlessRage: 'Furia Inconsciente',
          },
        },
        'totem-warrior': {
          traits: {
            aspectOfTheBeast: 'Aspecto de la Bestia',
          },
        },
      },
    },
  },
};

export function getPrimalPathTraits(pc) {
  const { level, classAttrs: { primalPath } = {} } = pc;

  return Object.entries(
    Object.entries(BARBARIAN_TRAITS.leveling).reduce(
      (levelingTraits, [traitLevel, levelSkills]) => ({
        ...levelingTraits,
        ...(parseInt(traitLevel, 10) <= level
          ? levelSkills.primalPath?.[primalPath]?.traits || {}
          : {}),
      }),
      {}
    )
  );
}

export const PRIMAL_PATHS = ['berserker', 'totem-warrior'];

export function translatePrimalPath(primalPath) {
  if (primalPath === 'berserker') return 'Berserker';
  if (primalPath === 'totem-warrior') return 'Guerrero Totémico';
  return 'unknown primal path';
}

export function getPrimalPath(pc) {
  return pc.classAttrs?.primalPath;
}

export function getAspectOfTheBeastTotem(pc) {
  return pc.classAttrs?.aspectOfTheBeast?.totemType;
}

export const BARBARIAN_EQUIPMENT = [
  { or: getAllMartialMelee() },
  {
    or: [WEAPONS.handaxe({ amount: 2 }), ...getAllSimpleMelee()],
  },
  EXPLORERS_PACK,
  WEAPONS.javelin({ amount: 4 }),
];
