import { useEffect, useState } from 'react';

import { getAllMusicalInstruments } from '~/domain/equipment/tools';
import {
  getBardSpells,
  getBardSpellSlots,
  getBardTotalSpells,
} from '~/domain/spells/bard';
import { t } from '~/domain/translations';
import { SkillItem } from '../modal/skillItem';

const MAX_INSTRUMENTS = 3;

function BardSkills(props) {
  const { pc, setSkillsNamespace, skillRefs, openSkillModal } = props;

  const [selectedInstruments, setSelectedInstruments] = useState([]);
  const [selectedSpells0, setSelectedSpells0] = useState([]);
  const [selectedSpells1, setSelectedSpells1] = useState([]);

  const spellSlots = getBardSpellSlots(pc);
  const totalSpells = getBardTotalSpells(pc);

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
      <div className="characters__trait-columns characters__trait-columns--three">
        <div className="characters__trait-label">
          <span className="characters__trait-title">
            Selecciona {MAX_INSTRUMENTS} instrumentos con los que ser competente
          </span>
          <div className="characters__traits">
            {getAllMusicalInstruments().map((instrument, i) => (
              <label
                htmlFor={instrument.name}
                key={instrument.name}
                className="characters__skill-label"
              >
                <input
                  type="checkbox"
                  name="items[]"
                  checked={!!selectedInstruments[i]}
                  id={instrument.name}
                  value={instrument.name}
                  onChange={() =>
                    setSelectedInstruments(oldChecks => {
                      const newChecks = oldChecks.slice();
                      newChecks[i] = !newChecks[i];
                      return newChecks;
                    })
                  }
                />
                {t(instrument.name)}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="characters__trait-columns characters__trait-columns--three">
        <div className="characters__trait-label characters__trait-label--spells">
          <span className="characters__trait-title">
            Conoces {spellSlots[0]} trucos de bardo
          </span>
          <div className="characters__traits">
            {getBardSpells()
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
                  <SkillItem
                    ref={skillRefs[spell.level].current[spell.name]}
                    pc={pc}
                    traitName={spell.name}
                    trait="spell"
                    openOnRightClick
                    openModal={openSkillModal(spell.level, spell.name)}
                  />
                </label>
              ))}
          </div>
        </div>

        <div className="characters__trait-label characters__trait-label--spells">
          <span className="characters__trait-title">
            Conoces {totalSpells} conjuros de nivel 1 de bardo
          </span>
          <div className="characters__traits">
            {getBardSpells()
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
                    pc={pc}
                    traitName={spell.name}
                    trait="spell"
                    openOnRightClick
                    openModal={openSkillModal(spell.level, spell.name)}
                  />
                </label>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default BardSkills;
