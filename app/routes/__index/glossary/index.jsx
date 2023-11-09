import { createRef, useEffect, useMemo, useRef, useState } from 'react';
import { useSkillItems } from '~/components/modal/useSkillItems';
import { SkillItem } from '~/components/modal/skillItem';
import { SkillModal } from '~/components/modal/skillModal';
import { getSearchResults } from '~/domain/search';
import { InventoryItem } from '~/components/modal/inventoryItem';
import { ItemModal } from '~/components/modal/itemModal';
import { useInventoryItems } from '~/components/modal/useInventoryItems';
import { useCharacterItems } from '~/components/modal/useCharacterItems';
import { CharacterModal } from '~/components/modal/characterModal';
import { CharacterItem } from '~/components/modal/characterItem';
import { Monster } from '~/domain/encounters/monsters';

import styles from '~/components/glossary.module.css';
import cardStyles from '~/components/cards/cards.module.css';

const ITEM_HEIGHT = 67;

function Sidebar(props) {
  const { filters, setFilters } = props;

  function onSearchChange(e) {
    const newFilters = { search: e.target.value };
    setFilters(newFilters);
  }

  return (
    <div className={styles.glossarySidebar}>
      <div className={styles.sidebarContent}>
        <div className={styles.sidebarSection}>
          <div className={styles.filter}>
            <label className={styles.filterLabelInline}>
              Búsqueda:{' '}
              <input
                className={`${cardStyles.buttonCard} ${cardStyles.buttonCardBig}`}
                value={filters.search}
                onChange={onSearchChange}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

function Glossary() {
  const [filters, setFilters] = useState({ search: '' });
  const { search } = filters;

  const searchResults = useMemo(
    () => (search.length > 2 ? getSearchResults(search) : getSearchResults('')),
    [search]
  );

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
    <div className={styles.glossary} ref={formRef}>
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

      <Sidebar filters={filters} setFilters={setFilters} />
      <div className={styles.glossaryList}>
        <div className={styles.results}>
          {!!searchResults.spells.length && (
            <div className={styles.resultsSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.headerTitle}>Conjuros</span>
              </div>
              <ul className={styles.sectionItems}>
                {searchResults.spells.map((spell, i) => (
                  <li className={styles.sectionItem} key={spell.name}>
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
            <div className={styles.resultsSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.headerTitle}>Objetos</span>
              </div>
              <ul className={styles.sectionItems}>
                {searchResults.equipment.map((item, i) => (
                  <li className={styles.sectionItem} key={item.name}>
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
            <div className={styles.resultsSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.headerTitle}>Rasgos y Atributos</span>
              </div>
              <ul className={styles.sectionItems}>
                {searchResults.traits.map(([traitName, trait], i) => (
                  <li className={styles.sectionItem} key={traitName}>
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
            <div className={styles.resultsSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.headerTitle}>Enemigos</span>
              </div>
              <ul className={styles.sectionItems}>
                {searchResults.monsters.map((monster, i) => (
                  <li className={styles.sectionItem} key={monster.name}>
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
        </div>
      </div>
    </div>
  );
}

export default Glossary;
