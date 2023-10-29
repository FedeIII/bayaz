import { mongoose } from '~/services/db.server';
import {
  RACES,
  STATS,
  SKILLS,
  LANGUAGES,
  EXOTIC_LANGUAGES,
} from '~/domain/characters';
import {
  BACKGROUNDS,
  ARTISAN_GUILDS,
  ENTERTAINER_ROUTINES,
  CHARLATAN_FAVORITE_SCHEMES,
  CRIMINAL_SPECIALTY,
  OUTLANDER_ORIGIN,
  SAGE_SPECIALTY,
  SOLDIER_SPECIALTY,
} from '~/domain/backgrounds/backgrounds';
import { NPC_RACES_LIST } from '~/domain/npc/npc';

const statsSchema = new mongoose.Schema({
  ...STATS.reduce(
    (stats, statName) => ({
      ...stats,
      [statName]: Number,
    }),
    {}
  ),
});

const backgroundSchema = new mongoose.Schema({
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

const freeTextSchema = new mongoose.Schema({
  roleplay: String,
  looks: String,
  behavior: String,
  ideals: String,
  bonds: String,
  flaws: String,
});

const skillSchema = new mongoose.Schema({
  name: { type: String, enum: SKILLS.map(s => s.name) },
  value: Number,
});

const abilitySchema = new mongoose.Schema({
  name: String,
  description: String,
});

const quickNpcSchema = new mongoose.Schema({
  // BASIC ATTRS
  name: String,
  race: {
    type: String,
    enum: NPC_RACES_LIST,
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
  alignment: [
    { type: String, enum: ['L', 'N', 'C'] },
    { type: String, enum: ['G', 'N', 'E'] },
  ],
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
  AC: String,
  gender: { type: String, enum: ['Male', 'Female'] },
  level: Number,
  background: backgroundSchema,
  npc: Boolean,

  // STATS
  stats: statsSchema,

  // SKILLS
  skills: [skillSchema],
  senses: [String],

  // COMBAT ATTRS
  speed: Number,
  totalHitPoints: [Number],
  hitPoints: Number,
  temporaryHitPoints: Number,
  abilities: [abilitySchema],
  actions: [abilitySchema],
  reactions: [abilitySchema],
  legendaryActions: [abilitySchema],

  // EQUIPMENT
  items: {
    weapons: {
      type: [itemSchema],
      validate: [weaponLimit, '{PATH} exceeds the limit of 3'],
    },
    equipment: {
      armor: itemSchema,
      shield: itemSchema,
      ammunition: [itemSchema],
      others: [itemSchema],
    },
    treasure: {
      weapons: [itemSchema],
      armors: [itemSchema],
      others: [itemSchema],
    },
  },
  money: [Number, Number, Number],

  // FREETEXT
  freeText: freeTextSchema,

  // PROFICIENCIES & LANGUAGES
  languages: [{ type: String, enum: [...LANGUAGES, ...EXOTIC_LANGUAGES] }],

  // ADDITIONAL FEATURES
  age: Number,
  height: Number,
  weight: Number,
  size: {
    type: String,
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },

  // SPELLS
  spells: [spellSchema],
});

function weaponLimit(val) {
  return val.length <= 3;
}

const QuickNpc =
  mongoose.models.QuickNpc || mongoose.model('Npc', quickNpcSchema);

export async function getAllQuickNpcs() {
  const npcs = await QuickNpc.find();
  return npcs;
}

export async function getQuickNpc(name) {
  const npc = await QuickNpc.findOne({ name }).exec();
  return npc;
}

export async function createQuickNpc(npc) {
  const { race, subrace } = npc;

  const newNpc = await Pc.create({
    size: RACES[race][subrace].size,
    speed: RACES[race][subrace].speed,
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
      },
    },
    ...npc,
  });

  return newNpc;
}

export async function updateQuickNpc(attrs) {
  const npc = await QuickNpc.findOneAndUpdate(
    { name: attrs.name },
    { $set: attrs },
    { new: true }
  ).exec();

  return npc;
}
