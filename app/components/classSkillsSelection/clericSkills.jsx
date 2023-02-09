import { useEffect, useState } from 'react';

import {
  DIVINE_DOMAINS,
  translateDivineDomain,
  translateSkill,
  getDivineDomain,
  LANGUAGES,
  translateLanguage,
} from '~/utils/characters';

import styles from '~/components/characters.module.css';

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

  const [divineDomain, setDivineDomain] = useState(initDivineDomain);
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

    setChecks(divineDomainSkills.map(() => false));
    setSkills(newSkillsToPick);
    setDivineDomain(newDivineDomain);
  }

  const [languagesSelected, setLanguagesSelected] = useState(0);

  useEffect(() => {
    const newPickSkills = DIVINE_DOMAINS[divineDomain]?.pickSkills || 0;
    const areClericSkillsSelected =
      checks.filter(v => v).length === newPickSkills;
    setSkillsNamespace(
      'clericSkills',
      areClericSkillsSelected && languagesSelected === 2
    );
  }, [divineDomain, checks, languagesSelected]);

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
        <label>
          Dominio Divino:{' '}
          <select
            name="divine-domain"
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
          Selecciona dos idiomas extra
          {LANGUAGES.filter(l => !languages.includes(l)).map(language => (
            <label for={language} key={language} className={styles.skillLabel}>
              <input
                type="checkbox"
                name="languages[]"
                value={language}
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
    </>
  );
}

export default ClericSkills;
