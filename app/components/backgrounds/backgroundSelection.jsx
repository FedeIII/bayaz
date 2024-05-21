import { useEffect, useState } from 'react';
import { BACKGROUNDS } from '~/domain/backgrounds/backgrounds';
import {
  LANGUAGES,
  translateLanguage,
  translateMoney,
  translateSkill,
} from '~/domain/characters';
import { displayTrait } from '~/domain/display';
import { EquipmentCombo } from '../equipment/equipmentCombo';
import { t } from '~/domain/translations';

import styles from '~/components/cards/cards.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

function BackgroundSelection(props) {
  const { pc, backgroundName, setCanContinue } = props;
  const { languages } = pc;

  const [languagesSelected, setLanguagesSelected] = useState(0);

  useEffect(() => {
    if (languagesSelected === (BACKGROUNDS[backgroundName].languages || 0))
      setCanContinue(true);
    else setCanContinue(false);
  }, [languagesSelected, backgroundName]);

  return (
    <>
      <div className="characters__trait-columns characters__trait-columns--three">
        {!!BACKGROUNDS[backgroundName].skills && (
          <div className="characters__trait-label">
            <span className="characters__trait-title">Eres competente en</span>{' '}
            {BACKGROUNDS[backgroundName].skills
              .map(skill => translateSkill(skill))
              .join(', ')}
            {BACKGROUNDS[backgroundName].skills.map(skill => (
              <input
                readOnly
                type="text"
                name="skills[]"
                value={skill}
                key={skill}
                hidden
              />
            ))}
          </div>
        )}

        {!!BACKGROUNDS[backgroundName].languages && (
          <div className="characters__trait-label">
            <span className="characters__trait-title">
              Selecciona {BACKGROUNDS[backgroundName].languages} idiomas
            </span>
            <div className="characters__traits">
              {LANGUAGES().filter(l => !languages.includes(l)).map(language => (
                <label
                  htmlFor={language}
                  key={language}
                  className="characters__skill-label"
                >
                  <input
                    type="checkbox"
                    name="languages[]"
                    value={language}
                    id={language}
                    onChange={e => {
                      if (e.target.checked) setLanguagesSelected(v => v + 1);
                      else setLanguagesSelected(v => v - 1);
                    }}
                  />
                  {translateLanguage(language)}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {!!BACKGROUNDS[backgroundName].proficientItems && (
        <div className="characters__trait-columns characters__trait-columns--three">
          <div className="characters__trait-label">
            <span className="characters__trait-title">Eres competente con</span>
            <div className="cards">
              {BACKGROUNDS[backgroundName].proficientItems.map(
                (combo, comboSection) => (
                  <div
                    className="card characters__equipment-card"
                    key={comboSection}
                  >
                    <EquipmentCombo
                      pc={pc}
                      comboName="proficiency"
                      combo={combo}
                      comboSection={comboSection}
                    />
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {!!BACKGROUNDS[backgroundName].equipment && (
        <div className="characters__trait-columns characters__trait-columns--three characters__trait-columns--cards">
          <span className="characters__trait-title">Añades a tu equipo</span>
          <div className="cards cards--columns">
            {BACKGROUNDS[backgroundName].equipment.map(
              (combo, comboSection) => (
                <div
                  className="card characters__equipment-card"
                  key={comboSection}
                >
                  <EquipmentCombo
                    pc={pc}
                    comboName="equipment"
                    combo={combo}
                    comboSection={comboSection}
                  />
                </div>
              )
            )}
            {!!BACKGROUNDS[backgroundName].money && (
              <div className="card characters__equipment-card">
                <li>{translateMoney(BACKGROUNDS[backgroundName].money)}</li>
                <input
                  readOnly
                  type="text"
                  name="money"
                  value={Object.entries(BACKGROUNDS[backgroundName].money)
                    .map(entry => entry.join(':'))
                    .join(',')}
                  hidden
                />
              </div>
            )}
          </div>
        </div>
      )}

      {!!BACKGROUNDS[backgroundName].select && (
        <div className="characters__trait-columns characters__trait-columns--three characters__trait-columns--cards">
          {Object.entries(BACKGROUNDS[backgroundName].select).map(
            ([topicToSelect, thingsToSelect]) => (
              <div key={topicToSelect} className="characters__trait-label">
                <span className="characters__trait-title">
                  Escoge {thingsToSelect.amount || 1} {t(topicToSelect)}
                </span>
                <div className="characters__traits">
                  {thingsToSelect.items.map(thing => (
                    <label
                      htmlFor={thing}
                      key={thing}
                      className="characters__skill-label"
                    >
                      <input
                        type={thingsToSelect.amount > 1 ? 'checkbox' : 'radio'}
                        name={
                          thingsToSelect.amount > 1
                            ? topicToSelect + '[]'
                            : topicToSelect
                        }
                        id={thing}
                        value={thing}
                      />
                      {thingsToSelect.translate(thing)}
                    </label>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      )}

      {!!BACKGROUNDS[backgroundName].traits && (
        <div className="characters__trait-columns characters__trait-columns--three">
          <div className="characters__trait-label">
            <span className="characters__trait-title">Rasgos y atributos</span>
            {Object.entries(BACKGROUNDS[backgroundName].traits).map(
              ([traitName, trait]) => (
                <li key={traitName}>{displayTrait(traitName, trait, pc)}</li>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default BackgroundSelection;
