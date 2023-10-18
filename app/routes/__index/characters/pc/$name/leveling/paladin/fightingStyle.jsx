import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { getPc, updateAttrsForClass } from '~/services/pc.server';
import { useTitle } from '~/components/hooks/useTitle';
import { translateFightingStyle } from '~/domain/classes/fighter/fighter';
import {
  PALADIN_FIGHTING_STYLES,
  getPaladinFightingStyle,
} from '~/domain/classes/paladin/paladin';

import styles from '~/components/app.module.css';
import cardStyles from '~/components/cards/cards.module.css';

export const loader = async ({ params }) => {
  const pc = await getPc(params.name);
  if (!pc) {
    throw new Error('PC not found');
  }

  if (getPaladinFightingStyle(pc)) {
    throw new Error('Ya has escogido Estilo de Combate');
  }

  if (pc.pClass !== 'paladin') {
    throw new Error('Solo los Paladines puedes escoger Estilo de Combate');
  }

  return json({ pc });
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const name = formData.get('name');
  const fightingStyle = formData.get('fightingStyle');

  await updateAttrsForClass(name, 'paladin', { fightingStyle });

  return redirect(`/characters/pc/${name}/summary`);
};

function PaladinFightingStyle() {
  const { pc } = useLoaderData();

  useTitle('Paladín nivel 2');

  return (
    <Form method="post">
      <input readOnly type="text" name="name" value={pc.name} hidden />

      <h2 className={styles.paleText}>Estilo de Combate</h2>

      <p className={styles.paragraph}>
        Adoptas un estilo particular de combate como especialidad. Elige una de
        las siguientes opciones. No puedes escoger un Estilo de Combate más de
        una vez, incluso si tienes la opción de escoger otro más adelante.
      </p>
      <p>
        <label>
          <span className={styles.paleText}>Escoge Estilo de Combate</span>
          <br />
          <select
            name="fightingStyle"
            defaultValue=""
            className={cardStyles.buttonCard}
          >
            <option value="" disabled></option>
            {PALADIN_FIGHTING_STYLES.map(fightingStyle => (
              <option value={fightingStyle} key={fightingStyle}>
                {translateFightingStyle(fightingStyle)}
              </option>
            ))}
          </select>
        </label>
      </p>

      <div className={styles.paragraph}>
        <h3 className={styles.paleText}>{translateFightingStyle('defense')}</h3>
        Mientras lleves puesta una armadura ganas un +1 la CA.
      </div>

      <div className={styles.paragraph}>
        <h3 className={styles.paleText}>{translateFightingStyle('dueling')}</h3>
        Cuando llevas un arma cuerpo a cuerpo en una mano y ningún arma más,
        ganas un bonificador de +2 a las tiradas de daño con esa arma.
      </div>

      <div className={styles.paragraph}>
        <h3 className={styles.paleText}>
          {translateFightingStyle('great-Weapon-fighting')}
        </h3>
        Cuando obtienes un 1 o un 2 en un dado de daño con un arma a dos manos,
        puedes volver a realizar la tirada de daño y debiendo usar la nueva
        tirada, incluso si vuelve a ser un 1 o un 2. El arma debe ser un arma a
        dos manos o tener la propiedad versátil para ganar este beneficio.
      </div>

      <div className={styles.paragraph}>
        <h3 className={styles.paleText}>
          {translateFightingStyle('protection')}
        </h3>
        Cuando una criatura que puedes ver ataca a un objetivo que no eres tú y
        está a 5 pies o menos de ti, puedes usar tu reacción para hacer que el
        enemigo tenga desventaja en la tirada de ataque. Debes estar usando un
        escudo.
      </div>

      <div>
        <button type="submit" className={cardStyles.buttonCard}>
          Escoger Estilo de Combate
        </button>
      </div>
    </Form>
  );
}

export function ErrorBoundary({ error }) {
  useTitle('Error');

  return (
    <div>
      <h2 className={styles.errorText}>{error.message}</h2>

      <p className={styles.paragraph}>
        Adoptas un estilo particular de combate como especialidad. Elige una de
        las siguientes opciones. No puedes escoger un Estilo de Combate más de
        una vez, incluso si tienes la opción de escoger otro más adelante.
      </p>

      <p className={styles.errorStack}>{error.stack}</p>
    </div>
  );
}

export default PaladinFightingStyle;
