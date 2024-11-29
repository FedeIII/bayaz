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
import { useLoaderData, useSearchParams } from '@remix-run/react';
import { isDm } from '~/domain/user';
import { useSearchTable } from '~/components/hooks/useSearchTable';
import { TABLE_MAP } from '~/domain/tables/tables';
import Sidebar from '~/components/glossary/sidebar';
import SelectedTable from '~/components/glossary/selectedTable';
import { useTitle } from '~/components/hooks/useTitle';

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

export const meta = ({ data }) => [
  {
    title: 'Kandrax - Glosario',
  },
];

const ITEM_HEIGHT = 67;

export const loader = async ({ request }) => {
  const user = await getSessionUser(request);

  return { isDm: isDm(user) };
};

function Glossary() {
  const { isDm } = useLoaderData();
  useTitle('Glosario');

  const [filters, setFilters] = useState({ search: '', table: '' });
  const { search, table } = filters;

  const searchResults = useSearchResults(search, isDm);
  const tableResults = useSearchTable(table);

  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedTableName, setSelectedTableName] = useState(
    searchParams.get('table')
  );
  const selectedTable =
    selectedTableName &&
    selectedTableName !== 'null' &&
    TABLE_MAP.get(selectedTableName);
  const [selectedRow, setSelectedRow] = useState(searchParams.get('row'));

  useEffect(() => {
    if (searchParams.get('table') && searchParams.get('table') !== 'null') {
      setSelectedTableName(searchParams.get('table'));
    }
  }, [searchParams.get('table')]);

  useEffect(() => {
    if (selectedTableName) {
      setSearchParams(
        prev => {
          prev.set('table', selectedTableName);
          return prev;
        },
        {
          replace: false,
          state: { table: selectedTableName },
        }
      );
    }
  }, [selectedTableName]);

  useEffect(() => {
    if (searchParams.get('row') !== null || !!selectedRow) {
      setSelectedRow(searchParams.get('row'));
    }
  }, [searchParams.get('row')]);

  useEffect(() => {
    if (selectedRow !== null) {
      setSearchParams(
        prev => {
          prev.set('row', selectedRow);
          return prev;
        },
        {
          replace: false,
          state: { row: selectedRow },
        }
      );
    }
  }, [selectedRow]);

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

          {!!selectedTable && (
            <SelectedTable
              table={selectedTable}
              selectedRow={selectedRow}
              setSelectedRow={setSelectedRow}
              setSelectedTableName={setSelectedTableName}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Glossary;
