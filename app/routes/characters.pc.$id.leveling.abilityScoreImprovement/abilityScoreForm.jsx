import { Form } from '@remix-run/react';
import { useState } from 'react';

import { STATS, translateStat, getStatMod } from '~/domain/characters';
import { increment } from '~/domain/display';
import NumericInput from '~/components/inputs/numeric';

export function AbilityScoreForm(props) {
  const {
    pc,
    improvementLevel,
    onBack,
  } = props;

  const {
    stats,
    extraStats: pExtraStats,
    halfElf: { extraStats: halfElfExtraStats },
  } = pc;

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
      <input readOnly type="text" name="id" value={pc.id} hidden />
      <input
        readOnly
        type="text"
        name="level"
        value={improvementLevel}
        hidden
      />
      <input readOnly type="text" name="type" value="abilities" hidden />

      <h2 className="app__pale-text">Escoge puntos extra de caracterísitica</h2>

      <p className="app__paragraph">
        Incrementa una puntuación de característica de tu elección en 2 puntos,
        o dos puntuaciones de característica de tu elección en 1 punto. Como es
        habitual, no puedes incrementar una puntuación de característica por
        encima de 20 usando este procedimiento.
      </p>

      <div className="stats card">
        {STATS().map(statName => (
          <div key={statName} className="stat">
            <div className="stats__cell stats__leftCell app__text-xxxl">
              <span className="stats__statName">{translateStat(statName)}</span>
              <span className="stats__statValue card">{stats[statName]}</span>
            </div>
            {!!(pExtraStats?.[statName] || halfElfExtraStats?.[statName]) && (
              <>
                <span className="stats__cell app__text-xxxl">+</span>
                <span className="stats__cell app__text-xxxl">
                  {(pExtraStats?.[statName] || 0) +
                    (halfElfExtraStats?.[statName] || 0)}
                </span>
              </>
            )}
            <span className="stats__cell app__text-xxxl">+</span>
            <span className="stats__cell stats__rightCell app__text-xxxl">
              <NumericInput
                id={statName}
                name={statName}
                value={extraStats[statName]}
                readOnly
                styleName="stats__statInput"
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

      <div className="cards__buttons">
        <button type="button" onClick={onBack} className="cards__button-card">
          Volver
        </button>
        <button type="submit" className="cards__button-card">
          Escoger
        </button>
      </div>
    </Form>
  );
}
