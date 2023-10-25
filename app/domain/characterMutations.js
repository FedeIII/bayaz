import {
  STATS,
  isStat,
  getInitialHitPoints,
  CLASSES,
  getStatMod,
  getStat,
} from '~/domain/characters';
import { getPc, healPc, updatePc } from '~/services/pc.server';
import { rollDice } from '~/domain/random';
import { getSpellSlots } from './spells/spells';

export async function setPcStats(pcParams) {
  const {
    name,
    extraPoints,
    selectedExtraPoints,
    stats: paramStats,
    extraStats: paramExtraStats,
  } = pcParams;

  const stats = STATS.reduce(
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
    name,
    stats,
    extraStats,
    halfElf: { extraStats: halfElfExtraStats },
  });

  await updatePc({
    name,
    totalHitPoints: getInitialHitPoints(updatedPc),
    hitPoints: getInitialHitPoints(updatedPc),
  });
}

export async function spendHitDie(pcName, diceAmount, dieValue) {
  let pc = await getPc(pcName);
  const { remainingHitDice, pClass } = pc;

  if (remainingHitDice === 0) {
    return pc;
  }

  if (!dieValue) {
    dieValue = rollDice(`${diceAmount}${CLASSES[pClass].hitDice.slice(1)}`);
  }

  dieValue += diceAmount * getStatMod(getStat(pc, 'con'));

  pc = await updatePc({
    name: pcName,
    remainingHitDice: remainingHitDice - diceAmount,
  });
  pc = await healPc(pcName, dieValue);

  return pc;
}

export async function longRest(pcName) {
  let pc = await getPc(pcName);
  const { remainingHitDice, hitDice, magic } = pc;

  let newRemainingHitDice =
    remainingHitDice + (hitDice / 2 >= 1 ? Math.floor(hitDice / 2) : 1);
  newRemainingHitDice =
    newRemainingHitDice > hitDice ? hitDice : newRemainingHitDice;

  pc = await updatePc({
    name: pcName,
    remainingHitDice: newRemainingHitDice,
    magic: { ...magic, spentSpellSlots: Array(10).fill(0) },
  });
  pc = await healPc(pcName, Infinity);

  return pc;
}

export async function spendSpellSlot(pcName, spellSlotLevel) {
  let pc = await getPc(pcName);
  const { magic } = pc;
  const spellSlots = getSpellSlots(pc);

  if (magic.spentSpellSlots[spellSlotLevel] < spellSlots[spellSlotLevel]) {
    const newSpentSpellSlots = magic.spentSpellSlots.slice();
    newSpentSpellSlots[spellSlotLevel] += 1;
    pc = await updatePc({
      name: pcName,
      magic: { ...magic, spentSpellSlots: newSpentSpellSlots },
    });
  }

  return pc;
}

export async function resetSpellSlots(pcName, spellsLevel) {
  let pc = await getPc(pcName);
  const { magic } = pc;

  const newSpentSpellSlots = magic.spentSpellSlots.slice();
  newSpentSpellSlots[spellsLevel] = 0;

  pc = await updatePc({
    name: pcName,
    magic: { ...magic, spentSpellSlots: newSpentSpellSlots },
  });

  return pc;
}
