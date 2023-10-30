import { useEffect, useState } from 'react';

import {
  translateSkill,
  LANGUAGES,
  translateLanguage,
} from '~/domain/characters';
import {
  DIVINE_DOMAINS,
  translateDivineDomain,
  getDivineDomain,
} from '~/domain/classes/cleric/cleric';
import { getClericSpellSlots, CLERIC_SPELLS } from '~/domain/spells/cleric';
import { DRUID_SPELLS } from '~/domain/spells/druid';

import styles from '~/components/characters/characters.module.css';
import { translateSpell } from '~/domain/spells/spells';

function getSkillChecked(skillName, skillsToSelect) {
  return !!skillsToSelect[skillName]?.selected;
}

function getSkillAvailable(skillName, skillsToSelect, isCheckedHere) {
  return (
    !skillsToSelect[skillName]?.selected ||
    (skillsToSelect[skillName]?.selected && isCheckedHere)
  );
}

function ClericSkills(props) {
  const { pc, skillsToSelect, setSkills, setSkillsNamespace } = props;
  const { languages } = pc;
  const initDivineDomain = getDivineDomain(pc);

  const [divineDomain, setDivineDomain] = useState(
    initDivineDomain || 'knowledge'
  );
  const { pickSkills = 0, skillsToPick = [] } =
    DIVINE_DOMAINS[divineDomain] || {};

  const [checks, setChecks] = useState(skillsToPick.map(() => false));

  function onDivineDomainChange(e) {
    const newDivineDomain = e.target.value;
    const divineDomainSkills =
      DIVINE_DOMAINS[newDivineDomain].skillsToPick || [];
    const newSkillsToPick = divineDomainSkills.reduce(
      (newSkills, skillName) => {
        return {
          ...newSkills,
          [skillName]: { available: true },
        };
      },
      {}
    );

    if (newDivineDomain === 'light') {
      const lightSpellIndex = Object.values(CLERIC_SPELLS)
        .filter(s => s.level === 0)
        .find(s => s.name === 'ligh');

      setSelectedSpells0(oldChecks => {
        const newChecks = oldChecks.slice();
        newChecks[lightSpellIndex] = !newChecks[lightSpellIndex];
        return newChecks;
      });
    }

    setChecks(divineDomainSkills.map(() => false));
    setSkills(newSkillsToPick);
    setDivineDomain(newDivineDomain);
  }

  const [languagesSelected, setLanguagesSelected] = useState(0);
  const [selectedSpells0, setSelectedSpells0] = useState([]);
  const [isDruidSpellSelected, setIsDruidSpellSelected] = useState(false);

  const spellSlots = getClericSpellSlots(pc);

  useEffect(() => {
    const newPickSkills = DIVINE_DOMAINS[divineDomain]?.pickSkills || 0;
    const areClericSkillsSelected =
      checks.filter(v => v).length === newPickSkills;
    setSkillsNamespace(
      'clericSkills',
      areClericSkillsSelected &&
        (divineDomain !== 'knowledge' || languagesSelected === 2) &&
        (divineDomain !== 'nature' || isDruidSpellSelected) &&
        selectedSpells0.filter(v => v).length === spellSlots[0]
    );
  }, [
    divineDomain,
    checks,
    languagesSelected,
    selectedSpells0,
    isDruidSpellSelected,
  ]);

  const onSkillChange = (skillName, isChecked, i) => {
    setChecks(oldChecks => {
      const newChecks = oldChecks.slice();
      newChecks[i] = isChecked;
      return newChecks;
    });

    setSkills({
      [skillName]: {
        selected: isChecked,
      },
    });
  };

  return (
    <>
      <p>
        <label htmlFor="divine-domain">
          Dominio Divino:{' '}
          <select
            name="divine-domain"
            id="divine-domain"
            value={divineDomain}
            onChange={onDivineDomainChange}
          >
            {Object.keys(DIVINE_DOMAINS).map(divineDomainName => (
              <option value={divineDomainName} key={divineDomainName}>
                {translateDivineDomain(divineDomainName)}
              </option>
            ))}
          </select>
        </label>
      </p>

      {!!pickSkills && (
        <p>
          Escoge {pickSkills} habilidad{pickSkills > 1 ? 'es' : ''} del Dominio
          de {translateDivineDomain(divineDomain)}
          {skillsToPick.map((skillName, i) => (
            <label
              htmlFor={skillName}
              key={skillName}
              className={styles.skillLabel}
            >
              <input
                type="checkbox"
                name="cleric-skills[]"
                id={skillName}
                value={skillName}
                checked={getSkillChecked(skillName, skillsToSelect)}
                onChange={e => onSkillChange(skillName, e.target.checked, i)}
                disabled={
                  !getSkillAvailable(skillName, skillsToSelect, checks[i])
                }
              />
              {translateSkill(skillName)}
            </label>
          ))}
        </p>
      )}

      {divineDomain === 'knowledge' && (
        <p>
          Selecciona 2 idiomas extra
          {LANGUAGES.filter(l => !languages.includes(l)).map(language => (
            <label
              htmlFor={language}
              key={language}
              className={styles.skillLabel}
            >
              <input
                type="checkbox"
                name="languages[]"
                value={language}
                id={language}
                onChange={e => {
                  if (e.target.checked) setLanguagesSelected(v => v + 1);
                  else setLanguagesSelected(v => v - 1);
                }}
              />
              {translateLanguage(language)}
            </label>
          ))}
        </p>
      )}

      <p>
        Conoces {spellSlots[0]} trucos de clérigo:{' '}
        {Object.values(CLERIC_SPELLS)
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
                checked={
                  !!selectedSpells0[i] ||
                  (divineDomain === 'light' && spell.name === 'light')
                }
                value={spell.name}
                id={spell.name}
                onChange={() =>
                  setSelectedSpells0(oldChecks => {
                    const newChecks = oldChecks.slice();
                    newChecks[i] = !newChecks[i];
                    return newChecks;
                  })
                }
                disabled={divineDomain === 'light' && spell.name === 'light'}
              />
              {translateSpell(spell.name)}{' '}
              {divineDomain === 'light' &&
                spell.name === 'light' &&
                ' (Ya lo conoces por el Dominio de la Luz)'}
            </label>
          ))}
      </p>

      {divineDomain === 'nature' && (
        <p>
          Conoces 1 truco de druida:{' '}
          {Object.values(DRUID_SPELLS)
            .filter(s => s.level === 0)
            .map(spell => (
              <label
                htmlFor={spell.name}
                key={spell.name}
                className={styles.skillLabel}
              >
                <input
                  type="radio"
                  name="spells[]"
                  id={spell.name}
                  value={`${spell.name},druid`}
                  onChange={() => setIsDruidSpellSelected(true)}
                />
                {spell.translation}
              </label>
            ))}
        </p>
      )}
    </>
  );
}

export default ClericSkills;
