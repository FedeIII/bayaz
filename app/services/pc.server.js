import { v4 as uuid } from 'uuid';
import { mongoose } from '~/services/db.server';
import {
  RACES,
  STATS,
  SKILLS,
  LANGUAGES,
  EXOTIC_LANGUAGES,
  getLevelByXp,
  getMaxHitPoints,
  CHARACTER_CLASSES,
  CHARACTER_RACES,
  isTrait,
} from '~/domain/characters';
import {
  DRAGON_ANCESTORS,
  METAMAGIC,
  SORCERER_ORIGINS,
} from '~/domain/classes/sorcerer/sorcerer';
import {
  COMBAT_SUPERIORITY_MANEUVERS,
  FIGHTING_STYLES,
  MARTIAL_ARCHETYPES,
} from '~/domain/classes/fighter/fighter';
import {
  FAVORED_ENEMIES,
  FAVORED_ENEMIES_HUMANOIDS,
  FAVORED_TERRAINS,
  HUNTERS_PREY,
  HUNTER_DEFENSIVE_TACTICS,
  HUNTER_MULTIATTACK,
  RANGER_CONCLAVES,
  RANGER_FIGHTING_STYLES,
  SUPERIOR_HUNTERS_DEFENSE,
} from '~/domain/classes/ranger/ranger';
import { DIVINE_DOMAINS } from '~/domain/classes/cleric/cleric';
import {
  SPELL_SCHOOLS,
  getExtraPreparedSpells,
  getMaxPreparedSpells,
  getSpellSlots,
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
} from '~/domain/backgrounds/backgrounds';
import { DRUID_CIRCLES, LAND_CIRCLES } from '~/domain/classes/druid/druid';
import {
  getAllLoreSpellsLearned,
  getAllMagicalSecretsSpellsLearned,
} from '~/domain/classes/bard/bard';
import {
  ELEMENTAL_DISCIPLINES,
  MONASTIC_TRADITIONS,
} from '~/domain/classes/monk/monk';
import {
  PALADIN_FIGHTING_STYLES,
  SACRED_OATHS,
} from '~/domain/classes/paladin/paladin';
import { ROGISH_ARCHETYPES } from '~/domain/classes/rogue/rogue';
import { getter } from '~/utils/objects';
import { isSameScroll } from '~/domain/equipment/magicItems';
import { getSectionPath } from '~/domain/equipment/items';
import { getItem } from '~/domain/equipment/equipment';
import { getFeat, isFeat } from '~/domain/feats/featUtils';

const backgroundSchema = new mongoose.Schema({
  name: { type: String, enum: Object.keys(BACKGROUNDS) },
  skills: [{ type: String, enum: SKILLS().map(s => s.name) }],
  guild: { type: String, enum: ARTISAN_GUILDS },
  routines: [{ type: String, enum: ENTERTAINER_ROUTINES }],
  favoriteScheme: { type: String, enum: CHARLATAN_FAVORITE_SCHEMES },
  criminalSpecialty: { type: String, enum: CRIMINAL_SPECIALTY },
  outlanderOrigin: { type: String, enum: OUTLANDER_ORIGIN },
  sageSpecialty: { type: String, enum: SAGE_SPECIALTY },
  soldierSpecialty: { type: String, enum: SOLDIER_SPECIALTY },
});

const statsSchema = new mongoose.Schema({
  ...STATS().reduce(
    (stats, statName) => ({
      ...stats,
      [statName]: Number,
    }),
    {}
  ),
});

const itemSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  weight: Number,
  price: Number,
  identified: Boolean,
  spellLevel: Number,
  spellName: String,
  chargesLeft: Number,
});

const spellSchema = new mongoose.Schema({
  name: String,
  type: { type: String, enum: CHARACTER_CLASSES() },
  subtype: String,
});

const forgettableSpellSchema = new mongoose.Schema({
  name: String,
  forgotten: Boolean,
});

const barbarianSchema = new mongoose.Schema({
  primalPath: {
    type: String,
    enum: ['berserker', 'totem-warrior'],
  },
  spiritTotem: {
    totemType: {
      type: String,
      enum: ['bear', 'eagle', 'wolf'],
    },
    animal: String,
  },
  aspectOfTheBeast: {
    totemType: {
      type: String,
      enum: ['bear', 'eagle', 'wolf'],
    },
    animal: String,
  },
  totemicAttunement: {
    totemType: {
      type: String,
      enum: ['bear', 'eagle', 'wolf'],
    },
    animal: String,
  },
});

const bardSchema = new mongoose.Schema({
  bardCollege: {
    type: String,
    enum: ['lore', 'valor'],
  },
  loreCollegeProficiencies: [{ type: String, enum: SKILLS().map(s => s.name) }],
  loreSpells: [forgettableSpellSchema],
  magicalSecretsSpells: [forgettableSpellSchema],
  bardicInspiration: Number,
});

const warlockSchema = new mongoose.Schema({
  patron: {
    type: String,
    enum: ['archfey', 'fiend', 'greatOldOne'],
  },
  invocations: [String],
  pactBoon: String,
  tomeSpells: [spellSchema],
  tomeRituals: [spellSchema],
  arcanum: [spellSchema],
});

const clericSchema = new mongoose.Schema({
  divineDomain: {
    type: String,
    enum: Object.keys(DIVINE_DOMAINS),
  },
});

