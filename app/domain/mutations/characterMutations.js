import {
  STATS,
  isStat,
  getInitialHitPoints,
  CLASSES,
  getStatMod,
  getStat,
} from '~/domain/characters';
import {
  addItemToSection,
  getPc,
  healPc,
  increaseItemAmount,
  updateAttrsForClass,
  updatePc,
} from '~/services/pc.server';
import { rollDice } from '~/domain/random';
import { getSpellSlots } from '../spells/spells';
import { getItem } from '../equipment/equipment';
import { getMaxSorcereryPoints } from '../spells/sorcerer';
import {
  getMaxChannelDivinity,
  getMaxDivineSense,
  getMaxLayOnHands,
} from '../classes/paladin/paladin';
import { getMaxTidesOfChaos } from '../classes/sorcerer/sorcerer';
import { getter } from '~/utils/objects';

export async function setPcStats(pcParams) {
  const {
    id,
    extraPoints,
    selectedExtraPoints,
    stats: paramStats,
    extraStats: paramExtraStats,
  } = pcParams;

  const stats = STATS().reduce(
    (pcStats, statName) => ({
      ...pcStats,
      [statName]: parseInt(paramStats[statName], 10),
    }),
    {}
  );

  const extraStats = ({} = extraPoints?.length
    ? extraPoints.reduce(
        (s, statName) => {
          if (!isStat(statName)) return s;

          return {
            ...s,
            [statName]: s[statName] + 1,
          };
        },
        { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 }
      )
    : {
        str: parseInt(paramExtraStats.str, 10) || 0,
        dex: parseInt(paramExtraStats.dex, 10) || 0,
        con: parseInt(paramExtraStats.con, 10) || 0,
        int: parseInt(paramExtraStats.int, 10) || 0,
        wis: parseInt(paramExtraStats.wis, 10) || 0,
        cha: parseInt(paramExtraStats.cha, 10) || 0,
      });

  const halfElfExtraStats = selectedExtraPoints.reduce(
    (s, statName) => {
      if (!isStat(statName)) return s;

      return {
        ...s,
        [statName]: s[statName] + 1,
      };
    },
    { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 }
  );

  const updatedPc = await updatePc({
    id,
    stats,
    extraStats,
    'halfElf.extraStats': halfElfExtraStats,
  });

  await updatePc({
    id,
    totalHitPoints: getInitialHitPoints(updatedPc),
    hitPoints: getInitialHitPoints(updatedPc),
  });
}

export async function shortRest(id, diceAmount, dieValue) {
  let pc = await getPc(id);
  const { remainingHitDice, pClass, magic: magicModel } = pc;
  const magic = magicModel.toObject();

  if (remainingHitDice > 0) {
    if (!dieValue) {
      dieValue = rollDice(`${diceAmount}${CLASSES()[pClass].hitDice.slice(1)}`);
    }

    dieValue += diceAmount * getStatMod(getStat(pc, 'con'));

    pc = await updatePc({
      id,
      remainingHitDice: remainingHitDice - diceAmount,
    });
    pc = await healPc(id, dieValue);
  }

  if (pClass === 'paladin') {
    pc = await updateAttrsForClass(id, 'paladin', {
      channelDivinity: getMaxChannelDivinity(),
    });
  }

  if (pClass === 'warlock') {
    pc = await updatePc({
      id,
      magic: { ...magic, spentSpellSlots: Array(10).fill(0) },
    });
  }

  return pc;
}

export async function longRest(id) {
  let pc = await getPc(id);
  const { remainingHitDice, hitDice, magic, pClass } = pc;

  let newRemainingHitDice =
    remainingHitDice + (hitDice / 2 >= 1 ? Math.floor(hitDice / 2) : 1);
  newRemainingHitDice =
    newRemainingHitDice > hitDice ? hitDice : newRemainingHitDice;

  pc = await updatePc({
    id,
    remainingHitDice: newRemainingHitDice,
    magic: { ...magic, spentSpellSlots: Array(10).fill(0) },
  });
  pc = await healPc(id, Infinity);

  if (pClass === 'bard') {
    pc = await updateAttrsForClass(id, 'bard', {
      bardicInspiration: getStatMod(getStat(pc, 'cha')),
    });
  }

  if (pClass === 'paladin') {
    pc = await updateAttrsForClass(id, 'paladin', {
      layOnHands: getMaxLayOnHands(pc),
      divineSense: getMaxDivineSense(pc),
      channelDivinity: getMaxChannelDivinity(),
    });
  }

  if (pClass === 'sorcerer') {
    pc = await updateAttrsForClass(id, 'sorcerer', {
      fontOfMagic: getMaxSorcereryPoints(pc),
      tidesOfChaos: getMaxTidesOfChaos(),
    });
  }

  return pc;
}

export async function changeSpellSlot(id, spellSlotLevel, amount) {
  let pc = await getPc(id);
  const { magic } = pc;
  const spellSlots = getSpellSlots(pc);

  if (amount <= spellSlots[spellSlotLevel]) {
    const newSpentSpellSlots = magic.spentSpellSlots.slice();
    newSpentSpellSlots[spellSlotLevel] = amount;
    pc = await updatePc({
      id,
      magic: { ...magic, spentSpellSlots: newSpentSpellSlots },
    });
  }

  return pc;
}

export async function resetSpellSlots(id, spellsLevel) {
  let pc = await getPc(id);
  const { magic } = pc;

  const newSpentSpellSlots = magic.spentSpellSlots.slice();
  newSpentSpellSlots[spellsLevel] = 0;

  pc = await updatePc({
    id,
    magic: { ...magic, spentSpellSlots: newSpentSpellSlots },
  });

  return pc;
}

export async function damagePc(id, damage) {
  let pc = await getPc(id);
  const { hitPoints, temporaryHitPoints } = pc;

  if (temporaryHitPoints) {
    damage -= temporaryHitPoints;
  }

  if (damage >= 0) {
    pc = await updatePc({
      id,
      hitPoints: hitPoints - damage,
      temporaryHitPoints: 0,
    });
  } else {
    pc = await updatePc({
      id,
      temporaryHitPoints: -damage,
    });
  }

  return pc;
}

export async function addItemToPc(
  id,
  itemName,
  itemAmount,
  sectionPath,
  scrollSpellLevel,
  scrollSpellName
) {
  const amount = Number.isInteger(parseInt(itemAmount, 10)) ? itemAmount : 1;
  const pc = await getPc(id);
  const item = getItem(itemName);
  const stash = getter(pc.items, sectionPath);

  const existingItem = stash.find(
    pItem =>
      pItem.name === itemName &&
      (item.type !== 'scroll' || pItem.spellName === item.spellName)
  );

  if (existingItem) {
    return await increaseItemAmount(
      id,
      itemName,
      sectionPath,
      amount,
      scrollSpellName
    );
  }

  const pItem = { name: itemName, amount };
  if (scrollSpellName) {
    pItem.spellLevel = scrollSpellLevel;
    pItem.spellName = scrollSpellName;
  }
  return await addItemToSection(id, pItem, ...sectionPath.split('.'));
}
