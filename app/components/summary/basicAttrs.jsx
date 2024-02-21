import { translateBackground } from '~/domain/backgrounds/backgrounds';
import {
  getExperience,
  translateClass,
  translateRace,
} from '~/domain/characters';

function BasicAttrs(props) {
  const { pc, playerName, onNameChange } = props;
  const { pClass, level, background, race, subrace, exp } = pc;

  return (
    <>
      <input
        type="text"
        className="sheet__data sheet__name"
        name="pcName"
        defaultValue={pc.name}
        onBlur={onNameChange}
      />
      <span className="sheet__data sheet__pClass">
        {translateClass(pClass)} lvl {level}
      </span>
      <span className="sheet__data sheet__background">
        {translateBackground(background.name)}
      </span>
      <span className="sheet__data sheet__player-name">{playerName}</span>
      <span className="sheet__data sheet__race">
        {translateRace(race)}
        {subrace !== 'subrace' && ' ' + translateRace(subrace)}
      </span>
      <span className="sheet__data sheet__exp">{getExperience(pc)}</span>
    </>
  );
}

export default BasicAttrs;
