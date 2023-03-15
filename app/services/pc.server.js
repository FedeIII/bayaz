import { mongoose } from '~/services/db.server';
import {
  RACES,
  STATS,
  SKILLS,
  LANGUAGES,
  EXOTIC_LANGUAGES,
  CLASSES,
  getLevelByXp,
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
import { getItem, pcItem } from '~/domain/equipment/equipment';
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
  playerName: String,
  personality: String,
  ideals: String,
  bonds: String,
  flaws: String,
  eyes: String,
  skin: String,
  hair: String,
  allies: String,
  backstory: String,
  extraTraits1: String,
  extraTraits2: String,
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
  pack: String,
  proficientItems: [itemSchema],
  freeText: freeTextSchema,
  spells: [spellSchema],
  preparedSpells: [spellSchema],
  spellSlots: [Number],
  totalSpells: Number,
  money: [Number, Number, Number],
});

function weaponLimit(val) {
  return val.length <= 3;
}

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
  });

  return newPc;
}

export async function updatePc(pcAttrs) {
  const updatedPc = await Pc.findOneAndUpdate(
    { name: pcAttrs.name },
    { $set: pcAttrs },
    { new: true }
  ).exec();

  return updatedPc;
}

export async function addXp(pcName, xp) {
  let updatedPc = await Pc.findOneAndUpdate(
    { name: pcName },
    { $inc: { exp: xp } },
    { new: true }
  ).exec();

  updatedPc = await Pc.findOneAndUpdate(
    { name: pcName },
    { level: getLevelByXp(updatedPc.exp) },
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

export async function equipWeapons(name, oldWeaponName, newWeaponName) {
  await Pc.findOneAndUpdate(
    { name, 'items.weapons.name': oldWeaponName },
    { $set: { 'items.weapons.$': getItem(newWeaponName) } },
    { new: true }
  );

  const updatedPc = await Pc.findOneAndUpdate(
    { name, 'items.treasure.weapons.name': newWeaponName },
    { $set: { 'items.treasure.weapons.$': getItem(oldWeaponName) } },
    { new: true }
  );

  return updatedPc;
}

export async function equipWeaponInSlot(name, weaponName, slot) {
  const pc = await getPc(name);
  const {
    items: { weapons },
  } = pc;
  const weaponInSlot = weapons[slot];

  await Pc.findOneAndUpdate(
    { name },
    { $set: { [`items.weapons.${slot}`]: getItem(weaponName) } },
    { new: true }
  );

  if (weaponInSlot) {
    await Pc.findOneAndUpdate(
      { name },
      { $push: { 'items.treasure.weapons': getItem(weaponInSlot.name) } },
      { new: true }
    );

    await Pc.findOneAndUpdate(
      { name },
      { $pull: { 'items.treasure.weapons': { name: weaponName } } },
      { new: true }
    );
  }
}

export async function switchWeapons(name, weaponName, destinationSlot) {
  const pc = await getPc(name);
  const weapons = pc.items.weapons.slice();

  const originSlot = weapons.findIndex(weapon => weapon.name === weaponName);
  const selectedWeapon = getItem(weaponName);
  const replacedWeapon = weapons[destinationSlot];

  weapons[originSlot] = replacedWeapon;
  weapons[destinationSlot] = selectedWeapon;

  return updatePc({
    name,
    items: {
      ...pc.items,
      weapons,
    },
  });
}

export async function switchArmor(name, armorName) {
  const pc = await getPc(name);

  const { armor: pArmor } = pc.items.equipment;
  const equipment = {
    ...pc.items.equipment,
    armor: pcItem(armorName),
  };
  const treasureArmors = pc.items.treasure.armors.slice();
  const armorIndex = treasureArmors.findIndex(
    armor => armor.name === armorName
  );
  if (armorIndex >= 0) treasureArmors[armorIndex] = pArmor;

  return updatePc({
    name,
    items: {
      ...pc.items,
      equipment,
      treasure: {
        ...pc.items.treasure,
        armors: treasureArmors,
      },
    },
  });
}
