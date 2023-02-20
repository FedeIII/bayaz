import { mongoose } from '~/services/db.server';
import {
  RACES,
  STATS,
  SKILLS,
  LANGUAGES,
  EXOTIC_LANGUAGES,
  CLASSES,
} from '~/domain/characters';
import { SORCERER_ORIGIN, DRAGON_ANCESTORS } from '~/domain/sorcerer';
import { FIGHTING_STYLES } from '~/domain/fighter';
import {
  FAVORED_ENEMIES,
  FAVORED_ENEMIES_HUMANOIDS,
  FAVORED_TERRAINS,
  RANGER_ARCHETYPES,
} from '~/domain/ranger';
import { DIVINE_DOMAINS } from '~/domain/cleric';
import { unifyEquipment } from '~/domain/equipment/equipment';
import {
  ALL_SPELLS,
  getExtraPreparedSpells,
  getMaxPreparedSpells,
} from '~/domain/spells/spells';
import {
  BACKGROUNDS,
  ARTISAN_GUILDS,
  ENTERTAINER_ROUTINES,
  CHARLATAN_FAVORITE_SCHEMES,
  CRIMINAL_SPECIALTY,
  OUTLANDER_ORIGIN,
  SAGE_SPECIALTY,
  SOLDIER_SPECIALTY,
} from '~/domain/backgrounds';

const statsSchema = new mongoose.Schema({
  ...STATS.reduce(
    (stats, statName) => ({
      ...stats,
      [statName]: Number,
    }),
    {}
  ),
});

const classAttrsSchema = new mongoose.Schema({
  primalPath: {
    type: String,
    enum: ['berserker', 'totem-warrior'],
  },
  divineDomain: {
    type: String,
    enum: Object.keys(DIVINE_DOMAINS),
  },
  favoredEnemies: [
    { type: String, enum: [...FAVORED_ENEMIES, ...FAVORED_ENEMIES_HUMANOIDS] },
  ],
  favoredTerrains: [{ type: String, enum: FAVORED_TERRAINS }],
  rangerArchetype: { type: String, enum: RANGER_ARCHETYPES },
  fightingStyles: [{ type: String, enum: FIGHTING_STYLES }],
  sorcererOrigin: { type: String, enum: Object.keys(SORCERER_ORIGIN) },
  dragonAncestor: { type: String, enum: DRAGON_ANCESTORS },
  expertSkills: [
    { type: String, enum: [...SKILLS.map(s => s.name), 'thieves-tools'] },
  ],
  skills: [{ type: String, enum: SKILLS.map(s => s.name) }],
});

const halfElfSchema = new mongoose.Schema({
  extraStats: statsSchema,
  skills: [{ type: String, enum: SKILLS.map(s => s.name) }],
});

const backgroundSchema = mongoose.Schema({
  name: { type: String, enum: Object.keys(BACKGROUNDS) },
  skills: [{ type: String, enum: SKILLS.map(s => s.name) }],
  guild: { type: String, enum: ARTISAN_GUILDS },
  routines: [{ type: String, enum: ENTERTAINER_ROUTINES }],
  favoriteScheme: { type: String, enum: CHARLATAN_FAVORITE_SCHEMES },
  criminalSpecialty: { type: String, enum: CRIMINAL_SPECIALTY },
  outlanderOrigin: { type: String, enum: OUTLANDER_ORIGIN },
  sageSpecialty: { type: String, enum: SAGE_SPECIALTY },
  soldierSpecialty: { type: String, enum: SOLDIER_SPECIALTY },
});

const itemSchema = new mongoose.Schema({
  name: String,
  amount: Number,
});

const freeTextSchema = new mongoose.Schema({
  personality: String,
  ideals: String,
  bonds: String,
  flaws: String,
});

const spellSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ALL_SPELLS.map(spell => spell.name),
    required: true,
  },
  type: { type: String, enum: Object.keys(CLASSES) },
  subtype: String,
});

const pcSchema = new mongoose.Schema({
  name: String,
  race: {
    type: String,
    enum: ['dwarf', 'elf', 'halfling', 'human', 'half-elf', 'half-orc'],
  },
  subrace: {
    type: String,
    enum: [
      'hills',
      'mountains',
      'high',
      'wood',
      'drow',
      'lightfoot',
      'stout',
      'subrace',
    ],
  },
  age: Number,
  height: Number,
  weight: Number,
  size: {
    type: String,
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
  speed: Number,
  pClass: {
    type: String,
    enum: [
      'barbarian',
      'bard',
      'cleric',
      'druid',
      'fighter',
      'monk',
      'paladin',
      'ranger',
      'rogue',
      'sorcerer',
      'warlock',
      'wizard',
    ],
  },
  level: Number,
  exp: Number,
  maxHitPoints: Number,
  hitPoints: Number,
  skills: [{ type: String, enum: SKILLS.map(s => s.name) }],
  halfElf: halfElfSchema,
  classAttrs: classAttrsSchema,
  stats: statsSchema,
  extraStats: statsSchema,
  languages: [{ type: String, enum: [...LANGUAGES, ...EXOTIC_LANGUAGES] }],
  background: backgroundSchema,
  equipment: [itemSchema],
  pack: String,
  proficientItems: [itemSchema],
  freeText: freeTextSchema,
  spells: [spellSchema],
  preparedSpells: [spellSchema],
  spellSlots: [Number],
  totalSpells: Number,
  money: [Number, Number, Number],
});

const Pc = mongoose.models.Pc || mongoose.model('Pc', pcSchema);

export async function getPcs() {
  const pcs = await Pc.find();
  return pcs;
}

export async function getPc(name) {
  const pc = await Pc.findOne({ name }).exec();
  return pc;
}

export async function createPc(pc) {
  const { race, subrace } = pc;

  const newPc = await Pc.create({
    ...pc,
    size: RACES[race][subrace].size,
    speed: RACES[race][subrace].speed,
  });

  return newPc;
}

export async function updatePc(pc) {
  if (pc.equipment) pc.equipment = unifyEquipment(pc.equipment);

  const updatedPc = await Pc.findOneAndUpdate(
    { name: pc.name },
    { $set: pc },
    { new: true }
  ).exec();

  return updatedPc;
}

export async function addPreparedSpell(name, spell) {
  const pc = await getPc(name);
  const maxPreparedSpells = getMaxPreparedSpells(pc);
  if (pc.preparedSpells.length >= maxPreparedSpells) {
    return pc;
  }

  const updatedPc = await Pc.updateOne(
    { name },
    {
      $push: {
        preparedSpells: spell,
      },
    }
  ).exec();

  return updatedPc;
}

export async function deletePreparedSpell(name, spell) {
  const pc = await getPc(name);
  const extraPreparedSpells = getExtraPreparedSpells(pc);
  if (extraPreparedSpells.map(s => s.name).includes(spell.name)) {
    return pc;
  }

  const updatedPc = await Pc.findOneAndUpdate(
    { name },
    { $pull: { preparedSpells: spell } },
    { new: true }
  ).exec();

  return updatedPc;
}
