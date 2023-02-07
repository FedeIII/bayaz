import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { getPc } from '~/services/pc.server';
import {
  STATS,
  stat,
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
    extraStats,
    skills,
    halfElf: { skills: halfElfSkills } = { skills: [] },
  } = pc;

  const allSkills = [...skills, ...halfElfSkills];
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
              {increment(getStatMod(stat(pc, statName)))}
            </span>
            <span className={`${styles.data} ${styles[statName]}`}>
              {stat(pc, statName)}
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
                statSavingThrow(statName, stat(pc, statName), pClass, level)
              )}
            </span>
          </Fragment>
        ))}

        {/* OTHER ATTRS */}
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
        <span className={`${styles.data} ${styles.extraHitPoints}`}>
          {increment(getExtraHitPoints(race, subrace))}
        </span>

        {/* SKILLS */}
        {SKILLS.map(
          skill =>
            allSkills.includes(skill.name) && (
              <span className={`${styles.data} ${styles[`${skill.name}Prof`]}`}>
                ◍
              </span>
            )
        )}
        {SKILLS.map(skill => (
          <span className={`${styles.data} ${styles[`${skill.name}Saving`]}`}>
            {increment(skillCheckBonus(pc, skill.name))}
            {Object.keys(conditionalSkills).includes(skill.name) && (
              <span className={styles.annotation}>
                ({increment(conditionalSkills[skill.name](pc))})
              </span>
            )}
          </span>
        ))}
      </div>
    </>
  );
}

export default PcSummary;
