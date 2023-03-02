import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

import { getPcs } from '~/services/pc.server';
import { translateClass, translateRace } from '~/domain/characters';

import styles from '~/components/party.module.css';
import menuStyles from '~/components/menus.module.css';

export const loader = async ({ params }) => {
  const pcs = await getPcs();
  if (!pcs?.length) {
    throw new Error('PCs not found');
  }
  return json({ pcs });
};

function AllPCs() {
  const { pcs } = useLoaderData();

  return (
    <>
      <Link to="../" className={menuStyles.backButton}>
        {'<<'} Volver
      </Link>

      <ul className={styles.characterList}>
        {pcs.map(pc => (
          <li className={styles.character}>
            <Link
              to={`/characters/pc/${pc.name}/summary`}
              className={styles.partyLink}
            >
              <div className={styles.characterName}>{pc.name}</div>
              <div className={styles.partyData}>
                {translateRace(pc.race)}
                {pc.subrace !== 'subrace' && ` - ${translateRace(pc.subrace)}`}
              </div>
              <div className={styles.partyData}>
                {translateClass(pc.pClass)}
              </div>
              <div className={styles.partyData}>Nivel {pc.level}</div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default AllPCs;