const druidSchema = new mongoose.Schema({
  druidCircle: {
    type: String,
    enum: DRUID_CIRCLES,
  },
  bonusCantrip: spellSchema,
  landCircle: {
    type: String,
    enum: LAND_CIRCLES,
  },
});

const rangerSchema = new mongoose.Schema({
  favoredEnemies: [
    { type: String, enum: [...FAVORED_ENEMIES, ...FAVORED_ENEMIES_HUMANOIDS] },
  ],
  favoredEnemiesSelection: [Boolean],
  favoredTerrains: [{ type: String, enum: FAVORED_TERRAINS }],
  fightingStyle: { type: String, enum: RANGER_FIGHTING_STYLES },
  isFightingStyleSettled: Boolean,
  rangerConclave: { type: String, enum: RANGER_CONCLAVES },
  huntersPrey: { type: String, enum: HUNTERS_PREY },
  defensiveTactics: { type: String, enum: HUNTER_DEFENSIVE_TACTICS },
  multiattack: { type: String, enum: HUNTER_MULTIATTACK },
  superiorHuntersDefense: { type: String, enum: SUPERIOR_HUNTERS_DEFENSE },
});

const fighterSchema = new mongoose.Schema({
  fightingStyle: { type: String, enum: FIGHTING_STYLES },
  martialArchetype: { type: String, enum: MARTIAL_ARCHETYPES },
  knightSpells: [spellSchema],
  combatSuperiority: [{ type: String, enum: COMBAT_SUPERIORITY_MANEUVERS }],
  studentOfWar: itemSchema,
  extraFightingStyle: { type: String, enum: FIGHTING_STYLES },
});

const sorcererSchema = new mongoose.Schema({
  sorcererOrigin: { type: String, enum: SORCERER_ORIGINS },
  dragonAncestor: { type: String, enum: DRAGON_ANCESTORS },
  fontOfMagic: Number,
  tidesOfChaos: Number,
  metamagic: [{ type: String, enum: METAMAGIC }],
});

const wizardSchema = new mongoose.Schema({
  arcaneTradition: { type: String, enum: SPELL_SCHOOLS },
  improvedMinorIllusion: spellSchema,
  extraSpells: [spellSchema],
});

const monkSchema = new mongoose.Schema({
  monasticTradition: { type: String, enum: MONASTIC_TRADITIONS },
  elementalDisciplines: [
    { type: String, enum: Object.keys(ELEMENTAL_DISCIPLINES) },
  ],
});

const paladinSchema = new mongoose.Schema({
  fightingStyle: { type: String, enum: PALADIN_FIGHTING_STYLES },
  isFightingStyleSettled: Boolean,
  sacredOath: { type: String, enum: SACRED_OATHS },
  layOnHands: Number,
  divineSense: Number,
  channelDivinity: Number,
});

const rogueSchema = new mongoose.Schema({
  roguishArchetype: { type: String, enum: ROGISH_ARCHETYPES },
  spellcasting: [spellSchema],
});

const classAttrsSchema = new mongoose.Schema({
  barbarian: barbarianSchema,
  bard: bardSchema,
  warlock: warlockSchema,
  cleric: clericSchema,
  druid: druidSchema,
  ranger: rangerSchema,
  fighter: fighterSchema,
  sorcerer: sorcererSchema,
  wizard: wizardSchema,
  monk: monkSchema,
  paladin: paladinSchema,
  rogue: rogueSchema,
  // ALL
  expertSkills: [
    { type: String, enum: [...SKILLS().map(s => s.name), 'thieves-tools'] },
  ],
  skills: [{ type: String, enum: SKILLS().map(s => s.name) }],
  seen: [String],
});

