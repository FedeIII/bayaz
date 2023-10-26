import { Fragment } from 'react';
import {
  STATS,
  getProficiencyBonus,
  getStat,
  getStatMod,
  isProficientStat,
  statSavingThrow,
} from '~/domain/characters';
import { increment } from '~/domain/display';

import styles from '~/components/sheet.module.css';

function SheetStats(props) {
  const { pc } = props;
  const { level, pClass } = pc;

  return (
    <>
      {STATS.map(statName => (
        <Fragment key={statName}>
          <span className={`${styles.data} ${styles[statName]}`}>
            {getStat(pc, statName)}
          </span>
          <span className={`${styles.data} ${styles[`${statName}Mod`]}`}>
            {increment(getStatMod(getStat(pc, statName)))}
          </span>
        </Fragment>
      ))}
      <span className={`${styles.data} ${styles.proficiencyBonus}`}>
        {increment(getProficiencyBonus(level))}
      </span>
      {STATS.map(statName => (
        <Fragment key={statName}>
          {isProficientStat(statName, pClass) && (
            <span className={`${styles.data} ${styles[`${statName}Prof`]}`}>
              ◍
            </span>
          )}
          <span className={`${styles.data} ${styles[`${statName}Saving`]}`}>
            {increment(
              statSavingThrow(statName, getStat(pc, statName), pClass, level)
            )}
          </span>
        </Fragment>
      ))}
    </>
  );
}

export default SheetStats;
