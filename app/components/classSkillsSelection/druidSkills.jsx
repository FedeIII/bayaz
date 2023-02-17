import { useEffect, useState } from 'react';

import { DRUID_SPELLS, getDruidSpellSlots } from "~/utils/spells/druid";

import styles from '~/components/characters.module.css';

function DruidSkills(props) {
  const { pc, setSkillsNamespace } = props;

  const [selectedSpells0, setSelectedSpells0] = useState([]);

  const spellSlots = getDruidSpellSlots(pc);

  useEffect(() => {
    setSkillsNamespace(
      'druidSkills',
      selectedSpells0.filter(v => v).length === spellSlots[0]
    );
  }, [setSkillsNamespace, selectedSpells0]);

  return (
    <>
      <p>
        Conoces {spellSlots[0]} trucos de druida:{' '}
        {Object.values(DRUID_SPELLS)
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
    </>
  );
}

export default DruidSkills;
