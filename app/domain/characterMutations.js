import { STATS, isStat, getInitialHitPoints } from '~/domain/characters';
import { updatePc } from '~/services/pc.server';

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
    maxHitPoints: getInitialHitPoints(updatedPc),
    hitPoints: getInitialHitPoints(updatedPc),
  });
}
