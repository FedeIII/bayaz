import { useEffect, useState } from 'react';

import {
  getWizardSpellSlots,
  getWizardTotalSpells,
  WIZARD_SPELLS,
} from '~/domain/spells/wizard';
import { translateSpell } from '~/domain/spells/spells';

function WizardSkills(props) {
  const { pc, setSkillsNamespace } = props;

  const [selectedSpells0, setSelectedSpells0] = useState([]);
  const [selectedSpells1, setSelectedSpells1] = useState([]);

  const spellSlots = getWizardSpellSlots(pc);
  const totalSpells = getWizardTotalSpells(pc);

  useEffect(() => {
    setSkillsNamespace(
      'wizardSkills',
      selectedSpells0.filter(v => v).length === spellSlots[0] &&
        selectedSpells1.filter(v => v).length === totalSpells
    );
  }, [setSkillsNamespace, selectedSpells0, selectedSpells1]);

  return (
    <>
      <p>
        Conoces {spellSlots[0]} trucos de mago:{' '}
        {Object.values(WIZARD_SPELLS)
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
      </p>

      <p>
        Conoces {totalSpells} conjuros de nivel 1 de mago:{' '}
        {Object.values(WIZARD_SPELLS)
          .filter(s => s.level === 1)
          .map((spell, i) => (
            <label
              htmlFor={spell.name}
              key={spell.name}
              className="characters__skill-label"
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
              {translateSpell(spell.name)}
            </label>
          ))}
      </p>
    </>
  );
}

export default WizardSkills;
