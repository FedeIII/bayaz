import { useEffect, useState } from 'react';

import {
  getWizardSpellSlots,
  getWizardTotalSpells,
  WIZARD_SPELLS,
} from '~/domain/spells/wizard';
import { SkillItem } from '../modal/skillItem';
import { translateSpell } from '~/domain/spells/spells';
import { translateSchool } from '~/domain/spells/spellTranslations';
import { getAllPcCantrips } from '~/domain/spells/getSpells';

function WizardSkills(props) {
  const { pc, setSkillsNamespace, skillRefs, openSkillModal } = props;

  const knownCantrips = getAllPcCantrips(pc);
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
      <div className="characters__trait-columns characters__trait-columns--three">
        <div className="characters__trait-label characters__trait-label--spells">
          <span className="characters__trait-title">
            Conoces {spellSlots[0]} trucos de mago
          </span>
          <div className="characters__traits">
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
                    checked={
                      !!selectedSpells0[i] ||
                      knownCantrips.filter(s => s.name === spell.name).length >
                        0
                    }
                    disabled={
                      knownCantrips.filter(s => s.name === spell.name).length >
                      0
                    }
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
                  <SkillItem
                    ref={skillRefs[spell.level].current[spell.name]}
                    traitName={spell.name}
                    trait="spell"
                    openOnRightClick
                    openModal={openSkillModal(spell.level, spell.name)}
                  >
                    <span className="tooltip">
                      {translateSpell(spell.name)}
                      <span className="tooltiptext">
                        {translateSchool(spell.school)}
                      </span>
                    </span>
                  </SkillItem>
                </label>
              ))}
          </div>
        </div>

        <div className="characters__trait-label characters__trait-label--spells">
          <span className="characters__trait-title">
            Conoces {totalSpells} conjuros de nivel 1 de mago
          </span>
          <div className="characters__traits">
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
                  <SkillItem
                    ref={skillRefs[spell.level].current[spell.name]}
                    traitName={spell.name}
                    trait="spell"
                    openOnRightClick
                    openModal={openSkillModal(spell.level, spell.name)}
                  >
                    <span className="tooltip">
                      {translateSpell(spell.name)}
                      <span className="tooltiptext">
                        {translateSchool(spell.school)}
                      </span>
                    </span>
                  </SkillItem>
                </label>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default WizardSkills;
