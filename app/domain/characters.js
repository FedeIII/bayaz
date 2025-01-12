import { BACKGROUNDS } from './backgrounds/backgrounds';
import { BACKGROUND_SKILLS_EXPLANATION } from './backgrounds/backgroundSkillsExplanation';
import { getAspectOfTheBeastTotem } from './classes/barbarian/barbarian';
import { BARBARIAN_SKILLS_EXPLANATION } from './classes/barbarian/barbarianSkillsExplanation';
import {
  BARD_COLLEGES,
  getBardCollege,
  getLoreCollegeProficiencies,
} from './classes/bard/bard';
import {
  BARD_SKILLS_EXPLANATION,
  classTraitActions as bardTraitActions,
} from './classes/bard/bardSkillsExplanation';
import {
  translateDivineDomain,
  getDivineDomain,
  DIVINE_DOMAINS,
} from './classes/cleric/cleric';
import { displayTrait } from './display';
import {
  getAllHeavyArmors,
  getAllLightArmors,
  getAllMediumArmors,
} from './equipment/armors';
import {
  canBeAlwaysEquipped,
  explodeEquipment,
  getItem,
  unifyEquipment,
} from './equipment/equipment';
import {
  getAllMartialMelee,
  getAllMartialRanged,
  getAllSimpleMelee,
  getAllSimpleRanged,
  getAllWeapons,
  isMeleeWeapon,
  isRangedWeapon,
} from './equipment/weapons';
import { SKILLS_EXPLANATION } from './skillsExplanation';
import { isDraconicBloodline } from './classes/sorcerer/sorcerer';
import {
  getInvocations,
  getInvocationsSkills,
  getPactBoon,
} from './classes/warlock/warlock';
import random from '~/domain/random';
import { WARLOCK_SKILLS_EXPLANATION } from './classes/warlock/warlockSkillsExplanation';
import { CLERIC_SKILLS_EXPLANATION } from './classes/cleric/clericSkillsExplanation';
import { DRUID_SKILLS_EXPLANATION } from './classes/druid/druidSkillsExplanation';
import {
  RANGER_SKILLS_EXPLANATION,
  classTraitActions as rangerTraitActions,
} from './classes/ranger/rangerSkillsExplanation';
import { FIGHTER_SKILLS_EXPLANATION } from './classes/fighter/fighterSkillsExplanation';
import {
  getAllFightingStyles,
  getAttackBonusForFightingStyles,
  getFightingStyle,
  getStudentOfWar,
} from './classes/fighter/fighter';
import {
  METAMAGIC_EXPLANATION,
  METAMAGIC_EXPLANATION_GETTERS,
  SORCERER_SKILLS_EXPLANATION,
  classTraitActions as sorcererTraitActions,
} from './classes/sorcerer/sorcererSkillsExplanation';
import { WIZARD_SKILLS_EXPLANATION } from './classes/wizard/wizardSkillsExplanation';
import {
  MONK_SKILLS_EXPLANATION,
  elementalDisciplineExplanation,
} from './classes/monk/monkSkillsExplanation';
import {
  PALADIN_SKILLS_EXPLANATION,
  classTraitActions as paladinTraitActions,
} from './classes/paladin/paladinSkillsExplanation';
import {
  ELEMENTAL_DISCIPLINES,
  getExtraUnarmoredMovement,
  getMartialArtsDice,
  isMonkWeapon,
  translateElementalDisciplines,
} from './classes/monk/monk';
import {
  getPaladinFightingStyle,
  getSacredOath,
} from './classes/paladin/paladin';
import { ROGUE_SKILLS_EXPLANATION } from './classes/rogue/rogueSkillsExplanation';
import { getRogueProficiencies } from './classes/rogue/rogue';
import { getPackItems } from './equipment/packs';
import {
  getAttackBonusForRangerFightingStyles,
  getRangerFightingStyle,
} from './classes/ranger/ranger';
import { getChildrenText } from '~/utils/getChildrenText';
import { t } from './translations';
import { parseGoldToMoney } from './equipment/money';
import {
  getExtraStatForFeat,
  getFeat,
  getFeatTraits,
  isFeat,
} from './feats/featUtils';
import { FEATS_EXPLANATION, featsActions } from './feats/featExplanations';

export const RACES = {
  dwarf: {
    hills: {
      age: [40, 350],
      height: [110, 130],
      weight: [55, 100],
      size: 'M',
      speed: 8,
      statMods: {
        con: 2,
        wis: 1,
      },
      extraHitPoints: 1,
      conditionalSkills: {
        history: pc => [
          skillCheckBonus(
            { ...pc, skills: [...pc.skills, 'history'] },
            'history'
          ),
          'Piedra',
        ],
      },
      languages: ['common', 'dwarvish'],
      proficientItems: ['battleaxe', 'handaxe', 'lightHammer', 'warhammer'],
      traits: {
        savingThrows: {
          poison: 'advantage',
        },
        resistances: ['poison'],
        darkvision: 18,
      },
    },
    mountains: {
      age: [40, 350],
      height: [120, 150],
      weight: [55, 100],
      size: 'M',
      speed: 8,
      statMods: {
        str: 2,
        con: 2,
      },
      conditionalSkills: {
        history: pc => [
          skillCheckBonus(
            { ...pc, skills: [...pc.skills, 'history'] },
            'history'
          ),
          'Piedra',
        ],
      },
      languages: ['common', 'dwarvish'],
      proficientItems: [
        'battleaxe',
        'handaxe',
        'lightHammer',
        'warhammer',
        ...getAllLightArmors().map(armor => armor.name),
        ...getAllMediumArmors().map(armor => armor.name),
      ],
      traits: {
        savingThrows: {
          poison: 'advantage',
        },
        resistances: ['poison'],
        darkvision: 18,
      },
    },
  },
  elf: {
    high: {
      age: [80, 750],
      height: [150, 180],
      weight: [40, 75],
      size: 'M',
      speed: 10,
      statMods: {
        dex: 2,
        int: 1,
      },
      skills: ['perception'],
      languages: ['common', 'elvish'],
      proficientItems: ['longsword', 'shortsword', 'longbow', 'shortbow'],
      traits: {
        savingThrows: {
          charm: 'advantage',
        },
        darkvision: 18,
        trance: true,
      },
      spellcastingAbility: 'int',
    },
    wood: {
      age: [80, 750],
      height: [150, 180],
      weight: [45, 80],
      size: 'M',
      speed: 11,
      statMods: {
        dex: 2,
        wis: 1,
      },
      skills: ['perception'],
      languages: ['common', 'elvish'],
      proficientItems: ['longsword', 'shortsword', 'longbow', 'shortbow'],
      traits: {
        savingThrows: {
          charm: 'advantage',
        },
        darkvision: 18,
        trance: true,
        maskOfTheWild: 'Máscara de la Espesura',
      },
    },
    drow: {
      age: [80, 750],
      height: [140, 170],
      weight: [35, 70],
      size: 'M',
      speed: 10,
      statMods: {
        dex: 2,
        cha: 1,
      },
      skills: ['perception'],
      languages: ['common', 'elvish'],
      proficientItems: ['rapier', 'shortsword', 'handCrossbow'],
      traits: {
        savingThrows: {
          charm: 'advantage',
        },
        darkvision: 36,
        trance: true,
        sunlightSensitivity: 'Sensibilidad a la Luz del Sol',
      },
      spellcastingAbility: 'cha',
    },
  },
  halfling: {
    lightfoot: {
      age: [18, 250],
      height: [80, 100],
      weight: [16, 20],
      size: 'S',
      speed: 8,
      statMods: {
        dex: 2,
        cha: 1,
      },
      languages: ['common', 'halfling'],
      traits: {
        lucky: 'Suertudo',
        brave: 'Valiente',
        nimble: 'Agilidad Mediana',
        naturallyStealthy: 'Sigiloso por Naturaleza',
      },
    },
    stout: {
      age: [18, 250],
      height: [80, 100],
      weight: [16, 20],
      size: 'S',
      speed: 8,
      statMods: {
        dex: 2,
        con: 1,
      },
      languages: ['common', 'halfling'],
      traits: {
        lucky: 'Suertudo',
        brave: 'Valiente',
        nimble: 'Agilidad Mediana',
        savingThrows: {
          poison: 'advantage',
        },
        resistances: ['poison'],
      },
    },
  },
  human: {
    subrace: {
      age: [16, 90],
      height: [150, 190],
      weight: [55, 120],
      size: 'M',
      speed: 10,
      statMods: {
        str: 1,
        dex: 1,
        con: 1,
        int: 1,
        wis: 1,
        cha: 1,
      },
      languages: ['common'],
    },
  },
  ['half-elf']: {
    subrace: {
      age: [16, 180],
      height: [150, 180],
      weight: [55, 120],
      size: 'M',
      speed: 10,
      statMods: {
        cha: 2,
      },
      languages: ['common', 'elvish'],
      traits: {
        darkvision: 18,
        savingThrows: {
          charm: 'advantage',
        },
      },
    },
  },
  ['half-orc']: {
    subrace: {
      age: [13, 75],
      height: [150, 200],
      weight: [65, 170],
      size: 'M',
      speed: 10,
      statMods: {
        str: 2,
        con: 1,
      },
      skills: ['intimidation'],
      languages: ['common', 'orc'],
      traits: {
        darkvision: 18,
        relentlessEndurance: 'Resistencia Incansable',
        savageAttacks: 'Ataques Salvajes',
      },
    },
  },
};

export const CHARACTER_RACES = Object.keys(RACES);

export const SUBRACES = {
  dwarf: ['hills', 'mountains'],
  elf: ['high', 'wood', 'drow'],
  halfling: ['lightfoot', 'stout'],
};

export function translateRace(race) {
  switch (race) {
    default:
    case 'human':
      return 'Humano';
    case 'dwarf':
      return 'Enano';
    case 'elf':
      return 'Elfo';
    case 'halfling':
      return 'Mediano';
    case 'half-elf':
      return 'Semielfo';
    case 'half-orc':
      return 'Semiorco';
    case 'hills':
      return 'de las Colinas';
    case 'mountains':
      return 'de las Montañas';
    case 'high':
      return 'Alto Elfo';
    case 'wood':
      return 'de los Bosques';
    case 'drow':
      return 'Oscuro';
    case 'lightfoot':
      return 'Piesligeros';
    case 'stout':
      return 'Fornido';
  }
}