const halfElfSchema = new mongoose.Schema({
  extraStats: statsSchema,
  skills: [{ type: String, enum: SKILLS().map(s => s.name) }],
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

const notesSchema = new mongoose.Schema({
  id: String,
  position: [Number, Number],
  text: String,
});

const customTraitSchema = new mongoose.Schema({
  id: String,
  text: String,
});

const locationSchema = new mongoose.Schema({
  naturalFrom: String,
  lastLocation: String,
  goingTo: String,
});

// FEATS
const featsSchema = new mongoose.Schema({
  list: [String],
  elementalAdept: [String],
  martialAdept: [String],
  luckyFeat: Number,
  extraStats: {
    type: Map,
    of: [String],
  },
  cantrips: {
    type: Map,
    of: String,
  },
  spells: {
    type: Map,
    of: [spellSchema],
  },
});

///////////////////////
///////////////////////
////               ////
////   PC SCHEMA   ////
////               ////
///////////////////////
///////////////////////

const pcSchema = new mongoose.Schema({
  // BASIC ATTRS
  id: String,
  name: String,
  race: {
    type: String,
    enum: CHARACTER_RACES,
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
  pClass: {
    type: String,
    enum: CHARACTER_CLASSES(),
  },
  level: Number,
  levelReady: Number,
  exp: Number,
  background: backgroundSchema,
  userId: String,
  npc: Boolean,

  // STATS
  stats: statsSchema,
  extraStats: statsSchema,
  improvedStatsLevels: [Number],

  // SKILLS
  skills: [{ type: String, enum: SKILLS().map(s => s.name) }],

  // COMBAT ATTRS
  initiative: Number,
  speed: Number,
  totalHitPoints: [Number],
  hitPoints: Number,
  temporaryHitPoints: Number,
  hitDice: Number,
  remainingHitDice: Number,

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
      custom: [itemSchema],
      bagOfHolding: [itemSchema],
    },
  },
  pack: String,
  money: {
    cp: Number,
    sp: Number,
    ep: Number,
    gp: Number,
    pp: Number,
  },

  // FREETEXT
  freeText: freeTextSchema,
  notes: [notesSchema],
  customTraits: [customTraitSchema],

  // FEATS & TRAITS
  halfElf: halfElfSchema,
  classAttrs: classAttrsSchema,
  feats: featsSchema,

  // PROFICIENCIES & LANGUAGES
  proficientItems: [itemSchema],
  languages: [{ type: String, enum: [...LANGUAGES(), ...EXOTIC_LANGUAGES()] }],

  // ADDITIONAL FEATURES
  age: Number,
  height: Number,
  weight: Number,
  size: {
    type: String,
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },

  // SPELLS
  magic: {
    hasLearnedSpells: [Boolean],
    spentSpellSlots: [Number],
  },
  spells: [spellSchema],
  preparedSpells: [spellSchema],

  // LOCATION
  location: locationSchema,
});

function weaponLimit(val) {
  return val.length <= 3;
}

const Pc = mongoose.models.Pc || mongoose.model('Pc', pcSchema);

/////////////
// GET PCS //
/////////////

export async function getPcs() {
  const pcs = await Pc.find({ npc: { $ne: true } });
  return pcs;
}

export async function getNpcs() {
  const pcs = await Pc.find({ npc: true });
  return pcs;
}

export async function getNpcByName(name) {
  const npc = await Pc.findOne({ name }).exec();
  return npc;
}

export async function getUserPcs(userId) {
  const pcs = await Pc.find({ userId });
  return pcs;
}

export async function getPc(id) {
  const pc = await Pc.findOne({ id }).exec();
  return pc;
}

export async function createPc(pc, userId) {
  const { race, subrace } = pc;

  const newPc = await Pc.create({
    ...pc,
    id: uuid(),
    userId,
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
        custom: [],
      },
    },
  });

  return newPc;
}

export async function updatePc(pcAttrs) {
  const updatedPc = await Pc.findOneAndUpdate(
    { id: pcAttrs.id },
    { $set: pcAttrs },
    { new: true }
  ).exec();

  return updatedPc;
}

export async function updatePcName(id, newName) {
  const updatedPc = await Pc.findOneAndUpdate(
    { id },
    { $set: { name: newName } },
    { new: true }
  ).exec();

  return updatedPc;
}

export async function getPcName(id) {
  const pc = await getPc(id);
  return pc?.name;
}

export async function deletePc(id) {
  await Pc.deleteOne({ id });
}

///////////
// NOTES //
///////////

export async function createNotes(id, position) {
  const updatedPc = await Pc.findOneAndUpdate(
    { id },
    { $push: { notes: { id: uuid(), position, text: '' } } },
    { new: true }
  ).exec();

  return updatedPc;
}

export async function deleteNote(id, noteId) {
  const updatedPc = await Pc.findOneAndUpdate(
    { id },
    { $pull: { notes: { _id: noteId } } },
    { new: true }
  ).exec();

  return updatedPc;
}

export async function updateNotes(id, noteId, text) {
  const updatedPc = await Pc.findOneAndUpdate(
    { id, 'notes._id': noteId },
    { $set: { 'notes.$.text': text } },
    { new: true }
  ).exec();

  return updatedPc;
}

export async function updateNotePosition(id, noteId, position) {
  const updatedPc = await Pc.findOneAndUpdate(
    { id, 'notes._id': noteId },
    { $set: { 'notes.$.position': position } },
    { new: true }
  ).exec();

  return updatedPc;
}

export async function healPc(id, healing) {
  const pc = await getPc(id);
  const maxHitPoints = getMaxHitPoints(pc);
  const { hitPoints } = pc;

  let updatedPc = pc;

  if (hitPoints + healing > maxHitPoints) {
    updatedPc = await Pc.findOneAndUpdate(
      { id },
      { $set: { hitPoints: maxHitPoints } },
      { new: true }
    ).exec();
  } else {
    updatedPc = await Pc.findOneAndUpdate(
      { id },
      { $inc: { hitPoints: healing } },
      { new: true }
    ).exec();
  }

  return updatedPc;
}

export async function addXp(id, xp) {
  let updatedPc = await Pc.findOneAndUpdate(
    { id },
    { $inc: { exp: xp } },
    { new: true }
  ).exec();

  updatedPc = await Pc.findOneAndUpdate(
    { id },
    { levelReady: getLevelByXp(updatedPc.exp) },
    { new: true }
  ).exec();

  return updatedPc;
}

/////////////////////////
// FEATS & CLASS ATTRS //
/////////////////////////

export async function updateClassAttrs(id, classAttrs) {
  const updatedPc = await Pc.findOneAndUpdate(
    { id },
    {
      $set: Object.entries(classAttrs).reduce(
        (setAttrs, [classAttrName, classAttrValue]) => ({
          ...setAttrs,
          ['classAttrs.' + classAttrName]: classAttrValue,
        }),
        {}
      ),
    },
    { new: true }
  ).exec();

  return updatedPc;
}

