import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { t } from '~/domain/translations';
import { Title } from '~/components/form/title';
import { NPC_RACES_LIST } from '~/domain/npc/attrs/npcRaces';
import { getDeityColorClass } from '~/domain/npc/attrs/npcFaith';
import SettlementByDominionSelector from '../places/settlementByDominionSelector';
import HtmlInput from '../inputs/htmlInput';

function textareaCallback(textareaNode) {
  textareaNode.target.style.height = '';
  textareaNode.target.style.height = textareaNode.target.scrollHeight + 'px';
}

const SUCCESS_MESSAGE_TIMEOUT = 3000;
const ERROR_MESSAGE_TIMEOUT = 5000;

export function CharacterInfo(props) {
  const { formData, onChange, actionData, settlements = [] } = props;

  const ref = useRef();

  useEffect(() => {
    textareaCallback({ target: ref.current });
  }, [formData.looks]);

  const [successMessage, setSuccessMessage] = useState(actionData?.success);
  const [errorMessage, setErrorMessage] = useState(actionData?.error);

  useEffect(() => {
    if (actionData?.success) {
      setSuccessMessage('NPC guardado correctamente');
      setTimeout(() => {
        setSuccessMessage(null);
      }, SUCCESS_MESSAGE_TIMEOUT);
    }
  }, [actionData?.success]);

  useEffect(() => {
    if (actionData?.error) {
      setErrorMessage(actionData.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, ERROR_MESSAGE_TIMEOUT);
    }
  }, [actionData?.error]);

  return (
    <div className="characters__container">
      <Title
        inputName="name"
        className="characters__group"
        inputClass="characters__title"
        placeholder="Nombre del NPC"
        value={formData.name}
        onChange={onChange}
      />
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <hr className="characters__section-divider" />

      <div className="characters__subtitle">
        <select
          name="race"
          className="characters__input characters__input--no-border"
          value={formData.race}
          onChange={onChange}
        >
          {NPC_RACES_LIST.map(race => (
            <option key={race} value={race}>
              {t(race)}
            </option>
          ))}
        </select>
        <select
          name="gender"
          className="characters__input characters__input--no-border"
          value={formData.gender}
          onChange={onChange}
        >
          <option value="Male">{t('Male')}</option>
          <option value="Female">{t('Female')}</option>
        </select>
        <SettlementByDominionSelector
          settlementsByDominion={settlements}
          name="settlementId"
          className="characters__input characters__input--no-border"
          value={formData.settlementId || ''}
          onChange={onChange}
        />
      </div>

      <hr className="characters__section-divider" />

      <div className="characters__attrs">
        <h2 className="characters__attrs-title">Apariencia</h2>
        <textarea
          ref={ref}
          name="looks"
          className="characters__textarea"
          placeholder="Descripción de la apariencia"
          rows="4"
          value={formData.looks?.join?.('\n') || ''}
          onChange={e => {
            onChange(e);
            textareaCallback(e);
          }}
        />
      </div>

      <hr className="characters__section-divider" />

      <div className="characters__attrs">
        <h2 className="characters__attrs-title">Comportamiento</h2>
        <div className="characters__trait-sections">
          <div className="characters__trait">
            <span className="characters__trait-title characters__trait-title--no-border">
              Ánimo actual:
            </span>
            <input
              name="behavior.mood"
              className="characters__input characters__input--no-border characters__input--inline"
              placeholder="Ánimo"
              value={formData.behavior.mood}
              onChange={onChange}
            />
          </div>
          <div className="characters__trait">
            <div>
              <span className="characters__trait-title characters__trait-title--no-border">
                En calma:
              </span>
              <input
                name="behavior.calm"
                className="characters__input characters__input--no-border characters__input--inline"
                placeholder="Comportamiento en calma"
                value={formData.behavior.calm}
                onChange={onChange}
              />
            </div>
            <div>
              <span className="characters__trait-title characters__trait-title--no-border">
                En estrés:
              </span>
              <input
                name="behavior.stress"
                className="characters__input characters__input--no-border characters__input--inline"
                placeholder="Comportamiento en estrés"
                value={formData.behavior.stress}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
        {formData.talent && (
          <div className="characters__trait-description">
            <span className="characters__trait-title characters__trait-title--no-border">
              Talento:
            </span>
            <input
              name="talent"
              className="characters__input characters__input--no-border characters__input--inline"
              placeholder="Talento especial"
              value={formData.talent}
              onChange={onChange}
            />
          </div>
        )}
      </div>

      <hr className="characters__section-divider" />

      <div className="characters__parallel-attrs">
        <div className="characters__left-attr">
          <h2 className="characters__attrs-title">Fe</h2>
          <div className="characters__parallel-traits">
            {formData.faith.description && (
              <input
                name="faith.description"
                className="characters__input characters__input--no-border"
                placeholder="Descripción de fe"
                value={formData.faith.description}
                onChange={onChange}
              />
            )}
            {formData.faith.deityName && (
              <input
                name="faith.deityName"
                className={classNames(
                  'characters__input characters__input--no-border',
                  getDeityColorClass(formData.faith.deityName)
                )}
                placeholder="Nombre de deidad"
                value={formData.faith.deityName}
                onChange={onChange}
              />
            )}
          </div>
        </div>
        <div className="characters__right-attr">
          <h2 className="characters__attrs-title">
            Ideales, Vínculos y Defectos
          </h2>
          <div className="characters__parallel-traits">
            {formData.ideals && (
              <div className="characters__trait">
                <span className="characters__trait-title characters__trait-title--no-border">
                  Ideales:
                </span>
                <input
                  name="ideals"
                  className="characters__input characters__input--no-border"
                  placeholder="Ideales"
                  value={formData.ideals}
                  onChange={onChange}
                />
              </div>
            )}
            {formData.bonds && (
              <div className="characters__trait">
                <span className="characters__trait-title characters__trait-title--no-border">
                  Vínculos:
                </span>
                <input
                  name="bonds"
                  className="characters__input characters__input--no-border"
                  placeholder="Vínculos"
                  value={formData.bonds}
                  onChange={onChange}
                />
              </div>
            )}
            {formData.flaws && (
              <div className="characters__trait">
                <span className="characters__trait-title characters__trait-title--no-border">
                  Defectos:
                </span>
                <input
                  name="flaws"
                  className="characters__input characters__input--no-border"
                  placeholder="Defectos"
                  value={formData.flaws}
                  onChange={onChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <hr className="characters__section-divider" />

      <div className="characters__attrs">
        <h2 className="characters__attrs-title">Notas</h2>
        <HtmlInput
          name="notes"
          value={formData.notes}
          onChange={value => onChange({ target: { name: 'notes', value } })}
        />
      </div>
    </div>
  );
}
