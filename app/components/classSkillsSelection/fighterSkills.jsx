import {
  FIGHTING_STYLES,
  translateFightingStyle
} from "~/utils/fighter";

function FighterSkills(props) {
  return (
    <>
      <p>
        <label>
          Escoge estilo de combate:{' '}
          <select name="fighting-style">
            {FIGHTING_STYLES.map(fightingStyle => (
              <option value={fightingStyle} key={fightingStyle}>
                {translateFightingStyle(fightingStyle)}
              </option>
            ))}
          </select>
        </label>
      </p>
    </>
  );
}

export default FighterSkills;
