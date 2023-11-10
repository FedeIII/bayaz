import { Link } from '@remix-run/react';
import HitDiceActions from '~/components/skills/hitDiceActions';
import {
  CLASSES,
  getArmorClass,
  getAttackBonus,
  getAttackClassBonus,
  getExtraHitPoints,
  getItemProficiencies,
  getProficiencyBonus,
  getStat,
  getStatMod,
  translateClass,
} from './characters';
import { getAcBreakdown, increment } from './display';
import { getItem } from './equipment/equipment';

import styles from '~/components/modal/inventoryItem.module.css';

export const SKILLS_EXPLANATION = {
  levelUp: (skill, pc) => {
    return (
      <>
        <p>
          Cada vez que ganas un nivel, ganas 1 Dado de Golpe adicional. Lanza el
          Dado de Golpe, añade tu modificador de Constitución a la tirada y
          añade el total a tu máximo de Puntos de Golpe. Opcionalmente, puedes
          utilizar el valor fijo que se muestra en la entrada de la clase, que
          es el resultado medio de la tirada de tu Dado de Golpe (redondeando
          hacia arriba).
        </p>

        <div className={styles.modalButtons}>
          <Link
            to={`/characters/pc/${pc.name}/leveling/levelUp`}
            className={styles.modalButton}
          >
            Gana Puntos de Golpe
          </Link>
        </div>
      </>
    );
  },

  abilityScoreImprovement: (skill, pc) => {
    const {
      statImprove: [firstLevel, ...restLevels],
    } = CLASSES[pc.pClass];
    return (
      <>
        <p>
          Cuando alcanzas el nivel {firstLevel}, y nuevamente a los niveles{' '}
          {restLevels.join(', ')}, puedes incrementar una puntuación de
          característica de tu elección en 2 puntos, o dos puntuaciones de
          característica de tu elección en 1 punto. Como es habitual, no puedes
          incrementar una puntuación de característica por encima de 20 usando
          este procedimiento.
        </p>

        <div className={styles.modalButtons}>
          <Link
            to={`/characters/pc/${pc.name}/leveling/abilityScoreImprovement`}
            className={styles.modalButton}
          >
            Escoge puntos de caracterísitica
          </Link>
        </div>
      </>
    );
  },

  newSpells: (skill, pc) => (
    <>
      <p>Aprendes nuevos trucos y/o conjuros de {translateClass(pc.pClass)}</p>
      <div className={styles.modalButtons}>
        <Link
          to={`/characters/pc/${pc.name}/leveling/newSpells`}
          className={styles.modalButton}
        >
          Escoge conjuros
        </Link>
      </div>
    </>
  ),

  maxHitPoints: (skill, pc) => {
    const { totalHitPoints, level } = pc;
    const extraHitPoints = getExtraHitPoints(pc);
    const conHp = getStatMod(getStat(pc, 'con'));
    const extraHp = extraHitPoints - conHp * level;

    return (
      <div className={styles.hpContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              <th className={styles.tableCell}>Nivel</th>
              {totalHitPoints.map((roll, i) => (
                <th className={styles.tableCellLevel}>{i + 1}</th>
              ))}
              <th className={styles.tableCellExtra}>Con</th>
              {!!extraHp && <th className={styles.tableCellExtra}>Extra HP</th>}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.tableCell}>HP</td>
              {totalHitPoints.map(roll => (
                <td className={styles.tableCellLevel}>{increment(roll)}</td>
              ))}
              <td className={styles.tableCellExtra}>
                {increment(conHp)} x {level}
              </td>
              {!!extraHp && (
                <td className={styles.tableCellExtra}>{extraHp}</td>
              )}
            </tr>
          </tbody>
        </table>
      </div>
    );
  },

  remainingHitDice: (skill, pc, submit, closeModal) => {
    return (
      <HitDiceActions
        skill={skill}
        pc={pc}
        submit={submit}
        closeModal={closeModal}
      />
    );
  },

  resetSpellSlots: (skill, pc, submit, closeModal) => {
    function onResetSlotsClick() {
      closeModal();
      submit(
        {
          action: 'resetSlots',
          name: pc.name,
          spellsLevel: skill,
        },
        { method: 'post' }
      );
    }

    return (
      <div className={styles.hpContainer}>
        <div className={styles.modalButtons}>
          <button
            type="button"
            className={styles.modalButton}
            onClick={onResetSlotsClick}
          >
            Reiniciar espacios
          </button>
        </div>
      </div>
    );
  },

  savingThrows: (skill, pc) => <></>,

  attackBonus: (skill, pc, submit, closeModal, skillIndex) => {
    const {
      items: { weapons },
      pClass,
    } = pc;

    const weapon = weapons[skillIndex];
    const {
      subtype,
      properties: { finesse, light } = {},
      translation,
    } = getItem(weapon.name);

    const strMod = getStatMod(getStat(pc, 'str'));
    const dexMod = getStatMod(getStat(pc, 'dex'));

    let selectedStat;
    if (finesse) selectedStat = strMod > dexMod ? 'str' : 'dex';
    else if (pClass === 'monk' && isMonkWeapon(weapon))
      selectedStat = strMod > dexMod ? 'str' : 'dex';
    else if (subtype === 'simpleMelee' || subtype === 'martialMelee')
      selectedStat = 'str';
    else if (subtype === 'simpleRanged' || subtype === 'martialRanged')
      selectedStat = 'dex';

    const statMod = getStatMod(getStat(pc, selectedStat));

    const proficiencyBonus = getItemProficiencies(pc).includes(weapon.name)
      ? getProficiencyBonus(pc.level)
      : 0;

    const classBonus = getAttackClassBonus(pc, weapon);

    return (
      <div className={styles.hpContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              <th className={styles.tableCellLevel}>
                {selectedStat.toUpperCase()}
              </th>
              <th
                className={`${styles.tableCellLevel} ${styles.tableCellSmall}`}
              >
                Compentencia en {translation}
              </th>
              {!!classBonus && (
                <th className={styles.tableCellLevel}>Bonificación de Clase</th>
              )}
              <th className={styles.tableCellExtra}>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.tableCellLevel}>
                {statMod === 0 ? '- (Segunda arma)' : increment(statMod)}
              </td>
              <td className={styles.tableCellLevel}>
                {increment(proficiencyBonus)}
              </td>
              {!!classBonus && (
                <td className={styles.tableCellLevel}>
                  {increment(classBonus)}
                </td>
              )}
              <td className={styles.tableCellExtra}>
                {getAttackBonus(pc, weapon)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  },

  notes: (skill, pc, submit, closeModal, skillIndex, position) => {
    function onCreateNotesClick() {
      closeModal();
      submit(
        {
          action: 'createNotes',
          name: pc.name,
          position,
        },
        { method: 'post' }
      );
    }

    return (
      <div className={styles.hpContainer}>
        <button
          type="button"
          className={styles.modalButton}
          onClick={onCreateNotesClick}
        >
          Crear nota
        </button>
      </div>
    );
  },

  copySpell: (skill, pc) => (
    <>
      <p>
        Cuando encuentras un conjuro de mago de nivel 1 o superior, puedes
        añadirlo a tu libro de conjuros si es de un nivel para el cual tienes
        espacios de conjuros y si puedes conseguir tiempo suficiente para
        descifrarlo y copiarlo. Copiar un conjuro a un libro implica reproducir
        la forma básica del conjuro y después descifrar el sistema único de
        anotación que usó el mago para escribirlo. Debes practicar el conjuro
        hasta que entiendas los sonidos o gestos requeridos, después
        transcribirlo a tu libro de conjuros usando tu propia anotación. Por
        cada nivel del conjuro, el proceso dura 2 horas y requiere 50 po. El
        coste representa los componentes materiales que gastas en experimentar
        con el conjuro para dominarlo, así como las delicadas tintas que
        necesitas para registrarlo. Una vez que has gastado este tiempo y
        dinero, puedes prepararlo.
      </p>
      <div className={styles.modalButtons}>
        <Link
          to={`/characters/pc/${pc.name}/leveling/${pc.pClass}/extraSpells`}
          className={styles.modalButton}
        >
          Copiar Conjuro
        </Link>
      </div>
    </>
  ),

  armorClass: (skill, pc) => {
    const acs = getAcBreakdown(pc);
    const {
      items: {
        equipment: { shield },
      },
    } = pc;

    return (
      <div className={styles.hpContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              <th className={styles.tableCellLevel}>{acs.title}</th>
              {acs.extras.map(extra => (
                <th className={styles.tableCellLevel}>{extra.title}</th>
              ))}
              <th className={styles.tableCellExtra}>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.tableCellLevel}>{acs.base}</td>
              {acs.extras.map(extra => (
                <td className={styles.tableCellLevel}>{extra.ac}</td>
              ))}
              <td className={styles.tableCellExtra}>
                {getArmorClass(pc)}
                {shield ? ' (+2)' : ''}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  },
};