export async function updateAttrsForClass(id, pClass, classAttrs) {
  const updatedPc = await Pc.findOneAndUpdate(
    { id },
    {
      $set: Object.entries(classAttrs).reduce(
        (setAttrs, [classAttrName, classAttrValue]) => ({
          ...setAttrs,
          [`classAttrs.${pClass}.${classAttrName}`]: classAttrValue,
        }),
        {}
      ),
    },
    { new: true, upsert: true }
  ).exec();

  return updatedPc;
}

export async function pushAttrsForClass(id, pClass, classAttrs) {
  const updatedPc = await Pc.findOneAndUpdate(
    { id },
    {
      $push: Object.entries(classAttrs).reduce(
        (setAttrs, [classAttrName, classAttrValue]) => ({
          ...setAttrs,
          [`classAttrs.${pClass}.${classAttrName}`]: classAttrValue,
        }),
        {}
      ),
    },
    { new: true, upsert: true }
  ).exec();

  return updatedPc;
}

export async function increaseStats(id, statsIncrease) {
  const updatedPc = await Pc.findOneAndUpdate(
    { id },
    {
      $inc: Object.entries(statsIncrease).reduce(
        (update, [statName, statIncrease]) => ({
          ...update,
          [`stats.${statName}`]: statIncrease,
        }),
        {}
      ),
    },
    { new: true }
  ).exec();

  return updatedPc;
}

export async function addImprovedStatsLevel(id, level) {
  const updatedPc = await Pc.findOneAndUpdate(
    { id },
    { $push: { improvedStatsLevels: level } },
    { new: true, upsert: true }
  ).exec();

  return updatedPc;
}

export async function updateFeatAttr(id, featAttrName, featAttrValue) {
  const updatedPc = await Pc.findOneAndUpdate(
    { id },
    {
      $set: {
        ['feats.' + featAttrName]: featAttrValue,
      },
    },
    { new: true }
  ).exec();

  return updatedPc;
}

////////////
// SPELLS //
////////////

export async function spendSpellSlot(id, spellSlot) {
  const pcModel = await getPc(id);
  const pc = pcModel.toJSON();
  const maxSpellSlots = getSpellSlots(pc);

  if (pc && pc.magic.spentSpellSlots[spellSlot] < maxSpellSlots[spellSlot]) {
    pcModel.magic.spentSpellSlots[spellSlot] += 1;

    return await pcModel.save();
  }

  return pc;
}

export async function learnSpells(id, toLearn) {
  const hasBardLoreSpell = await Promise.all(
    toLearn.map(spellName =>
      Pc.countDocuments({
        id,
        'classAttrs.bard.loreSpells.name': spellName,
      })
    )
  );

  const hasBardMagicalSecretSpell = await Promise.all(
    toLearn.map(spellName =>
      Pc.countDocuments({
        id,
        'classAttrs.bard.magicalSecretsSpells.name': spellName,
      })
    )
  );

  const spellsByOrigin = toLearn.reduce(
    (spells, spellName, i) => {
      if (hasBardLoreSpell[i])
        return { ...spells, bardLore: [...spells.bardLore, spellName] };
      if (hasBardMagicalSecretSpell[i])
        return {
          ...spells,
          bardMagicalSecrets: [...spells.bardMagicalSecrets, spellName],
        };

      return { ...spells, regular: [...spells.regular, spellName] };
    },
    {
      regular: [],
      bardLore: [],
      bardMagicalSecrets: [],
    }
  );

  const updatedPc = await Promise.all([
    learnRegularSpells(id, spellsByOrigin.regular),
    learnBardLoreSpells(id, spellsByOrigin.bardLore),
    learnBardMagicalSecretsSpells(id, spellsByOrigin.bardMagicalSecrets),
  ]);

  return updatedPc;
}

export async function learnRegularSpells(id, toLearn) {
  const updatedPc = await Pc.findOneAndUpdate(
    { id },
    {
      $push: {
        spells: {
          $each: toLearn.map(sName => ({ name: sName })),
        },
      },
    },
    { new: true, upsert: true }
  ).exec();

  return updatedPc;
}

export async function forgetSpell(id, spellName) {
  const pc = await getPc(id);

  if (pc.spells.map(s => s.name).includes(spellName)) {
    return forgetRegularSpell(id, spellName);
  }

  if (
    getAllLoreSpellsLearned(pc)
      .map(s => s.name)
      .includes(spellName)
  ) {
    return forgetBardLoreSpell(id, spellName);
  }

  if (
    getAllMagicalSecretsSpellsLearned(pc)
      .map(s => s.name)
      .includes(spellName)
  ) {
    return forgetBardMagicalSecretsSpell(id, spellName);
  }
}

export async function forgetRegularSpell(id, spellName) {
  const updatedPc = await Pc.findOneAndUpdate(
    { id },
    {
      $pull: {
        spells: { name: spellName },
        preparedSpells: { name: spellName },
      },
    },
    { new: true }
  ).exec();

  return updatedPc;
}

