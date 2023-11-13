import {
  getAllArtisansTools,
  getAllMusicalInstruments,
} from '~/domain/equipment/tools';
import { t } from '~/domain/translations';

function MonkSkills(props) {
  return (
    <p>
      Selecciona un tipo de herramientas o un instrumento musical en el que ser
      compentente:{' '}
      {[...getAllArtisansTools(), ...getAllMusicalInstruments()].map(tool => (
        <label
          htmlFor={tool.name}
          key={tool.name}
          className="characters__skill-label"
        >
          <input type="radio" name="items[]" id={tool.name} value={tool.name} />
          {t(tool.name)}
        </label>
      ))}
    </p>
  );
}

export default MonkSkills;
