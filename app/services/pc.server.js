import { mongoose } from '~/services/db.server';
import {
  RACES,
  STATS,
  SKILLS,
  LANGUAGES,
  EXOTIC_LANGUAGES,
  CLASSES,
  getLevelByXp,
  getMaxHitPoints,
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
import { getItem, pcItem } from '~/domain/equipment/equipment';
import {
  SPELL_SCHOOLS,
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

const statsSchema = new mongoose.Schema({
  ...STATS.reduce(
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
});

const spellSchema = new mongoose.Schema({
  name: String,
  type: { type: String, enum: Object.keys(CLASSES) },
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
  loreCollegeProficiencies: [{ type: String, enum: SKILLS.map(s => s.name) }],
  loreSpells: [forgettableSpellSchema],
  magicalSecretsSpells: [forgettableSpellSchema],
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
  metamagic: [{ type: String, enum: METAMAGIC }],
});

const wizardSchema = new mongoose.Schema({
  arcaneTradition: { type: String, enum: SPELL_SCHOOLS },
  improvedMinorIllusion: spellSchema,
});

const monkSchema = new mongoose.Schema({
  monasticTradition: { type: String, enum: MONASTIC_TRADITIONS },
  elementalDisciplines: [
    { type: String, enum: Object.keys(ELEMENTAL_DISCIPLINES) },
  ],
});

const paladinSchema = new mongoose.Schema({
  fightingStyle: { type: String, enum: PALADIN_FIGHTING_STYLES },
  sacredOath: { type: String, enum: SACRED_OATHS },
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
  totalHitPoints: [Number],
  hitPoints: Number,
  temporaryHitPoints: Number,
  hitDice: Number,
  remainingHitDice: Number,
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
  magic: {
    hasLearnedSpells: [Boolean],
    spentSpellSlots: [Number],
  },
  spells: [spellSchema],
  preparedSpells: [spellSchema],
  money: [Number, Number, Number],
  improvedStatsLevels: [Number],
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

export async function healPc(pcName, healing) {
  const pc = await getPc(pcName);
  const maxHitPoints = getMaxHitPoints(pc);
  const { hitPoints } = pc;

  let updatedPc = pc;

  if (hitPoints + healing > maxHitPoints) {
    updatedPc = await Pc.findOneAndUpdate(
      { name: pcName },
      { $set: { hitPoints: maxHitPoints } },
      { new: true }
    ).exec();
  } else {
    updatedPc = await Pc.findOneAndUpdate(
      { name: pcName },
      { $inc: { hitPoints: healing } },
      { new: true }
    ).exec();
  }

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

export async function updateClassAttrs(pcName, classAttrs) {
  const updatedPc = await Pc.findOneAndUpdate(
    { name: pcName },
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

export async function updateAttrsForClass(pcName, pClass, classAttrs) {
  const updatedPc = await Pc.findOneAndUpdate(
    { name: pcName },
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

export async function pushAttrsForClass(pcName, pClass, classAttrs) {
  const updatedPc = await Pc.findOneAndUpdate(
    { name: pcName },
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

export async function increaseStats(pcName, statsIncrease) {
  const updatedPc = await Pc.findOneAndUpdate(
    { name: pcName },
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

export async function addImprovedStatsLevel(name, level) {
  const updatedPc = await Pc.findOneAndUpdate(
    { name: name },
    { $push: { improvedStatsLevels: level } },
    { new: true, upsert: true }
  ).exec();

  return updatedPc;
}

export async function learnSpells(pcName, toLearn) {
  const hasBardLoreSpell = await Promise.all(
    toLearn.map(spellName =>
      Pc.countDocuments({
        name: pcName,
        'classAttrs.bard.loreSpells.name': spellName,
      })
    )
  );

  const hasBardMagicalSecretSpell = await Promise.all(
    toLearn.map(spellName =>
      Pc.countDocuments({
        name: pcName,
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
    learnRegularSpells(pcName, spellsByOrigin.regular),
    learnBardLoreSpells(pcName, spellsByOrigin.bardLore),
    learnBardMagicalSecretsSpells(pcName, spellsByOrigin.bardMagicalSecrets),
  ]);

  return updatedPc;
}

export async function learnRegularSpells(pcName, toLearn) {
  const updatedPc = await Pc.findOneAndUpdate(
    { name: pcName },
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

export async function forgetSpell(pcName, spellName) {
  const pc = await getPc(pcName);

  if (pc.spells.map(s => s.name).includes(spellName)) {
    return forgetRegularSpell(pcName, spellName);
  }

  if (
    getAllLoreSpellsLearned(pc)
      .map(s => s.name)
      .includes(spellName)
  ) {
    return forgetBardLoreSpell(pcName, spellName);
  }

  if (
    getAllMagicalSecretsSpellsLearned(pc)
      .map(s => s.name)
      .includes(spellName)
  ) {
    return forgetBardMagicalSecretsSpell(pcName, spellName);
  }
}

export async function forgetRegularSpell(pcName, spellName) {
  const updatedPc = await Pc.findOneAndUpdate(
    { name: pcName },
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

export async function prepareSpells(pcName, toPrepare) {
  let updatedPc = await Pc.findOneAndUpdate(
    { name: pcName },
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

export async function learnBardLoreSpells(pcName, spells) {
  const hasSpell = await Promise.all(
    spells.map(spellName =>
      Pc.countDocuments({
        name: pcName,
        'classAttrs.bard.loreSpells.name': spellName,
      })
    )
  );

  return await Promise.all(
    hasSpell.map((has, i) =>
      Pc.findOneAndUpdate(
        {
          name: pcName,
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

export async function forgetBardLoreSpell(pcName, spellName) {
  await Promise.all([
    Pc.findOneAndUpdate(
      {
        name: pcName,
        'classAttrs.bard.loreSpells.name': spellName,
      },
      {
        $set: { 'classAttrs.bard.loreSpells.$.forgotten': true },
      },
      { new: true }
    ).exec(),
    Pc.findOneAndUpdate(
      { name: pcName },
      {
        $pull: { preparedSpells: { name: spellName } },
      },
      { new: true }
    ).exec(),
  ]);
}

export async function learnBardMagicalSecretsSpells(pcName, spells) {
  const hasSpell = await Promise.all(
    spells.map(spellName =>
      Pc.countDocuments({
        name: pcName,
        'classAttrs.bard.magicalSecretsSpells.name': spellName,
      })
    )
  );

  return await Promise.all(
    hasSpell.map((has, i) =>
      Pc.findOneAndUpdate(
        {
          name: pcName,
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

export async function forgetBardMagicalSecretsSpell(pcName, spellName) {
  await Promise.all([
    Pc.findOneAndUpdate(
      {
        name: pcName,
        'classAttrs.bard.magicalSecretsSpells.name': spellName,
      },
      {
        $set: { 'classAttrs.bard.magicalSecretsSpells.$.forgotten': true },
      },
      { new: true }
    ).exec(),
    Pc.findOneAndUpdate(
      { name: pcName },
      {
        $pull: { preparedSpells: { name: spellName } },
      },
      { new: true }
    ).exec(),
  ]);
}

export async function addPreparedSpell(pcName, spell) {
  const pc = await getPc(pcName);
  const maxPreparedSpells = getMaxPreparedSpells(pc);
  if (pc.preparedSpells.length >= maxPreparedSpells) {
    return pc;
  }

  const updatedPc = await Pc.updateOne(
    { name: pcName },
    {
      $push: {
        preparedSpells: spell,
      },
    }
  ).exec();

  return updatedPc;
}

export async function deletePreparedSpell(pcName, spell) {
  const pc = await getPc(pcName);
  const extraPreparedSpells = getExtraPreparedSpells(pc);
  if (extraPreparedSpells.map(s => s.name).includes(spell.name)) {
    return pc;
  }

  const updatedPc = await Pc.findOneAndUpdate(
    { name: pcName },
    { $pull: { preparedSpells: spell } },
    { new: true }
  ).exec();

  return updatedPc;
}

export async function equipWeapons(
  name,
  weaponToUnequipName,
  weaponToEquipName
) {
  const pc = await getPc(name);
  let updatedPc = null;

  const {
    items: {
      treasure: { weapons },
    },
  } = pc;

  const weaponToEquipInTreasure = weapons.find(
    w => w.name === weaponToEquipName
  );
  const weaponToUnequipInTreasure = weapons.find(
    w => w.name === weaponToUnequipName
  );

  if (weaponToEquipInTreasure.amount > 1) {
    updatedPc = await Pc.findOneAndUpdate(
      { name, 'items.treasure.weapons.name': weaponToEquipName },
      { $inc: { 'items.treasure.weapons.$.amount': -1 } },
      { new: true }
    );
  } else {
    updatedPc = await Pc.findOneAndUpdate(
      { name },
      { $pull: { 'items.treasure.weapons': { name: weaponToEquipName } } },
      { new: true }
    );
  }

  if (weaponToUnequipInTreasure) {
    updatedPc = await Pc.findOneAndUpdate(
      { name, 'items.treasure.weapons.name': weaponToUnequipName },
      { $inc: { 'items.treasure.weapons.$.amount': 1 } },
      { new: true }
    );
  } else {
    updatedPc = await Pc.findOneAndUpdate(
      { name },
      { $push: { 'items.treasure.weapons': getItem(weaponToUnequipName) } },
      { new: true }
    );
  }

  updatedPc = await Pc.findOneAndUpdate(
    { name, 'items.weapons.name': weaponToUnequipName },
    { $set: { 'items.weapons.$': getItem(weaponToEquipName) } },
    { new: true }
  );

  return updatedPc;
}

export async function equipWeaponInSlot(name, weaponToEquipName, slot) {
  const pc = await getPc(name);
  const {
    items: {
      weapons,
      treasure: { weapons: treasureWeapons },
    },
  } = pc;
  let updatedPc = null;
  const weaponToUnequip = weapons[slot];
  const weaponToUnequipName = weaponToUnequip?.name;
  const weaponToEquipInTreasure = treasureWeapons.find(
    w => w.name === weaponToEquipName
  );
  const weaponToUnequipInTreasure = treasureWeapons.find(
    w => w.name === weaponToUnequipName
  );

  updatedPc = await Pc.findOneAndUpdate(
    { name },
    { $set: { [`items.weapons.${slot}`]: getItem(weaponToEquipName) } },
    { new: true }
  );

  if (weaponToEquipInTreasure.amount > 1) {
    updatedPc = await Pc.findOneAndUpdate(
      { name, 'items.treasure.weapons.name': weaponToEquipName },
      { $inc: { 'items.treasure.weapons.$.amount': -1 } },
      { new: true }
    );
  } else {
    updatedPc = await Pc.findOneAndUpdate(
      { name },
      { $pull: { 'items.treasure.weapons': { name: weaponToEquipName } } },
      { new: true }
    );
  }

  if (weaponToUnequip) {
    if (weaponToUnequipInTreasure) {
      updatedPc = await Pc.findOneAndUpdate(
        { name, 'items.treasure.weapons.name': weaponToUnequipName },
        { $inc: { 'items.treasure.weapons.$.amount': 1 } },
        { new: true }
      );
    } else {
      updatedPc = await Pc.findOneAndUpdate(
        { name },
        { $push: { 'items.treasure.weapons': getItem(weaponToUnequipName) } },
        { new: true }
      );
    }
  }

  return updatedPc;
}

export async function reorderWeapons(name, weaponName, destinationSlot) {
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

export async function addLevelHitPoints(name, extraHitPoints) {
  const updatedPc = await Pc.findOneAndUpdate(
    { name: name },
    {
      $push: { totalHitPoints: extraHitPoints },
      $inc: { hitPoints: extraHitPoints, hitDice: 1, remainingHitDice: 1 },
    },
    { new: true }
  ).exec();

  return updatedPc;
}