export async function prepareSpells(id, toPrepare) {
  let updatedPc = await Pc.findOneAndUpdate(
    { id },
    {
      $push: {
        preparedSpells: {
          $each: toPrepare.map(sName => ({ name: sName })),
        },
      },
    },
    { new: true, upsert: true }
  ).exec();

  return updatedPc;
}

export async function learnWizardExtraSpell(id, spellName) {
  let updatedPc = await Pc.findOneAndUpdate(
    { id },
    {
      $push: {
        'classAttrs.wizard.extraSpells': { name: spellName },
      },
    },
    { new: true, upsert: true }
  ).exec();

  return updatedPc;
}

export async function learnWarlockExtraSpell(id, spellName) {
  let updatedPc = await Pc.findOneAndUpdate(
    { id },
    {
      $push: {
        'classAttrs.warlock.tomeRituals': { name: spellName },
      },
    },
    { new: true, upsert: true }
  ).exec();

  return updatedPc;
}

export async function learnBardLoreSpells(id, spells) {
  const hasSpell = await Promise.all(
    spells.map(spellName =>
      Pc.countDocuments({
        id,
        'classAttrs.bard.loreSpells.name': spellName,
      })
    )
  );

  return await Promise.all(
    hasSpell.map((has, i) =>
      Pc.findOneAndUpdate(
        {
          id,
          ...(has ? { 'classAttrs.bard.loreSpells.name': spells[i] } : {}),
        },
        has
          ? {
              $set: {
                'classAttrs.bard.loreSpells.$.forgotten': false,
              },
            }
          : {
              $push: {
                'classAttrs.bard.loreSpells': { name: spells[i] },
              },
            },
        { new: true, upsert: true }
      ).exec()
    )
  );
}

export async function forgetBardLoreSpell(id, spellName) {
  await Promise.all([
    Pc.findOneAndUpdate(
      {
        id,
        'classAttrs.bard.loreSpells.name': spellName,
      },
      {
        $set: { 'classAttrs.bard.loreSpells.$.forgotten': true },
      },
      { new: true }
    ).exec(),
    Pc.findOneAndUpdate(
      { id },
      {
        $pull: { preparedSpells: { name: spellName } },
      },
      { new: true }
    ).exec(),
  ]);
}

export async function learnBardMagicalSecretsSpells(id, spells) {
  const hasSpell = await Promise.all(
    spells.map(spellName =>
      Pc.countDocuments({
        id,
        'classAttrs.bard.magicalSecretsSpells.name': spellName,
      })
    )
  );

  return await Promise.all(
    hasSpell.map((has, i) =>
      Pc.findOneAndUpdate(
        {
          id,
          ...(has
            ? { 'classAttrs.bard.magicalSecretsSpells.name': spells[i] }
            : {}),
        },
        has
          ? {
              $set: {
                'classAttrs.bard.magicalSecretsSpells.$.forgotten': false,
              },
            }
          : {
              $push: {
                'classAttrs.bard.magicalSecretsSpells': { name: spells[i] },
              },
            },
        { new: true, upsert: true }
      ).exec()
    )
  );
}

export async function forgetBardMagicalSecretsSpell(id, spellName) {
  await Promise.all([
    Pc.findOneAndUpdate(
      {
        id,
        'classAttrs.bard.magicalSecretsSpells.name': spellName,
      },
      {
        $set: { 'classAttrs.bard.magicalSecretsSpells.$.forgotten': true },
      },
      { new: true }
    ).exec(),
    Pc.findOneAndUpdate(
      { id },
      {
        $pull: { preparedSpells: { name: spellName } },
      },
      { new: true }
    ).exec(),
  ]);
}

export async function addPreparedSpell(id, spell) {
  const pc = await getPc(id);
  const maxPreparedSpells = getMaxPreparedSpells(pc);
  if (pc.preparedSpells.length >= maxPreparedSpells) {
    return pc;
  }

  const updatedPc = await Pc.updateOne(
    { id },
    {
      $push: {
        preparedSpells: spell,
      },
    }
  ).exec();

  return updatedPc;
}

export async function deletePreparedSpell(id, spell) {
  const pc = await getPc(id);
  const extraPreparedSpells = getExtraPreparedSpells(pc);
  if (extraPreparedSpells.map(s => s.name).includes(spell.name)) {
    return pc;
  }

  const updatedPc = await Pc.findOneAndUpdate(
    { id },
    { $pull: { preparedSpells: spell } },
    { new: true }
  ).exec();

  return updatedPc;
}

///////////////
// EQUIPMENT //
///////////////

export async function unequipWeapon(id, slot) {
  const pc = await getPc(id);

  if (!Number.isInteger(slot) || slot < 0 || slot > 2) {
    return pc;
  }

  const weaponToUnequip = pc.items.weapons[slot];
  pc.items.treasure.weapons.push(weaponToUnequip);
  pc.items.weapons.pull(weaponToUnequip._id);

  return await pc.save();
}

