import {
  SKILLS,
  getConditionalSkills,
  getPassivePerception,
  getSkills,
  skillCheckBonus,
} from '~/domain/characters';
import { increment } from '~/domain/display';

import styles from '~/components/sheet.module.css';

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
              className={`${styles.data} ${styles[`${skill.name}Prof`]}`}
              key={skill.name}
            >
              ◍
            </span>
          )
      )}
      {SKILLS.map(skill => (
        <span
          className={`${styles.data} ${styles[`${skill.name}Saving`]}`}
          key={skill.name}
        >
          {increment(skillCheckBonus(pc, skill.name))}
          {Object.keys(conditionalSkills).includes(skill.name) && (
            <span className={styles.annotation}>
              ({increment(conditionalSkills[skill.name](pc)[0])}{' '}
              {conditionalSkills[skill.name](pc)[1]})
            </span>
          )}
        </span>
      ))}

      <span className={`${styles.data} ${styles.passivePerception}`}>
        {getPassivePerception(pc)}
      </span>
    </>
  );
}

export default SheetSkills;
