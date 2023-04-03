import { SCHOLARS_PACK, DUNGEONEERS_PACK } from '../../equipment/packs';
import { ARMORS } from '../../equipment/armors';
import { getAllArcaneFocus, TOOLS } from '../../equipment/tools';
import {
  getAllSimpleMelee,
  getAllSimpleRanged,
  WEAPONS,
} from '../../equipment/weapons';
import { CLASSES, getTraits } from '~/domain/characters';
import { getSpell } from '~/domain/spells/getSpells';

export const WARLOCK_EQUIPMENT = [
  {
    or: [
      { and: [WEAPONS.lightCrossbow(), TOOLS.crossbowBolts({ amount: 20 })] },
      { or: [...getAllSimpleMelee(), ...getAllSimpleRanged()] },
    ],
  },
  { or: [TOOLS.componentPouch(), ...getAllArcaneFocus()] },
  { or: [SCHOLARS_PACK, DUNGEONEERS_PACK] },
  ARMORS.leather(),
  { or: getAllSimpleMelee() },
  WEAPONS.dagger({ amount: 2 }),
];

export function translatePatron(patron) {
  if (patron === 'archfey') return 'Archihada';
  if (patron === 'fiend') return 'El Diablo';
  if (patron === 'greatOldOne') return 'El Gran Antiguo';
}

export const PATRONS = {
  archfey: {
    traits: {
      feyPresence: 'Presencia Feérica',
    },
  },
  fiend: {
    traits: {
      darkOnesBlessing: 'Bendición del Oscuro',
    },
  },
  greatOldOne: {
    traits: {
      awakenedMind: 'Mente Despierta',
    },
  },
};

export function getWarlockPatron(pc) {
  return pc.classAttrs?.warlock?.patron;
}

export function getWarlockPatronTraits(pc) {
  const { level } = pc;

  const patron = getWarlockPatron(pc);

  return Object.entries(
    Object.entries(CLASSES.warlock.leveling).reduce(
      (levelingTraits, [traitLevel, levelSkills]) => ({
        ...levelingTraits,
        ...(parseInt(traitLevel, 10) <= level
          ? levelSkills.patron?.[patron]?.traits || {}
          : {}),
      }),
      {}
    )
  );
}

export function getWarlockMaxInvocations(pc) {
  const { level } = pc;
  /* prettier-ignore */
  return [
    null, 2, 2, 2, 3, 3, 4, 4,
    5, 5, 5, 6, 6, 6, 7, 7, 7,
    8, 8, 8
  ][level - 1];
}

export function getInvocations(pc) {
  return pc.classAttrs?.warlock?.invocations || [];
}

export function hasToSelectInvocations(pc) {
  return getWarlockMaxInvocations(pc) > getInvocations(pc).length;
}

