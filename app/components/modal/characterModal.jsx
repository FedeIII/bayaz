import { useEffect, useRef, useState } from 'react';

import OutsideAlerter from '~/components/HOCs/outsideAlerter';
import { getSelfLeftX, getSelfTopY } from './modalPosition';
import { getSpecialSkills } from '~/domain/encounters/monsters';
import { STATS, getStatMod } from '~/domain/characters';
import { increment } from '~/domain/display';
import { t } from '~/domain/translations';

import styles from './inventoryItem.module.css';
import appStyles from '~/components/app.module.css';
import charactersStyles from '~/components/characters.module.css';

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
      stats,
      Skills,
      Senses,
      Languages,
      Challenge,
      actions,
      legendaryActions,
    },
  } = character;

  return (
    <>
      <h3 className={`${styles.modalTitle} ${charactersStyles.name}`}>
        {name.toUpperCase()}
      </h3>

      <div className={charactersStyles.characterContent}>
        <span className={appStyles.tinyText}>
          {t(type)} {t(size)} {tags && `(${tags})`}, {t(alignment)}
        </span>

        <hr className={charactersStyles.sectionDivider} />

        <div className={charactersStyles.section}>
          <span>
            <o className={charactersStyles.bold}>AC:</o> {ac}
          </span>
          <span>
            <o className={charactersStyles.bold}>HP:</o> {hp}
          </span>
          <span>
            <o className={charactersStyles.bold}>Velocidad:</o> {Speed}
          </span>
        </div>

        <hr className={charactersStyles.sectionDivider} />

        <div className={charactersStyles.attrSection}>
          {STATS.map(stat => (
            <div key={stat} className={charactersStyles.attrBlock}>
              <div>
                <strong className={charactersStyles.bold}>
                  {stat.toUpperCase()}
                </strong>
              </div>
              <div>
                {stats[stat]} ({increment(getStatMod(stats[stat]))})
              </div>
            </div>
          ))}
        </div>

        <hr className={charactersStyles.sectionDivider} />

        <div className={charactersStyles.section}>
          {Skills && (
            <span>
              <o className={charactersStyles.bold}>Habilidades:</o> {Skills}
            </span>
          )}
          {Senses && (
            <span>
              <o className={charactersStyles.bold}>Sentidos:</o> {Senses}
            </span>
          )}
          {Languages && (
            <span>
              <o className={charactersStyles.bold}>Idiomas:</o> {Languages}
            </span>
          )}
          {Challenge && (
            <span>
              <o className={charactersStyles.bold}>CR:</o> {Challenge}
            </span>
          )}
        </div>

        <hr className={charactersStyles.sectionDivider} />

        <div className={charactersStyles.section}>
          {Object.entries(getSpecialSkills(character)).map(
            ([skill, description]) => (
              <p className={charactersStyles.p}>
                <o className={charactersStyles.bold}>{skill}.</o>{' '}
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
            <h4 className={charactersStyles.sectionTitle}>
              A<span className={appStyles.tinyText}>CCIONES</span>
            </h4>
            <hr className={charactersStyles.actionsDivider} />

            <div className={charactersStyles.section}>
              {Object.entries(actions).map(([action, description]) => (
                <p className={charactersStyles.p}>
                  <o className={charactersStyles.bold}>{action}.</o>{' '}
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
            <h4 className={charactersStyles.sectionTitle}>
              A<span className={appStyles.tinyText}>CCIONES</span> L
              <span className={appStyles.tinyText}>EGENDARIAS</span>
            </h4>
            <hr className={charactersStyles.actionsDivider} />

            <div className={charactersStyles.section}>
              {Object.entries(legendaryActions).map(([action, description]) => (
                <p className={charactersStyles.p}>
                  {action !== 'description' && (
                    <>
                      <o className={charactersStyles.bold}>{action}.</o>{' '}
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
      <div className={styles.modalShadow} />
      <div
        className={`${styles.actionModal} ${charactersStyles.actionModal}`}
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
