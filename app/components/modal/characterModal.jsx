import { useEffect, useRef, useState } from 'react';

import OutsideAlerter from '~/components/HOCs/outsideAlerter';
import { getSelfLeftX, getSelfTopY } from './modalPosition';
import { getSpecialSkills } from '~/domain/encounters/monsters';
import { STATS, getStatMod } from '~/domain/characters';
import { increment } from '~/domain/display';
import { t } from '~/domain/translations';

export function MonsterContent(props) {
  const { character } = props;

  const {
    name,
    type,
    tags,
    size,
    alignment,
    details: {
      ['Armor Class']: ac,
      ['Hit Points']: hp,
      Speed,
      stats = {},
      Skills,
      Senses,
      Languages,
      Challenge,
      actions = {},
      legendaryActions = {},
    },
  } = character;

  return (
    <>
      <h3 className="inventory-item__modal-title characters__name">
        {name.toUpperCase()}
      </h3>

      <div className="characters__character-content">
        <span className="app__tiny-text">
          {t(type)} {t(size)} {tags && `(${tags})`}, {t(alignment)}
        </span>

        <hr className="characters__section-divider" />

        <div className="characters__section">
          <span>
            <o className="characters__bold">AC:</o> {ac}
          </span>
          <span>
            <o className="characters__bold">HP:</o> {hp}
          </span>
          <span>
            <o className="characters__bold">Velocidad:</o> {Speed}
          </span>
        </div>

        <hr className="characters__section-divider" />

        <div className="characters__attr-section">
          {STATS().map(stat => (
            <div key={stat} className="characters__attr-block">
              <div>
                <strong className="characters__bold">
                  {stat.toUpperCase()}
                </strong>
              </div>
              <div>
                {stats[stat] || '-'} (
                {!!stats[stat] && increment(getStatMod(stats[stat]))})
              </div>
            </div>
          ))}
        </div>

        <hr className="characters__section-divider" />

        <div className="characters__section">
          {Skills && (
            <span>
              <o className="characters__bold">Habilidades:</o> {Skills}
            </span>
          )}
          {Senses && (
            <span>
              <o className="characters__bold">Sentidos:</o> {Senses}
            </span>
          )}
          {Languages && (
            <span>
              <o className="characters__bold">Idiomas:</o> {Languages}
            </span>
          )}
          {Challenge && (
            <span>
              <o className="characters__bold">CR:</o> {Challenge}
            </span>
          )}
        </div>

        <hr className="characters__section-divider" />

        <div className="characters__section">
          {Object.entries(getSpecialSkills(character)).map(
            ([skill, description]) => (
              <p className="characters__p">
                <o className="characters__bold">{skill}.</o>{' '}
                <span
                  dangerouslySetInnerHTML={{
                    __html: description,
                  }}
                />
              </p>
            )
          )}
        </div>

        {!!Object.keys(actions).length && (
          <>
            <h4 className="characters__section-title">
              A<span className="app__tiny-text">CCIONES</span>
            </h4>
            <hr className="characters__actions-divider" />

            <div className="characters__section">
              {Object.entries(actions).map(([action, description]) => (
                <p className="characters__p">
                  <o className="characters__bold">{action}.</o>{' '}
                  <span
                    dangerouslySetInnerHTML={{
                      __html: description,
                    }}
                  />
                </p>
              ))}
            </div>
          </>
        )}

        {!!Object.keys(legendaryActions).length && (
          <>
            <h4 className="characters__section-title">
              A<span className="app__tiny-text">CCIONES</span> L
              <span className="app__tiny-text">EGENDARIAS</span>
            </h4>
            <hr className="characters__actions-divider" />

            <div className="characters__section">
              {Object.entries(legendaryActions).map(([action, description]) => (
                <p className="characters__p">
                  {action !== 'description' && (
                    <>
                      <o className="characters__bold">{action}.</o>{' '}
                    </>
                  )}
                  <span
                    dangerouslySetInnerHTML={{
                      __html: description,
                    }}
                  />
                </p>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export function CharacterModal(props) {
  const { children, elRef, formRef, closeModal, closeOnLeave } = props;

  const ref = useRef(null);
  const [selfPosition, setSelfPosition] = useState(null);
  const elPos = elRef?.current.getBoundingClientRect();
  const formPos = formRef?.current.getBoundingClientRect();

  useEffect(() => {
    setSelfPosition(ref?.current.getBoundingClientRect());
  }, [setSelfPosition, ref?.current]);

  const selfTopY = getSelfTopY({
    elPos,
    formPos,
    selfPosition,
    showOverMouse: 1,
  });
  const selfLeftX = getSelfLeftX({ elPos, formPos, selfPosition });

  return (
    <>
      <div className="inventory-item__modal-shadow" />
      <div
        className="inventory-item__action-modal characters__action-modal"
        style={{
          top: selfTopY + 'px',
          left: selfLeftX + 'px',
        }}
        onMouseLeave={closeOnLeave && closeModal}
        ref={ref}
      >
        <OutsideAlerter onClickOutside={closeModal} enabled>
          {!!selfPosition && children(props)}
        </OutsideAlerter>
      </div>
    </>
  );
}
