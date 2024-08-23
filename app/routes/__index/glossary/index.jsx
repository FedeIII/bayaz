import { createRef, useEffect, useRef, useState } from 'react';
import { useSkillItems } from '~/components/modal/useSkillItems';
import { SkillItem } from '~/components/modal/skillItem';
import { SkillModal } from '~/components/modal/skillModal';
import { InventoryItem } from '~/components/modal/inventoryItem';
import { ItemModal } from '~/components/modal/itemModal';
import { useInventoryItems } from '~/components/modal/useInventoryItems';
import { useCharacterItems } from '~/components/modal/useCharacterItems';
import { CharacterModal } from '~/components/modal/characterModal';
import { CharacterItem } from '~/components/modal/characterItem';
import { Monster } from '~/domain/encounters/monsters';
import { useSearchResults } from '~/components/hooks/useSearchResults';
import { getSessionUser } from '~/services/session.server';
import { useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import { isDm } from '~/domain/user';
import { useSearchTable } from '~/components/hooks/useSearchTable';
import { TABLE_MAP } from '~/domain/tables';
import classNames from 'classnames';

import styles from '~/components/glossary.css';
import charactersStyles from '~/components/characters/characters.css';
import itemStyles from '~/components/modal/inventoryItem.css';
export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
    { rel: 'stylesheet', href: charactersStyles },
    { rel: 'stylesheet', href: itemStyles },
  ];
};

const ITEM_HEIGHT = 67;

export const loader = async ({ request }) => {
  const user = await getSessionUser(request);

  return json({ isDm: isDm(user) });
};

