import { Form, Link, useLoaderData } from '@remix-run/react';
import { json, redirect } from '@remix-run/node';

import { getPcs } from '~/services/pc.server';
import { createParty } from '~/services/party.server';
import { translateClass, translateRace } from '~/domain/characters';

import styles from '~/components/party.module.css';
import menuStyles from '~/components/menus.module.css';

export const action = async ({ request }) => {
  const formData = await request.formData();

  const pcs = formData.getAll('pcs[]');

  const party = await createParty(pcs);

  return redirect(`/party/${party.id}`);
};

export const loader = async ({ params }) => {
  const pcs = await getPcs();
  if (!pcs?.length) {
    throw new Error('PCs not found');
  }
  return json({ pcs });
};

function NewParty() {
  const { pcs } = useLoaderData();

  return (
    <>
      <Link to="../" className={menuStyles.backButton}>
        {'<<'} Volver
      </Link>

      <Form method="post">
        Escoge personajes:
        <div className={styles.characterList}>
          {pcs.map(pc => (
            <label
              htmlFor={pc.name}
              className={styles.selectCharacter}
              key={pc.name}
            >
              <input
                type="checkbox"
                name="pcs[]"
                value={pc.name}
                id={pc.name}
                className={styles.characterCheck}
              />
              <div className={styles.characterName}>{pc.name}</div>
              <div className={styles.partyData}>
                {translateRace(pc.race)}
                {pc.subrace !== 'subrace' && ` - ${translateRace(pc.subrace)}`}
              </div>
              <div className={styles.partyData}>
                {translateClass(pc.pClass)}
              </div>
              <div className={styles.partyData}>Nivel {pc.level}</div>
            </label>
          ))}
        </div>
        <button type="submit">Continuar</button>
      </Form>
    </>
  );
}

export default NewParty;
