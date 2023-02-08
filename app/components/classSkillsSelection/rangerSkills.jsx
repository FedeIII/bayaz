import {
  FAVORED_ENEMIES,
  FAVORED_ENEMIES_HUMANOIDS,
  translateFavoredEnemy,
  FAVORED_TERRAINS,
  translateFavoredTerrain,
  RANGER_ARCHETYPES,
  translateRangerArchetype,
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
      <p>
        Escoge terreno predilecto:{' '}
        {FAVORED_TERRAINS.map(terrain => (
          <label htmlFor={terrain} key={terrain} className={styles.skillLabel}>
            <input type="radio" name="favored-terrain" value={terrain} />
            {translateFavoredTerrain(terrain)}
          </label>
        ))}
      </p>
      <p>
        <label>
          Escoge arquetipo de explorador:{' '}
          <select name="ranger-archetype">
            {RANGER_ARCHETYPES.map(archetype => (
              <option value={archetype} key={archetype}>
                {translateRangerArchetype(archetype)}
              </option>
            ))}
          </select>
        </label>
      </p>
    </>
  );
}

export default RangerSkills;