export async function equipWeaponInSlot(id, weaponToEquipName, slot) {
  const pc = await getPc(id);
  const {
    items: {
      weapons,
      treasure: { weapons: treasureWeapons },
    },
  } = pc;

  const weaponToUnequip = weapons[slot];
  const weaponToUnequipName = weaponToUnequip?.name;
  const weaponToEquipInTreasure = treasureWeapons.find(
    w => w.name === weaponToEquipName
  );
  const weaponToUnequipInTreasure = treasureWeapons.find(
    w => w.name === weaponToUnequipName
  );

  pc.items.weapons[slot] = weaponToEquipInTreasure;

  if (weaponToEquipInTreasure.amount > 1) {
    weaponToEquipInTreasure.amount -= 1;
  } else {
    treasureWeapons.pull(weaponToEquipInTreasure._id);
  }

  if (weaponToUnequip) {
    if (weaponToUnequipInTreasure) {
      weaponToUnequipInTreasure.amount += 1;
    } else {
      treasureWeapons.push(weaponToUnequip);
    }
  }

  return await pc.save();
}

export async function unequipShield(id, shieldName) {
  const updatedPc = await Pc.findOneAndUpdate(
    { id },
    {
      $unset: { 'items.equipment.shield': '' },
      $push: { 'items.treasure.armors': { name: shieldName } },
    },
    { new: true }
  );

  return updatedPc;
}

export async function unequipArmor(id, armorName) {
  const updatedPc = await Pc.findOneAndUpdate(
    { id },
    {
      $unset: { 'items.equipment.armor': '' },
      $push: { 'items.treasure.armors': { name: armorName } },
    },
    { new: true }
  );

  return updatedPc;
}

export async function dropTreasureWeapon(id, weaponName) {
  const updatedPc = await Pc.findOneAndUpdate(
    { id },
    { $pull: { 'items.treasure.weapons': { name: weaponName } } },
    { new: true }
  );

  return updatedPc;
}

export async function dropTreasureArmor(id, armorName) {
  const updatedPc = await Pc.findOneAndUpdate(
    { id },
    { $pull: { 'items.treasure.armors': { name: armorName } } },
    { new: true }
  );

  return updatedPc;
}

export async function dropTreasureItem(id, itemName, scrollSpellName) {
  const query = { $pull: { 'items.treasure.others': { name: itemName } } };
  if (scrollSpellName) {
    query.$pull['items.treasure.others'].spellName = scrollSpellName;
  }
  if (itemName === 'bagOfHolding') {
    query.$set = { 'items.treasure.bagOfHolding': [] };
  }

  const updatedPc = await Pc.findOneAndUpdate({ id }, query, { new: true });

  return updatedPc;
}

export async function dropBagOfHoldingItem(id, itemName, scrollSpellName) {
  const query = {
    $pull: { 'items.treasure.bagOfHolding': { name: itemName } },
  };
  if (scrollSpellName) {
    query.$pull['items.treasure.bagOfHolding'].spellName = scrollSpellName;
  }

  const updatedPc = await Pc.findOneAndUpdate({ id }, query, { new: true });

  return updatedPc;
}

export async function dropCustomItem(id, itemName) {
  const updatedPc = await Pc.findOneAndUpdate(
    { id },
    { $pull: { 'items.treasure.custom': { name: itemName } } },
    { new: true }
  );

  return updatedPc;
}

export async function changeTreasureItemAmount(id, itemName, itemAmount) {
  const updatedPc = await Pc.findOneAndUpdate(
    { id, 'items.treasure.others.name': itemName },
    { $set: { 'items.treasure.others.$.amount': parseInt(itemAmount, 10) } },
    { new: true }
  );

  return updatedPc;
}

export async function changeCustomItemAmount(id, itemName, itemAmount) {
  const updatedPc = await Pc.findOneAndUpdate(
    { id, 'items.treasure.custom.name': itemName },
    { $set: { 'items.treasure.custom.$.amount': parseInt(itemAmount, 10) } },
    { new: true }
  );

  return updatedPc;
}

export async function changeItemCharges(id, itemName, newCharges, sectionPath) {
  const updatedPc = await Pc.findOneAndUpdate(
    { id, [`items.${sectionPath}.name`]: itemName },
    {
      $set: {
        [`items.${sectionPath}.$.chargesLeft`]: parseInt(newCharges, 10),
      },
    },
    { new: true }
  );

  return updatedPc;
}

export async function changeItemWeight(id, itemName, weight, section) {
  const pc = await Pc.findOne({ id });

  pc.items.treasure[section].forEach(item => {
    if (item.name === itemName) {
      item.weight = weight;
    }
  });

  return await pc.save();
}

export async function changeEquipmentWeight(id, itemName, weight) {
  const pc = await Pc.findOne({ id });

  pc.items.equipment.others.forEach(item => {
    if (item.name === itemName) {
      item.weight = weight;
    }
  });

  return await pc.save();
}

export async function changeEquipmentCost(id, itemName, price) {
  const pc = await Pc.findOne({ id });

  pc.items.equipment.others.forEach(item => {
    if (item.name === itemName) {
      item.price = price;
    }
  });

  return await pc.save();
}

export async function dropEquipmentAmmo(id, itemName) {
  const updatedPc = await Pc.findOneAndUpdate(
    { id },
    { $pull: { 'items.equipment.ammunition': { name: itemName } } },
    { new: true }
  );

  return updatedPc;
}

export async function dropEquipmentOther(id, itemName, itemSpellName) {
  const pc = await getPc(id);

  const item = pc.items.equipment.others.find(pItem =>
    itemSpellName
      ? pItem.name === itemName && pItem.spellName === itemSpellName
      : pItem.name === itemName
  );

  if (!item) return pc;

  if (item.amount > 1) {
    item.amount -= 1;
  } else {
    pc.items.equipment.others.pull(item._id);
  }

  return await pc.save();
}

