import { json } from '@remix-run/node';
import { Form, useLoaderData, useTransition } from '@remix-run/react';
import { Fragment, useState } from 'react';

import { getPc, updatePc } from '~/services/pc.server';
import {
  STATS,
  getStat,
  translateClass,
  translateRace,
  getStatMod,
  getProficiencyBonus,
  statSavingThrow,
  isProficientStat,
  CLASSES,
  getExtraHitPoints,
  SKILLS,
  skillCheckBonus,
  getConditionalSkills,
  getSkills,
  translateSkill,
  translateLanguage,
  getPassivePerception,
  getItemProficiencies,
  getArmorClass,
  getExtraArmorClass,
} from '~/utils/characters';
import { getExpertSkills } from '~/utils/rogue';
import {
  getSorcererOrigin,
  translateSorcererOrigin,
  getDragonAncestor,
  translateDragonAncestor,
} from '~/utils/sorcerer';
import { getFightingStyles, translateFightingStyle } from '~/utils/fighter';
import {
  getFavoredEnemies,
  translateFavoredEnemy,
  getFavoredTerrains,
  translateFavoredTerrain,
  getRangerArchetype,
  translateRangerArchetype,
} from '~/utils/ranger';
import { translateDivineDomain, getDivineDomain } from '~/utils/cleric';
import { getPrimalPath, translatePrimalPath } from '~/utils/barbarian';
import {
  getAttacks,
  getItemDisplayList,
  getSpecialAttacks,
  increment,
  listItems,
} from '~/utils/display';
import { translateItem, translatePack } from '~/utils/equipment/equipment';
import { getPackItems } from '~/utils/equipment/packs';

import styles from '~/components/sheet.module.css';

export const loader = async ({ params }) => {
  const pc = await getPc(params.name);
  if (!pc) {
    throw new Error('pc not found');
  }
  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const name = formData.get('name');
  const personality = formData.get('personality');
  const ideals = formData.get('ideals');
  const bonds = formData.get('bonds');
  const flaws = formData.get('flaws');

  await updatePc({
    name,
    freeText: { personality, ideals, bonds, flaws },
  });

  return null;
};

