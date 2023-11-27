import { useEffect, useState } from 'react';

import {
  translateSorcererOrigin,
  getSorcererOrigin,
  DRAGON_ANCESTORS,
  translateDragonAncestor,
  SORCERER_ORIGINS,
} from '~/domain/classes/sorcerer/sorcerer';
import {
  getSorcererSpellSlots,
  getSorcererTotalSpells,
  SORCERER_SPELLS,
} from '~/domain/spells/sorcerer';
import { SkillItem } from '../modal/skillItem';

function SorcererSkills(props) {
  const { pc, setSkillsNamespace, skillRefs, openSkillModal } = props;
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
      <div className="characters__trait-columns characters__trait-columns--three">
        <div className="characters__trait-label">
          <span className="characters__trait-title">
            Escoge Origen de Hechicero
          </span>
          <select
            name="sorcerer-origin"
            defaultValue=""
            className="cards__button-card"
            onChange={e => setSorcererOrigin(e.target.value)}
          >
            <option value="" disabled></option>
            {SORCERER_ORIGINS.map(origin => (
              <option value={origin} key={origin}>
                {translateSorcererOrigin(origin)}
              </option>
            ))}
          </select>
        </div>

        {sorcererOrigin === 'draconicBloodline' && (
          <div className="characters__trait-label">
            <span className="characters__trait-title">
              Escoge Ancestro Dragon
            </span>
            <select
              name="dragon-ancestor"
              defaultValue=""
              className="cards__button-card"
            >
              <option value="" disabled></option>
              {DRAGON_ANCESTORS.map(ancestor => (
                <option value={ancestor} key={ancestor}>
                  {translateDragonAncestor(ancestor)}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="characters__trait-columns characters__trait-columns--three">
        <div className="characters__trait-label">
          <span className="characters__trait-title">
            Conoces {spellSlots[0]} trucos de hechicero
          </span>
          <div className="characters__traits characters__traits--wide">
            {Object.values(SORCERER_SPELLS)
              .filter(s => s.level === 0)
              .map((spell, i) => (
                <label
                  htmlFor={spell.name}
                  key={spell.name}
                  className="characters__skill-label characters__skill-label--small"
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

        <div className="characters__trait-label">
          <span className="characters__trait-title">
            Conoces {totalSpells} conjuros de nivel 1 de hechicero:{' '}
          </span>
          <div className="characters__traits characters__traits--wide">
            {Object.values(SORCERER_SPELLS)
              .filter(s => s.level === 1)
              .map((spell, i) => (
                <label
                  htmlFor={spell.name}
                  key={spell.name}
                  className="characters__skill-label characters__skill-label--small"
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

export default SorcererSkills;
