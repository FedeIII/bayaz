import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { getPc, updateAttrsForClass } from '~/services/pc.server';
import { useTitle } from '~/components/hooks/useTitle';
import {
  HUNTER_MULTIATTACK,
  getHunterMultiattack,
  translateHunterMultiattack,
} from '~/domain/classes/ranger/ranger';

import styles from '~/components/app.module.css';
import cardStyles from '~/components/cards/cards.module.css';

export const loader = async ({ params }) => {
  const pc = await getPc(params.name);
  if (!pc) {
    throw new Error('PC not found');
  }

  if (getHunterMultiattack(pc)) {
    throw new Error('Ya has escogido Ataque Múltiple');
  }

  if (pc.pClass !== 'ranger') {
    throw new Error('Solo los exploradores puedes escoger Ataque Múltiple');
  }

  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get('name');
  const multiattack = formData.get('multiattack');

  await updateAttrsForClass(name, 'ranger', { multiattack });

  return redirect(`/characters/pc/${name}/summary`);
};

function HunterMultiattack() {
  const { pc } = useLoaderData();

  useTitle('Explorador nivel 11');

  return (
    <Form method="post">
      <input readOnly type="text" name="name" value={pc.name} hidden />

      <h2 className={styles.paleText}>Ataque Múltiple</h2>
      <p className={styles.paragraph}>
        A nivel 11 ganas uno de los siguientes rasgos de tu elección.
      </p>
      <p>
        <label>
          <span className={styles.paleText}>Escoge Ataque Múltiple</span>
          <br />
          <select
            name="multiattack"
            defaultValue=""
            className={cardStyles.buttonCard}
          >
            <option value="" disabled></option>
            {HUNTER_MULTIATTACK.map(multiattack => (
              <option value={multiattack} key={multiattack}>
                {translateHunterMultiattack(multiattack)}
              </option>
            ))}
          </select>
        </label>
      </p>

      <h3 className={styles.paleText}>
        {translateHunterMultiattack('volley')}
      </h3>
      <p className={styles.paragraph}>
        Puedes utilizar tu acción para hacer un ataque a distancia contra
        cualquier número de criaturas en torno a 10 pies (3 metros) de un punto
        que puedas ver (siempre dentro del alcance de tu arma). Debes tener
        munición para cada objetivo, como siempre, y realizar una tirada de
        ataque por separado para cada uno de ellos.
      </p>

      <h3 className={styles.paleText}>
        {translateHunterMultiattack('whirlwindAttack')}
      </h3>
      <p className={styles.paragraph}>
        Puedes utilizar tu acción para realizar un ataque cuerpo a cuerpo contra
        cualquier número de criaturas que estén a 5 pies (1,5 metros) de ti,
        realizando una tirada de ataque separada para cada uno de ellos.
      </p>

      <p>
        <button type="submit" className={cardStyles.buttonCard}>
          Escoger Ataque
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
        A nivel 11 ganas uno de los siguientes rasgos de tu elección.
      </p>

      <p className={styles.errorStack}>{error.stack}</p>
    </div>
  );
}

export default HunterMultiattack;
