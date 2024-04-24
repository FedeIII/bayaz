import { useState } from 'react';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import {
  addImprovedStatsLevel,
  getPc,
  increaseStats,
} from '~/services/pc.server';
import {
  getPendingImproveAbilityLevels,
  getStatMod,
  hasToImproveAbilityScore,
  STATS,
  translateClass,
  translateStat,
} from '~/domain/characters';
import { useTitle } from '~/components/hooks/useTitle';
import { increment } from '~/domain/display';

import styles from '~/components/stats.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const loader = async ({ params }) => {
  const pc = await getPc(params.id);
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

  const id = formData.get('id');
  const level = parseInt(formData.get('level'), 10);

  const statsIncrease = STATS.reduce(
    (s, statName) => ({
      ...s,
      [statName]: parseInt(formData.get(statName), 10),
    }),
    {}
  );

  await Promise.all([
    increaseStats(id, statsIncrease),
    addImprovedStatsLevel(id, level),
  ]);

  return redirect(`/characters/pc/${id}/summary`);
};

function AbilityScoreImprovement() {
  const { pc } = useLoaderData();
  const {
    pClass,
    level,
    stats,
    extraStats: pExtraStats,
    halfElf: { extraStats: halfElfExtraStats },
  } = pc;

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

  const improvementLevel = getPendingImproveAbilityLevels(pc)[0];

  return (
    <Form method="post">
      <input readOnly type="text" name="id" value={pc.id} hidden />
      <input
        readOnly
        type="text"
        name="level"
        value={improvementLevel}
        hidden
      />

      <h2 className="app__pale-text">Escoge puntos extra de caracterísitica</h2>

      <p className="app__paragraph">
        Incrementa una puntuación de característica de tu elección en 2 puntos,
        o dos puntuaciones de característica de tu elección en 1 punto. Como es
        habitual, no puedes incrementar una puntuación de característica por
        encima de 20 usando este procedimiento.
      </p>

      <div className="stats card">
        {STATS.map(statName => (
          <div key={statName} className="stat">
            <div className="stats__cell stats__leftCell app__big-text">
              <span className="stats__statName">{translateStat(statName)}</span>
              <span className="stats__statValue card">{stats[statName]}</span>
            </div>
            {!!(pExtraStats?.[statName] || halfElfExtraStats?.[statName]) && (
              <>
                <span className="stats__cell app__big-text">+</span>
                <span className="stats__cell app__big-text">
                  {(pExtraStats?.[statName] || 0) +
                    (halfElfExtraStats?.[statName] || 0)}
                </span>
              </>
            )}
            <span className="stats__cell app__big-text">+</span>
            <span className="stats__cell stats__rightCell app__big-text">
              <input
                type="number"
                id={statName}
                name={statName}
                value={extraStats[statName]}
                readOnly
                className="stats__statInput"
              />
              <button
                type="button"
                disabled={increaseDisabled(statName)}
                className="stats__statButton"
                onClick={() => increaseStat(statName)}
              >
                +
              </button>
              <button
                type="button"
                disabled={!extraStats[statName]}
                className="stats__statButton"
                onClick={() => decreaseStat(statName)}
              >
                -
              </button>
            </span>
            <span className="stats__cell stats__rightCell">
              (
              {increment(
                getStatMod(
                  stats[statName] + pExtraStats[statName] + extraStats[statName]
                )
              )}
              )
            </span>
          </div>
        ))}
      </div>

      <p>
        <button type="submit" className="cards__button-card">
          Escoger
        </button>
      </p>
    </Form>
  );
}

export function ErrorBoundary({ error }) {
  const error = useRouteError();
  useTitle('Error');

  return (
    <div>
      <h2 className="app__error-text">{error.message}</h2>

      <p className="app__paragraph">
        Incrementa una puntuación de característica de tu elección en 2 puntos,
        o dos puntuaciones de característica de tu elección en 1 punto. Como es
        habitual, no puedes incrementar una puntuación de característica por
        encima de 20 usando este procedimiento.
      </p>

      <p className="app__error-stack">{error.stack}</p>
    </div>
  );
}

export default AbilityScoreImprovement;
