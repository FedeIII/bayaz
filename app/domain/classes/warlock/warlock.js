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
      {
        and: [WEAPONS().lightCrossbow(), TOOLS().crossbowBolts({ amount: 20 })],
      },
      ...getAllSimpleMelee(),
      ...getAllSimpleRanged(),
    ],
  },
  { or: [TOOLS().componentPouch(), ...getAllArcaneFocus()] },
  { or: [SCHOLARS_PACK, DUNGEONEERS_PACK] },
  ARMORS().leather(),
  { or: getAllSimpleMelee() },
  WEAPONS().dagger({ amount: 2 }),
];

export function translatePatron(patron) {
  if (patron === 'archfey') return 'Archihada';
  if (patron === 'fiend') return 'El Diablo';
  if (patron === 'greatOldOne') return 'El Gran Antiguo';
}

export const PATRONS = ['archfey', 'fiend', 'greatOldOne'];

export function getWarlockPatron(pc) {
  return pc.classAttrs?.warlock?.patron;
}

export function getWarlockPatronTraits(pc) {
  const { level } = pc;

  const patron = getWarlockPatron(pc);

  return Object.entries(
    Object.entries(CLASSES().warlock.leveling).reduce(
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
    null, 2, 2, 3, 3, 4, 4,
    5, 5, 5, 6, 6, 6, 7, 7, 7,
    8, 8, 8, 8
  ][level - 1];
}

export function getInvocations(pc) {
  return pc.classAttrs?.warlock?.invocations || [];
}

export function hasToSelectInvocations(pc) {
  return getWarlockMaxInvocations(pc) > getInvocations(pc).length;
}

export const INVOCATIONS = {
  chainsOfCarceri: {
    translation: 'Cadenas de Carceri',
    reqs: {
      level: 15,
      pactBoon: 'pactOfTheChain',
    },
    spell: 'holdMonster',
  },
  armorOfShadows: {
    translation: 'Capa de Sombras',
    spell: 'mageArmor',
    spendSlot: false
  },
  agonizingBlast: {
    translation: 'Descarga Agónica',
    reqs: {
      trait: 'eldritchBlast',
    },
  },
  repellingBlast: {
    translation: 'Descarga Ahuyentadora',
    reqs: {
      trait: 'eldritchBlast',
    },
  },
  lifedrinker: {
    translation: 'Devorador de Vida',
    reqs: {
      level: 12,
      pactBoon: 'pactOfTheBlade',
    },
  },
  mireTheMind: {
    translation: 'Enfangar la Mente',
    reqs: {
      level: 5,
    },
    spell: 'slow',
    spendSlot: true,
  },
  minionsOfChaos: {
    translation: 'Esbirros del Caos',
    reqs: {
      level: 9,
    },
    spell: 'conjureElemental',
    spendSlot: true,
  },
  sculptorOfFlesh: {
    translation: 'Escultor de Carne',
    reqs: {
      level: 7,
    },
    spell: 'polymorph',
    spendSlot: true,
  },
  thirstingBlade: {
    translation: 'Espada Sedienta',
    reqs: {
      level: 5,
      pactBoon: 'pactOfTheBlade',
    },
  },
  beastSpeech: {
    translation: 'Habla Bestial',
    spell: 'speakWithAnimals',
    spendSlot: false,
  },
  beguilingInfluence: {
    translation: 'Influciencia Seductora',
  },
  thiefOfFiveFates: {
    translation: 'Ladrón de los Cinco Destinos',
    spell: 'bane',
    spendSlot: true,
  },
  eldritchSpear: {
    translation: 'Lanza Sobrenatural',
    reqs: {
      trait: 'eldritchBlast',
    },
  },
  bookOfAncientSecrets: {
    translation: 'Libro de los Secretos Ancestrales',
    reqs: {
      pactBoon: 'pactOfTheTome',
    },
  },
  masterOfMyriadForms: {
    translation: 'Maestro de Formas Innumerables',
    reqs: {
      level: 15,
    },
    spell: 'alterSelf',
    spendSlot: false,
  },
  signOfIllOmen: {
    translation: 'Marca del Mal Augurio',
    reqs: {
      level: 5,
    },
    spell: 'bestowCurse',
    spendSlot: true,
  },
  maskOfManyFaces: {
    translation: 'Máscara de los Mil Rostros',
    spell: 'disguiseSelf',
    spendSlot: false,
  },
  gazeOfTwoMinds: {
    translation: 'Mirada de las Dos Mentes',
  },
  eyesOfTheRuneKeeper: {
    translation: 'Ojos del Guardián de las Runas',
  },
  dreadfulWord: {
    translation: 'Palabra Aterradora',
    reqs: {
      level: 7,
    },
    spell: 'confusion',
    spendSlot: true,
  },
  ascendantStep: {
    translation: 'Paso Ascendente',
    reqs: {
      level: 9,
    },
    spell: 'levitate',
    spendSlot: false,
  },
  otherworldlyLeap: {
    translation: 'Salto de Otro Mundo',
    reqs: {
      level: 9,
    },
    spell: 'jump',
    spendSlot: false,
  },
  whispersOfTheGrave: {
    translation: 'Susurros del Sepulcro',
    reqs: {
      level: 9,
    },
    spell: 'speakWithDead',
    spendSlot: false,
  },
  bewitchingWhispers: {
    translation: 'Susurros Embrujados',
    reqs: {
      level: 7,
    },
    spell: 'compulsion',
    spendSlot: true,
  },
  oneWithShadows: {
    translation: 'Uno con las Sombras',
    reqs: {
      level: 5,
    },
  },
  fiendishVigor: {
    translation: 'Vigor Infernal',
    spell: 'falseLife',
    spendSlot: false,
  },
  witchSight: {
    translation: 'Visión de Bruja',
    reqs: {
      level: 15,
    },
  },
  eldritchSight: {
    translation: 'Visión Sobrenatural',
    spell: 'detectMagic',
    spendSlot: false,
  },
  visionsOfDistantRealms: {
    translation: 'Visión de Reinos Remotos',
    reqs: {
      level: 15,
    },
    spell: 'arcaneEye',
    spendSlot: false,
  },
  mistyVisions: {
    translation: 'Visiones Brumosas',
    spell: 'silentImage',
    spendSlot: false,
  },
  "devil'sSight": {
    translation: 'Vista del Diablo',
  },
  voiceOfTheChainMaster: {
    translation: 'Voz del Amo de la Cadena',
    reqs: {
      pactBoon: 'pactOfTheChain',
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
  const pPactBoon = getPactBoon(pc);

  const { reqs: { level, trait, pactBoon } = {} } = invocation;

  return (
    (!level || level < pc.level) &&
    (!trait || getTraits(pc).includes(trait)) &&
    (!pactBoon || pactBoon === pPactBoon)
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
  if (boon === 'pactOfTheBlade') return 'Pacto del Filo';
  if (boon === 'pactOfTheTome') return 'Pacto del Grimorio';
  return 'unknown pact boon';
}

export function getTomeSpells(pc) {
  return pc.classAttrs?.warlock?.tomeSpells?.map(spell => spell.name) || [];
}

export function getPactSpells(pc) {
  const boon = getPactBoon(pc);

  if (boon === 'pactOfTheChain') return [getSpell('findFamiliar')];
  if (boon === 'pactOfTheTome')
    return [...getTomeSpells(pc), ...getTomeRituals(pc)].map(s => getSpell(s));

  return [];
}

export function hasToLearnTomeSpells(pc) {
  const boon = getPactBoon(pc);
  const tomeSpells = getTomeSpells(pc);

  return !!(boon === 'pactOfTheTome' && tomeSpells.length < 3);
}

export function getTomeRituals(pc) {
  return pc.classAttrs?.warlock?.tomeRituals?.map(spell => spell.name) || [];
}

export function hasToLearnTomeRituals(pc) {
  const boon = getPactBoon(pc);
  const tomeRituals = getTomeRituals(pc);
  const invocations = getInvocations(pc);

  return !!(
    boon === 'pactOfTheTome' &&
    tomeRituals.length < 2 &&
    invocations.includes('bookOfAncientSecrets')
  );
}

export function getArcanum(pc) {
  return pc.classAttrs?.warlock?.arcanum.map(s => s.name) || [];
}

export function hasToLearnArcanum(pc) {
  const arcanum = getArcanum(pc);

  return (
    (pc.level >= 17 && arcanum.length < 4) ||
    (pc.level >= 15 && arcanum.length < 3) ||
    (pc.level >= 13 && arcanum.length < 2) ||
    (pc.level >= 11 && arcanum.length < 1)
  );
}
