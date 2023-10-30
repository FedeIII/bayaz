import { t } from '~/domain/translations';

import charactersStyles from '~/components//characters/characters.module.css';

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

  return (
    <div className={charactersStyles.container}>
      <h1 className={charactersStyles.title}>
        <span className={charactersStyles.titleCapital}>
          {name.slice(0, 1)}
        </span>
        {name.slice(1)}
      </h1>

      <hr className={charactersStyles.sectionDivider} />

      <div className={charactersStyles.subtitle}>
        <span>
          {t(race)} {t(gender).toLowerCase()}
        </span>
        <span>{t(alignment.join(''))}</span>
      </div>

      <hr className={charactersStyles.sectionDivider} />

      <div className={charactersStyles.attrs}>
        <h2 className={charactersStyles.attrsTitle}>Apariencia</h2>
        <div className={charactersStyles.traitColumns}>
          {looks.map(trait => (
            <li key={trait}>{trait}</li>
          ))}
        </div>
      </div>

      <hr className={charactersStyles.sectionDivider} />

      <div className={charactersStyles.attrs}>
        <h2 className={charactersStyles.attrsTitle}>Comportamiento</h2>
        <div className={charactersStyles.traitSections}>
          <div className={charactersStyles.trait}>
            <span className={charactersStyles.traitTitle}>Ánimo actual: </span>
            <u className={charactersStyles.traitDescription}>{behavior.mood}</u>
          </div>
          <div className={charactersStyles.trait}>
            <div>
              <span className={charactersStyles.traitTitle}>
                En calma, su actitud es
              </span>{' '}
              <u className={charactersStyles.traitDescription}>
                {behavior.calm.toLowerCase()}
              </u>
            </div>
            <div>
              <span className={charactersStyles.traitTitle}>
                En estrés, su actitud es
              </span>{' '}
              <u className={charactersStyles.traitDescription}>
                {behavior.stress.toLowerCase()}
              </u>
            </div>
          </div>
        </div>
        {!!talent && (
          <div className={charactersStyles.traitDescription}>
            <span className={charactersStyles.traitTitle}>Talento:</span>{' '}
            {talent}
          </div>
        )}
      </div>

      <hr className={charactersStyles.sectionDivider} />

      <div className={charactersStyles.parallelAttrs}>
        <div className={charactersStyles.leftAttr}>
          <h2 className={charactersStyles.attrsTitle}>Fe</h2>
          <div className={charactersStyles.parallelTraits}>
            {!!faith.description && faith.description + ' de '}
            {faith.deity === 'None' && faith.deityName}
            {faith.deity !== 'None' && (
              <>
                <u className={charactersStyles.traitDescription}>
                  {faith.deityName}
                </u>{' '}
                ({t(faith.deity)})
              </>
            )}
          </div>
        </div>
        <div className={charactersStyles.rightAttr}>
          <h2 className={charactersStyles.attrsTitle}>
            Ideales, Vínculos y Defectos
          </h2>
          {!!(flaws || ideals || bonds) && (
            <div className={charactersStyles.parallelTraits}>
              {!!ideals && (
                <div className={charactersStyles.trait}>
                  <span className={charactersStyles.traitTitle}>Ideales:</span>{' '}
                  <span className={charactersStyles.traitDescription}>
                    {ideals}
                  </span>
                </div>
              )}
              {!!bonds && (
                <div className={charactersStyles.trait}>
                  <span className={charactersStyles.traitTitle}>Vínculos:</span>{' '}
                  <span className={charactersStyles.traitDescription}>
                    {bonds}
                  </span>
                </div>
              )}
              {!!flaws && (
                <div className={charactersStyles.trait}>
                  <span className={charactersStyles.traitTitle}>Defectos:</span>{' '}
                  <span className={charactersStyles.traitDescription}>
                    {flaws}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
