import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

import { getEncountersByGroup } from '~/services/encounter.server';

import { useTitle } from '~/components/hooks/useTitle';
import { Monster, getMonsters } from '~/domain/encounters/monsters';
import {
  getEncounterChallenge,
  getEncounterDifficulty,
  getEncounterXp,
  groupMonsters,
  translateDifficulty,
} from '~/domain/encounters/encounters';
import usePcsFromSession from '~/components/hooks/usePcsFromSession';
import { useContext } from 'react';
import PartyTemplateContext from '~/components/contexts/partyTemplateContext';

import styles from '~/components/encounterList.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const loader = async () => {
  const encountersByGroup = await getEncountersByGroup();
  if (!encountersByGroup) {
    throw new Error('Encounter not found');
  }

  return json({ encountersByGroup });
};

export const action = async ({ request }) => {
  return null;
};

function EncounterList() {
  const { encountersByGroup } = useLoaderData();

  useTitle('Lista de encuentros');

  const [pcs] = usePcsFromSession();
  const partyTemplateContext = useContext(PartyTemplateContext) || {};
  const { partyTemplateState } = partyTemplateContext;
  let pcLevels = pcs.map(pc => pc.level);
  if (pcLevels.length === 0) {
    pcLevels = partyTemplateState || [1];
  }

  const xpByGroup = Object.values(encountersByGroup).map(encounters =>
    encounters.reduce(
      (totalXp, encounter) =>
        totalXp +
        getEncounterXp(
          encounter.monsters.map(monster => Monster(monster.name)),
          pcLevels.length
        ),
      0
    )
  );

  return (
    <div className="encounterList">
      {Object.entries(encountersByGroup)?.map(([group, encounters], i) => {
        return (
          <div className="encounterList__group">
            <span className="encounterList__group-name">
              {!!group && group !== 'undefined' && (
                <>
                  {group} <span>({xpByGroup[i]} xp)</span>
                </>
              )}
            </span>
            <div className="cards encounterList__encounters">
              {encounters?.map(encounter => {
                const difficulty = pcLevels
                  ? getEncounterDifficulty(
                      getMonsters(encounter.monsters),
                      pcLevels
                    )
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
                      <span className="encounterList__medium">
                        CR {challenge}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default EncounterList;
