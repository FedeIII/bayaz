import { t } from '~/domain/translations';

import charactersStyles from '~/components//characters/characters.module.css';

export function CharacterInfo(props) {
  const { name, race, gender, alignment, looks, behavior } = props;

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
        <div className={charactersStyles.traitColumns}>
          <h2 className={charactersStyles.attrsTitle}>Comportamiento</h2>
          <div className={charactersStyles.trait}>
            <span className={charactersStyles.traitTitle}>Ánimo actual: </span>
            <u className={charactersStyles.traitDescription}>{behavior.mood}</u>
          </div>
          <div className={charactersStyles.trait}>
            <div className={charactersStyles.traitTitle}>
              En calma, su actitud es{' '}
              <u className={charactersStyles.traitDescription}>
                {behavior.calm.toLowerCase()}
              </u>
            </div>
            <div className={charactersStyles.traitTitle}>
              En estrés, su actitud es{' '}
              <u className={charactersStyles.traitDescription}>
                {behavior.stress.toLowerCase()}
              </u>
            </div>
          </div>
          <div className={charactersStyles.trait}></div>
        </div>
      </div>
    </div>
  );
}
