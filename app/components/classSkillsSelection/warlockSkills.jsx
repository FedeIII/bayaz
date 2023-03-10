import { useEffect, useState } from 'react';

import styles from '~/components/characters.module.css';
import {
  getWarlockSpellSlots,
  getWarlockTotalSpells,
  WARLOCK_SPELLS
} from "~/domain/spells/warlock";

function WarlockSkills(props) {
  const { pc, setSkillsNamespace } = props;

  const [selectedPatron, setSelectedPatron] = useState(null);
  const [selectedSpells0, setSelectedSpells0] = useState([]);
  const [selectedSpells1, setSelectedSpells1] = useState([]);

  const spellSlots = getWarlockSpellSlots(pc);
  const totalSpells = getWarlockTotalSpells(pc);

  useEffect(() => {
    setSkillsNamespace(
      'warlockSkills',
      !!selectedPatron &&
        selectedSpells0.filter(v => v).length === spellSlots[0] &&
        selectedSpells1.filter(v => v).length === totalSpells
    );
  }, [setSkillsNamespace, !!selectedPatron, selectedSpells0, selectedSpells1]);

  return (
    <>
      <p>
        Firma un pacto con un ser de otro mundo:{' '}
        <label htmlFor="archfey" className={styles.skillLabel}>
          <input
            type="radio"
            name="patron"
            value="archfey"
            onChange={e => setSelectedPatron(e.target.value)}
          />
          El Archihada
        </label>
        <label htmlFor="fiend" className={styles.skillLabel}>
          <input
            type="radio"
            name="patron"
            value="fiend"
            onChange={e => setSelectedPatron(e.target.value)}
          />
          El Diablo
        </label>
        <label htmlFor="greatOldOne" className={styles.skillLabel}>
          <input
            type="radio"
            name="patron"
            value="greatOldOne"
            onChange={e => setSelectedPatron(e.target.value)}
          />
          El Gran Antiguo
        </label>
      </p>

      <p>
        Conoces {spellSlots[0]} trucos de brujo:{' '}
        {Object.values(WARLOCK_SPELLS)
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
        Conoces {totalSpells} conjuros de nivel 1 de brujo:{' '}
        {Object.values(WARLOCK_SPELLS)
          .filter(
            s => s.level === 1 && (!s.subtype || s.subtype === selectedPatron)
          )
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

export default WarlockSkills;
