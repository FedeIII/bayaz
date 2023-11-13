import { useEffect, useState } from 'react';

import { translateLanguage } from '~/domain/characters';
import {
  FAVORED_ENEMIES,
  FAVORED_ENEMIES_HUMANOIDS,
  translateFavoredEnemy,
  FAVORED_TERRAINS,
  translateFavoredTerrain,
  FAVORED_ENEMIES_LANGUAGES,
} from '~/domain/classes/ranger/ranger';

function RangerSkills(props) {
  const { pc, setSkillsNamespace } = props;

  const [favoredEnemies, setFavoredEnemies] = useState({
    enemies: {},
    humanoids: {},
  });
  const [isLanguageSelected, setIsLanguageSelected] = useState(false);

  useEffect(() => {
    setSkillsNamespace('rangerSkills', isLanguageSelected);
  }, [isLanguageSelected]);

  return (
    <>
      <p>
        Escoge un Enemigo Predilecto:{' '}
        {FAVORED_ENEMIES.map(enemyType => (
          <label
            htmlFor={enemyType}
            key={enemyType}
            className="characters__skill-label"
          >
            <input
              type="radio"
              name="favored-enemy"
              id={enemyType}
              value={enemyType}
              onChange={e =>
                setFavoredEnemies(oldEnemies => ({
                  humanoids: oldEnemies.humanoids,
                  enemies: { [enemyType]: e.target.checked },
                }))
              }
            />
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
            className="characters__skill-label"
          >
            <input
              type="checkbox"
              name="favored-enemy-humanoids[]"
              id={enemyType}
              value={enemyType}
              onChange={e =>
                setFavoredEnemies(oldEnemies => ({
                  enemies: oldEnemies.enemies,
                  humanoids: {
                    ...oldEnemies.humanoids,
                    [enemyType]: e.target.checked,
                  },
                }))
              }
            />
            {translateFavoredEnemy(enemyType)}
          </label>
        ))}
      </p>
      <p>
        Selecciona un idioma extra entre los que hablan tus Enemigos Predilectos
        {(Object.entries(favoredEnemies.humanoids || {}).filter(
          ([_, isSelected]) => isSelected
        ).length
          ? Object.entries(favoredEnemies.humanoids || {})
          : Object.entries(favoredEnemies.enemies || {})
        )
          .filter(([_, isSelected]) => isSelected)
          .map(([enemy]) => {
            const language = FAVORED_ENEMIES_LANGUAGES[enemy];
            if (!language || pc.languages.includes(language)) return null;

            return (
              <label
                htmlFor={language}
                key={language}
                className="characters__skill-label"
              >
                <input
                  type="radio"
                  name="languages[]"
                  id={language}
                  value={language}
                  onChange={() => setIsLanguageSelected(true)}
                />
                {translateLanguage(language)}
              </label>
            );
          })}
      </p>
      <p>
        Escoge terreno predilecto:{' '}
        {FAVORED_TERRAINS.map(terrain => (
          <label htmlFor={terrain} key={terrain} className="characters__skill-label">
            <input
              type="radio"
              name="favored-terrain"
              value={terrain}
              id={terrain}
            />
            {translateFavoredTerrain(terrain)}
          </label>
        ))}
      </p>
    </>
  );
}

export default RangerSkills;
