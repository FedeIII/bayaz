import { translateItem } from '~/utils/equipment/equipment';
import { getAllMusicalInstruments } from '~/utils/equipment/tools';

import styles from '~/components/characters.module.css';

function BardSkills(props) {
  return (
    <p>
      Selecciona 3 instrumentos con los que ser competente:{' '}
      {getAllMusicalInstruments().map(instrument => (
        <label
          htmlFor={instrument.name}
          key={instrument.name}
          className={styles.skillLabel}
        >
          <input type="checkbox" name="items[]" value={instrument.name} />
          {translateItem(instrument.name)}
        </label>
      ))}
    </p>
  );
}

export default BardSkills;
