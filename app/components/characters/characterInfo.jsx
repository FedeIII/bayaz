import { t } from '~/domain/translations';
import { Fragment } from 'react';

import styles from './characters.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export function CharacterInfo(props) {
  const {
    name,
    race,
    gender,
    alignment,
    looks,
    behavior,
    faith,
    ideals,
    bonds,
    flaws,
    talent,
  } = props;

  const nameParts = name.split(' ');

  return (
    <div className="characters__container">
      <h1 className="characters__title">
        {nameParts.map(part => (
          <Fragment key={part}>
            <span className="characters__title-capital">
              {part.slice(0, 1)}
            </span>
            {part.slice(1)}{' '}
          </Fragment>
        ))}
      </h1>

      <hr className="characters__section-divider" />

      <div className="characters__subtitle">
        <span>
          {t(race)} {t(gender).toLowerCase()}
        </span>
        <span>{t(alignment.join(''))}</span>
      </div>

      <hr className="characters__section-divider" />

      <div className="characters__attrs">
        <h2 className="characters__attrs-title">Apariencia</h2>
        <div className="characters__trait-columns">
          {looks.map(trait => (
            <li key={trait}>{trait}</li>
          ))}
        </div>
      </div>

      <hr className="characters__section-divider" />

      <div className="characters__attrs">
        <h2 className="characters__attrs-title">Comportamiento</h2>
        <div className="characters__trait-sections">
          <div className="characters__trait">
            <span className="characters__trait-title">Ánimo actual: </span>
            <u className="characters__trait-description">{behavior.mood}</u>
          </div>
          <div className="characters__trait">
            <div>
              <span className="characters__trait-title">
                En calma, su actitud es
              </span>{' '}
              <u className="characters__trait-description">
                {behavior.calm.toLowerCase()}
              </u>
            </div>
            <div>
              <span className="characters__trait-title">
                En estrés, su actitud es
              </span>{' '}
              <u className="characters__trait-description">
                {behavior.stress.toLowerCase()}
              </u>
            </div>
          </div>
        </div>
        {!!talent && (
          <div className="characters__trait-description">
            <span className="characters__trait-title">Talento:</span> {talent}
          </div>
        )}
      </div>

      <hr className="characters__section-divider" />

      <div className="characters__parallel-attrs">
        <div className="characters__left-attr">
          <h2 className="characters__attrs-title">Fe</h2>
          <div className="characters__parallel-traits">
            {!!faith.description && faith.description + ' de '}
            {faith.deity === 'None' && faith.deityName}
            {faith.deity !== 'None' && (
              <>
                <u className="characters__trait-description">
                  {faith.deityName}
                </u>{' '}
                ({t(faith.deity)})
              </>
            )}
          </div>
        </div>
        <div className="characters__right-attr">
          <h2 className="characters__attrs-title">
            Ideales, Vínculos y Defectos
          </h2>
          {!!(flaws || ideals || bonds) && (
            <div className="characters__parallel-traits">
              {!!ideals && (
                <div className="characters__trait">
                  <span className="characters__trait-title">Ideales:</span>{' '}
                  <span className="characters__trait-description">
                    {ideals}
                  </span>
                </div>
              )}
              {!!bonds && (
                <div className="characters__trait">
                  <span className="characters__trait-title">Vínculos:</span>{' '}
                  <span className="characters__trait-description">{bonds}</span>
                </div>
              )}
              {!!flaws && (
                <div className="characters__trait">
                  <span className="characters__trait-title">Defectos:</span>{' '}
                  <span className="characters__trait-description">{flaws}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
