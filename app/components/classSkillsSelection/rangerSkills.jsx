import {
  FAVORED_ENEMIES,
  FAVORED_ENEMIES_HUMANOIDS,
  translateFavoredEnemy,
} from '~/utils/characters';

import styles from '~/components/characters.module.css';

function RangerSkills(props) {
  return (
    <>
      <p>
        Escoge un Enemigo Predilecto:{' '}
        {FAVORED_ENEMIES.map(enemyType => (
          <label
            htmlFor={enemyType}
            key={enemyType}
            className={styles.skillLabel}
          >
            <input type="radio" name="favored-enemy" value={enemyType} />
            {translateFavoredEnemy(enemyType)}
          </label>
        ))}
      </p>
      <p>
        O dos tipos de humanoides:{' '}
        {FAVORED_ENEMIES_HUMANOIDS.map(enemyType => (
          <label
            htmlFor={enemyType}
            key={enemyType}
            className={styles.skillLabel}
          >
            <input
              type="checkbox"
              name="favored-enemy-humanoids[]"
              value={enemyType}
            />
            {translateFavoredEnemy(enemyType)}
          </label>
        ))}
      </p>
    </>
  );
}

export default RangerSkills;
