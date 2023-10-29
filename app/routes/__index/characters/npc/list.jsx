import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

import { getNpcs } from '~/services/pc.server';
import { translateClass, translateRace } from '~/domain/characters';

import styles from '~/components/party.module.css';
import menuStyles from '~/components/menus.module.css';

export const loader = async ({ params }) => {
  const npcs = await getNpcs();
  if (!npcs?.length) {
    throw new Error('PCs not found');
  }
  return json({ npcs });
};

function NpcList() {
  const { npcs } = useLoaderData();

  return (
    <>
      <Link to="../" className={menuStyles.backButton}>
        {'<<'} Volver
      </Link>

      <ul className={styles.characterList}>
        {npcs.map(npc => (
          <li className={styles.character} key={npc.name}>
            <Link
              to={`/characters/pc/${npc.name}/summary`}
              className={styles.pcLink}
            >
              <div className={styles.characterName}>{npc.name}</div>
              <div className={styles.partyData}>
                {translateRace(npc.race)}
                {npc.subrace !== 'subrace' &&
                  ` - ${translateRace(npc.subrace)}`}
              </div>
              <div className={styles.partyData}>
                {translateClass(npc.pClass)}
              </div>
              <div className={styles.partyData}>Nivel {npc.level}</div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default NpcList;
