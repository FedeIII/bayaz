import classNames from 'classnames';
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
import { getDexSavingThrowForShieldMaster, getFeats } from '~/domain/feats/featUtils';

function SheetStats(props) {
  const { pc } = props;
  const { level, pClass } = pc;

  const feats = getFeats(pc);

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
          <span
            className={classNames(
              'sheet__data',
              'sheet__saving',
              `sheet__${statName}Saving`,
              {
                'sheet__prof-skill': isProficientStat(statName, pClass),
              }
            )}
          >
            {increment(statSavingThrow(statName, getStat(pc, statName), pc))}
            {statName === 'dex' && feats.includes('shieldMaster') && (
              <span className="sheet__data sheet__saving-throw-note">
                ({increment(getDexSavingThrowForShieldMaster(pc))} contra daño)
              </span>
            )}
          </span>
        </Fragment>
      ))}
    </>
  );
}

export default SheetStats;
