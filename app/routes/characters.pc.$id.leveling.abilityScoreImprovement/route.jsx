import { useState } from 'react';
import { redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import {
  addImprovedStatsLevel,
  getPc,
  increaseStats,
} from '~/services/pc.server';
import {
  getPendingImproveAbilityLevels,
  hasToImproveAbilityScore,
  STATS,
  translateClass,
} from '~/domain/characters';
import { useTitle } from '~/components/hooks/useTitle';
import { addFeatToPc } from '~/domain/mutations/characterMutations';
import { AbilityScoreForm } from './abilityScoreForm';
import { FeatForm } from './featForm';

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

  return { pc };
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const id = formData.get('id');
  const level = parseInt(formData.get('level'), 10);
  const type = formData.get('type');

  if (type === 'feat') {
    const featId = formData.get('featId');
    await Promise.all([
      addFeatToPc(id, featId),
      addImprovedStatsLevel(id, level),
    ]);
  } else {
    const statsIncrease = STATS().reduce(
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
  }

  return redirect(`/characters/pc/${id}/summary`);
};

function AbilityScoreImprovement() {
  const { pc } = useLoaderData();
  const [choice, setChoice] = useState(null); // 'abilities' or 'feat'
  const { pClass, level } = pc;

  useTitle(`${translateClass(pClass)} nivel ${level}`);

  const improvementLevel = getPendingImproveAbilityLevels(pc)[0];

  if (!choice) {
    return (
      <div>
        <h2 className="app__pale-text">Mejora de nivel {improvementLevel}</h2>
        <p className="app__paragraph">
          Puedes aumentar tus puntuaciones de característica o seleccionar una
          dote.
        </p>

        <div className="cards">
          <button
            className="cards__button-card"
            onClick={() => setChoice('abilities')}
          >
            Aumentar características
          </button>
          <button
            className="cards__button-card"
            onClick={() => setChoice('feat')}
          >
            Seleccionar dote
          </button>
        </div>
      </div>
    );
  }

  if (choice === 'feat') {
    return (
      <FeatForm
        pc={pc}
        improvementLevel={improvementLevel}
        onBack={() => setChoice(null)}
      />
    );
  }

  if (choice === 'abilities') {
    return (
      <AbilityScoreForm
        pc={pc}
        improvementLevel={improvementLevel}
        onBack={() => setChoice(null)}
      />
    );
  }
}

export function ErrorBoundary({ error }) {
  useTitle('Error');

  return (
    <div>
      <h2 className="app__error-text">{error?.message}</h2>

      <p className="app__paragraph">
        Incrementa una puntuación de característica de tu elección en 2 puntos,
        o dos puntuaciones de característica de tu elección en 1 punto. Como es
        habitual, no puedes incrementar una puntuación de característica por
        encima de 20 usando este procedimiento.
      </p>

      <p className="app__error-stack">{error?.stack}</p>
    </div>
  );
}

export default AbilityScoreImprovement;
