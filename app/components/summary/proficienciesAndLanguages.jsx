import {
  CLASSES,
  getItemProficiencies,
  translateLanguage,
} from '~/domain/characters';
import { getItemDisplayList } from '~/domain/display';
import { t } from '~/domain/translations';
import { unique } from '~/utils/insert';

import styles from '~/components/sheet.module.css';

function ProficienciesAndLanguages(props) {
  const { pc } = props;
  const { pClass, languages } = pc;

  return (
    <ul className={`${styles.data} ${styles.competencesAndLanguages}`}>
      <li className={styles.traitLabel}>
        <span className={styles.traitTitle}>Idiomas:</span>{' '}
        <strong className={styles.trait}>
          {languages.map(language => translateLanguage(language)).join(', ')}
        </strong>
      </li>

      <li className={styles.traitLabel}>
        <span className={styles.traitTitle}>Competente con:</span>{' '}
        {getItemDisplayList(unique(getItemProficiencies(pc))).map(
          (itemName, i, proficiencies) => (
            <strong className={styles.trait} key={itemName}>
              {t(itemName)}
              {i + 1 < proficiencies.length && ', '}
            </strong>
          )
        )}
      </li>

      {CLASSES[pClass].proficiencies &&
        Object.entries(CLASSES[pClass].proficiencies).map(
          ([profName, profValue]) => (
            <li className={styles.traitLabel} key={profName}>
              {profName}:{' '}
              <strong className={styles.trait}>{profValue(pc)}</strong>
            </li>
          )
        )}
    </ul>
  );
}

export default ProficienciesAndLanguages;
