import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

import { getEncounters } from '~/services/encounter.server';

import { useTitle } from '~/components/hooks/useTitle';
import { getMonsters } from '~/domain/encounters/monsters';
import {
  getEncounterChallenge,
  getEncounterDifficulty,
  getEncounterXp,
  groupMonsters,
  translateDifficulty,
} from '~/domain/encounters/encounters';
import usePcsFromSession from '~/components/hooks/usePcsFromSession';

import styles from '~/components/encounterList.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const loader = async ({ params }) => {
  const encounters = await getEncounters(params.id);
  if (!encounters) {
    throw new Error('Encounter not found');
  }

  return json({ encounters });
};

export const action = async ({ request }) => {
  return null;
};

function EncounterList() {
  const { encounters } = useLoaderData();

  useTitle('Lista de encuentros');

  const [pcs] = usePcsFromSession();
  const pcLevels = pcs.map(pc => pc.level);

  return (
    <div className="encounterList">
      <div className="cards encounterList__encounters">
        {encounters?.map(encounter => {
          const difficulty = pcLevels
            ? getEncounterDifficulty(getMonsters(encounter.monsters), pcLevels)
            : null;
          const monsters = getMonsters(encounter.monsters);
          const challenge = getEncounterChallenge(monsters);

          return (
            <Link
              to={`/encounters/${encounter.id}`}
              className="cards__button-card encounterList__encounter"
              key={encounter.id}
            >
              <div className="encounterList__name">{encounter.name}</div>
              <div className="encounterList__monsters">
                {groupMonsters(monsters)}
              </div>
              <div className="encounterList__section">
                <span className={`encounterList__${difficulty}`}>
                  {translateDifficulty(difficulty)} (
                  {getEncounterXp(monsters, pcLevels.length)} xp)
                </span>
                <span className="encounterList__medium">CR {challenge}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default EncounterList;
