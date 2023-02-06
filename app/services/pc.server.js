import { mongoose } from '~/services/db.server';
import { RACES, STATS } from '~/utils/characters';

const statsSchema = new mongoose.Schema({
  ...STATS.reduce(
    (stats, statName) => ({
      ...stats,
      [statName]: Number,
    }),
    {}
  ),
});

const barbarianSchema = new mongoose.Schema({
  primalPath: {
    type: String,
    enum: ['berserker', 'totem-warrior'],
  },
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
  hitPoints: Number,
  barbarian: barbarianSchema,
  stats: statsSchema,
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
  const { name, race, subrace, age, height, weight, pClass } = pc;

  const newPc = await Pc.create({
    name,
    race,
    subrace,
    age,
    height,
    weight,
    size: RACES[race][subrace].size,
    speed: RACES[race][subrace].speed,
    pClass,
  });

  return newPc;
}

export async function updatePc(pc) {
  const updatedPc = await Pc.findOneAndUpdate({ name: pc.name }, pc).exec();

  return updatedPc;
}
