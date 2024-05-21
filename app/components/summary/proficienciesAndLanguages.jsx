import {
  CLASSES,
  getItemProficiencies,
  translateLanguage,
} from '~/domain/characters';
import { getItemDisplayList } from '~/domain/display';
import { t } from '~/domain/translations';
import { unique } from '~/utils/insert';

function ProficienciesAndLanguages(props) {
  const { pc } = props;
  const { pClass, languages } = pc;

  return (
    <ul className="sheet__data sheet__competences-and-languages">
      <li className="sheet__trait-label">
        <span className="sheet_trait-title">Idiomas:</span>{' '}
        <strong className="sheet__trait">
          {languages.map(language => translateLanguage(language)).join(', ')}
        </strong>
      </li>

      <li className="sheet__trait-label">
        <span className="sheet_trait-title">Competente con:</span>{' '}
        {getItemDisplayList(unique(getItemProficiencies(pc))).map(
          (itemName, i, proficiencies) => (
            <strong className="sheet__trait" key={itemName}>
              {t(itemName)}
              {i + 1 < proficiencies.length && ', '}
            </strong>
          )
        )}
      </li>

      {CLASSES()[pClass].proficiencies &&
        Object.entries(CLASSES()[pClass].proficiencies).map(
          ([profName, profValue]) => (
            <li className="sheet__trait-label" key={profName}>
              {profName}:{' '}
              <strong className="sheet__trait">{profValue(pc)}</strong>
            </li>
          )
        )}
    </ul>
  );
}

export default ProficienciesAndLanguages;
