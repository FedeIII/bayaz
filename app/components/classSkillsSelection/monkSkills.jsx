import { translateItem } from '~/domain/equipment/equipment';
import {
  getAllArtisansTools,
  getAllMusicalInstruments,
} from '~/domain/equipment/tools';

import styles from '~/components/characters.module.css';

function MonkSkills(props) {
  return (
    <p>
      Selecciona un tipo de herramientas o un instrumento musical en el que ser
      compentente:{' '}
      {[...getAllArtisansTools(), ...getAllMusicalInstruments()].map(tool => (
        <label
          htmlFor={tool.name}
          key={tool.name}
          className={styles.skillLabel}
        >
          <input type="radio" name="items[]" value={tool.name} />
          {translateItem(tool.name)}
        </label>
      ))}
    </p>
  );
}

export default MonkSkills;
