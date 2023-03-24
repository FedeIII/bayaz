import { Link } from '@remix-run/react';
import {
  CLASSES,
  getExtraHitPoints,
  getStat,
  getStatMod,
  translateClass,
} from './characters';
import { increment } from './display';

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
        <table className={styles.hpTable}>
          <thead className={styles.hpTableHead}>
            <tr>
              <th className={styles.hpCell}>Nivel</th>
              {totalHitPoints.map((roll, i) => (
                <th className={styles.hpCellLevel}>{i + 1}</th>
              ))}
              <th className={styles.hpCellExtra}>Con</th>
              {!!extraHp && <th className={styles.hpCellExtra}>Extra HP</th>}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.hpCell}>HP</td>
              {totalHitPoints.map(roll => (
                <td className={styles.hpCellLevel}>{increment(roll)}</td>
              ))}
              <td className={styles.hpCellExtra}>
                {increment(conHp)} x {level}
              </td>
              {!!extraHp && <td className={styles.hpCellExtra}>{extraHp}</td>}
            </tr>
          </tbody>
        </table>
      </div>
    );
  },
};
