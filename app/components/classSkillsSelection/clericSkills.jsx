import { useContext, useEffect, useState } from 'react';

import {
  DIVINE_DOMAINS,
  translateDivineDomain,
  translateSkill,
} from '~/utils/characters';
import SkillsContext from '~/components/classSkillsSelection/skillsContext';

import styles from '~/components/characters.module.css';

function getSkillChecked(skillName, skillsToSelect) {
  return skillsToSelect[skillName].selected;
}

function getSkillAvailable(skillName, skillsToSelect) {
  return skillsToSelect[skillName].available;
}

function ClericSkills(props) {
  const { pc } = props;
  const { classSkills: { divineDomain: initDivineDomain } = { skills: [] } } =
    pc;

  const [divineDomain, setDivineDomain] = useState(initDivineDomain);
  const { pickSkills, skillsToPick = [] } = DIVINE_DOMAINS[divineDomain] || {};

  const { skillsToSelect, setSkill, setSkillsNamespace } =
    useContext(SkillsContext);
  const [checks, setChecks] = useState(
    skillsToPick.map(
      skillToPick =>
        getSkillAvailable(skillToPick, skillsToSelect) &&
        getSkillChecked(skillToPick, skillsToSelect)
    )
  );

  useEffect(() => {
    const areClericSkillsSelected = checks.filter(v => v).length === pickSkills;
    setSkillsNamespace('clericSkills', areClericSkillsSelected);
  }, [checks, pickSkills, setSkillsNamespace]);

  const onSkillChange = (skillName, isChecked) => {
    setSkill(skillName, { selected: isChecked });
  };

  return (
    <>
      <p>
        <label>
          Dominio Divino:{' '}
          <select
            name="divine-domain"
            value={divineDomain}
            onChange={e => setDivineDomain(e.target.value)}
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
          Escoge {pickSkills} habilidad{pickSkills > 1 ? 'es' : ''}
          {skillsToPick.map((skillName, i) => (
            <label
              for={skillName}
              key={skillName}
              className={styles.skillLabel}
            >
              <input
                type="checkbox"
                name="skills[]"
                value={skillName}
                checked={getSkillChecked(skillName, skillsToSelect)}
                onChange={e => onSkillChange(skillName, e.target.checked)}
                disabled={!getSkillAvailable(skillName, skillsToSelect)}
              />
              {translateSkill(skillName)}
            </label>
          ))}
        </p>
      )}
    </>
  );
}

export default ClericSkills;
