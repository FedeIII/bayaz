import { useState } from 'react';
import { redirect } from 'react-router';
import { json } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import {
  addImprovedStatsLevel,
  getPc,
  increaseStats,
} from '~/services/pc.server';
import {
  hasToImproveAbilityScore,
  STATS,
  translateClass,
  translateStat,
} from '~/domain/characters';
import { useTitle } from '~/components/hooks/useTitle';

import styles from '~/components/stats.module.css';
import appStyles from '~/components/app.module.css';
import cardStyles from '~/components/cards/cards.module.css';

export const loader = async ({ params }) => {
  const pc = await getPc(params.name);
  if (!pc) {
    throw new Error('PC not found');
  }

  if (!hasToImproveAbilityScore(pc)) {
    throw new Error(
      `Ya has escogido la Mejora de Puntuación de Característica del nivel ${pc.level}`
    );
  }

  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const name = formData.get('name');
  const level = parseInt(formData.get('level'), 10);

  const statsIncrease = STATS.reduce(
    (s, statName) => ({
      ...s,
      [statName]: parseInt(formData.get(statName), 10),
    }),
    {}
  );

  await Promise.all([
    increaseStats(name, statsIncrease),
    addImprovedStatsLevel(name, level),
  ]);

  return redirect(`/characters/pc/${name}/summary`);
};

function AbilityScoreImprovement() {
  const { pc } = useLoaderData();
  const { pClass, level, stats } = pc;

  useTitle(`${translateClass(pClass)} nivel ${level}`);

  const [extraStats, setExtraStats] = useState({
    str: 0,
    dex: 0,
    con: 0,
    int: 0,
    wis: 0,
    cha: 0,
  });

  function increaseStat(statName) {
    setExtraStats(s => ({ ...s, [statName]: s[statName] + 1 }));
  }

  function decreaseStat(statName) {
    setExtraStats(s => ({ ...s, [statName]: s[statName] - 1 }));
  }

  const selectedExtraPoints = Object.values(extraStats).reduce((a, b) => a + b);

  function increaseDisabled(statName) {
    return (
      selectedExtraPoints === 2 || stats[statName] + extraStats[statName] === 20
    );
  }

  return (
    <Form method="post">
      <input readOnly type="text" name="name" value={pc.name} hidden />
      <input readOnly type="text" name="level" value={pc.level} hidden />

      <h2 className={appStyles.paleText}>
        Escoge puntos extra de caracterísitica
      </h2>

      <p className={appStyles.paragraph}>
        Incrementa una puntuación de característica de tu elección en 2 puntos,
        o dos puntuaciones de característica de tu elección en 1 punto. Como es
        habitual, no puedes incrementar una puntuación de característica por
        encima de 20 usando este procedimiento.
      </p>

      <div className={`${styles.stats} ${cardStyles.card}`}>
        {STATS.map(statName => (
          <div key={statName} className={styles.stat}>
            <div className={`${styles.cell} ${styles.leftCell}`}>
              <span className={`${styles.statName}`}>
                {translateStat(statName)}
              </span>
              <span className={`${styles.statValue} ${cardStyles.card}`}>
                {stats[statName]}
              </span>
            </div>
            <span className={`${styles.cell}`}>+</span>
            <span className={`${styles.cell} ${styles.rightCell}`}>
              <input
                type="number"
                id={statName}
                name={statName}
                value={extraStats[statName]}
                readOnly
                className={`${styles.statInput}`}
              />
              <button
                type="button"
                disabled={increaseDisabled(statName)}
                className={styles.statButton}
                onClick={() => increaseStat(statName)}
              >
                +
              </button>
              <button
                type="button"
                disabled={!extraStats[statName]}
                className={styles.statButton}
                onClick={() => decreaseStat(statName)}
              >
                -
              </button>
            </span>
          </div>
        ))}
      </div>

      <p>
        <button type="submit" className={cardStyles.buttonCard}>
          Escoger
        </button>
      </p>
    </Form>
  );
}

export function ErrorBoundary({ error }) {
  useTitle('Error');

  return (
    <div>
      <h2 className={appStyles.errorText}>{error.message}</h2>

      <p className={appStyles.paragraph}>
        Incrementa una puntuación de característica de tu elección en 2 puntos,
        o dos puntuaciones de característica de tu elección en 1 punto. Como es
        habitual, no puedes incrementar una puntuación de característica por
        encima de 20 usando este procedimiento.
      </p>

      <p className={appStyles.errorStack}>{error.stack}</p>
    </div>
  );
}

export default AbilityScoreImprovement;
