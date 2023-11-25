import { useEffect, useState } from 'react';

import { DRUID_SPELLS, getDruidSpellSlots } from '~/domain/spells/druid';
import { translateSpell } from '~/domain/spells/spells';

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
    <div className="characters__trait-columns characters__trait-columns--three">
      <div className="characters__trait-label">
        <span className="characters__trait-title">
          Conoces {spellSlots[0]} trucos de druida
        </span>
        <div className="characters__traits">
          {Object.values(DRUID_SPELLS)
            .filter(s => s.level === 0)
            .map((spell, i) => (
              <label
                htmlFor={spell.name}
                key={spell.name}
                className="characters__skill-label"
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
                {translateSpell(spell.name)}
              </label>
            ))}
        </div>
      </div>
    </div>
  );
}

export default DruidSkills;
