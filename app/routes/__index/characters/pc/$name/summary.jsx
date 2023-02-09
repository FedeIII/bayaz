import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Fragment } from 'react';

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
  getFavoredEnemies,
  translateFavoredEnemy,
  getFavoredTerrains,
  translateFavoredTerrain,
  getRangerArchetype,
  translateRangerArchetype,
  getFightingStyle,
  translateFightingStyle,
  getSorcererOrigin,
  translateSorcererOrigin,
  getDragonAncestor,
  translateDragonAncestor,
} from '~/utils/characters';
import { increment } from '~/utils/display';

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
  const { pClass, name, race, speed, level, maxHitPoints, hitPoints, exp } = pc;

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
          {!!getDivineDomain(pc) && (
            <span className={styles.traitLabel}>
              Senda Primaria:{' '}
              <strong className={styles.trait}>
                Senda del {translatePrimalPath(getDivineDomain(pc))}
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
          {!!getFavoredEnemies(pc)?.length && (
            <ul className={styles.traitLabel}>
              Enemigos Predilectos (Bonificacion en Inteligencia y Sabiduría
              x2):{' '}
              {getFavoredEnemies(pc).map(favoredEnemy => (
                <li className={styles.traitItem} key={favoredEnemy}>
                  {translateFavoredEnemy(favoredEnemy)}
                </li>
              ))}
            </ul>
          )}
          {!!getFavoredTerrains(pc)?.length && (
            <ul className={styles.traitLabel}>
              Terrenos Predilectos (Bonificacion en Inteligencia y Sabiduría x2
              + reglas extra):{' '}
              {getFavoredTerrains(pc).map(favoredEnemy => (
                <li className={styles.traitItem} key={favoredEnemy}>
                  {translateFavoredTerrain(favoredEnemy)}
                </li>
              ))}
            </ul>
          )}
          {!!getRangerArchetype(pc) && (
            <span className={styles.traitLabel}>
              Arquetipo de Explorador:{' '}
              <strong className={styles.trait}>
                {translateRangerArchetype(getRangerArchetype(pc))}
              </strong>
            </span>
          )}
          {!!getFightingStyle(pc) && (
            <span className={styles.traitLabel}>
              Estilo de Combate:{' '}
              <strong className={styles.trait}>
                {translateFightingStyle(getFightingStyle(pc))}
              </strong>
            </span>
          )}
          {!!getSorcererOrigin(pc) && (
            <ul className={styles.traitLabel}>
              Origen de Hechicero:{' '}
              <li className={styles.traitItem}>
                {translateSorcererOrigin(getSorcererOrigin(pc))}
              </li>
              {getSorcererOrigin(pc) === 'draconic-bloodline' && (
                <>
                  <li className={styles.traitItem}>
                    CA 13 + Dex bonus sin armadura
                  </li>
                  <li className={styles.traitItem}>
                    x2 Bonus a pruebas de Carisma contra dragones
                  </li>
                </>
              )}
              {getSorcererOrigin(pc) === 'wild-magic' && (
                <>
                  <li className={styles.traitItem}>Oleada de Magia Salvaje</li>
                  <li className={styles.traitItem}>Mareas de Caos</li>
                </>
              )}
            </ul>
          )}
          {!!getDragonAncestor(pc) && (
            <span className={styles.traitLabel}>
              Ancestro Dragón:{' '}
              <strong className={styles.trait}>
                {translateDragonAncestor(getDragonAncestor(pc))}
              </strong>
            </span>
          )}
        </div>
      </div>
    </>
  );
}

export default PcSummary;
