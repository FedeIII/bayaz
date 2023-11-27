import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

import { getPc } from '~/services/pc.server';
import { getParty } from '~/services/party.server';
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
import { getPartyMaxLevel } from '~/domain/party/party';

import styles from '~/components/encounterList.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const loader = async ({ params }) => {
  const [party, encounters] = await Promise.all([
    getParty(params.id),
    getEncounters(params.id),
  ]);

  if (!party) {
    throw new Error('Party not found');
  }

  if (!encounters) {
    throw new Error('Encounter not found');
  }

  const pcs = party.players.map(playerName => getPc(playerName));
  for ([index, pc] of pcs.entries()) pcs[index] = await pc;

  return json({ party, pcs, encounters });
};

export const action = async ({ request }) => {
  return null;
};

function EncounterList() {
  const { party, pcs, encounters } = useLoaderData();
  const { id: partyId } = party;

  useTitle('Lista de encuentros');

  return (
    <div className="encounterList">
      <div className="encounterList__party">
        <h3 className="encounterList__party-label">Party</h3>{' '}
        <div className="encounterList__party-members">
          {pcs.map(pc => (
            <span className="cards__button-card" key={pc.id}>
              {pc.name}
              <br />
              Nivel {pc.level}
            </span>
          ))}
        </div>
      </div>
      <div className="cards encounterList__encounters">
        {encounters.map(encounter => {
          const difficulty = getEncounterDifficulty(
            getMonsters(encounter.monsters),
            pcs
          );
          const monsters = getMonsters(encounter.monsters);
          const partyMaxLevel = getPartyMaxLevel(pcs);
          const challenge = getEncounterChallenge(monsters);

          return (
            <Link
              to={`/party/${partyId}/encounters/${encounter.id}`}
              className="cards__button-card encounterList__encounter"
              key={encounter.id}
            >
              <div className="encounterList__monsters">
                {groupMonsters(monsters)}
              </div>
              <div className="encounterList__section">
                <span className={`encounterList__${difficulty}`}>
                  {translateDifficulty(difficulty)} (
                  {getEncounterXp(monsters, pcs.length)} xp)
                </span>
                <span
                  className={
                    partyMaxLevel < challenge
                      ? 'encounterList__deadly'
                      : partyMaxLevel === challenge
                      ? 'encounterList__medium'
                      : 'encounterList__easy'
                  }
                >
                  CR {challenge}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default EncounterList;
