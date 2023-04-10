import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { getPc, updateAttrsForClass } from '~/services/pc.server';
import { useTitle } from '~/components/hooks/useTitle';
import {
  HUNTERS_PREY,
  getHuntersPrey,
  translateHuntersPrey,
} from '~/domain/classes/ranger/ranger';

import styles from '~/components/app.module.css';
import cardStyles from '~/components/cards/cards.module.css';

export const loader = async ({ params }) => {
  const pc = await getPc(params.name);
  if (!pc) {
    throw new Error('PC not found');
  }

  if (getHuntersPrey(pc)) {
    throw new Error('Ya has escogido Presa del Cazador');
  }

  if (pc.pClass !== 'ranger') {
    throw new Error('Solo los exploradores puedes escoger Presa del Cazador');
  }

  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const name = formData.get('name');
  const huntersPrey = formData.get('huntersPrey');

  await updateAttrsForClass(name, 'ranger', { huntersPrey });

  return redirect(`/characters/pc/${name}/summary`);
};

function HuntersPrey() {
  const { pc } = useLoaderData();

  useTitle('Explorador nivel 3');

  return (
    <Form method="post">
      <input readOnly type="text" name="name" value={pc.name} hidden />

      <h2 className={styles.paleText}>Presa del Cazador</h2>

      <p className={styles.paragraph}>
        A nivel 3 ganas uno de los siguientes rasgos de tu elección.
      </p>
      <p>
        <label>
          <span className={styles.paleText}>Escoge Presa del Cazador</span>
          <br />
          <select
            name="huntersPrey"
            defaultValue=""
            className={cardStyles.buttonCard}
          >
            <option value="" disabled></option>
            {HUNTERS_PREY.map(prey => (
              <option value={prey} key={prey}>
                {translateHuntersPrey(prey)}
              </option>
            ))}
          </select>
        </label>
      </p>

      <h3 className={styles.paleText}>
        {translateHuntersPrey('colossusSlayer')}
      </h3>
      <p className={styles.paragraph}>
        Tu tenacidad puede desgastar hasta a los enemigos más potentes. Cuando
        golpees a una criatura con un arma, ésta sufre un 1d8 adicional de daño
        si está por debajo de su máximo de Puntos de Golpe. Puedes causar este
        daño extra sólo una vez por turno.
      </p>

      <h3 className={styles.paleText}>{translateHuntersPrey('giantKiller')}</h3>
      <p className={styles.paragraph}>
        Cuando una criatura Grande o más grande que tú, a una distancia máxima
        de 5 pies de ti, te golpea o falla con su ataque contra ti, puedes
        utilizar tu reacción para atacar a esa criatura inmediatamente después
        de su ataque, mientras puedas verla.
      </p>

      <h3 className={styles.paleText}>
        {translateHuntersPrey('hordeBreaker')}
      </h3>
      <p className={styles.paragraph}>
        Una vez por turno, cuando hagas un ataque con armas, puedes realizar
        otro ataque con la misma arma contra una criatura diferente que esté a
        menos de 5 pies del objetivo original y dentro del rango de tu arma.
      </p>

      <p>
        <button type="submit" className={cardStyles.buttonCard}>
          Escoger Presa
        </button>
      </p>
    </Form>
  );
}

export function ErrorBoundary({ error }) {
  useTitle('Error');

  return (
    <div>
      <h2 className={styles.errorText}>{error.message}</h2>

      <p className={styles.paragraph}>
        A nivel 3 ganas uno de los siguientes rasgos de tu elección.
      </p>

      <p className={styles.errorStack}>{error.stack}</p>
    </div>
  );
}

export default HuntersPrey;