export function getConditionalSkills(pc) {
  const {
    race,
    subrace,
    classAttrs: { skills: classSkills },
  } = pc;

  return (
    {
      ...RACES[race][subrace].conditionalSkills,
      ...classSkills.reduce(
        (conditionalClassSkills, skillName) => ({
          ...conditionalClassSkills,
          [skillName]: pc => {
            if (pc.pClass === 'cleric')
              return [translateDivineDomain(getDivineDomain(pc))];
            return [translateClass(pc.pClass)];
          },
        }),
        {}
      ),
    } || {}
  );
}

export function CLASSES() {
  return {
    barbarian: {
      initialHitPoints: 12,
      hitDice: '1d12',
      proficientStats: ['str', 'con'],
      proficientItems: [
        ...getAllLightArmors().map(armor => armor.name),
        ...getAllMediumArmors().map(armor => armor.name),
        'shield',
        ...getAllWeapons().map(weapon => weapon.name),
      ],
      pickSkills: 2,
      skillsToPick: [
        'athletics',
        'intimidation',
        'nature',
        'perception',
        'survival',
        'animal-handling',
      ],
      statImprove: [4, 8, 12, 16, 19],
      leveling: {
        1: {
          traits: {
            rage: 'Furia',
            unarmoredDefense: 'Defensa sin Armadura',
          },
        },
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
        7: {
          traits: {
            feralInstinct: 'Instinto Salvaje',
          },
        },
        9: {
          traits: {
            brutalCritical: 'Crítico Brutal',
          },
        },
        10: {
          primalPath: {
            berserker: {
              traits: {
                intimidatingPresence: 'Presencia Intimidante',
              },
            },
            'totem-warrior': {
              traits: {
                spiritWalker: 'Caminante Espiritual',
              },
            },
          },
        },
        11: {
          traits: {
            relentlessRage: 'Furia Implacable',
          },
        },
        14: {
          primalPath: {
            berserker: {
              traits: {
                retaliation: 'Represalia',
              },
            },
            'totem-warrior': {
              traits: {
                totemicAttunement: 'Sintonía Totémica',
              },
            },
          },
        },
        15: {
          traits: {
            persistentRage: 'Furia Persistente',
          },
        },
        18: {
          traits: {
            indomitableMight: 'Furia Indómita',
          },
        },
        20: {
          traits: {
            primalChampion: 'Campeón Primario',
          },
        },
      },
    },
    bard: {
      initialHitPoints: 8,
      hitDice: '1d8',
      proficientStats: ['dex', 'cha'],
      pickSkills: 3,
      skillsToPick: [
        'athletics',
        'acrobatics',
        'sleight-of-hand',
        'stealth',
        'arcana',
        'history',
        'investigation',
        'nature',
        'religion',
        'animal-handling',
        'insight',
        'medicine',
        'perception',
        'survival',
        'deception',
        'intimidation',
        'performance',
        'persuasion',
      ],
      proficientItems: [
        ...getAllLightArmors().map(armor => armor.name),
        ...getAllSimpleMelee().map(weapon => weapon.name),
        ...getAllSimpleRanged().map(weapon => weapon.name),
        'handCrossbow',
        'longsword',
        'rapier',
        'shortsword',
      ],
      spellcastingAbility: 'cha',
      statImprove: [4, 8, 12, 16, 19],
      leveling: {
        1: {
          traits: {
            bardicInspiration: 'Inspiración de Bardo',
          },
        },
        2: {
          traits: {
            jackOfAllTrades: 'Polivalente',
            songOfRest: 'Canción de Descanso',
          },
        },
        3: {
          traits: {
            bardCollege: 'Colegio de Bardo',
            expertise: 'Experto',
          },
          bardCollege: {
            lore: {
              traits: {
                loreBonusProficiencies: 'Competencias Adicionales',
                cuttingWords: 'Palabras Hirientes',
              },
            },
            valor: {
              traits: {
                valorBonusProficiencies: 'Competencias Adicionales',
                combatInspiration: 'Inspiración de Combate',
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
            fontOfInspiration: 'Fuente de inspiración',
          },
        },
        6: {
          traits: {
            countercharm: 'Contraoda',
          },
          bardCollege: {
            lore: {
              traits: {
                additionalMagicalSecrets: 'Secretos Mágicos Adicionales',
              },
            },
            valor: {
              traits: {
                extraAttack: 'Ataque Adicional',
              },
            },
          },
        },
        10: {
          traits: {
            magicalSecrets: 'Secretos Mágicos',
          },
        },
        14: {
          traits: {
            magicalSecrets: 'Secretos Mágicos',
          },
          bardCollege: {
            lore: {
              traits: {
                peerlessSkill: 'Habilidad Incomparable',
              },
            },
            valor: {
              traits: {
                battleMagic: 'Magia de Batalla',
              },
            },
          },
        },
        18: {
          traits: {
            magicalSecrets: 'Secretos Mágicos',
          },
        },
        20: {
          traits: {
            superiorInspiration: 'Inspiración Superior',
          },
        },
      },
    },
    cleric: {
      initialHitPoints: 8,
      hitDice: '1d8',
      proficientStats: ['wis', 'cha'],
      pickSkills: 2,
      skillsToPick: [
        'insight',
        'history',
        'medicine',
        'persuasion',
        'religion',
      ],
      proficientItems: [
        ...getAllLightArmors().map(armor => armor.name),
        ...getAllMediumArmors().map(armor => armor.name),
        'shield',
        ...getAllSimpleMelee().map(weapon => weapon.name),
        ...getAllSimpleRanged().map(weapon => weapon.name),
      ],
      spellcastingAbility: 'wis',
      statImprove: [4, 8, 12, 16, 19],
      leveling: {
        1: {
          divineDomain: {
            knowledge: {
              traits: {
                blessingsOfKnowledge: 'Bendiciones del Conocimiento',
              },
            },
            war: {
              traits: {
                warPriest: 'Clérigo de Guerra',
              },
            },
            light: {
              traits: {
                wardingFlare: 'Fulgor Protector',
              },
            },
            tempest: {
              traits: {
                wrathOfTheStorm: 'Ira de la Tormenta',
              },
            },
            trickery: {
              traits: {
                blessingOfTheTrickster: 'Bendición del Tramposo',
              },
            },
            life: {
              traits: {
                discipleOfLife: 'Discípulo de la Vida',
              },
            },
          },
        },
        2: {
          traits: {
            channelDivinity: 'Canalizar Divinidad',
          },
          channelDivinity: {
            traits: {
              turnUndead: 'Expulsar Muertos Vivientes',
            },
            knowledge: {
              traits: {
                knowledgeOfTheAges: 'Conocimiento de las Edades',
              },
            },
            war: {
              traits: {
                guidedStrike: 'Impacto Guiado',
              },
            },
            light: {
              traits: {
                radianceOfTheDawn: 'Resplandor del Alba',
              },
            },
            nature: {
              traits: {
                charmAnimalsAndPlants: 'Hechizar Animales y Plantas',
              },
            },
            tempest: {
              traits: {
                destructiveWrath: 'Ira Destructiva',
              },
            },
            trickery: {
              traits: {
                invokeDuplicity: 'Invocar Duplicidad',
              },
            },
            life: {
              traits: {
                preserveLife: 'Preservar Vida',
              },
            },
          },
        },
        4: {
          traits: {
            abilityScoreImprovement: 'Mejora de Puntuación de Característica',
          },
        },
        6: {
          divineDomain: {
            nature: {
              traits: {
                dampenElements: 'Amortiguar Elementos',
              },
            },
            tempest: {
              traits: {
                thunderousStrike: 'Golpe de Rayo',
              },
            },
            life: {
              traits: {
                blessedHealer: 'Sanador Bendecido',
              },
            },
          },
          channelDivinity: {
            knowledge: {
              traits: {
                readThoughts: 'Leer Pensamientos',
              },
            },
            war: {
              traits: {
                warGodsBlessing: 'Bendición del Dios de la Guerra',
              },
            },
            trickery: {
              traits: {
                cloakOfShadows: 'Capa de Sombras',
              },
            },
          },
        },
        8: {
          divineDomain: {
            knowledge: {
              traits: {
                potentSpellcasting: 'Lanzamiento de Conjuros Potente',
              },
            },
            war: {
              traits: {
                divineStrike: 'Golpe Divino',
              },
            },
            light: {
              traits: {
                potentSpellcasting: 'Lanzamiento de Conjuros Potente',
              },
            },
            nature: {
              traits: {
                divineStrike: 'Golpe Divino',
              },
            },
            tempest: {
              traits: {
                divineStrike: 'Golpe Divino',
              },
            },
            trickery: {
              traits: {
                divineStrike: 'Golpe Divino',
              },
            },
            life: {
              traits: {
                divineStrike: 'Golpe Divino',
              },
            },
          },
        },
        10: {
          traits: {
            divineIntervention: 'Intervención Divina',
          },
        },
        17: {
          divineDomain: {
            knowledge: {
              traits: {
                visionsOfThePast: 'Visiones del Pasado',
              },
            },
            war: {
              traits: {
                avatarOfBattle: 'Avatar de Batalla',
              },
            },
            light: {
              traits: {
                coronaOfLight: 'Corona de Luz',
              },
            },
            nature: {
              traits: {
                masterOfNature: 'Maestro de la Naturaleza',
              },
            },
            tempest: {
              traits: {
                stormborn: 'Hijo de la Tormenta',
              },
            },
            life: {
              traits: {
                supremeHealing: 'Sanación Suprema',
              },
            },
          },
        },
      },
    },
    druid: {
      initialHitPoints: 8,
      hitDice: '1d8',
      proficientStats: ['int', 'wis'],
      pickSkills: 2,
      skillsToPick: [
        'arcana',
        'insight',
        'medicine',
        'nature',
        'perception',
        'religion',
        'survival',
        'animal-handling',
      ],
      proficientItems: [
        ...getAllLightArmors().map(armor => armor.name),
        ...getAllMediumArmors().map(armor => armor.name),
        'shield',
        'quarterstaff',
        'scimitar',
        'club',
        'dagger',
        'dart',
        'sickle',
        'sling',
        'spear',
        'mace',
        'herbalismKit',
      ],
      spellcastingAbility: 'wis',
      statImprove: [4, 8, 12, 16, 19],
      leveling: {
        2: {
          traits: {
            wildShape: 'Forma Salvaje',
            druidCircle: 'Círculo Druídico',
          },
          druidCircle: {
            land: {
              traits: {
                bonusCantrip: 'Truco Adicional',
                naturalRecovery: 'Recuperación Natural',
              },
            },
            moon: {
              traits: {
                combatWildShape: 'Forma Salvaje de Combate',
                circleForms: 'Formas del Círculo',
              },
            },
          },
        },
        3: {
          druidCircle: {
            land: {
              traits: {
                landCircle: 'Conjuros del Círculo',
              },
            },
          },
        },
        4: {
          traits: {
            abilityScoreImprovement: 'Mejora de Puntuación de Característica',
          },
        },
        6: {
          druidCircle: {
            land: {
              traits: {
                landsStride: 'Zancada Forestal',
              },
            },
            moon: {
              traits: {
                primalStrike: 'Golpe Primitivo',
              },
            },
          },
        },
        10: {
          druidCircle: {
            land: {
              traits: {
                naturesWard: 'Protección de la Naturaleza',
              },
            },
            moon: {
              traits: {
                elementalWildShape: 'Forma Salvaje Elemental',
              },
            },
          },
        },
        14: {
          druidCircle: {
            land: {
              traits: {
                naturesSanctuary: 'Santuario de la Naturaleza',
              },
            },
            moon: {
              traits: {
                thousandForms: 'Mil Formas',
              },
            },
          },
        },
        18: {
          traits: {
            timelessBody: 'Cuerpo Eterno',
            beastSpells: 'Conjuros Bestiales',
          },
        },
        20: {
          traits: {
            archdruid: 'Archidruida',
          },
        },
      },
    },
    fighter: {
      initialHitPoints: 10,
      hitDice: '1d10',
      proficientStats: ['str', 'con'],
      pickSkills: 2,
      skillsToPick: [
        'acrobatics',
        'athletics',
        'insight',
        'history',
        'intimidation',
        'animal-handling',
        'perception',
        'survival',
      ],
      proficientItems: [
        ...getAllLightArmors().map(armor => armor.name),
        ...getAllMediumArmors().map(armor => armor.name),
        ...getAllHeavyArmors().map(armor => armor.name),
        'shield',
        ...getAllSimpleMelee().map(weapon => weapon.name),
        ...getAllSimpleRanged().map(weapon => weapon.name),
        ...getAllMartialMelee().map(weapon => weapon.name),
        ...getAllMartialRanged().map(weapon => weapon.name),
      ],
      spellcastingAbility: 'int',
      statImprove: [4, 6, 8, 12, 14, 16, 19],
      leveling: {
        1: {
          traits: {
            secondWind: 'Nuevas Energías',
            fightingStyle: 'Estilo de Combate',
          },
        },
        2: {
          traits: {
            actionSurge: 'Oleada de Acción',
          },
        },
        3: {
          traits: {
            martialArchetype: 'Arquetipo Marcial',
          },
          martialArchetype: {
            eldritchKnight: {
              traits: {
                weaponBond: 'Ligadura de Arma',
                knightSpell: 'Conjuros de Caballero Arcano',
              },
            },
            champion: {
              traits: {
                improvedCritical: 'Crítico Mejorado',
              },
            },
            battleMaster: {
              traits: {
                combatSuperiority: 'Superioridad en Combate',
                studentOfWar: 'Estudiante de Guerra',
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
          },
        },
        7: {
          martialArchetype: {
            eldritchKnight: {
              traits: {
                warMagic: 'Magia de Guerra',
              },
            },
            champion: {
              traits: {
                remarkableAthlete: 'Atleta Destacado',
              },
            },
            battleMaster: {
              traits: {
                knowYourEnemy: 'Conoce a tu Enemigo',
              },
            },
          },
        },
        9: {
          traits: {
            indomitable: 'Indomable',
          },
        },
        10: {
          martialArchetype: {
            eldritchKnight: {
              traits: {
                eldritchStrike: 'Golpe Sobrenatural',
              },
            },
            champion: {
              traits: {
                extraFightingStyle: 'Estilo de Combate Adicional',
              },
            },
          },
        },
        15: {
          martialArchetype: {
            eldritchKnight: {
              traits: {
                arcaneCharge: 'Carga Arcana',
              },
            },
            battleMaster: {
              traits: {
                relentless: 'Implacable',
              },
            },
          },
        },
        18: {
          martialArchetype: {
            champion: {
              traits: {
                survivor: 'Superviviente',
              },
            },
          },
        },
      },
    },
    monk: {
      initialHitPoints: 8,
      hitDice: '1d8',
      proficientStats: ['str', 'dex'],
      pickSkills: 2,
      skillsToPick: [
        'acrobatics',
        'athletics',
        'insight',
        'history',
        'religion',
        'stealth',
      ],
      proficientItems: [
        ...getAllSimpleMelee().map(weapon => weapon.name),
        ...getAllSimpleRanged().map(weapon => weapon.name),
        'shortsword',
      ],
      statImprove: [4, 8, 12, 16, 19],
      leveling: {
        1: {
          traits: {
            unarmoredDefense: 'Defensa sin Armadura',
            martialArts: 'Artes Marciales',
          },
        },
        2: {
          traits: {
            ki: 'Ki',
            flurryOfBlows: 'Ráfaga de Golpes',
            patientDefense: 'Defensa Paciente',
            stepOfTheWind: 'Andar del Viento',
            unarmoredMovement: 'Movimiento sin Armadura',
          },
        },
        3: {
          traits: {
            monasticTradition: 'Tradición Monástica',
            deflectMissiles: 'Desviar Proyectiles',
          },
          monasticTradition: {
            wayOfTheFourElements: {
              traits: {
                discipleOftheElements: 'Discípulo de los Elementos',
              },
            },
            openHand: {
              traits: {
                openHandTechnique: 'Técnica de la Mano Abierta',
              },
            },
            wayOfShadow: {
              traits: {
                shadowArts: 'Artes Sombrías',
              },
            },
          },
        },
        4: {
          traits: {
            abilityScoreImprovement: 'Mejora de Puntuación de Característica',
            slowFall: 'Caída Lenta',
          },
        },
        5: {
          traits: {
            extraAttack: 'Ataque Extra',
            stunningStrike: 'Golpe Aturdidor',
          },
        },
        6: {
          traits: {
            kiEmpoweredStrikes: 'Golpes Potenciados con Ki',
          },
          monasticTradition: {
            openHand: {
              traits: {
                wholenessOfBody: 'Integridad del Cuerpo',
              },
            },
            wayOfShadow: {
              traits: {
                shadowStep: 'Paso Sombrío',
              },
            },
          },
        },
        7: {
          traits: {
            evasion: 'Evasión',
            stillnessOfMind: 'Quietud de la Mente',
          },
        },
        8: {
          traits: {
            abilityScoreImprovement: 'Mejora de Puntuación de Característica',
          },
        },
        10: {
          traits: {
            purityOfBody: 'Pureza del Cuerpo',
          },
        },
        11: {
          monasticTradition: {
            openHand: {
              traits: {
                tranquility: 'Tranquilidad',
              },
            },
            wayOfShadow: {
              traits: {
                cloakOfShadows: 'Capa de Sombras',
              },
            },
          },
        },
        12: {
          traits: {
            abilityScoreImprovement: 'Mejora de Puntuación de Característica',
          },
        },
        13: {
          traits: {
            tongueOfTheSunAndMoon: 'Lengua del Sol y la Luna',
          },
        },
        14: {
          traits: {
            diamondSoul: 'Alma Diamantina',
          },
        },
        15: {
          traits: {
            timelessBody: 'Cuerpo Imperecedero',
          },
        },
        16: {
          traits: {
            abilityScoreImprovement: 'Mejora de Puntuación de Característica',
          },
        },
        17: {
          monasticTradition: {
            openHand: {
              traits: {
                quiveringPalm: 'Palma Temblorosa',
              },
            },
            wayOfShadow: {
              traits: {
                opportunist: 'Oportunista',
              },
            },
          },
        },
        18: {
          traits: {
            emptyBody: 'Cuerpo Vacío',
          },
        },
        19: {
          traits: {
            abilityScoreImprovement: 'Mejora de Puntuación de Característica',
          },
        },
        20: {
          traits: {
            perfectSelf: 'Perfección de Uno Mismo',
          },
        },
      },
    },
    paladin: {
      initialHitPoints: 10,
      hitDice: '1d10',
      proficientStats: ['str', 'cha'],
      pickSkills: 2,
      skillsToPick: [
        'athletics',
        'insight',
        'intimidation',
        'medicine',
        'persuasion',
        'religion',
      ],
      proficientItems: [
        ...getAllLightArmors().map(armor => armor.name),
        ...getAllMediumArmors().map(armor => armor.name),
        ...getAllHeavyArmors().map(armor => armor.name),
        'shield',
        ...getAllSimpleMelee().map(weapon => weapon.name),
        ...getAllSimpleRanged().map(weapon => weapon.name),
        ...getAllMartialMelee().map(weapon => weapon.name),
        ...getAllMartialRanged().map(weapon => weapon.name),
      ],
      spellcastingAbility: 'cha',
      statImprove: [4, 8, 12, 16, 19],
      leveling: {
        1: {
          traits: {
            divineSense: 'Sentido Divino',
            layOnHands: 'Imposición de Manos',
          },
        },
        2: {
          traits: {
            paladinFightingStyle: 'Estilo de Combate',
            divineSmite: 'Castigo Divino',
          },
        },
        3: {
          traits: {
            divineHealth: 'Salud Divina',
            channelDivinity: 'Canalizar Divinidad',
            sacredOath: 'Juramento Sagrado',
          },
          channelDivinity: {
            Devotion: {
              traits: {
                sacredWeapon: 'Arma Sagrada',
                turnTheUnholy: 'Expulsar al Profano',
              },
            },
            Ancients: {
              traits: {
                naturesWrath: 'Ira de la Naturaleza',
                turnTheFaithless: 'Expulsar a los Infieles',
              },
            },
            Vengeance: {
              traits: {
                abjureEnemy: 'Renunciar al Enemigo',
                vowOfEnmity: 'Voto de Enemistad',
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
          },
        },
        6: {
          traits: {
            auraOfProtection: 'Aura de Protección',
          },
        },
        7: {
          sacredOath: {
            Devotion: {
              traits: {
                auraOfDevotion: 'Aura de Devoción',
              },
            },
            Ancients: {
              traits: {
                auraOfWarding: 'Aura de Custodia',
              },
            },
            Vengeance: {
              traits: {
                relentlessAvenger: 'Venganza Implacable',
              },
            },
          },
        },
        8: {
          traits: {
            abilityScoreImprovement: 'Mejora de Puntuación de Característica',
          },
        },
        10: {
          traits: {
            auraOfCourage: 'Aura de Coraje',
          },
        },
        12: {
          traits: {
            abilityScoreImprovement: 'Mejora de Puntuación de Característica',
          },
        },
        14: {
          traits: {
            cleansingTouch: 'Toque de Purificación',
          },
        },
        15: {
          sacredOath: {
            Devotion: {
              traits: {
                purityOfSpirit: 'Pureza de Espíritu',
              },
            },
            Ancients: {
              traits: {
                undyingSentinel: 'Centinela Imperecedero',
              },
            },
            Vengeance: {
              traits: {
                soulOfVengeance: 'Alma de Venganza',
              },
            },
          },
        },
        16: {
          traits: {
            abilityScoreImprovement: 'Mejora de Puntuación de Característica',
          },
        },
        19: {
          traits: {
            abilityScoreImprovement: 'Mejora de Puntuación de Característica',
          },
        },
        20: {
          sacredOath: {
            Devotion: {
              traits: {
                holyNimbus: 'Aura Sagrada',
              },
            },
            Ancients: {
              traits: {
                elderChampion: 'Campeón Ancestral',
              },
            },
            Vengeance: {
              traits: {
                avengingAngel: 'Ángel Vengador',
              },
            },
          },
        },
      },
    },
    ranger: {
      initialHitPoints: 10,
      hitDice: '1d10',
      proficientStats: ['str', 'dex'],
      pickSkills: 3,
      skillsToPick: [
        'athletics',
        'insight',
        'animal-handling',
        'nature',
        'perception',
        'stealth',
        'survival',
      ],
      proficientItems: [
        ...getAllLightArmors().map(armor => armor.name),
        ...getAllMediumArmors().map(armor => armor.name),
        'shield',
        ...getAllSimpleMelee().map(weapon => weapon.name),
        ...getAllSimpleRanged().map(weapon => weapon.name),
        ...getAllMartialMelee().map(weapon => weapon.name),
        ...getAllMartialRanged().map(weapon => weapon.name),
      ],
      spellcastingAbility: 'wis',
      statImprove: [4, 8, 12, 16, 19],
      leveling: {
        1: {
          traits: {
            favoredEnemy: 'Enemigo Predilecto',
            naturalExplorer: 'Explorador de lo Natural',
          },
        },
        2: {
          traits: {
            rangerFightingStyle: 'Estilo de Combate',
          },
        },
        3: {
          traits: {
            primevalAwareness: 'Percepción Primigenia',
            rangerConclave: 'Arquetipo de Explorador',
          },
          rangerConclave: {
            hunter: {
              traits: {
                huntersPrey: 'Presa del Cazador',
              },
            },
            beastMaster: {
              traits: {
                rangersCompanion: 'Compañero Animal',
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
          },
        },
        7: {
          rangerConclave: {
            hunter: {
              traits: {
                defensiveTactics: 'Tácticas Defensivas',
              },
            },
            beastMaster: {
              traits: {
                exceptionalTraining: 'Entrenamiento Excepcional',
              },
            },
          },
        },
        8: {
          traits: {
            landsStride: 'Zancada Forestal',
          },
        },
        10: {
          traits: {
            hideInPlainSight: 'Ocultarse a Plena Vista',
          },
        },
        11: {
          rangerConclave: {
            hunter: {
              traits: {
                multiattack: 'Ataque Múltiple',
              },
            },
            beastMaster: {
              traits: {
                bestialFury: 'Furia Bestial',
              },
            },
          },
        },
        14: {
          traits: {
            vanish: 'Esfumarse',
          },
        },
        15: {
          rangerConclave: {
            hunter: {
              traits: {
                superiorHuntersDefense: 'Defensa Superior del Cazador',
              },
            },
            beastMaster: {
              traits: {
                shareSpells: 'Compartir Conjuros',
              },
            },
          },
        },
        18: {
          traits: {
            feralSenses: 'Sentidos Salvajes',
          },
        },
        20: {
          traits: {
            foeSlayer: 'Asesino de Enemigos',
          },
        },
      },
    },
    rogue: {
      initialHitPoints: 8,
      hitDice: '1d8',
      proficientStats: ['dex', 'int'],
      pickSkills: 4,
      skillsToPick: [
        'athletics',
        'acrobatics',
        'insight',
        'deception',
        'performance',
        'intimidation',
        'investigation',
        'sleight-of-hand',
        'perception',
        'persuasion',
        'stealth',
      ],
      proficientItems: [
        ...getAllLightArmors().map(armor => armor.name),
        ...getAllSimpleMelee().map(weapon => weapon.name),
        ...getAllSimpleRanged().map(weapon => weapon.name),
        'handCrossbow',
        'longsword',
        'rapier',
        'shortsword',
        'thievesTools',
      ],
      spellcastingAbility: 'int',
      statImprove: [4, 8, 10, 12, 16, 19],
      leveling: {
        1: {
          traits: {
            sneakAttack: 'Ataque Furtivo',
            thievesCant: 'Jerga de Ladrones',
          },
        },
        2: {
          traits: {
            cunningAction: 'Acción Astuta',
          },
        },
        3: {
          traits: {
            roguishArchetype: 'Arquetipo de Pícaro',
          },
          roguishArchetype: {
            arcaneTrickster: {
              traits: {
                mageHandLegerdemain: 'Prestidigitación de Mano de Mago',
                spellcasting: 'Lanzamiento de Conjuros',
              },
            },
            assassin: {
              traits: {
                bonusProficiencies: 'Competencias Adicionales',
                assassinate: 'Asesinar',
              },
            },
            thief: {
              traits: {
                fastHands: 'Manos Rápidas',
                secondStoryWork: 'Trabajo en el Segundo Piso',
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
            uncannyDodge: 'Esquiva Asombrosa',
          },
        },
        7: {
          traits: {
            evasion: 'Evasión',
          },
        },
        8: {
          traits: {
            abilityScoreImprovement: 'Mejora de Puntuación de Característica',
          },
        },
        9: {
          roguishArchetype: {
            arcaneTrickster: {
              traits: {
                magicalAmbush: 'Emboscada Mágica',
              },
            },
            thief: {
              traits: {
                supremeSneak: 'Sigilo Supremo',
              },
            },
            assassin: {
              traits: {
                infiltrationExpertise: 'Experto en Infiltración',
              },
            },
          },
        },
        10: {
          traits: {
            abilityScoreImprovement: 'Mejora de Puntuación de Característica',
          },
        },
        11: {
          traits: {
            reliableTalent: 'Talento Seguro',
          },
        },
        12: {
          traits: {
            abilityScoreImprovement: 'Mejora de Puntuación de Característica',
          },
        },
        13: {
          roguishArchetype: {
            arcaneTrickster: {
              traits: {
                versatileTrickster: 'Bribón Versátil',
              },
            },
            thief: {
              traits: {
                useMagicDevice: 'Usar Objeto Mágico',
              },
            },
            assassin: {
              traits: {
                impostor: 'Impostor',
              },
            },
          },
        },
        14: {
          traits: {
            blindsense: 'Sentido Ciego',
          },
        },
        15: {
          traits: {
            slipperyMind: 'Mente Escurridiza',
          },
        },
        16: {
          traits: {
            abilityScoreImprovement: 'Mejora de Puntuación de Característica',
          },
        },
        17: {
          roguishArchetype: {
            arcaneTrickster: {
              traits: {
                spellThief: 'Ladrón de Conjuros',
              },
            },
            thief: {
              traits: {
                thiefsReflexes: 'Reflejos de Ladrón',
              },
            },
            assassin: {
              traits: {
                deathStrike: 'Golpe Mortal',
              },
            },
          },
        },
        18: {
          traits: {
            elusive: 'Escurridizo',
          },
        },
        19: {
          traits: {
            abilityScoreImprovement: 'Mejora de Puntuación de Característica',
          },
        },
        20: {
          traits: {
            strokeOfLuck: 'Golpe de Suerte',
          },
        },
      },
    },
    sorcerer: {
      initialHitPoints: 6,
      hitDice: '1d6',
      proficientStats: ['con', 'cha'],
      pickSkills: 2,
      skillsToPick: [
        'arcana',
        'insight',
        'deception',
        'intimidation',
        'persuasion',
        'religion',
      ],
      proficientItems: [
        'dagger',
        'dart',
        'sling',
        'quarterstaff',
        'lightCrossbow',
      ],
      spellcastingAbility: 'cha',
      statImprove: [4, 8, 12, 16, 19],
      leveling: {
        1: {
          sorcererOrigin: {
            draconicBloodline: {
              traits: {
                dragonAncestor: 'Ancestro Dragón',
                draconicResilience: 'Resistencia Dracónica',
              },
            },
            wildMagic: {
              traits: {
                wildMagicSurge: 'Oleada de Magia Salvaje',
                tidesOfChaos: 'Mareas de Caos',
              },
            },
          },
        },
        2: {
          traits: {
            fontOfMagic: 'Fuente de Magia',
          },
        },
        3: {
          traits: {
            metamagic: 'Metamagia',
          },
        },
        4: {
          traits: {
            abilityScoreImprovement: 'Mejora de Puntuación de Característica',
          },
        },
        6: {
          sorcererOrigin: {
            draconicBloodline: {
              traits: {
                elementalAffinity: 'Afinidad Elemental',
              },
            },
            wildMagic: {
              traits: {
                bendLuck: 'Curvar la Suerte',
              },
            },
          },
        },
        14: {
          sorcererOrigin: {
            draconicBloodline: {
              traits: {
                dragonWings: 'Alas de Dragón',
              },
            },
            wildMagic: {
              traits: {
                controlledChaos: 'Caos Controlado',
              },
            },
          },
        },
        18: {
          sorcererOrigin: {
            draconicBloodline: {
              traits: {
                draconicPresence: 'Presencia Draconiana',
              },
            },
            wildMagic: {
              traits: {
                spellBombardment: 'Bombardeo de conjuros',
              },
            },
          },
        },
        20: {
          traits: {
            sorcerousRestoration: 'Restablecimiento de Hechicero',
          },
        },
      },
    },
    warlock: {
      initialHitPoints: 8,
      hitDice: '1d8',
      proficientStats: ['wis', 'cha'],
      pickSkills: 2,
      skillsToPick: [
        'arcana',
        'deception',
        'history',
        'intimidation',
        'investigation',
        'nature',
        'religion',
      ],
      proficientItems: [
        ...getAllLightArmors().map(armor => armor.name),
        ...getAllSimpleMelee().map(armor => armor.name),
        ...getAllSimpleRanged().map(armor => armor.name),
      ],
      spellcastingAbility: 'cha',
      statImprove: [4, 8, 12, 16, 19],
      leveling: {
        1: {
          patron: {
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
          },
        },
        2: {
          traits: {
            eldritchInvocations: 'Invocaciones Sobrenaturales',
          },
        },
        3: {
          traits: {
            pactBoon: 'Don del Pacto',
          },
        },
        4: {
          traits: {
            abilityScoreImprovement: 'Mejora de Puntuación de Característica',
          },
        },
        6: {
          patron: {
            archfey: {
              traits: {
                mistyEscape: 'Escape Brumoso',
              },
            },
            fiend: {
              traits: {
                darkOnesOwnLuck: 'Suerte del Oscuro',
              },
            },
            greatOldOne: {
              traits: {
                entropicWard: 'Guardia Entrópica',
              },
            },
          },
        },
        10: {
          patron: {
            archfey: {
              traits: {
                beguilingDefenses: 'Defensas Seductoras',
              },
            },
            fiend: {
              traits: {
                fiendishResilience: 'Resistencia Diabólica',
              },
            },
            greatOldOne: {
              traits: {
                thoughtShield: 'Escudo de Pensamientos',
              },
            },
          },
        },
        11: {
          traits: {
            mysticArcanum: 'Arcanum Místico',
          },
        },
        14: {
          patron: {
            archfey: {
              traits: {
                darkDelirium: 'Delirio Oscuro',
              },
            },
            fiend: {
              traits: {
                hurlThroughHell: 'Lanzar a Través del Infierno',
              },
            },
            greatOldOne: {
              traits: {
                createThrall: 'Crear Esclavo',
              },
            },
          },
        },
        20: {
          traits: {
            eldritchMaster: 'Maestro Arcano',
          },
        },
      },
    },
    wizard: {
      initialHitPoints: 6,
      hitDice: '1d6',
      proficientStats: ['int', 'wis'],
      pickSkills: 2,
      skillsToPick: [
        'arcana',
        'insight',
        'history',
        'investigation',
        'medicine',
        'religion',
      ],
      proficientItems: [
        'quarterstaff',
        'lightCrossbow',
        'dagger',
        'dart',
        'sling',
      ],
      spellcastingAbility: 'int',
      statImprove: [4, 8, 12, 16, 19],
      leveling: {
        1: {
          traits: {
            arcaneRecovery: 'Recuperación Arcana',
          },
        },
        2: {
          traits: {
            arcaneTradition: 'Tradición Arcana',
          },
          arcaneTradition: {
            all: {
              traits: {
                schoolSavant: 'Erudito de',
              },
            },
            Abjuration: {
              traits: {
                arcaneWard: 'Guardián Arcano',
              },
            },
            Divination: {
              traits: {
                portent: 'Portento',
              },
            },
            Conjuration: {
              traits: {
                minorConjuration: 'Conjuración Menor',
              },
            },
            Enchantment: {
              traits: {
                hypnoticGaze: 'Mirada Hipnótica',
              },
            },
            Evocation: {
              traits: {
                sculptSpells: 'Esculpir Conjuros',
              },
            },
            Illusion: {
              traits: {
                improvedMinorIllusion: 'Ilusión Menor Mejorada',
              },
            },
            Necromancy: {
              traits: {
                grimHarvest: 'Cosecha Sombría',
              },
            },
            Transmutation: {
              traits: {
                minorAlchemy: 'Alquimia Menor',
              },
            },
          },
        },
        4: {
          traits: {
            abilityScoreImprovement: 'Mejora de Puntuación de Característica',
          },
        },
        6: {
          arcaneTradition: {
            Abjuration: {
              traits: {
                projectedWard: 'Guardián Proyectado',
              },
            },
            Divination: {
              traits: {
                expertDivination: 'Adivinación Experta',
              },
            },
            Conjuration: {
              traits: {
                benignTransportation: 'Transposición Benigna',
              },
            },
            Enchantment: {
              traits: {
                instinctiveCharm: 'Encantamiento Insintivo',
              },
            },
            Evocation: {
              traits: {
                potentCantrip: 'Truco Potente',
              },
            },
            Illusion: {
              traits: {
                malleableIllusions: 'Ilusiones Maleables',
              },
            },
            Necromancy: {
              traits: {
                undeadThralls: 'Esclavos Muertos Vivientes',
              },
            },
            Transmutation: {
              traits: {
                transmutersStone: 'Piedra del Transmutador',
              },
            },
          },
        },
        10: {
          arcaneTradition: {
            Abjuration: {
              traits: {
                improvedAbjuration: 'Abjuración Mejorada',
              },
            },
            Divination: {
              traits: {
                theThirdEye: 'El Tercer Ojo',
              },
            },
            Conjuration: {
              traits: {
                focusedConjuration: 'Conjuración Concentrada',
              },
            },
            Enchantment: {
              traits: {
                splitEnchantment: 'Encantamiento Dividido',
              },
            },
            Evocation: {
              traits: {
                empoweredEvocation: 'Fortalecer evocación',
              },
            },
            Illusion: {
              traits: {
                illusorySelf: 'Ser Ilusorio',
              },
            },
            Necromancy: {
              traits: {
                inuredToUndeath: 'Acostumbrado a los Muertos Vivientes',
              },
            },
            Transmutation: {
              traits: {
                shapechanger: 'Cambiaformas',
              },
            },
          },
        },
        14: {
          arcaneTradition: {
            Abjuration: {
              traits: {
                spellResistance: 'Resistencia a Conjuros',
              },
            },
            Conjuration: {
              traits: {
                durableSummons: 'Invocaciones Duraderas',
              },
            },
            Enchantment: {
              traits: {
                alterMemories: 'Alterar Recuerdos',
              },
            },
            Evocation: {
              traits: {
                overchannel: 'Sobrecargar',
              },
            },
            Illusion: {
              traits: {
                illusoryReality: 'Realidad Ilusoria',
              },
            },
            Necromancy: {
              traits: {
                commandUndead: 'Comandar Muertos Vivientes',
              },
            },
            Transmutation: {
              traits: {
                masterTransmuter: 'Maestro Transmutador',
              },
            },
          },
        },
        18: {
          traits: {
            spellMastery: 'Maestría de Conjuros',
          },
        },
        20: {
          traits: {
            signatureSpells: 'Conjuros de Firma',
          },
        },
      },
    },
  };
}

export function CHARACTER_CLASSES() {
  return Object.keys(CLASSES());
}

export function getInitialHitPoints(pc) {
  const { pClass } = pc;
  return CLASSES()[pClass].initialHitPoints + getExtraHitPoints(pc);
}

export function isProficientStat(stat, pClass) {
  return CLASSES()[pClass].proficientStats.includes(stat);
}

export function getExtraHitPoints(pc) {
  const {
    race,
    subrace,
    level,
    feats: { list: feats },
  } = pc;
  return (
    (RACES[race][subrace].extraHitPoints || 0) +
    getStatMod(getStat(pc, 'con')) * level +
    (isDraconicBloodline(pc) ? pc.level : 0) +
    (feats.includes('tough') ? level * 2 : 0)
  );
}

export function getMaxHitPoints(pc) {
  const { totalHitPoints } = pc;
  return totalHitPoints.reduce(
    (total, hpPerLevel) => total + hpPerLevel,
    getExtraHitPoints(pc)
  );
}

export function getHitDice(pc) {
  const { pClass, hitDice } = pc;
  return CLASSES()[pClass].hitDice.replace('1', hitDice);
}

export function getRemainingHitDice(pc) {
  const { pClass, remainingHitDice } = pc;
  return CLASSES()[pClass].hitDice.replace('1', remainingHitDice);
}

export function getFixedHealthForLevelUp(pc) {
  const { pClass } = pc;

  return parseInt(CLASSES()[pClass].hitDice.match(/1d(\d+)/)?.[1], 10) / 2 + 1;
}

export function getMaxHealthForLevelUp(pc) {
  const { pClass } = pc;
  const { hitDice } = CLASSES()[pClass];

  return parseInt(hitDice.slice(hitDice.indexOf('d') + 1), 10);
}

export function getRandomLevelUpHitPoints(pc) {
  const { pClass } = pc;
  const result = random.roll.processCommand(CLASSES()[pClass].hitDice);
  return random.roll.calculateResult(result);
}

export function statSavingThrow(stat, statValue, pClass, lvl) {
  const bonus = isProficientStat(stat, pClass) ? getProficiencyBonus(lvl) : 0;
  return getStatMod(statValue) + bonus;
}

export function translateClass(pClass) {
  switch (pClass) {
    case 'barbarian':
      return 'Bárbaro';
    case 'bard':
      return 'Bardo';
    case 'cleric':
      return 'Clérigo';
    case 'druid':
      return 'Druida';
    case 'fighter':
      return 'Guerrero';
    case 'monk':
      return 'Monje';
    case 'paladin':
      return 'Paladín';
    case 'ranger':
      return 'Explorador';
    case 'rogue':
      return 'Pícaro';
    case 'sorcerer':
      return 'Hechicero';
    case 'warlock':
      return 'Brujo';
    case 'wizard':
      return 'Mago';
    case 'ritual caster':
      return 'Conjurador ritual';

    default:
      return 'unknown class';
  }
}

export function STATS() {
  return ['str', 'dex', 'con', 'int', 'wis', 'cha'];
}

export function isStat(name) {
  return STATS().includes(name);
}

export function translateStat(stat) {
  switch (stat) {
    default:
    case 'str':
      return 'Fuerza';
    case 'dex':
      return 'Destreza';
    case 'con':
      return 'Constitución';
    case 'int':
      return 'Inteligencia';
    case 'wis':
      return 'Sabiduría';
    case 'cha':
      return 'Carisma';
  }
}

export function getStatRacialExtraPoints(stat, character) {
  const { race, subrace } = character;
  let mod = RACES[race][subrace].statMods?.[stat] || 0;

  return mod;
}

export function getStatMod(statValue) {
  return Math.floor(statValue / 2) - 5;
}

export function getProficiencyBonus(lvl) {
  if (lvl <= 4) return 2;
  if (lvl <= 8) return 3;
  if (lvl <= 13) return 4;
  if (lvl <= 16) return 5;
  return 6;
}

export function getStat(pc, statName) {
  const {
    stats = {},
    extraStats = {},
    halfElf: { extraStats: halfElfExtraStats = {} } = {},
    level,
    pClass,
  } = pc;

  let totalStat =
    (stats[statName] || 0) +
    (extraStats[statName] || 0) +
    (halfElfExtraStats[statName] || 0) +
    getExtraStatForFeat(pc, statName);

  if (
    level === 20 &&
    pClass === 'barbarian' &&
    (statName === 'str' || statName === 'con')
  ) {
    return totalStat + 4 > 24 ? 24 : totalStat + 4;
  }

  return totalStat > 20 ? 20 : totalStat;
}

export function getStats(pc) {
  return STATS().reduce(
    (allStats, statName) => ({
      ...allStats,
      [statName]: getStat(pc, statName),
    }),
    {}
  );
}

export function SKILLS() {
  return [
    { name: 'athletics', stat: 'str', abbr: 'atl' },
    { name: 'acrobatics', stat: 'dex', abbr: 'acr' },
    { name: 'sleight-of-hand', stat: 'dex', abbr: 'jdm' },
    { name: 'stealth', stat: 'dex', abbr: 'sig' },
    { name: 'arcana', stat: 'int', abbr: 'arc' },
    { name: 'history', stat: 'int', abbr: 'his' },
    { name: 'investigation', stat: 'int', abbr: 'inv' },
    { name: 'nature', stat: 'int', abbr: 'nat' },
    { name: 'religion', stat: 'int', abbr: 'rel' },
    { name: 'animal-handling', stat: 'wis', abbr: 'ani' },
    { name: 'insight', stat: 'wis', abbr: 'ppc' },
    { name: 'medicine', stat: 'wis', abbr: 'med' },
    { name: 'perception', stat: 'wis', abbr: 'pcp' },
    { name: 'survival', stat: 'wis', abbr: 'spr' },
    { name: 'deception', stat: 'cha', abbr: 'eng' },
    { name: 'intimidation', stat: 'cha', abbr: 'itm' },
    { name: 'performance', stat: 'cha', abbr: 'itr' },
    { name: 'persuasion', stat: 'cha', abbr: 'psn' },
  ];
}

export function translateSkill(skillName) {
  switch (skillName) {
    case 'athletics':
      return 'Atletismo';
    case 'acrobatics':
      return 'Acrobacias';
    case 'sleight-of-hand':
      return 'Juego de Manos';
    case 'stealth':
      return 'Sigilo';
    case 'arcana':
      return 'Arcano';
    case 'history':
      return 'Historia';
    case 'investigation':
      return 'Investigación';
    case 'nature':
      return 'Naturaleza';
    case 'religion':
      return 'Religión';
    case 'animal-handling':
      return 'Manejo de animales';
    case 'insight':
      return 'Averiguar intenciones';
    case 'medicine':
      return 'Medicina';
    case 'perception':
      return 'Percepción';
    case 'survival':
      return 'Supervivencia';
    case 'deception':
      return 'Engañar';
    case 'intimidation':
      return 'Intimidación';
    case 'performance':
      return 'Interpretación';
    case 'persuasion':
      return 'Persuasión';
    case 'thieves-tools':
      return 'Herramientas de Ladrón';
    default:
      return 'unknown skill';
  }
}

export function getSkills(pc) {
  return [
    ...new Set([
      ...(pc.skills || []),
      ...(pc.halfElf?.skills || []),
      ...(pc.classAttrs?.skills || []),
      ...(pc.background?.skills || []),
      ...getLoreCollegeProficiencies(pc),
      ...getInvocationsSkills(pc),
    ]),
  ];
}

export function isProficientSkill(pc, skillName) {
  return getSkills(pc).includes(skillName);
}

export function bonusForSkill(pc, skillName) {
  const { level } = pc;
  if (
    pc.classAttrs?.skills.includes(skillName) &&
    DIVINE_DOMAINS[getDivineDomain(pc)].specialSkillProficiencyBonus
  )
    return DIVINE_DOMAINS[getDivineDomain(pc)].specialSkillProficiencyBonus(
      getProficiencyBonus(pc.level)
    );

  if (getExpertSkills(pc).includes(skillName))
    return 2 * getProficiencyBonus(level);

  return getProficiencyBonus(level);
}

export function getExpertSkills(pc) {
  return pc.classAttrs?.expertSkills || [];
}

export function hasToSelectExpertSkills(pc) {
  const { pClass, level } = pc;

  if (pClass === 'bard')
    return (
      (level >= 10 && getExpertSkills(pc).length < 4) ||
      (level >= 3 && getExpertSkills(pc).length < 2)
    );

  return false;
}

export function getMaxExpertSkills(pc) {
  const { pClass, level } = pc;

  if (pClass === 'bard') {
    if (level >= 10) return 4;
    if (level >= 3) return 2;
    return 0;
  }

  return 0;
}

export function specialProficiencyBonus(pc) {
  return DIVINE_DOMAINS[getDivineDomain(pc)].specialSkillProficiencyBonus(
    getProficiencyBonus(pc.level)
  );
}

export function skillCheckBonus(pc, skillName) {
  const { pClass, level } = pc;

  const statName = SKILLS().find(skill => skill.name === skillName).stat;

  const bonus = isProficientSkill(pc, skillName)
    ? bonusForSkill(pc, skillName)
    : pClass === 'bard' && level >= 2
    ? Math.floor(bonusForSkill(pc, skillName) / 2)
    : 0;

  return getStatMod(getStat(pc, statName)) + bonus;
}

export function LANGUAGES() {
  return [
    'common',
    'dwarvish',
    'elvish',
    'giant',
    'gnomish',
    'goblin',
    'halfling',
    'orc',
  ];
}

export function EXOTIC_LANGUAGES() {
  return [
    'druidic',
    'thieves-cant',
    'abyssal',
    'celestial',
    'draconic',
    'deep-speech',
    'infernal',
    'primordial',
    'sylvan',
    'undercommon',
  ];
}

export function translateLanguage(language) {
  switch (language) {
    case 'common':
      return 'Común';
    case 'dwarvish':
      return 'Enano';
    case 'elvish':
      return 'Élfico';
    case 'giant':
      return 'Gigante';
    case 'gnomish':
      return 'Gnómico';
    case 'goblin':
      return 'Goblin';
    case 'halfling':
      return 'Mediano';
    case 'orc':
      return 'Orco';

    case 'druidic':
      return 'Druídico';
    case 'thieves-cant':
      return 'Jerga de Ladrones';
    case 'abyssal':
      return 'Abisal';
    case 'celestial':
      return 'Celestial';
    case 'draconic':
      return 'Dracónico';
    case 'deep-speech':
      return 'Habla Profunda';
    case 'infernal':
      return 'Infernal';
    case 'primordial':
      return 'Primordial';
    case 'sylvan':
      return 'Silvano';
    case 'undercommon':
      return 'Infracomún';
    default:
      return 'unknown language';
  }
}

export function setLanguages(race, subrace, pClass) {
  const languages = [...RACES[race][subrace].languages];
  if (pClass === 'druid') languages.push('druidic');
  if (pClass === 'rogue') languages.push('thieves-cant');

  return languages;
}

export const ALIGNMENTS = {
  ethics: ['L', 'Ne', 'C'],
  morals: ['G', 'Nm', 'E'],
};

// ENCUMBRANCES

// 4 * 10 * 0.45 = 18
// 6 * 10 * 0.45 = 27
// 8 * 10 * 0.45 = 36
// 10 * 10 * 0.45 = 45
// 12 * 10 * 0.45 = 54
// 14 * 10 * 0.45 = 63
// 16 * 10 * 0.45 = 72
// 18 * 10 * 0.45 = 81
// 20 * 10 * 0.45 = 90

// 4 * 15 * 0.45 = 27
// 6 * 15 * 0.45 = 40.5
// 8 * 15 * 0.45 = 54
// 10 * 15 * 0.45 = 67.5
// 12 * 15 * 0.45 = 81
// 14 * 15 * 0.45 = 94.5
// 16 * 15 * 0.45 = 108
// 18 * 15 * 0.45 = 121.5
// 20 * 15 * 0.45 = 135

export function getLightEncumbrance(pc) {
  const { pClass } = pc;

  if (pClass === 'barbarian') {
    const aspectOfTheBeastTotem = getAspectOfTheBeastTotem(pc);
    if (aspectOfTheBeastTotem === 'bear')
      return getStat(pc, 'str') * 10 * 0.45 * 2;
  }

  return getStat(pc, 'str') * 10 * 0.45;
}

export function getHeavyEncumbrance(pc) {
  const { pClass } = pc;

  if (pClass === 'barbarian') {
    const aspectOfTheBeastTotem = getAspectOfTheBeastTotem(pc);
    if (aspectOfTheBeastTotem === 'bear')
      return getStat(pc, 'str') * 15 * 0.45 * 2;
  }

  return getStat(pc, 'str') * 15 * 0.45;
}

export function getPassivePerception(pc) {
  return 10 + getStatMod(getStat(pc, 'wis'));
}

export function getItemProficiencies(pc) {
  const { race, subrace, pClass, level } = pc;

  const divineDomain = getDivineDomain(pc);
  const bardCollege = getBardCollege(pc);
  const studentOfWarTools = getStudentOfWar(pc);

  return [
    ...(RACES[race][subrace].proficientItems || []),
    ...(CLASSES()[pClass].proficientItems || []),
    ...(pc.proficientItems?.map(item => item.name) || []),
    ...((divineDomain ? DIVINE_DOMAINS[divineDomain]?.proficientItems : []) ||
      []),
    ...((bardCollege ? BARD_COLLEGES[bardCollege]?.proficientItems : []) || []),
    ...(studentOfWarTools ? [studentOfWarTools.name] : []),
    ...getRogueProficiencies(pc),
  ];
}

export function getItemArmorClass(pc, itemName) {
  return getItemBaseArmorClass(itemName) + getItemExtraArmorClass(itemName, pc);
}

export function getItemBaseArmorClass(itemName) {
  return getItem(itemName).properties.baseAC;
}

export function getItemExtraArmorClass(itemName, pc) {
  return getItem(itemName).properties.extraAC?.(getStats(pc)) || 0;
}

export function getArmorClass(pc) {
  const {
    items: {
      equipment: { armor: pArmor = {}, shield: pShield = {} },
    },
    pClass,
  } = pc;
  const armor = pArmor && getItem(pArmor);
  const shield = pShield && getItem(pShield);

  let extraAC = 0;

  if (pClass === 'barbarian' && !armor) {
    return 10 + getStatMod(getStat(pc, 'dex')) + getStatMod(getStat(pc, 'con'));
  }

  if (pClass === 'monk' && !armor && !shield) {
    return 10 + getStatMod(getStat(pc, 'dex')) + getStatMod(getStat(pc, 'wis'));
  }

  if (pClass === 'sorcerer' && isDraconicBloodline(pc) && !armor && !shield) {
    return 13 + getStatMod(getStat(pc, 'dex'));
  }

  if (pClass === 'fighter' && getFightingStyle(pc) === 'defense') {
    extraAC += 1;
  }

  if (pClass === 'ranger' && getRangerFightingStyle(pc) === 'defense') {
    extraAC += 1;
  }

  if (pClass === 'paladin' && getPaladinFightingStyle(pc) === 'defense') {
    extraAC += 1;
  }

  if (armor) return getItemArmorClass(pc, armor.name) + extraAC;
  else return 10 + getStatMod(getStat(pc, 'dex'));
}

export function getExtraArmorClass(pc) {
  const {
    items: {
      equipment: { shield: pShield = {} },
    },
    feats: { list: feats },
  } = pc;

  let extraAC = 0;

  const shield = getItem(pShield);
  if (shield)
    extraAC +=
      shield.properties.baseAC +
      (shield.properties.extraAC?.(getStats(pc)) || 0);

  if (feats.includes('defensiveDuelist'))
    extraAC += getProficiencyBonus(pc.level);

  return extraAC;
}

export function getAttackBonus(pc, weapons, weapon, weaponIndex) {
  const [statMod, magicBonus] = getDamageBonus(pc, weapons, weapon);

  const proficiencyBonus = isProficientWithWeapon(pc, weapon)
    ? getProficiencyBonus(pc.level)
    : 0;

  const classBonus = getAttackClassBonus(pc, weapons, weapon, weaponIndex);

  return { statMod, magicBonus, proficiencyBonus, classBonus };
}

export function getAttackExtraBonus(pc, weapon) {
  if (isRangedWeapon(weapon)) {
    const ammo = getCharacterAmmo(pc);
    return ammo
      .filter(ammoItem => weapon.ammoType === ammoItem.ammoType)
      .map(ammoItem => [ammoItem.name, ammoItem.bonus?.damage || 0])
      .filter(([_, bonus]) => !!bonus)
      .sort((a, b) => a[1] - b[1]);
  }

  return [];
}

export function getTotalAttackBonus(pc, weapons, weapon, weaponIndex) {
  return Object.values(getAttackBonus(pc, weapons, weapon, weaponIndex)).reduce(
    (a, b) => a + b
  );
}

export function getTotalAttackBonusWithExtras(
  pc,
  weapons,
  weapon,
  weaponIndex
) {
  const baseTotalBonus = getTotalAttackBonus(pc, weapons, weapon, weaponIndex);
  const extraBonus = getAttackExtraBonus(pc, weapon);
  return [[null, 0], ...extraBonus].map(([_, bonus]) => baseTotalBonus + bonus);
}

export function getAttackClassBonus(pc, weapons, weapon, weaponIndex) {
  const { pClass } = pc;
  return pClass === 'fighter'
    ? getAttackBonusForFightingStyles(pc, weapon, weaponIndex)
    : pClass === 'ranger'
    ? getAttackBonusForRangerFightingStyles(pc, weapons, weapon, weaponIndex)
    : 0;
}

export function getDamageDice(pc, w) {
  const weapon = getItem(w);
  const damage = weapon.damage[0];
  const { pClass } = pc;

  if (pClass !== 'monk') {
    return damage;
  }

  const martialArtsDice = getMartialArtsDice(pc);

  if (damage === '-') {
    return martialArtsDice;
  }

  if (isMonkWeapon(weapon)) {
    return `${damage} / ${martialArtsDice}`;
  }

  return damage;
}

function isTwoWeaponFighterSecondWeapon(pc, weapon, weaponIndex) {
  const { subtype, properties: { light } = {} } = weapon;
  return (
    getAllFightingStyles(pc).includes('two-weapon-fighting') &&
    weaponIndex === 1 &&
    subtype === 'simpleMelee' &&
    light
  );
}

export function getDamageBonus(pc, weapons, w, weaponIndex) {
  const { pClass } = pc;
  const weapon = getItem(w);
  const {
    subtype,
    properties: { finesse, light, twoHanded } = {},
    bonus,
    identified,
  } = weapon;
  let statMod = 0;

  const strMod = getStatMod(getStat(pc, 'str'));
  const dexMod = getStatMod(getStat(pc, 'dex'));

  const magicBonus = bonus?.damage && identified ? bonus.damage : 0;

  if (
    weaponIndex === 1 &&
    subtype === 'simpleMelee' &&
    light &&
    !isTwoWeaponFighterSecondWeapon(pc, weapon, weaponIndex)
  ) {
    return [0, magicBonus];
  }

  if (finesse) statMod = strMod > dexMod ? strMod : dexMod;
  else if (pClass === 'monk' && isMonkWeapon(weapon))
    statMod = strMod > dexMod ? strMod : dexMod;
  else if (subtype === 'simpleMelee' || subtype === 'martialMelee')
    statMod = strMod;
  else if (subtype === 'simpleRanged' || subtype === 'martialRanged')
    statMod = dexMod;

  if (
    ((pClass === 'fighter' && getAllFightingStyles(pc).includes('dueling')) ||
      (pClass === 'ranger' && getRangerFightingStyle(pc) === 'dueling') ||
      (pClass === 'palading' && getPaladinFightingStyle(pc) === 'dueling')) &&
    isMeleeWeapon(w) &&
    !twoHanded &&
    (!weapons?.[0] || weapons[0].name === null)
  ) {
    statMod += 2;
  }

  return [statMod, magicBonus];
}

export function translateSavingThrowStatus(status) {
  if (status === 'advantage') return 'Ventaja';
  if (status === 'disadvantage') return 'Desventaja';
  return 'unknown saving throw status';
}

function getLevelingTraits(pc) {
  const { pClass, level } = pc;

  const levelingTraits = Object.entries(
    CLASSES()[pClass]?.leveling || {}
  ).reduce(
    (levelingTraits, [traitLevel, levelSkills]) => ({
      ...levelingTraits,
      ...(parseInt(traitLevel, 10) <= level ? levelSkills.traits : {}),
    }),
    {}
  );

  delete levelingTraits.channelDivinity;

  return levelingTraits;
}

export function getTraits(pc) {
  const { race, subrace, pClass, background = {} } = pc;

  return Object.entries({
    ...RACES[race][subrace].traits,
    ...(BACKGROUNDS[background.name]?.traits || {}),
    ...CLASSES()[pClass].traits,
    ...getLevelingTraits(pc),
    ...getFeatTraits(pc),
  }).filter(([traitName, trait]) => displayTrait(traitName, trait, pc));
}

export function translateMoney(money) {
  if (!money) return '-';

  if (typeof money === 'number') {
    money = parseGoldToMoney(money);
  }

  return Object.entries(money)
    .map(([coin, amount]) => {
      if (amount && coin === 'pp') return amount + ' Platino';
      if (amount && coin === 'gp') return amount + ' Oro';
      if (amount && coin === 'ep') return amount + ' Electrum';
      if (amount && coin === 'sp') return amount + ' Plata';
      if (amount && coin === 'cp') return amount + ' Cobre';
    })
    .filter(v => v)
    .join(', ');
}

function putItemInInventory(inventory, pItem) {
  const item = getItem(pItem);

  if (item.type === 'weapon') {
    if (inventory.weapons.length < 3) {
      inventory.weapons.push(pItem);
    } else {
      inventory.treasure.weapons.push(pItem);
    }
  } else if (item.subtype === 'shield') {
    if (!inventory.equipment.shield) {
      inventory.equipment.shield = pItem;
    } else {
      inventory.treasure.armors.push(pItem);
    }
  } else if (item.type === 'armor') {
    if (!inventory.equipment.armor) {
      inventory.equipment.armor = pItem;
    } else {
      inventory.treasure.armors.push(pItem);
    }
  } else if (item.subtype === 'ammunition') {
    inventory.equipment.ammunition.push(pItem);
  } else if (canBeAlwaysEquipped(item)) {
    inventory.equipment.others.push(pItem);
  } else if (item.custom) {
    inventory.treasure.custom.push(pItem);
  } else {
    inventory.treasure.others.push(pItem);
  }

  return inventory;
}

export function distributeItems(pc, items) {
  const explodedItems = explodeEquipment(items);
  const {
    items: { weapons: pWeapons, equipment: pEquipment, treasure: pTreasure },
  } = pc;

  const distributedItems = explodedItems.reduce(
    (distributedItems, pItem) => {
      let newDistributedItems = distributedItems;
      for (let i = 1; i <= pItem.amount; i++) {
        newDistributedItems = putItemInInventory(newDistributedItems, pItem);
      }
      return newDistributedItems;
    },
    {
      weapons: [...pWeapons],
      equipment: {
        armor: pEquipment.armor,
        shield: pEquipment.shield,
        ammunition: [...pEquipment.ammunition],
        others: [...pEquipment.others],
      },
      treasure: {
        weapons: [...pTreasure.weapons],
        armors: [...pTreasure.armors],
        others: [...pTreasure.others],
        custom: [...pTreasure.custom],
      },
    }
  );

  distributedItems.equipment.ammunition = unifyEquipment(
    distributedItems.equipment.ammunition
  );
  distributedItems.equipment.others = unifyEquipment(
    distributedItems.equipment.others
  );
  distributedItems.treasure.weapons = unifyEquipment(
    distributedItems.treasure.weapons
  );
  distributedItems.treasure.armors = unifyEquipment(
    distributedItems.treasure.armors
  );
  distributedItems.treasure.others = unifyEquipment(
    distributedItems.treasure.others
  );
  distributedItems.treasure.custom = unifyEquipment(
    distributedItems.treasure.custom
  );

  return distributedItems;
}

export function hasExtraWeapons(pc) {
  const {
    items: { treasure },
  } = pc;

  return treasure.weapons.length !== 0;
}

export function getExtraWeapons(pc) {
  const {
    items: { treasure },
  } = pc;

  return treasure.weapons;
}

export function getEquipmentWeight(pc) {
  return (
    Object.values(pc.items).reduce((encumbrance, section) => {
      return (
        encumbrance +
        Object.entries(section)
          .filter(([subsectionName]) => subsectionName !== 'bagOfHolding')
          .reduce(
            (sectionEncumbrance, [subsectionName, subsectionContents]) => {
              return (
                sectionEncumbrance +
                (Array.isArray(subsectionContents)
                  ? subsectionContents.reduce((subsectionEncumbrance, item) => {
                      return (
                        subsectionEncumbrance +
                        (getItem(item)?.weight || 0) * (item?.amount || 1)
                      );
                    }, 0)
                  : (getItem(subsectionContents)?.weight || 0) *
                    (subsectionContents?.amount || 1))
              );
            },
            0
          )
      );
    }, 0) +
    getPackItems(pc.pack).reduce(
      (packEncumbrance, packItem) => packEncumbrance + (packItem.weight || 0),
      0
    )
  );
}

const EXP_FOR_LEVEL = [
  /*  1 */ -1,
  /*  2 */ 300,
  /*  3 */ 900,
  /*  4 */ 2700,
  /*  5 */ 6500,
  /*  6 */ 14000,
  /*  7 */ 23000,
  /*  8 */ 34000,
  /*  9 */ 48000,
  /* 10 */ 64000,
  /* 11 */ 85000,
  /* 12 */ 100000,
  /* 13 */ 120000,
  /* 14 */ 140000,
  /* 15 */ 165000,
  /* 16 */ 195000,
  /* 17 */ 225000,
  /* 18 */ 265000,
  /* 19 */ 305000,
  /* 20 */ 355000,
  /*    */ Infinity,
];

export function getLevelByXp(exp) {
  return EXP_FOR_LEVEL.findIndex(xp => xp > exp);
}

export function getSkillExplanationText({
  skillName,
  skill,
  pc,
  submit,
  closeModal,
  skillIndex,
  position,
  isDm,
  actions,
}) {
  const skillExplanationGetters = {
    ...SKILLS_EXPLANATION,
    ...BACKGROUND_SKILLS_EXPLANATION,
    ...BARBARIAN_SKILLS_EXPLANATION,
    ...BARD_SKILLS_EXPLANATION,
    ...WARLOCK_SKILLS_EXPLANATION,
    ...CLERIC_SKILLS_EXPLANATION,
    ...DRUID_SKILLS_EXPLANATION,
    ...RANGER_SKILLS_EXPLANATION,
    ...FIGHTER_SKILLS_EXPLANATION,
    ...SORCERER_SKILLS_EXPLANATION,
    ...WIZARD_SKILLS_EXPLANATION,
    ...MONK_SKILLS_EXPLANATION,
    ...elementalDisciplineExplanation(skillName),
    ...PALADIN_SKILLS_EXPLANATION,
    ...ROGUE_SKILLS_EXPLANATION,
    ...METAMAGIC_EXPLANATION_GETTERS,
  };

  const getExplanationArguments = [
    skill,
    pc,
    submit,
    closeModal,
    skillIndex,
    position,
    isDm,
    actions,
  ];

  if (
    Object.keys(skillExplanationGetters).find(key =>
      key.includes(skillName + '_text')
    )
  ) {
    return Object.keys(skillExplanationGetters)
      .filter(key => key.includes(skillName + '_text'))
      .reduce(
        (text, key) =>
          getChildrenText(
            text,
            skillExplanationGetters[key](...getExplanationArguments)
          ),
        ''
      );
  }

  return (
    getChildrenText(
      '',
      skillExplanationGetters[skillName]?.(...getExplanationArguments)
    ) || skill
  );
}

export function getSkillExplanation({
  skillName,
  skill,
  pc,
  submit,
  closeModal,
  skillIndex,
  position,
  isDm,
  actions,
  openModal,
  selectedAction,
}) {
  return (
    {
      ...SKILLS_EXPLANATION,
      ...BACKGROUND_SKILLS_EXPLANATION,
      ...BARBARIAN_SKILLS_EXPLANATION,
      ...BARD_SKILLS_EXPLANATION,
      ...WARLOCK_SKILLS_EXPLANATION,
      ...CLERIC_SKILLS_EXPLANATION,
      ...DRUID_SKILLS_EXPLANATION,
      ...RANGER_SKILLS_EXPLANATION,
      ...FIGHTER_SKILLS_EXPLANATION,
      ...SORCERER_SKILLS_EXPLANATION,
      ...WIZARD_SKILLS_EXPLANATION,
      ...MONK_SKILLS_EXPLANATION,
      ...elementalDisciplineExplanation(skillName),
      ...PALADIN_SKILLS_EXPLANATION,
      ...ROGUE_SKILLS_EXPLANATION,
      ...METAMAGIC_EXPLANATION_GETTERS,
      ...FEATS_EXPLANATION,
    }[skillName]?.(
      skill,
      pc,
      submit,
      closeModal,
      skillIndex,
      position,
      isDm,
      actions,
      openModal,
      selectedAction
    ) || skill
  );
}

export function getTraitActions() {
  return {
    ...bardTraitActions,
    ...paladinTraitActions,
    ...rangerTraitActions,
    ...sorcererTraitActions,
    ...featsActions,
  };
}

export function hasToImproveAbilityScore(pc) {
  return getPendingImproveAbilityLevels(pc).length > 0;
}

export function getPendingImproveAbilityLevels(pc) {
  const { level, improvedStatsLevels = [], pClass } = pc;

  const improveAtLevels = CLASSES()[pClass].statImprove.filter(
    lvl => lvl <= level
  );

  return improveAtLevels.filter(lvl => !improvedStatsLevels.includes(lvl));
}

export function getSpeed(pc) {
  const { speed, pClass, level, items } = pc;

  if (pClass === 'barbarian' && level >= 5 && !items.equipment?.armor)
    return speed + 3;

  if (pClass === 'monk') return speed + getExtraUnarmoredMovement(pc);

  return speed;
}

export function hasLeveledUp(pc) {
  const { level, hitDice } = pc;
  return level > hitDice;
}

export function getChannelDivinityTraits(pc) {
  const { level, pClass } = pc;

  let channelDivinitySource;
  const divineDomain = getDivineDomain(pc);
  const sacredOath = getSacredOath(pc);
  channelDivinitySource = divineDomain || sacredOath;

  return Object.entries(
    Object.entries(CLASSES()[pClass].leveling).reduce(
      (levelingTraits, [traitLevel, levelSkills]) => ({
        ...levelingTraits,
        ...(parseInt(traitLevel, 10) <= level
          ? levelSkills.channelDivinity?.traits || {}
          : {}),
        ...(parseInt(traitLevel, 10) <= level
          ? levelSkills.channelDivinity?.[channelDivinitySource]?.traits || {}
          : {}),
      }),
      {}
    )
  );
}

export const BASE_CHARACTER = {
  id: '1',
  name: 'Base Character',
  race: 'human',
  subrace: 'subrace',
  size: 'M',
  speed: 10,
  pClass: 'fighter',
  level: 1,
  exp: 0,
  totalHitPoints: [8],
  hitPoints: 8,
  hitDice: 1,
  remainingHitDice: 1,
  stats: {
    str: 10,
    dex: 10,
    con: 10,
    int: 10,
    wis: 10,
    cha: 10,
  },
  languages: ['common'],
  money: {},
  classAttrs: {
    skills: [],
  },
  items: {
    weapons: [],
    equipment: {
      armor: null,
      shield: null,
      ammunition: [],
      others: [],
    },
    treasure: {
      weapons: [],
      armors: [],
      others: [],
      custom: [],
    },
  },
};

export const ALL_TRAITS = Object.entries(
  Object.values(CLASSES()).reduce(
    (traitDictionary, classValues) => ({
      ...traitDictionary,
      ...Object.values(classValues.leveling).reduce(
        (classTraitDictionary, levelTraits) => ({
          ...classTraitDictionary,
          ...levelTraits.traits,
          ...Object.entries(levelTraits).reduce(
            (levelTraitDictionary, [traitKey, traitValue]) => ({
              ...levelTraitDictionary,
              ...(traitKey !== 'traits'
                ? Object.values(traitValue).reduce(
                    (specialtyTraitDictionary, specialtyValue) => ({
                      ...specialtyTraitDictionary,
                      ...specialtyValue.traits,
                    }),
                    {}
                  )
                : {}),
            }),
            {}
          ),
        }),
        {}
      ),
    }),
    {}
  )
)
  .concat(
    Object.values(ELEMENTAL_DISCIPLINES).reduce(
      (elementalDisciplinesTraits, elementalDiscipline) => [
        ...elementalDisciplinesTraits,
        [
          elementalDiscipline.name,
          translateElementalDisciplines(elementalDiscipline.name),
        ],
      ],
      []
    )
  )
  .concat(
    Object.entries(METAMAGIC_EXPLANATION).map(([name]) => [name, t(name)])
  );

export function isTrait(traitName) {
  return !!ALL_TRAITS.find(t => t[0] === traitName);
}

export function isTraitSeen(pc, traitName) {
  if (pc.id === BASE_CHARACTER.id) {
    return true;
  }

  return isTrait(traitName) || isFeat(traitName)
    ? pc.classAttrs.seen?.includes(traitName)
    : true;
}

export function canCopySpells(pc) {
  const { pClass } = pc;
  const boon = getPactBoon(pc);
  const invocations = getInvocations(pc);

  return !!(
    (pClass === 'warlock' &&
      boon === 'pactOfTheTome' &&
      invocations.includes('bookOfAncientSecrets')) ||
    pClass === 'wizard'
  );
}

export function isProficientWithWeapon(pc, weapon) {
  const itemProficiencies = getItemProficiencies(pc);
  return (
    itemProficiencies.includes(weapon.name) ||
    itemProficiencies.includes(weapon.subcategory)
  );
}

export function getExperience(pc) {
  return Math.floor(pc.exp);
}

export function getCharacterAmmo(pc) {
  return pc.items.equipment.ammunition.map(getItem);
}

export function isHighElf(pc) {
  return pc.race === 'elf' && pc.subrace === 'high';
}

export function isDrow(pc) {
  return pc.race === 'elf' && pc.subrace === 'drow';
}

export function getInitiativeBonus(pc) {
  let initiative = getStatMod(getStat(pc, 'dex'));
  pc.feats?.list?.forEach(feat => {
    if (getFeat(feat)?.bonus?.initiative) {
      initiative += getFeat(feat)?.bonus?.initiative;
    }
  });
  return initiative;
}
