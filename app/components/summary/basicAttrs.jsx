import { translateBackground } from '~/domain/backgrounds/backgrounds';
import { translateClass, translateRace } from '~/domain/characters';

function BasicAttrs(props) {
  const { pc, pcName, playerName, onFreeTextChange } = props;
  const { pClass, level, background, race, subrace, exp } = pc;

  return (
    <>
      <span className="sheet__data sheet__name">{pcName}</span>
      <span className="sheet__data sheet__pClass">
        {translateClass(pClass)} lvl {level}
      </span>
      <span className="sheet__data sheet__background">
        {translateBackground(background.name)}
      </span>
      <input
        type="text"
        className="sheet__data sheet__player-name"
        name="playerName"
        defaultValue={playerName}
        onChange={onFreeTextChange}
      />
      <span className="sheet__data sheet__race">
        {translateRace(race)}
        {subrace !== 'subrace' && ' ' + translateRace(subrace)}
      </span>
      <span className="sheet__data sheet__exp">{exp}</span>
    </>
  );
}

export default BasicAttrs;
