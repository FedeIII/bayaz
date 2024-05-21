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

function SheetStats(props) {
  const { pc } = props;
  const { level, pClass } = pc;

  return (
    <>
      {STATS().map(statName => (
        <Fragment key={statName}>
          <span className={`sheet__data sheet__${statName}`}>
            {getStat(pc, statName)}
          </span>
          <span className={`sheet__data sheet__${statName}Mod`}>
            {increment(getStatMod(getStat(pc, statName)))}
          </span>
        </Fragment>
      ))}
      <span className="sheet__data sheet__proficiency-bonus">
        {increment(getProficiencyBonus(level))}
      </span>
      {STATS().map(statName => (
        <Fragment key={statName}>
          {isProficientStat(statName, pClass) && (
            <span className={`sheet__data sheet__${statName}Prof`}>◍</span>
          )}
          <span className={`sheet__data sheet__${statName}Saving`}>
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
