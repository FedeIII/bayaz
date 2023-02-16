import { useEffect, useState } from 'react';

import { translateItem } from '~/utils/equipment/equipment';
import { getAllMusicalInstruments } from '~/utils/equipment/tools';
import { BARD_SPELLS } from '~/utils/spells/bard';
import { getSpellSlots, getTotalSpells } from '~/utils/spells/spells';

import styles from '~/components/characters.module.css';

const MAX_INSTRUMENTS = 3;

function BardSkills(props) {
  const { pc, setSkillsNamespace } = props;

  const [selectedInstruments, setSelectedInstruments] = useState([]);
  const [selectedSpells0, setSelectedSpells0] = useState([]);
  const [selectedSpells1, setSelectedSpells1] = useState([]);

  const spellSlots = getSpellSlots(pc);
  const totalSpells = getTotalSpells(pc);

  useEffect(() => {
    setSkillsNamespace(
      'bardSkills',
      selectedInstruments.filter(v => v).length === MAX_INSTRUMENTS &&
        selectedSpells0.filter(v => v).length === spellSlots[0] &&
        selectedSpells1.filter(v => v).length === totalSpells
    );
  }, [
    setSkillsNamespace,
    selectedInstruments,
    selectedSpells0,
    selectedSpells1,
  ]);

  return (
    <>
      <p>
        Selecciona {MAX_INSTRUMENTS} instrumentos con los que ser competente:{' '}
        {getAllMusicalInstruments().map((instrument, i) => (
          <label
            htmlFor={instrument.name}
            key={instrument.name}
            className={styles.skillLabel}
          >
            <input
              type="checkbox"
              name="items[]"
              checked={!!selectedInstruments[i]}
              value={instrument.name}
              onChange={() =>
                setSelectedInstruments(oldChecks => {
                  const newChecks = oldChecks.slice();
                  newChecks[i] = !newChecks[i];
                  return newChecks;
                })
              }
            />
            {translateItem(instrument.name)}
          </label>
        ))}
      </p>

      <p>
        Conoces {spellSlots[0]} trucos de bardo:{' '}
        {Object.values(BARD_SPELLS)
          .filter(s => s.level === 0)
          .map((spell, i) => (
            <label
              htmlFor={spell.name}
              key={spell.name}
              className={styles.skillLabel}
            >
              <input
                type="checkbox"
                name="spells[]"
                checked={!!selectedSpells0[i]}
                value={spell.name}
                onChange={() =>
                  setSelectedSpells0(oldChecks => {
                    const newChecks = oldChecks.slice();
                    newChecks[i] = !newChecks[i];
                    return newChecks;
                  })
                }
              />
              {spell.translation}
            </label>
          ))}
      </p>

      <p>
        Conoces {totalSpells} conjuros de nivel 1 de bardo:{' '}
        {Object.values(BARD_SPELLS)
          .filter(s => s.level === 1)
          .map((spell, i) => (
            <label
              htmlFor={spell.name}
              key={spell.name}
              className={styles.skillLabel}
            >
              <input
                type="checkbox"
                name="spells[]"
                checked={!!selectedSpells1[i]}
                value={spell.name}
                onChange={() =>
                  setSelectedSpells1(oldChecks => {
                    const newChecks = oldChecks.slice();
                    newChecks[i] = !newChecks[i];
                    return newChecks;
                  })
                }
              />
              {spell.translation}
            </label>
          ))}
      </p>
    </>
  );
}

export default BardSkills;
