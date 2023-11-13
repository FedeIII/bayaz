import { Form } from '@remix-run/react';

import { useRef, useState } from 'react';
import { createRandomNpc } from '~/domain/npc/npc';
import { NPC_RACES_LIST } from '~/domain/npc/attrs/npcRaces';
import { NPC_DEITIES } from '~/domain/npc/attrs/npcFaith';
import { t } from '~/domain/translations';
import { removeItem } from '~/utils/insert';
import { CharacterInfo } from '~/components/characters/characterInfo';

import styles from '~/components/filters.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

function Sidebar(props) {
  const { onCreateRandomClick, filters, setFilters } = props;

  function onRaceSelect(e) {
    const race = e.target.value;
    if (race === 'all') {
      setFilters(f => ({
        ...f,
        races: e.target.checked ? NPC_RACES_LIST : [],
      }));
    }

    if (filters.races.includes(race)) {
      return setFilters(f => ({
        ...f,
        races: removeItem(r => r === race, f.races),
      }));
    }

    return setFilters(f => ({ ...f, races: [...f.races, race] }));
  }

  function onGenderSelect(e) {
    const gender = e.target.value;
    if (filters.genders.includes(gender)) {
      return setFilters(f => ({
        ...f,
        genders: removeItem(r => r === gender, f.genders),
      }));
    }

    return setFilters(f => ({ ...f, genders: [...f.genders, gender] }));
  }

  function onDeitySelect(e) {
    const deity = e.target.value;
    if (deity === 'all') {
      setFilters(f => ({
        ...f,
        deities: e.target.checked ? NPC_DEITIES.map(([_, deity]) => deity) : [],
      }));
    }

    if (filters.deities.includes(deity)) {
      return setFilters(f => ({
        ...f,
        deities: removeItem(r => r === deity, f.deities),
      }));
    }

    return setFilters(f => ({ ...f, deities: [...f.deities, deity] }));
  }

  return (
    <div className="filters__sidebar">
      <div className="filters__sidebarContent">
        <div className="filters__sidebarSection">
          <div className="filters__filterVertical">
            <div className="filters__filterOptions">
              <button
                type="button"
                className="cards__button-card"
                onClick={onCreateRandomClick}
              >
                Crear Random NPC
              </button>
            </div>
          </div>
        </div>

        <div className="filters__sidebarSection">
          <div className="filters__filterVertical">
            <div className="filters__filterLabel">
              <span className="filters__filterTitle">Razas:</span>{' '}
              <label className="filters__filterOption">
                <input
                  type="checkbox"
                  name="race[]"
                  value="all"
                  className="cards__button-card"
                  onClick={onRaceSelect}
                />
                <span>Todas</span>
              </label>
            </div>{' '}
            <div className="filters__filterOptionsTwoColumns">
              {NPC_RACES_LIST.map(race => {
                return (
                  <label className="filters__filterOption" key={race}>
                    <input
                      key={race}
                      type="checkbox"
                      name="race[]"
                      value={race}
                      checked={filters.races.includes(race)}
                      className="cards__button-card"
                      onChange={onRaceSelect}
                    />
                    <span>{t(race)}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="filters__filter">
            <span className={`$"filters__filterLabel" $"filters__filterTitle"`}>
              Género:
            </span>{' '}
            <div className="filters__filterOptionsTwoColumns">
              <label className="filters__filterOption">
                <input
                  type="checkbox"
                  name="gender[]"
                  value="Male"
                  className="cards__button-card"
                  onClick={onGenderSelect}
                />
                <span>{t('Male')}</span>
              </label>
              <label className="filters__filterOption">
                <input
                  type="checkbox"
                  name="gender[]"
                  value="Female"
                  className="cards__button-card"
                  onClick={onGenderSelect}
                />
                <span>{t('Female')}</span>
              </label>
            </div>
          </div>

          <div className="filters__filterVertical">
            <div className="filters__filterLabel">
              <span className="filters__filterTitle">Dioses:</span>{' '}
              <label className="filters__filterOption">
                <input
                  type="checkbox"
                  name="deity[]"
                  value="all"
                  className="cards__button-card"
                  onClick={onDeitySelect}
                />
                <span>Todos</span>
              </label>
            </div>{' '}
            <div className="filters__filterOptionsTwoColumns">
              {NPC_DEITIES.map(([_, deity]) => {
                return (
                  <label className="filters__filterOption" key={deity}>
                    <input
                      key={deity}
                      type="checkbox"
                      name="deity[]"
                      value={deity}
                      checked={filters.deities.includes(deity)}
                      className="cards__button-card"
                      onChange={onDeitySelect}
                    />
                    <span>{t(deity)}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickNpc() {
  const formRef = useRef();

  const [npc, setNpc] = useState(null);

  function onCreateRandomClick() {
    setNpc(createRandomNpc(filters));
  }

  const [filters, setFilters] = useState({
    races: [],
    genders: [],
    deities: [],
  });

  return (
    <Form method="post" ref={formRef}>
      <div className="filters__container">
        <Sidebar
          onCreateRandomClick={onCreateRandomClick}
          filters={filters}
          setFilters={setFilters}
        />
        <div className="filters__results">
          {!!npc && <CharacterInfo {...npc} />}
        </div>
      </div>
    </Form>
  );
}

export default QuickNpc;
