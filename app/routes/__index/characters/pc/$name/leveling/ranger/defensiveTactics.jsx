import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { getPc, updateAttrsForClass } from '~/services/pc.server';
import { useTitle } from '~/components/hooks/useTitle';
import {
  HUNTER_DEFENSIVE_TACTICS,
  getHunterDefensiveTactics,
  translateHuntersDefensiveTactics,
} from '~/domain/classes/ranger/ranger';

import styles from '~/components/app.module.css';
import cardStyles from '~/components/cards/cards.module.css';

export const loader = async ({ params }) => {
  const pc = await getPc(params.name);
  if (!pc) {
    throw new Error('PC not found');
  }

  if (getHunterDefensiveTactics(pc)) {
    throw new Error('Ya has escogido Táctica Defensiva');
  }

  if (pc.pClass !== 'ranger') {
    throw new Error('Solo los exploradores puedes escoger Táctica Defensiva');
  }

  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get('name');
  const defensiveTactics = formData.get('defensiveTactics');

  await updateAttrsForClass(name, 'ranger', { defensiveTactics });

  return redirect(`/characters/pc/${name}/summary`);
};

function HunterDefensiveTactics() {
  const { pc } = useLoaderData();

  useTitle('Explorador nivel 7');

  return (
    <Form method="post">
      <input readOnly type="text" name="name" value={pc.name} hidden />

      <h2 className={styles.paleText}>Táctica Defensiva</h2>
      <p className={styles.paragraph}>
        A nivel 7 ganas uno de los siguientes rasgos de tu elección.
      </p>
      <p>
        <label>
          <span className={styles.paleText}>Escoge Táctica Defensiva</span>
          <br />
          <select
            name="defensiveTactics"
            defaultValue=""
            className={cardStyles.buttonCard}
          >
            <option value="" disabled></option>
            {HUNTER_DEFENSIVE_TACTICS.map(defensiveTactics => (
              <option value={defensiveTactics} key={defensiveTactics}>
                {translateHuntersDefensiveTactics(defensiveTactics)}
              </option>
            ))}
          </select>
        </label>
      </p>

      <h3 className={styles.paleText}>
        {translateHuntersDefensiveTactics('escapeTheHorde')}
      </h3>
      <p className={styles.paragraph}>
        Los ataques de oportunidad contra ti se hacen con desventaja.
      </p>

      <h3 className={styles.paleText}>
        {translateHuntersDefensiveTactics('multiattackDefense')}
      </h3>
      <p className={styles.paragraph}>
        Cuando una criatura te golpea con un ataque, ganas un bonificador +4 a
        la CA contra todos los ataques posteriores realizados por esa criatura
        durante el resto del turno.
      </p>

      <h3 className={styles.paleText}>
        {translateHuntersDefensiveTactics('steelWill')}
      </h3>
      <p className={styles.paragraph}>
        Tienes ventaja en tiradas de salvación contra miedo.
      </p>

      <p>
        <button type="submit" className={cardStyles.buttonCard}>
          Escoger Táctica
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
        A nivel 7 ganas uno de los siguientes rasgos de tu elección.
      </p>

      <p className={styles.errorStack}>{error.stack}</p>
    </div>
  );
}

export default HunterDefensiveTactics;
