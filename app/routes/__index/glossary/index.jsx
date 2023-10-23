import { useEffect, useMemo, useRef, useState } from 'react';
import { useSkillItems } from '~/components/modal/useSkillItems';
import { SkillItem } from '~/components/modal/skillItem';
import { SkillModal } from '~/components/modal/skillModal';
import { MAX_RESULTS, getSearchResults } from '~/domain/search';
import { InventoryItem } from '~/components/modal/inventoryItem';
import { useInventoryItems } from '~/components/modal/useInventoryItems';

import styles from '~/components/glossary.module.css';
import cardStyles from '~/components/cards/cards.module.css';

function Sidebar(props) {
  const { filters, setFilters } = props;

  function onSearchChange(e) {
    const newFilters = { search: e.target.value.toLowerCase() };
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
                defaultValue=""
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

function getRefsForResults(searchResults) {
  return Object.entries(searchResults).reduce(
    (refs, [resultsGroup, results]) => ({
      ...refs,
      [resultsGroup]: results.map(() => []),
    }),
    {}
  );
}

function Glossary() {
  const [filters, setFilters] = useState({ search: '' });
  const { search } = filters;

  const refsList = {
    spells: Array.from(Array(MAX_RESULTS), () => useRef()),
    equipment: Array.from(Array(MAX_RESULTS), () => useRef()),
  };

  const searchResults = useMemo(() => getSearchResults(search), [search]);

  const [itemRefs, setItemRefs] = useState(
    getRefsForResults(searchResults, refsList)
  );

  useEffect(() => {
    setItemRefs(getRefsForResults(searchResults, refsList));
  }, [searchResults]);

  const [
    skillModalContent,
    closeSkillModal,
    openSkillModal,
    selectedSkillRef,
    setSelectedSkillRef,
  ] = useSkillItems(undefined, itemRefs);

  const [
    itemModalContent,
    closeItemModal,
    openItemModal,
    selectedItemRef,
    setSelectedItemRef,
  ] = useInventoryItems(undefined, itemRefs);

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
          closeOnLeave
        >
          {itemModalContent}
        </ItemModal>
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
                  <li className={styles.sectionItem}>
                    <SkillItem
                      ref={itemRefs.spells[i]}
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
                  <li className={styles.sectionItem}>
                    <InventoryItem
                      ref={itemRefs.equipment[i]}
                      pItem={item}
                      isLast
                      openModal={openItemModal('equipment', i)}
                      closeModal={closeItemModal}
                      key={item.name}
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
