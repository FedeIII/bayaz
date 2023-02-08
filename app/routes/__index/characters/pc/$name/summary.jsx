import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { getPc } from '~/services/pc.server';
import {
  STATS,
  getStat,
  translateClass,
  translateRace,
  getStatMod,
  proficiencyBonus,
  statSavingThrow,
  isProficientStat,
  CLASSES,
  getExtraHitPoints,
  SKILLS,
  skillCheckBonus,
  getConditionalSkills,
  getSkills,
  translatePrimalPath,
  translateDivineDomain,
  getDivineDomain,
} from '~/utils/characters';
import { signed, increment } from '~/utils/display';

import styles from '~/components/sheet.module.css';
import { Fragment } from 'react';

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
    pClass,
    name,
    race,
    speed,
    subrace,
    level,
    maxHitPoints,
    hitPoints,
    exp,
    classAttrs: { primalPath } = {},
  } = pc;

  const allSkills = getSkills(pc);
  const conditionalSkills = getConditionalSkills(pc);

  return (
    <>
      <img src="/images/sheet1.jpg" className={styles.sheetBackground} />
      <div className={styles.summary}>
        {/* BASIC ATTRS */}
        <span className={`${styles.data} ${styles.name}`}>{name}</span>
        <span className={`${styles.data} ${styles.pClass}`}>
          {translateClass(pClass)} lvl {level}
        </span>
        <span className={`${styles.data} ${styles.race}`}>
          {translateRace(race)}
        </span>
        <span className={`${styles.data} ${styles.exp}`}>{exp}</span>

        {/* STATS */}
        {STATS.map(statName => (
          <Fragment key={statName}>
            <span className={`${styles.data} ${styles[`${statName}Mod`]}`}>
              {increment(getStatMod(getStat(pc, statName)))}
            </span>
            <span className={`${styles.data} ${styles[statName]}`}>
              {getStat(pc, statName)}
            </span>
          </Fragment>
        ))}
        <span className={`${styles.data} ${styles.proficiencyBonus}`}>
          {increment(proficiencyBonus(level))}
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

        {/* COMBAT ATTRS */}
        <span className={`${styles.data} ${styles.speed}`}>{speed}m</span>
        <span className={`${styles.data} ${styles.maxHitPoints}`}>
          {maxHitPoints}
        </span>
        <span className={`${styles.data} ${styles.hitPoints}`}>
          {hitPoints}
        </span>
        <span className={`${styles.data} ${styles.hitDice}`}>
          {CLASSES[pClass].hitDice} {increment(getExtraHitPoints(pc))}
        </span>
        <span className={`${styles.data} ${styles.remainingHitDice}`}>
          {CLASSES[pClass].hitDice}
        </span>

        {/* SKILLS */}
        {SKILLS.map(
          skill =>
            allSkills.includes(skill.name) && (
              <span
                className={`${styles.data} ${styles[`${skill.name}Prof`]}`}
                key={skill.name}
              >
                ◍
              </span>
            )
        )}
        {SKILLS.map(skill => (
          <span
            className={`${styles.data} ${styles[`${skill.name}Saving`]}`}
            key={skill.name}
          >
            {increment(skillCheckBonus(pc, skill.name))}
            {Object.keys(conditionalSkills).includes(skill.name) && (
              <span className={styles.annotation}>
                ({increment(conditionalSkills[skill.name](pc))})
              </span>
            )}
          </span>
        ))}

        {/* FEATS & TRAITS */}
        <div className={`${styles.data} ${styles.featsAndTraits}`}>
          {!!primalPath && (
            <span className={styles.traitLabel}>
              Senda Primaria:{' '}
              <strong className={styles.trait}>
                Senda del {translatePrimalPath(primalPath)}
              </strong>
            </span>
          )}
          {!!getDivineDomain(pc) && (
            <span className={styles.traitLabel}>
              Dominio Divino:{' '}
              <strong className={styles.trait}>
                Dominio de {translateDivineDomain(getDivineDomain(pc))}
              </strong>
            </span>
          )}
        </div>
      </div>
    </>
  );
}

export default PcSummary;