export const INVOCATIONS = {
  armorOfShadows: {
    translation: 'Armadura de Sombras',
    spell: 'mageArmor',
  },
  chainsOfCarceri: {
    translation: 'Cadenas de Carceri',
    reqs: {
      level: 15,
      trait: 'pactOfTheChain',
    },
    spell: 'holdMonster',
  },
  lifedrinker: {
    translation: 'Chupavidas',
    reqs: {
      level: 12,
      trait: 'pactOfTheBlade',
    },
  },
  sculptorOfFlesh: {
    translation: 'Escultor de Carne',
    reqs: {
      level: 7,
    },
    spell: 'polymorph',
    preparedSpell: true,
  },
  thirstingBlade: {
    translation: 'Espada Sedienta',
    reqs: {
      level: 5,
      trait: 'pactOfTheBlade',
    },
  },
  agonizingBlast: {
    translation: 'Estallido Agonizante',
    reqs: {
      trait: 'eldritchBlast',
    },
  },
  repellingBlast: {
    translation: 'Estallido Repulsor',
    reqs: {
      trait: 'eldritchBlast',
    },
  },
  beguilingInfluence: {
    translation: 'Influciencia Seductora',
  },
  thiefOfFiveFates: {
    translation: 'Ladrón de los Cinco Destinos',
    spell: 'bane',
    preparedSpell: true,
  },
  eldritchSpear: {
    translation: 'Lanza Arcana',
    req: {
      trait: 'eldritchBlast',
    },
  },
  beastSpeech: {
    translation: 'Lengua de las Bestias',
    spell: 'speakWithAnimals',
  },
  bookOfAncientSecrets: {
    translation: 'Libro de los Secretos Antiguos',
    reqs: {
      trait: 'pactOfTheTome',
    },
  },
  masterOfMyriadForms: {
    translation: 'Maestro de Innumerables Formas',
    reqs: {
      level: 15,
    },
    spell: 'alterSelf',
  },
  maskOfManyFaces: {
    translation: 'Máscara de Muchos Rostros',
    spell: 'disguiseSelf',
  },
  gazeOfTwoMinds: {
    translation: 'Mirada de Dos Mentes',
  },
  eyesOfTheRuneKeeper: {
    translation: 'Ojos del Guardián de las Runas',
  },
  dreadfulWord: {
    translation: 'Palabra Pavorosa',
    reqs: {
      level: 7,
    },
    spell: 'confusion',
    preparedSpell: true,
  },
  ascendantStep: {
    translation: 'Paso Ascendente',
    reqs: {
      level: 9,
    },
    spell: 'levitate',
  },
  otherworldlyLeap: {
    translation: 'Salto de Otro Mundo',
    reqs: {
      level: 9,
    },
    spell: 'jump',
  },
  signOfIllOmen: {
    translation: 'Señal de Mal Agüero',
    reqs: {
      level: 5,
    },
    spell: 'bestowCurse',
    preparedSpell: true,
  },
  minionsOfChaos: {
    translation: 'Sirvientes del Caos',
    reqs: {
      level: 9,
    },
    spell: 'conjureElemental',
    preparedSpell: true,
  },
  mireTheMind: {
    translation: 'Sumir la Mente',
    reqs: {
      level: 5,
    },
    spell: 'slow',
    preparedSpell: true,
  },
  whispersOfTheGrave: {
    translation: 'Susurros de la Tumbra',
    reqs: {
      level: 9,
    },
    spell: 'speakWithDead',
  },
  bewitchingWhispers: {
    translation: 'Susurros Encantadores',
    reqs: {
      level: 7,
    },
    spell: 'compulsion',
    preparedSpell: true,
  },
  oneWithShadows: {
    translation: 'Uno con las Sombras',
    reqs: {
      level: 5,
    },
  },
  fiendishVigor: {
    translation: 'Vigor Diabólico',
    spell: 'falseLife',
  },
  mistyVisions: {
    translation: 'Visiones Brumosas',
    spell: 'silentImage',
  },
  visionsOfDistantRealms: {
    translation: 'Visión de Reinos Distantes',
    reqs: {
      level: 15,
    },
    spell: 'arcaneEye',
  },
  eldritchSight: {
    translation: 'Visión Arcana',
    spell: 'detectMagic',
  },
  witchSight: {
    translation: 'Vista de Bruja',
    reqs: {
      level: 15,
    },
  },
  "devil'sSight": {
    translation: 'Vista del Diablo',
  },
  voiceOfTheChainMaster: {
    translation: 'Voz del Amo de la Cadena',
    reqs: {
      trait: 'pactOfTheChain',
    },
  },
};

export function getInvocation(invocationName) {
  return INVOCATIONS[invocationName];
}

export function getInvocationsSkills(pc) {
  const invocations = getInvocations(pc);

  const skills = [];

  if (invocations.includes('beguilingInfluence'))
    skills.push('deception', 'persuasion');

  return skills;
}

export function isInvocationAvailable(pc, invocationName) {
  const invocation = getInvocation(invocationName);

  const { reqs: { level, trait } = {} } = invocation;

  return (
    (!level || level < pc.level) && (!trait || getTraits(pc).includes(trait))
  );
}

export function getInvocationsSpells(pc) {
  const invocations = getInvocations(pc);

  return [
    ...new Set(
      invocations
        .map(invocationName => getInvocation(invocationName).spell)
        .filter(s => s)
    ),
  ].map(getSpell);
}

export function getPactBoon(pc) {
  return pc.classAttrs?.warlock?.pactBoon;
}

export const PACT_BOONS = ['pactOfTheChain', 'pactOfTheBlade', 'pactOfTheTome'];

export function translatePactBoon(boon) {
  if (boon === 'pactOfTheChain') return 'Pacto de la Cadena';
  if (boon === 'pactOfTheBlade') return 'Pacto de la Espada';
  if (boon === 'pactOfTheTome') return 'Pacto del Tomo';
  return 'unknown pact boon';
}

export function getTomeSpells(pc) {
  return pc.classAttrs?.warlock?.tomeSpells?.map(spell => spell.name) || [];
}

export function getPactSpells(pc) {
  const boon = getPactBoon(pc);

  if (boon === 'pactOfTheChain') return [getSpell('findFamiliar')];
  if (boon === 'pactOfTheTome') return getTomeSpells(pc).map(s => getSpell(s));
}

export function hasToLearnTomeSpells(pc) {
  const boon = getPactBoon(pc);
  const tomeSpells = getTomeSpells(pc);

  return !!(boon === 'pactOfTheTome' && tomeSpells.length < 3);
}
