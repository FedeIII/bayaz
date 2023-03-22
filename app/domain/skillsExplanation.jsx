import { Link } from '@remix-run/react';
import styles from '~/components/modal/inventoryItem.module.css';
import { translateClass } from './characters';

export const SKILLS_EXPLANATION = {
  abilityScoreImprovement: (skill, pc) => (
    <>
      <p>
        Cuando alcanzas el nivel 4, y nuevamente a los niveles 8, 12, 16 y 19,
        puedes incrementar una puntuación de característica de tu elección en 2
        puntos, o dos puntuaciones de característica de tu elección en 1 punto.
        Como es habitual, no puedes incrementar una puntuación de característica
        por encima de 20 usando este procedimiento.
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
  ),

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
};
