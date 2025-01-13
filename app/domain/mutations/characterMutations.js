import {
  STATS,
  isStat,
  getInitialHitPoints,
  CLASSES,
  getStatMod,
  getStat,
  getMinHpShortRest,
} from '~/domain/characters';
import {
  addItemToSection,
  getPc,
  healPc,
  increaseItemAmount,
  updateAttrsForClass,
  updateFeatAttr,
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
import {
  getFeat,
  hasToSelectFeatStat,
  MAX_LUCK_POINTS,
} from '../feats/featUtils';

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
  let pcModel = await getPc(id);
  const pc = pcModel.toObject();

  const { remainingHitDice, pClass, magic } = pc;

  if (remainingHitDice > 0) {
    if (!dieValue) {
      dieValue = rollDice(`${diceAmount}${CLASSES()[pClass].hitDice.slice(1)}`);
    }

    const minHp = getMinHpShortRest(pc, diceAmount);
    if (dieValue < minHp) {
      dieValue = minHp;
    }

    dieValue += diceAmount * getStatMod(getStat(pc, 'con'));

    pcModel = await updatePc({
      id,
      remainingHitDice: remainingHitDice - diceAmount,
    });
    pcModel = await healPc(id, dieValue);
  }

  if (pClass === 'paladin') {
    pcModel = await updateAttrsForClass(id, 'paladin', {
      channelDivinity: getMaxChannelDivinity(),
    });
  }

  if (pClass === 'warlock') {
    pcModel = await updatePc({
      id,
      magic: { ...magic, spentSpellSlots: Array(10).fill(0) },
    });
  }

  return pcModel;
}

export async function longRest(id) {
  let pcModel = await getPc(id);
  const pc = pcModel.toObject();
  const { remainingHitDice, hitDice, magic, pClass, feats } = pc;

  let newRemainingHitDice =
    remainingHitDice + (hitDice / 2 >= 1 ? Math.floor(hitDice / 2) : 1);
  newRemainingHitDice =
    newRemainingHitDice > hitDice ? hitDice : newRemainingHitDice;

  pcModel = await updatePc({
    id,
    remainingHitDice: newRemainingHitDice,
    magic: { ...magic, spentSpellSlots: Array(10).fill(0) },
  });
  pcModel = await healPc(id, Infinity);

  if (pClass === 'bard') {
    pcModel = await updateAttrsForClass(id, 'bard', {
      bardicInspiration: getStatMod(getStat(pc, 'cha')),
    });
  }

  if (pClass === 'paladin') {
    pcModel = await updateAttrsForClass(id, 'paladin', {
      layOnHands: getMaxLayOnHands(pc),
      divineSense: getMaxDivineSense(pc),
      channelDivinity: getMaxChannelDivinity(),
    });
  }

  if (pClass === 'sorcerer') {
    pcModel = await updateAttrsForClass(id, 'sorcerer', {
      fontOfMagic: getMaxSorcereryPoints(pc),
      tidesOfChaos: getMaxTidesOfChaos(),
    });
  }

  if (feats?.list?.includes('luckyFeat')) {
    pcModel = await updateFeatAttr(id, 'luckyFeat', MAX_LUCK_POINTS);
  }

  return pcModel;
}

export async function changeSpellSlot(id, spellSlotLevel, amount) {
  let pcModel = await getPc(id);
  const pc = pcModel.toObject();
  const { magic } = pc;
  const spellSlots = getSpellSlots(pc);

  if (amount <= spellSlots[spellSlotLevel]) {
    const newSpentSpellSlots = magic.spentSpellSlots.slice();
    newSpentSpellSlots[spellSlotLevel] = amount;
    pcModel = await updatePc({
      id,
      magic: { ...magic, spentSpellSlots: newSpentSpellSlots },
    });
  }

  return pcModel;
}

export async function resetSpellSlots(id, spellsLevel) {
  let pcModel = await getPc(id);
  const pc = pcModel.toObject();
  const { magic } = pc;

  const newSpentSpellSlots = magic.spentSpellSlots.slice();
  newSpentSpellSlots[spellsLevel] = 0;

  pcModel = await updatePc({
    id,
    magic: { ...magic, spentSpellSlots: newSpentSpellSlots },
  });

  return pcModel;
}

export async function damagePc(id, damage) {
  let pcModel = await getPc(id);
  const pc = pcModel.toObject();
  const { hitPoints, temporaryHitPoints } = pc;

  if (temporaryHitPoints) {
    damage -= temporaryHitPoints;
  }

  if (damage >= 0) {
    pcModel = await updatePc({
      id,
      hitPoints: hitPoints - damage,
      temporaryHitPoints: 0,
    });
  } else {
    pcModel = await updatePc({
      id,
      temporaryHitPoints: -damage,
    });
  }

  return pcModel;
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
  const pcModel = await getPc(id);
  const pc = pcModel.toObject();
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

export async function addFeatToPc(id, featId) {
  const pcModel = await getPc(id);
  const pc = pcModel.toObject();

  if (!pcModel.feats) {
    pcModel.feats = {
      list: [],
      extraStats: {},
      elementalAdept: [],
      martialAdept: [],
    };
  }

  const feats = pcModel.feats;

  if (featId === 'elementalAdept' || !feats.list.includes(featId)) {
    feats.list.push(featId);

    const feat = getFeat(featId);
    if (feat?.bonus?.stats && !hasToSelectFeatStat(pc, featId)) {
      Object.entries(feat.bonus.stats).forEach(([stat, value]) => {
        const stats = feats.extraStats.get(featId) || [];
        feats.extraStats.set(featId, [...stats, ...Array(value).fill(stat)]);
      });
    }
  }

  if (featId === 'luckyFeat') {
    feats.luckyFeat = MAX_LUCK_POINTS;
  }

  return await pcModel.save();
}
