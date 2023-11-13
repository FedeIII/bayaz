import {
  SKILLS,
  getConditionalSkills,
  getPassivePerception,
  getSkills,
  skillCheckBonus,
} from '~/domain/characters';
import { increment } from '~/domain/display';

function SheetSkills(props) {
  const { pc } = props;

  const allSkills = getSkills(pc);
  const conditionalSkills = getConditionalSkills(pc);

  return (
    <>
      {SKILLS.map(
        skill =>
          allSkills.includes(skill.name) && (
            <span
              className={`sheet__data sheet__${skill.name}Prof`}
              key={skill.name}
            >
              ◍
            </span>
          )
      )}
      {SKILLS.map(skill => (
        <span
          className={`sheet__data sheet__${skill.name}Saving`}
          key={skill.name}
        >
          {increment(skillCheckBonus(pc, skill.name))}
          {Object.keys(conditionalSkills).includes(skill.name) && (
            <span className="sheet__annotation">
              ({increment(conditionalSkills[skill.name](pc)[0])}{' '}
              {conditionalSkills[skill.name](pc)[1]})
            </span>
          )}
        </span>
      ))}

      <span className="sheet__data sheet__passive-perception">
        {getPassivePerception(pc)}
      </span>
    </>
  );
}

export default SheetSkills;
