import { Link, useLoaderData } from '@remix-run/react';
import { useContext, useMemo, useState } from 'react';

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
import PartyTemplateContext from '~/components/contexts/partyTemplateContext';
import withLoading from '~/components/HOCs/withLoading';

import styles from '~/components/encounterList.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const loader = async () => {
  const encountersByGroup = await getEncountersByGroup();
  if (!encountersByGroup) {
    throw new Error('Encounter not found');
  }

  const sortedEncountersByGroup = Object.entries(encountersByGroup).sort(
    (a, b) => a[0].localeCompare(b[0])
  );

  return { encountersByGroup: sortedEncountersByGroup };
};

export const action = async ({ request }) => {
  return null;
};

function EncounterList() {
  const { encountersByGroup } = useLoaderData();
  const [groupFilter, setGroupFilter] = useState('');

  useTitle('Lista de encuentros');

  const [pcs] = usePcsFromSession();
  const partyTemplateContext = useContext(PartyTemplateContext) || {};
  const { partyTemplateState } = partyTemplateContext;
  let pcLevels = pcs.map(pc => pc.level);
  if (pcLevels.length === 0) {
    pcLevels = partyTemplateState || [1];
  }

  const xpByGroup = useMemo(
    () =>
      encountersByGroup.map(encounters =>
        encounters[1].reduce(
          (totalXp, encounter) =>
            totalXp +
            getEncounterXp(
              encounter.monsters.map(monster => Monster(monster.name)),
              pcLevels.length
            ),
          0
        )
      ),
    [encountersByGroup, pcLevels]
  );

  const filteredEncountersByGroup = useMemo(() => {
    if (!groupFilter) return encountersByGroup;

    return encountersByGroup.filter(([group]) =>
      group.toLowerCase().includes(groupFilter.toLowerCase())
    );
  }, [encountersByGroup, groupFilter]);

  return (
    <div className="encounterList__container">
      <div className="encounterList__filters">
        <label htmlFor="groupFilter">
          Grupo:{' '}
          <input
            type="text"
            placeholder="Nombre de grupo..."
            value={groupFilter}
            onChange={e => setGroupFilter(e.target.value)}
            className="encounterList__filter-input"
          />
        </label>
      </div>
      <div className="encounterList">
        {filteredEncountersByGroup?.map(([group, encounters], i) => {
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
                      <div className="encounterList__name">
                        {encounter.name}
                      </div>
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
    </div>
  );
}

export default withLoading(EncounterList);
