import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { getPc } from '~/services/pc.server';
import {
  STATS,
  translateClass,
  translateRace,
  getStatMod,
  proficiencyBonus,
  statSavingThrow,
  isProficientStat,
  CLASSES,
} from '~/utils/characters';
import { signed, increment } from '~/utils/display';

import styles from '~/components/sheet.module.css';

export const loader = async ({ params }) => {
  const pc = await getPc(params.name);
  if (!pc) {
    throw new Error('pc not found');
  }
  return json({ pc });
};

function PcSummary() {
  const { pc } = useLoaderData();
  const {
    age,
    pClass,
    height,
    name,
    race,
    size,
    speed,
    subrace,
    weight,
    level,
    maxHitPoints,
    hitPoints,
    exp,
    stats,
  } = pc;

  return (
    <>
      <img src="/images/sheet1.jpg" className={styles.sheetBackground} />
      <div className={styles.summary}>
        <span className={`${styles.data} ${styles.name}`}>{name}</span>
        <span className={`${styles.data} ${styles.pClass}`}>
          {translateClass(pClass)} lvl {level}
        </span>
        <span className={`${styles.data} ${styles.race}`}>
          {translateRace(race)}
        </span>
        <span className={`${styles.data} ${styles.exp}`}>{exp}</span>
        {STATS.map(statName => (
          <>
            <span className={`${styles.data} ${styles[`${statName}Mod`]}`}>
              {increment(getStatMod(stats[statName]))}
            </span>
            <span className={`${styles.data} ${styles[statName]}`}>
              {stats[statName]}
            </span>
          </>
        ))}
        <span className={`${styles.data} ${styles.proficiencyBonus}`}>
          {increment(proficiencyBonus(level))}
        </span>
        {STATS.map(statName => (
          <>
            {isProficientStat(statName, pClass) && (
              <span className={`${styles.data} ${styles[`${statName}Prof`]}`}>
                ◍
              </span>
            )}
            <span className={`${styles.data} ${styles[`${statName}Saving`]}`}>
              {increment(statSavingThrow(statName, pClass, level))}
            </span>
          </>
        ))}
        <span className={`${styles.data} ${styles.speed}`}>{speed}m</span>
        <span className={`${styles.data} ${styles.maxHitPoints}`}>
          {maxHitPoints}
        </span>
        <span className={`${styles.data} ${styles.hitPoints}`}>
          {hitPoints}
        </span>
        <span className={`${styles.data} ${styles.hitDice}`}>
          {CLASSES[pClass].hitDice}
        </span>
      </div>
    </>
  );
}

export default PcSummary;
