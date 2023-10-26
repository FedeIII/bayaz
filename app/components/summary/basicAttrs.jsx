import { translateBackground } from '~/domain/backgrounds/backgrounds';
import { translateClass, translateRace } from '~/domain/characters';

import styles from '~/components/sheet.module.css';

function BasicAttrs(props) {
  const { pc, pcName, onFreeTextChange } = props;
  const { pClass, level, background, playerName, race, subrace, exp } = pc;

  return (
    <>
      <span className={`${styles.data} ${styles.name}`}>{pcName}</span>
      <span className={`${styles.data} ${styles.pClass}`}>
        {translateClass(pClass)} lvl {level}
      </span>
      <span className={`${styles.data} ${styles.background}`}>
        {translateBackground(background.name)}
      </span>
      <input
        type="text"
        className={`${styles.data} ${styles.playerName}`}
        name="playerName"
        defaultValue={playerName}
        onChange={onFreeTextChange}
      />
      <span className={`${styles.data} ${styles.race}`}>
        {translateRace(race)}
        {subrace !== 'subrace' && ' ' + translateRace(subrace)}
      </span>
      <span className={`${styles.data} ${styles.exp}`}>{exp}</span>
    </>
  );
}

export default BasicAttrs;
