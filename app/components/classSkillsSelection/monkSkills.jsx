import {
  getAllArtisansTools,
  getAllMusicalInstruments,
} from '~/domain/equipment/tools';
import { t } from '~/domain/translations';

function MonkSkills(props) {
  return (
    <div className="characters__trait-columns characters__trait-columns--three">
      <div className="characters__trait-label">
        <span className="characters__trait-title">
          Selecciona un tipo de herramientas o un instrumento musical en el que
          ser compentente
        </span>
        <div className="characters__traits">
          {[...getAllArtisansTools(), ...getAllMusicalInstruments()].map(
            tool => (
              <label
                htmlFor={tool.name}
                key={tool.name}
                className="characters__skill-label"
              >
                <input
                  type="radio"
                  name="items[]"
                  id={tool.name}
                  value={tool.name}
                />
                {t(tool.name)}
              </label>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default MonkSkills;
