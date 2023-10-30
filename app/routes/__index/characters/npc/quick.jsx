import { Form } from '@remix-run/react';

import { useRef, useState } from 'react';
import { createRandomNpc } from '~/domain/npc/npc';
import { NPC_RACES_LIST } from '~/domain/npc/attrs/npcRaces';
import { t } from '~/domain/translations';
import { removeItem } from '~/utils/insert';
import { CharacterInfo } from '~/components/characters/characterInfo';

import styles from '~/components/filters.module.css';
import cardStyles from '~/components/cards/cards.module.css';

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

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        <div className={styles.sidebarSection}>
          <div className={styles.filterVertical}>
            <div className={styles.filterOptions}>
              <button
                type="button"
                className={`${cardStyles.buttonCard}`}
                onClick={onCreateRandomClick}
              >
                Crear Random NPC
              </button>
            </div>
          </div>
        </div>

        <div className={styles.sidebarSection}>
          <div className={styles.filterVertical}>
            <div className={styles.filterLabel}>
              Razas:{' '}
              <label className={styles.filterOption}>
                <input
                  type="checkbox"
                  name="race[]"
                  value="all"
                  className={`${cardStyles.buttonCard}`}
                  onClick={onRaceSelect}
                />
                <span>Todas</span>
              </label>
            </div>{' '}
            <div className={styles.filterOptionsTwoColumns}>
              {NPC_RACES_LIST.map(race => {
                return (
                  <label className={styles.filterOption} key={race}>
                    <input
                      key={race}
                      type="checkbox"
                      name="race[]"
                      value={race}
                      checked={filters.races.includes(race)}
                      className={`${cardStyles.buttonCard}`}
                      onChange={onRaceSelect}
                    />
                    <span>{t(race)}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className={styles.filter}>
            <span className={styles.filterLabel}>Género:</span>{' '}
            <div className={styles.filterOptionsTwoColumns}>
              <label className={styles.filterOption}>
                <input
                  type="checkbox"
                  name="gender[]"
                  value="Male"
                  className={`${cardStyles.buttonCard}`}
                  onClick={onGenderSelect}
                />
                <span>{t('Male')}</span>
              </label>
              <label className={styles.filterOption}>
                <input
                  type="checkbox"
                  name="gender[]"
                  value="Female"
                  className={`${cardStyles.buttonCard}`}
                  onClick={onGenderSelect}
                />
                <span>{t('Female')}</span>
              </label>
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

  const [filters, setFilters] = useState({ races: [], genders: [] });

  return (
    <Form method="post" ref={formRef}>
      <div className={styles.container}>
        <Sidebar
          onCreateRandomClick={onCreateRandomClick}
          filters={filters}
          setFilters={setFilters}
        />
        <div className={styles.results}>
          {!!npc && <CharacterInfo {...npc} />}
        </div>
      </div>
    </Form>
  );
}

export default QuickNpc;