export async function changeEquipmentAmmoAmount(id, itemName, itemAmount) {
  const updatedPc = await Pc.findOneAndUpdate(
    { id, 'items.equipment.ammunition.name': itemName },
    {
      $set: { 'items.equipment.ammunition.$.amount': parseInt(itemAmount, 10) },
    },
    { new: true }
  );

  return updatedPc;
}

export async function changeEquipmentOtherAmount(id, itemName, itemAmount) {
  const updatedPc = await Pc.findOneAndUpdate(
    { id, 'items.equipment.others.name': itemName },
    {
      $set: { 'items.equipment.others.$.amount': parseInt(itemAmount, 10) },
    },
    { new: true }
  );

  return updatedPc;
}

export async function identifyItem(id, sectionPath, itemName, itemSpellName) {
  const pc = await getPc(id);
  const item = getter(pc.items, sectionPath)?.find(
    item =>
      item.name === itemName &&
      (!itemSpellName || item.spellName === itemSpellName)
  );

  if (!item) {
    return pc;
  }

  item.identified = true;
  return await pc.save();
}

export async function addOtherEquipment(id, itemName) {
  const updatedPc = await Pc.findOneAndUpdate(
    { id },
    {
      $push: { 'items.equipment.others': { name: itemName, amount: 1 } },
    },
    { new: true }
  );

  return updatedPc;
}

export async function addOtherTreasure(id, itemName) {
  const updatedPc = await Pc.findOneAndUpdate(
    { id },
    {
      $push: { 'items.treasure.others': { name: itemName, amount: 1 } },
    },
    { new: true }
  );

  return updatedPc;
}

export async function addCustomTreasure(id, itemName) {
  const updatedPc = await Pc.findOneAndUpdate(
    { id },
    {
      $push: { 'items.treasure.custom': { name: itemName, amount: 1 } },
    },
    { new: true }
  );

  return updatedPc;
}

export async function putInBagOfHolding(id, section, itemId) {
  const pc = await Pc.findOne(
    {
      id,
      [`items.treasure.${section}._id`]: itemId,
    },
    { [`items.treasure.${section}.$`]: 1 }
  );

  const pItem = pc.items.treasure[section][0];

  const updatedPc = await Pc.findOneAndUpdate(
    { id },
    {
      $pull: { [`items.treasure.${section}`]: { _id: itemId } },
      $push: { 'items.treasure.bagOfHolding': pItem },
    },
    { new: true }
  );

  return updatedPc;
}

export async function putOutOfBagOfHolding(id, itemId) {
  const pc = await Pc.findOne(
    {
      id,
      'items.treasure.bagOfHolding._id': itemId,
    },
    { 'items.treasure.bagOfHolding.$': 1 }
  );

  const pItem = pc.items.treasure.bagOfHolding[0];
  const section = getSectionPath(getItem(pItem.toJSON()));

  const updatedPc = await Pc.findOneAndUpdate(
    { id },
    {
      $pull: { 'items.treasure.bagOfHolding': { _id: itemId } },
      $push: { [`items.${section}`]: pItem },
    },
    { new: true }
  );

  return updatedPc;
}

export async function reorderWeapons(id, weaponName, destinationSlot) {
  const pc = await getPc(id);

  let originSlot = null;
  const { weapons: pcWeapons } = pc.items;
  const selectedWeapon = pcWeapons.find((pW, i) => {
    if (pW?.name === weaponName) {
      originSlot = i;
      return true;
    }
    return false;
  });
  const replacedWeapon = pcWeapons[destinationSlot];
  pcWeapons[originSlot] = replacedWeapon;
  pcWeapons[destinationSlot] = selectedWeapon;

  return await pc.save();
}

export async function switchShield(id, shieldName) {
  const pc = await getPc(id);

  const { shield: pShield } = pc.items.equipment;

  let updatedPc;
  if (pShield) {
    updatedPc = await Pc.findOneAndUpdate(
      { id },
      {
        $set: { 'items.equipment.shield': { name: shieldName } },
        $pull: { 'items.treasure.armors': { name: shieldName } },
      },
      { new: true }
    );
    updatedPc = await Pc.findOneAndUpdate(
      { id },
      {
        $push: { 'items.treasure.armors': { name: pShield.name } },
      },
      { new: true }
    );
  } else {
    updatedPc = await Pc.findOneAndUpdate(
      { id },
      {
        $set: { 'items.equipment.shield': { name: shieldName } },
        $pull: { 'items.treasure.armors': { name: shieldName } },
      },
      { new: true }
    );
  }

  return updatedPc;
}

export async function switchArmor(id, armorName) {
  const pc = await getPc(id);

  const { armor: pArmor } = pc.items.equipment;

  let updatedPc;
  if (pArmor) {
    updatedPc = await Pc.findOneAndUpdate(
      { id },
      {
        $set: { 'items.equipment.armor': { name: armorName } },
        $pull: { 'items.treasure.armors': { name: armorName } },
      },
      { new: true }
    );
    updatedPc = await Pc.findOneAndUpdate(
      { id },
      {
        $push: { 'items.treasure.armors': { name: pArmor.name } },
      },
      { new: true }
    );
  } else {
    updatedPc = await Pc.findOneAndUpdate(
      { id },
      {
        $set: { 'items.equipment.armor': { name: armorName } },
        $pull: { 'items.treasure.armors': { name: armorName } },
      },
      { new: true }
    );
  }

  return updatedPc;
}

