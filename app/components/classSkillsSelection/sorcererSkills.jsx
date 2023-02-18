import { useEffect, useState } from 'react';

import {
  SORCERER_ORIGIN,
  translateSorcererOrigin,
  getSorcererOrigin,
  DRAGON_ANCESTORS,
  translateDragonAncestor,
} from '~/domain/sorcerer';
import {
  getSorcererSpellSlots,
  getSorcererTotalSpells,
  SORCERER_SPELLS,
} from '~/domain/spells/sorcerer';

import styles from '~/components/characters.module.css';

function SorcererSkills(props) {
  const { pc, setSkillsNamespace } = props;
  const initSorcererOrigin = getSorcererOrigin(pc) || 'draconic-bloodline';

  const [sorcererOrigin, setSorcererOrigin] = useState(initSorcererOrigin);
  const [selectedSpells0, setSelectedSpells0] = useState([]);
  const [selectedSpells1, setSelectedSpells1] = useState([]);

  const spellSlots = getSorcererSpellSlots(pc);
  const totalSpells = getSorcererTotalSpells(pc);

  useEffect(() => {
    setSkillsNamespace(
      'sorcererSkills',
      selectedSpells0.filter(v => v).length === spellSlots[0] &&
        selectedSpells1.filter(v => v).length === totalSpells
    );
  }, [setSkillsNamespace, selectedSpells0, selectedSpells1]);

  return (
    <>
      <p>
        <label>
          Escoge Origen de Hechicero:{' '}
          <select
            name="sorcerer-origin"
            value={sorcererOrigin}
            onChange={e => setSorcererOrigin(e.target.value)}
          >
            {Object.keys(SORCERER_ORIGIN).map(sorcererOrigin => (
              <option value={sorcererOrigin} key={sorcererOrigin}>
                {translateSorcererOrigin(sorcererOrigin)}
              </option>
            ))}
          </select>
        </label>
      </p>

      {sorcererOrigin === 'draconic-bloodline' && (
        <p>
          <label>
            Escoge Ancestro Dragon:{' '}
            <select name="dragon-ancestor">
              {DRAGON_ANCESTORS.map(ancestor => (
                <option value={ancestor} key={ancestor}>
                  {translateDragonAncestor(ancestor)}
                </option>
              ))}
            </select>
          </label>
        </p>
      )}

      <p>
        Conoces {spellSlots[0]} trucos de hechicero:{' '}
        {Object.values(SORCERER_SPELLS)
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
                id={spell.name}
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
        Conoces {totalSpells} conjuros de nivel 1 de hechicero:{' '}
        {Object.values(SORCERER_SPELLS)
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
                id={spell.name}
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

export default SorcererSkills;