function Sidebar(props) {
  const { filters, setFilters, tables, setSelectedTable } = props;

  function onSearchChange(e) {
    const newFilters = { search: e.target.value };
    setFilters(f => ({ ...f, ...newFilters }));
  }

  function onTableChange(e) {
    const newFilters = { table: e.target.value };
    setFilters(f => ({ ...f, ...newFilters }));
  }

  return (
    <div className="glossary__sidebar">
      <div className="glossary__sidebar-content">
        <div className="glossary__sidebar-section">
          <div className="glossary__filter">
            <label className="glossary__filter-label-inline">
              Búsqueda:{' '}
              <input
                className="cards__button-card cards__button-card-big"
                value={filters.search}
                onChange={onSearchChange}
              />
            </label>
          </div>
          <div className="glossary__filter">
            <label className="glossary__filter-label-inline">
              Tabla:{' '}
              <input
                className="cards__button-card cards__button-card-big"
                value={filters.table}
                onChange={onTableChange}
              />
            </label>
          </div>
        </div>

        {!!tables?.length && (
          <div className="glossary__sidebar-section">
            {tables.map(table => (
              <div key={table.name} className="glossary__filter">
                <button
                  type="button"
                  className="cards__button-card"
                  onClick={() => setSelectedTable(table.name)}
                >
                  {table.name}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Glossary() {
  const { isDm } = useLoaderData();
  const [filters, setFilters] = useState({ search: '', table: '' });
  const { search, table } = filters;

  const searchResults = useSearchResults(search, isDm);
  const tableResults = useSearchTable(table);

  const [selectedTableName, setSelectedTableName] = useState(null);
  const selectedTable = TABLE_MAP.get(selectedTableName);

  const [refsList, setRefsList] = useState({
    spells: useRef(searchResults.spells.map(createRef)),
    equipment: useRef(searchResults.equipment.map(createRef)),
    traits: useRef(searchResults.traits.map(createRef)),
    monsters: useRef(searchResults.monsters.map(createRef)),
  });

  useEffect(() => {
    if (searchResults.spells.length) {
      refsList.spells.current = searchResults.spells.map(createRef);
    }
    if (searchResults.equipment.length) {
      refsList.equipment.current = searchResults.equipment.map(createRef);
    }
    if (searchResults.traits.length) {
      refsList.traits.current = searchResults.traits.map(createRef);
    }
    if (searchResults.monsters.length) {
      refsList.monsters.current = searchResults.monsters.map(createRef);
    }
  }, [searchResults, refsList]);

  const [
    skillModalContent,
    closeSkillModal,
    openSkillModal,
    selectedSkillRef,
    setSelectedSkillRef,
  ] = useSkillItems(undefined, refsList);

  const [
    itemModalContent,
    closeItemModal,
    openItemModal,
    selectedItemRef,
    setSelectedItemRef,
  ] = useInventoryItems(undefined, refsList);

  const [
    characterModalContent,
    closeCharacterModal,
    openCharacterModal,
    selectedCharacterRef,
    setSelectedCharacterRef,
  ] = useCharacterItems(refsList);

  const formRef = useRef(null);

  return (
    <div className="glossary" ref={formRef}>
      {skillModalContent && (
        <SkillModal
          elRef={selectedSkillRef}
          formRef={formRef}
          closeModal={closeSkillModal}
        >
          {skillModalContent}
        </SkillModal>
      )}

      {itemModalContent && (
        <ItemModal
          elRef={selectedItemRef}
          formRef={formRef}
          closeModal={closeItemModal}
          showOverMouse={ITEM_HEIGHT}
          isDm
        >
          {itemModalContent}
        </ItemModal>
      )}

      {characterModalContent && (
        <CharacterModal
          elRef={selectedCharacterRef}
          formRef={formRef}
          closeModal={closeCharacterModal}
        >
          {characterModalContent}
        </CharacterModal>
      )}

      <Sidebar
        filters={filters}
        setFilters={setFilters}
        tables={tableResults}
        setSelectedTable={setSelectedTableName}
      />

      <div className="glossary__list">
        <div className="glossary__results">
          {!!searchResults.spells.length && (
            <div className="glossary__results-section">
              <div className="glossary__section-header">
                <span className="glossary__header-title">Conjuros</span>
              </div>
              <ul className="glossary__section-items">
                {searchResults.spells.map((spell, i) => (
                  <li className="glossary__section-item" key={spell.name}>
                    <SkillItem
                      ref={refsList.spells.current[i]}
                      traitName={spell.name}
                      trait="spell"
                      openModal={openSkillModal('spells', i)}
                      key={spell.name}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!!searchResults.equipment.length && (
            <div className="glossary__results-section">
              <div className="glossary__section-header">
                <span className="glossary__header-title">Objetos</span>
              </div>
              <ul className="glossary__section-items">
                {searchResults.equipment.map((item, i) => (
                  <li className="glossary__section-item" key={item.name}>
                    <InventoryItem
                      ref={refsList.equipment.current[i]}
                      pItem={item}
                      isLast
                      openModal={openItemModal('equipment', i)}
                      key={item.name}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!!searchResults.traits.length && (
            <div className="glossary__results-section">
              <div className="glossary__section-header">
                <span className="glossary__header-title">
                  Rasgos y Atributos
                </span>
              </div>
              <ul className="glossary__section-items">
                {searchResults.traits.map(([traitName, trait], i) => (
                  <li className="glossary__section-item" key={traitName}>
                    <SkillItem
                      ref={refsList.traits.current[i]}
                      traitName={traitName}
                      trait={trait}
                      openModal={openSkillModal('traits', i)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!!searchResults.monsters.length && (
            <div className="glossary__results-section">
              <div className="glossary__section-header">
                <span className="glossary__header-title">Enemigos</span>
              </div>
              <ul className="glossary__section-items">
                {searchResults.monsters.map((monster, i) => (
                  <li className="glossary__section-item" key={monster.name}>
                    <CharacterItem
                      ref={refsList.monsters.current[i]}
                      character={Monster(monster.name)}
                      charSection="monsters"
                      charIndex={i}
                      openModal={openCharacterModal(
                        Monster(monster.name),
                        'monsters',
                        i
                      )}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!!selectedTableName && (
            <div className="glossary__results-section">
              <div className="glossary__section-header">
                <span className="glossary__header-title">
                  {selectedTableName}
                </span>
              </div>
              <table>
                <thead className="glossary__table-head">
                  <tr>
                    {Object.keys(selectedTable.rows[0]).map((key, i) => (
                      <th
                        key={key}
                        className={classNames('glossary__table-head-cell', {
                          'glossary__table-odd': i % 2,
                          'glossary__table-even': !(i % 2),
                        })}
                      >
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                {selectedTable.rows.map((row, i) => (
                  <tr
                    key={i}
                    className={
                      i % 2 ? 'glossary__table-odd' : 'glossary__table-even'
                    }
                  >
                    {Object.values(row).map((val, j) => (
                      <td
                        key={val}
                        className={classNames('glossary__table-column', {
                          'glossary__table-column--first': j === 0,
                          [selectedTable.classNames?.td]:
                            !!selectedTable.classNames?.td,
                        })}
                      >
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Glossary;