function PcSummary() {
  const { pc } = useLoaderData();
  const {
    pClass,
    name,
    race,
    speed,
    level,
    maxHitPoints,
    hitPoints,
    exp,
    languages,
    equipment,
    pack,
    freeText: { personality, ideals, bonds, flaws } = {},
  } = pc;

  const transition = useTransition();
  const isCreating = Boolean(transition.submission);

  const allSkills = getSkills(pc);
  const conditionalSkills = getConditionalSkills(pc);

  const [isSubmitShown, setIsSubmitShown] = useState(false);

  function onFreeTextChange() {
    setIsSubmitShown(true);
  }

  function onFormSubmit(e) {
    setIsSubmitShown(false);
  }

  return (
    <>
      <img src="/images/sheet1.jpg" className={styles.sheetBackground} />
      <Form method="post" className={styles.summary} onSubmit={onFormSubmit}>
        <input readOnly type="text" name="name" value={name} hidden />

        {/* FREE TEXT SUBMIT */}
        {isSubmitShown && (
          <button type="submit" disabled={isCreating} className={`${styles.data} ${styles.submit}`}>
            Actualizar
          </button>
        )}

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

        <span className={`${styles.data} ${styles.passivePerception}`}>
          {getPassivePerception(pc)}
        </span>

        {/* COMBAT ATTRS */}
        <div className={`${styles.data} ${styles.armorClass}`}>
          {getArmorClass(pc)}
          <span className={`${styles.data} ${styles.extraArmorClass}`}>
            {getExtraArmorClass(pc)
              ? `(${increment(getExtraArmorClass(pc))})`
              : null}
          </span>
        </div>
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

        {/* ATTACKS */}
        {getAttacks(pc).map((attack, i) => (
          <Fragment key={attack.name}>
            <span className={`${styles.data} ${styles['attackName-' + i]}`}>
              {attack.name}{' '}
              {!!attack.specialAttackIndex && (
                <sup className={styles.superscript}>
                  {attack.specialAttackIndex}
                </sup>
              )}
            </span>
            <span className={`${styles.data} ${styles['attackBonus-' + i]}`}>
              {increment(attack.bonus)}
            </span>
            <span className={`${styles.data} ${styles['attackType-' + i]}`}>
              {attack.damage}
              <br />
              {attack.type}
            </span>
          </Fragment>
        ))}
        <ul className={`${styles.data} ${styles.specialAttacks}`}>
          {getSpecialAttacks(pc).map((specialAttack, i) => (
            <li className={styles.specialAttack} key={i}>
              {specialAttack}
            </li>
          ))}
        </ul>

        {/* EQUIPMENT */}
        <div className={`${styles.data} ${styles.equipment}`}>
          <div>{listItems(equipment)}</div>
          {pack && (
            <div>
              <u>{translatePack(pack) + ':'}</u>
              {' ' + listItems(getPackItems(pack))}
            </div>
          )}
        </div>

        {/* FREETEXT */}
        <textarea
          className={`${styles.data} ${styles.personality}`}
          name="personality"
          defaultValue={personality}
          onChange={onFreeTextChange}
        ></textarea>
        <textarea
          className={`${styles.data} ${styles.ideals}`}
          name="ideals"
          defaultValue={ideals}
          onChange={onFreeTextChange}
        ></textarea>
        <textarea
          className={`${styles.data} ${styles.bonds}`}
          name="bonds"
          defaultValue={bonds}
          onChange={onFreeTextChange}
        ></textarea>
        <textarea
          className={`${styles.data} ${styles.flaws}`}
          name="flaws"
          defaultValue={flaws}
          onChange={onFreeTextChange}
        ></textarea>

        {/* FEATS & TRAITS */}
        <ul className={`${styles.data} ${styles.featsAndTraits}`}>
          {!!getPrimalPath(pc) && (
            <li className={styles.traitLabel}>
              <span className={styles.traitTitle}>Senda Primaria:</span>
              <strong className={styles.trait}>
                {' '}
                Senda del {translatePrimalPath(getPrimalPath(pc))}
              </strong>
            </li>
          )}
          {!!getDivineDomain(pc) && (
            <li className={styles.traitLabel}>
              <span className={styles.traitTitle}>Dominio Divino:</span>
              <strong className={styles.trait}>
                {' '}
                Dominio de {translateDivineDomain(getDivineDomain(pc))}
              </strong>
            </li>
          )}
          {!!getFavoredEnemies(pc)?.length && (
            <li className={styles.traitLabel}>
              <span className={styles.traitTitle}>
                Enemigos Predilectos (Bonificacion en Inteligencia y Sabiduría
                x2):
              </span>
              <ul className={styles.traitLabel}>
                {getFavoredEnemies(pc).map(favoredEnemy => (
                  <li className={styles.traitItem} key={favoredEnemy}>
                    {translateFavoredEnemy(favoredEnemy)}
                  </li>
                ))}
              </ul>
            </li>
          )}
          {!!getFavoredTerrains(pc)?.length && (
            <li className={styles.traitLabel}>
              <span className={styles.traitTitle}>
                Terrenos Predilectos (Bonificacion en Inteligencia y Sabiduría
                x2 + reglas extra):
              </span>
              <ul className={styles.traitLabel}>
                {getFavoredTerrains(pc).map(favoredEnemy => (
                  <li className={styles.traitItem} key={favoredEnemy}>
                    {translateFavoredTerrain(favoredEnemy)}
                  </li>
                ))}
              </ul>
            </li>
          )}
          {!!getRangerArchetype(pc) && (
            <li className={styles.traitLabel}>
              <span className={styles.traitTitle}>
                Arquetipo de Explorador:
              </span>
              <strong className={styles.trait}>
                {' '}
                {translateRangerArchetype(getRangerArchetype(pc))}
              </strong>
            </li>
          )}
          {!!getFightingStyles(pc)?.length && (
            <li className={styles.traitLabel}>
              <span className={styles.traitTitle}>Estilos de Combate:</span>
              <ul className={styles.traitLabel}>
                {getFightingStyles(pc).map(fightingStyle => (
                  <li className={styles.traitItem} key={fightingStyle}>
                    {translateFightingStyle(fightingStyle)}
                  </li>
                ))}
              </ul>
            </li>
          )}
          {!!getSorcererOrigin(pc) && (
            <li className={styles.traitLabel}>
              <span className={styles.traitTitle}>Origen de Hechicero:</span>
              <strong className={styles.trait}>
                {' '}
                {translateSorcererOrigin(getSorcererOrigin(pc))}
              </strong>
              {getSorcererOrigin(pc) === 'draconic-bloodline' && (
                <ul className={styles.traitLabel}>
                  <li className={styles.traitItem}>
                    CA 13 + Dex bonus sin armadura
                  </li>
                  <li className={styles.traitItem}>
                    x2 Bonus a pruebas de Carisma contra dragones
                  </li>
                </ul>
              )}
              {getSorcererOrigin(pc) === 'wild-magic' && (
                <ul className={styles.traitLabel}>
                  <li className={styles.traitItem}>Oleada de Magia Salvaje</li>
                  <li className={styles.traitItem}>Mareas de Caos</li>
                </ul>
              )}
            </li>
          )}
          {!!getDragonAncestor(pc) && (
            <li className={styles.traitLabel}>
              <span className={styles.traitTitle}>Ancestro Dragón:</span>
              <strong className={styles.trait}>
                {' '}
                {translateDragonAncestor(getDragonAncestor(pc))}
              </strong>
            </li>
          )}
          {!!getExpertSkills(pc)?.length && (
            <li className={styles.traitLabel}>
              <span className={styles.traitTitle}>Experto en:</span>
              <ul className={styles.traitLabel}>
                {getExpertSkills(pc).map(skillName => (
                  <li className={styles.traitItem} key={skillName}>
                    {translateSkill(skillName)}
                  </li>
                ))}
              </ul>
            </li>
          )}
        </ul>

        {/* PROFICIENCIES & LANGUAGES */}
        <ul className={`${styles.data} ${styles.competencesAndLanguages}`}>
          <li className={styles.traitLabel}>
            <span className={styles.traitTitle}>Idiomas:</span>{' '}
            <strong className={styles.trait}>
              {languages
                .map(language => translateLanguage(language))
                .join(', ')}
            </strong>
          </li>

          <li className={styles.traitLabel}>
            <span className={styles.traitTitle}>Competente con:</span>{' '}
            {getItemDisplayList(getItemProficiencies(pc)).map(
              (itemName, i, proficiencies) => (
                <strong className={styles.trait} key={itemName}>
                  {translateItem(itemName)}
                  {i + 1 < proficiencies.length && ', '}
                </strong>
              )
            )}
          </li>

          {CLASSES[pClass].proficiencies &&
            Object.entries(CLASSES[pClass].proficiencies).map(
              ([profName, profValue]) => (
                <li className={styles.traitLabel} key={profName}>
                  {profName}:{' '}
                  <strong className={styles.trait}>{profValue(pc)}</strong>
                </li>
              )
            )}
        </ul>
      </Form>
    </>
  );
}

export default PcSummary;
