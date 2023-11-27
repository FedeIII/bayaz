import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { addLevelHitPoints, getPc, prepareSpells } from '~/services/pc.server';
import {
  CLASSES,
  getFixedHealthForLevelUp,
  getRandomLevelUpHitPoints,
  hasLeveledUp,
  translateClass,
} from '~/domain/characters';
import { useTitle } from '~/components/hooks/useTitle';
import { increment } from '~/domain/display';
import { getExtraPreparedSpells } from '~/domain/spells/spells';
import { substract } from '~/utils/insert';

export const loader = async ({ params }) => {
  const pc = await getPc(params.id);
  if (!pc) {
    throw new Error('PC not found');
  }

  if (!hasLeveledUp(pc)) {
    throw new Error(`Ya has ganado Puntos de Golpe para el nivel ${pc.level}`);
  }

  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get('id');
  const hitPoints = formData.get('hitPoints');
  const hitPointsRealDice = formData.get('hitPointsRealDice');

  const pc = await getPc(id);

  let extraHitPoints;
  if (hitPoints === 'random') {
    extraHitPoints = getRandomLevelUpHitPoints(pc);
  } else {
    extraHitPoints = parseInt(hitPoints || hitPointsRealDice, 10);
  }

  const extraPreparedSpells = substract(
    getExtraPreparedSpells(pc).map(s => s.name),
    pc.preparedSpells.map(s => s.name)
  );

  await Promise.all([
    prepareSpells(id, extraPreparedSpells),
    addLevelHitPoints(id, extraHitPoints),
  ]);

  return redirect(
    `/characters/pc/${id}/summary?addExtraHitPoints=${extraHitPoints}`
  );
};

function LevelUp() {
  const { pc } = useLoaderData();
  const { pClass, level, id } = pc;

  useTitle(`${translateClass(pClass)} nivel ${level}`);

  return (
    <Form method="post">
      <input readOnly type="text" name="id" value={id} hidden />

      <h2 className="app__pale-text">Gana Puntos de Golpe</h2>

      <p className="app__paragraph">
        Cada vez que ganas un nivel, ganas 1 Dado de Golpe adicional. Lanza el
        Dado de Golpe, añade tu modificador de Constitución a la tirada y añade
        el total a tu máximo de Puntos de Golpe. Opcionalmente, puedes utilizar
        el valor fijo que se muestra en la entrada de la clase, que es el
        resultado medio de la tirada de tu Dado de Golpe (redondeando hacia
        arriba).
      </p>

      <h3>Dado de Golpe: {CLASSES[pClass].hitDice}</h3>

      <div className="app__buttons">
        <button
          type="submit"
          name="hitPoints"
          value="random"
          className="cards__button-card app__button-big"
        >
          Lanzar Dado ({CLASSES[pClass].hitDice})
        </button>
        <button
          type="submit"
          name="hitPoints"
          value={getFixedHealthForLevelUp(pc)}
          className="cards__button-card app__button-big"
        >
          Utilizar valor fijo ({increment(getFixedHealthForLevelUp(pc))})
        </button>
        <label htmlFor="realDice" className="app__input-button">
          <input
            type="number"
            id="realDice"
            name="hitPointsRealDice"
            onKeydown="return false"
            max="20"
            min="1"
          />
          <button
            type="submit"
            className="cards__button-card app__button-big"
          >
            Lanzar Dado Real ({CLASSES[pClass].hitDice})
          </button>
        </label>
      </div>
    </Form>
  );
}

export function ErrorBoundary({ error }) {
  useTitle('Error');

  return (
    <div>
      <h2 className="app__error-text">{error.message}</h2>

      <p className="app__paragraph">
        Cada vez que ganas un nivel, ganas 1 Dado de Golpe adicional. Lanza el
        Dado de Golpe, añade tu modificador de Constitución a la tirada y añade
        el total a tu máximo de Puntos de Golpe. Opcionalmente, puedes utilizar
        el valor fijo que se muestra en la entrada de la clase, que es el
        resultado medio de la tirada de tu Dado de Golpe (redondeando hacia
        arriba).
      </p>

      <p className="app__error-stack">{error.stack}</p>
    </div>
  );
}

export default LevelUp;
