import { useEffect, useState } from 'react';
import { BACKGROUNDS } from '~/domain/backgrounds';
import {
  LANGUAGES,
  translateLanguage,
  translateMoney,
  translateSkill,
} from '~/domain/characters';

import styles from '~/components/characters.module.css';
import { displayTrait } from '~/domain/display';
import { EquipmentCombo } from '../equipment/equipmentCombo';

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
      <input
        readOnly
        type="text"
        name="background"
        value={backgroundName}
        hidden
      />

      {!!BACKGROUNDS[backgroundName].skills && (
        <div>
          Eres competente en{' '}
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
        <div>
          Selecciona {BACKGROUNDS[backgroundName].languages} idiomas
          {LANGUAGES.filter(l => !languages.includes(l)).map(language => (
            <label
              htmlFor={language}
              key={language}
              className={styles.skillLabel}
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
      )}

      {!!BACKGROUNDS[backgroundName].equipment && (
        <div>
          Añades a tu equipo:{' '}
          <div className={styles.equipment}>
            {BACKGROUNDS[backgroundName].equipment.map(
              (combo, comboSection) => (
                <div className={styles.equipmentOptions} key={comboSection}>
                  <EquipmentCombo
                    pc={pc}
                    combo={combo}
                    comboSection={comboSection}
                  />
                </div>
              )
            )}
            {!!BACKGROUNDS[backgroundName].money && (
              <div className={styles.equipmentOptions}>
                <li>{translateMoney(BACKGROUNDS[backgroundName].money)}</li>
                <input
                  readOnly
                  type="text"
                  name="money"
                  value={BACKGROUNDS[backgroundName].money.join(',')}
                  hidden
                />
              </div>
            )}
          </div>
        </div>
      )}

      {!!BACKGROUNDS[backgroundName].traits && (
        <div>
          Rasgos y atributos:
          {Object.entries(BACKGROUNDS[backgroundName].traits).map(
            ([traitName, trait]) => (
              <li key={traitName}>{displayTrait(traitName, trait, pc)}</li>
            )
          )}
        </div>
      )}
    </>
  );
}

export default BackgroundSelection;
