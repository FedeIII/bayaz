import { useEffect, useState } from 'react';
import { translateSkill } from '~/domain/characters';

function RogueSkills(props) {
  const { skillsToSelect, setSkillsNamespace } = props;
  const skills = [
    ...Object.keys(skillsToSelect).filter(s => skillsToSelect[s].selected),
    'thieves-tools',
  ];

  const [skillsSelected, setSkillsSelected] = useState(0);

  useEffect(() => {
    setSkillsNamespace('rogueSkills', false);
  }, []);

  useEffect(() => {
    setSkillsNamespace('rogueSkills', skillsSelected === 2);
  }, [skillsSelected]);

  function onSkillChange(e) {
    if (e.target.checked) setSkillsSelected(v => v + 1);
    else setSkillsSelected(v => v - 1);
  }

  return (
    <div className="characters__trait-columns characters__trait-columns--three">
      <div className="characters__trait-label">
        <span className="characters__trait-title">
          Escoge 2 competencias en las que ser experto
        </span>
        <div className="characters__traits characters__traits--wide">
          {skills.map(skillName => (
            <label
              htmlFor={`${skillName}-expert`}
              key={skillName}
              className="characters__skill-label characters__skill-label--small"
            >
              <input
                type="checkbox"
                name="expert-skills[]"
                id={`${skillName}-expert`}
                value={skillName}
                onChange={onSkillChange}
              />
              {translateSkill(skillName)}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RogueSkills;