export async function addItemToSection(id, item, section, subsection) {
  const pc = await getPc(id);

  const sameItem = pc.items[section][subsection].find(
    pItem => pItem.name === item.name
  );

  if (sameItem) {
    if (isSameScroll(sameItem, item)) {
      sameItem.amount += 1;
    } else {
      pc.items[section][subsection].push(item);
    }
  } else {
    pc.items[section][subsection].push(item);
  }

  return await pc.save();
}

export async function increaseItemAmount(
  id,
  itemName,
  sectionPath,
  amount,
  scrollSpellName
) {
  const filter = {
    id,
    [`items.${sectionPath}.name`]: itemName,
  };

  if (scrollSpellName) {
    filter[`items.${sectionPath}.scpellName`] = scrollSpellName;
  }

  const updatedPc = await Pc.findOneAndUpdate(
    filter,
    { $inc: { [`items.${sectionPath}.$.amount`]: amount } },
    { new: true }
  );

  return updatedPc;
}

export async function addLevelHitPoints(id, extraHitPoints) {
  const updatedPc = await Pc.findOneAndUpdate(
    { id },
    {
      $push: { totalHitPoints: extraHitPoints },
      $inc: { hitPoints: extraHitPoints, hitDice: 1, remainingHitDice: 1 },
    },
    { new: true }
  ).exec();

  return updatedPc;
}

export async function spendLayOnHands(id, hp) {
  const updatedPc = await Pc.findOneAndUpdate(
    { id },
    { $inc: { 'classAttrs.paladin.layOnHands': -hp } },
    { new: true, upsert: true }
  ).exec();

  return updatedPc;
}

export async function spendTrait(id, context, traitName, amount = 1) {
  const updatedPc = await Pc.findOneAndUpdate(
    { id },
    { $inc: { [`${context}.${traitName}`]: -amount } },
    { new: true, upsert: true }
  ).exec();

  return updatedPc;
}

export async function markTraitSeen(id, traitName) {
  const isRegularTrait = isTrait(traitName) || isFeat(traitName);

  let updatedPc;

  if (isRegularTrait) {
    updatedPc = await Pc.findOneAndUpdate(
      { id },
      {
        $addToSet: {
          'classAttrs.seen': traitName,
        },
      },
      { new: true, upsert: true }
    ).exec();
  } else {
    updatedPc = await getPc(id);
  }

  return updatedPc;
}

export async function addCustomTrait(id, trait) {
  const updatedPc = await Pc.findOneAndUpdate(
    { id },
    { $push: { customTraits: { id: uuid(), text: trait } } },
    { new: true, upsert: true }
  ).exec();

  return updatedPc;
}

export async function removeCustomTrait(id, traitId) {
  const updatedPc = await Pc.findOneAndUpdate(
    { id },
    { $pull: { customTraits: { id: traitId } } },
    { new: true, upsert: true }
  ).exec();

  return updatedPc;
}

export async function modifyCustomTrait(id, traitId, trait) {
  const updatedPc = await Pc.findOneAndUpdate(
    { id, 'customTraits.id': traitId },
    { $set: { 'customTraits.$.text': trait } },
    { new: true, upsert: true }
  ).exec();

  return updatedPc;
}

export async function updateFeatStat(id, featName, selectedStat) {
  if (!isFeat(featName)) {
    throw new Error('Feat no válido');
  }

  const feat = getFeat(featName);
  if (!feat?.requiredStatSelection || !feat?.bonus?.stats) {
    throw new Error('El feat no requiere selección de atributo');
  }

  const availableStats = Object.keys(feat.bonus.stats);
  if (!availableStats.includes(selectedStat)) {
    throw new Error('Atributo no válido para este feat');
  }

  const update = {};
  update[`feats.extraStats.${featName}`] = selectedStat;

  const updatedPc = await Pc.findOneAndUpdate(
    { id },
    { $push: update },
    { new: true }
  ).exec();

  return updatedPc;
}

export async function updateFeatCantrip(id, featName, selectedCantrip) {
  if (!isFeat(featName)) {
    throw new Error('Feat no válido');
  }

  const feat = getFeat(featName);
  if (!feat?.bonus?.cantrip) {
    throw new Error('El feat no requiere selección de truco');
  }

  const updatedPc = await Pc.findOneAndUpdate(
    { id },
    { $set: { [`feats.cantrips.${featName}`]: selectedCantrip } },
    { new: true }
  ).exec();

  return updatedPc;
}

export async function updateFeatSpells(id, featName, spells, spellClass) {
  if (!isFeat(featName)) {
    throw new Error('Feat no válido');
  }

  const feat = getFeat(featName);
  if (!feat?.bonus?.spells) {
    throw new Error('El feat no requiere selección de conjuros');
  }

  const updatedPc = await Pc.findOneAndUpdate(
    { id },
    {
      $set: {
        [`feats.spells.${featName}`]: spells.map(s => ({
          name: s,
          type: spellClass,
        })),
      },
    },
    { new: true }
  ).exec();

  return updatedPc;
}
