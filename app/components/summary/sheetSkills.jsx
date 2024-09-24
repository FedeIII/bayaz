import classNames from 'classnames';
import {
  SKILLS,
  getConditionalSkills,
  getExpertSkills,
  getPassivePerception,
  getSkills,
  skillCheckBonus,
} from '~/domain/characters';
import { increment } from '~/domain/display';

function SheetSkills(props) {
  const { pc } = props;

  const allSkills = getSkills(pc);
  const conditionalSkills = getConditionalSkills(pc);
  const expertSkills = getExpertSkills(pc);

  return (
    <>
      {SKILLS().map(skill => (
        <span
          className={classNames('sheet__data', 'sheet__saving', `sheet__${skill.name}Saving`, {
            'sheet__prof-skill': allSkills.includes(skill.name),
            'sheet__prof-skill--expert': expertSkills.includes(skill.name),
          })}
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
