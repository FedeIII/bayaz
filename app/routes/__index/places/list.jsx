import { Link, useLoaderData } from '@remix-run/react';

import { getSettlements } from '~/services/settlements.server';
import { t } from '~/domain/translations';
import { json } from '@remix-run/node';

import styles from '~/components/party.module.css';
import menuStyles from '~/components/menus.module.css';

export const loader = async ({ request }) => {
  const settlements = await getSettlements();

  if (!settlements?.length) {
    throw new Error('Settlements not found');
  }

  return json({ settlements });
};

function PlacesList() {
  const { settlements } = useLoaderData();

  return (
    <>
      <Link to="../" className={menuStyles.backButton}>
        {'<<'} Volver
      </Link>

      <ul className={styles.characterList}>
        {settlements.map(settlement => (
          <li className={styles.character} key={settlement.name}>
            <Link
              to={`/places/random/${settlement.type}?id=${settlement.id}`}
              className={styles.pcLink}
            >
              <div className={styles.characterName}>{settlement.name}</div>
              <div className={styles.partyData}>{t(settlement.type)}</div>
              <div className={styles.partyData}>
                {settlement.population} habitantes
              </div>
              <div className={styles.partyData}>
                Dioses:{' '}
                {Object.entries(settlement.religion)
                  .reduce(
                    (gods, [listName, list]) =>
                      listName === 'temples' || listName === 'shrines'
                        ? [...gods, ...list]
                        : gods,
                    []
                  )
                  .join(', ')}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default PlacesList;
