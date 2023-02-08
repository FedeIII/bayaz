import { mongoose } from '~/services/db.server';
import { RACES, STATS, SKILLS, DIVINE_DOMAINS } from '~/utils/characters';

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
  skills: [{ type: String, enum: SKILLS.map(s => s.name) }],
});

const halfElfSchema = new mongoose.Schema({
  skills: [{ type: String, enum: SKILLS.map(s => s.name) }],
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
      'palading',
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
  const updatedPc = await Pc.findOneAndUpdate({ name: pc.name }, pc).exec();

  return updatedPc;
}
