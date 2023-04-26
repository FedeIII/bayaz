import { getArcaneTradition } from './wizard';
import { translateSchool } from '~/domain/spells/spellTranslations';

import appStyles from '~/components/app.module.css';
import sheetStyles from '~/components/sheet.module.css';

export function displayWizardTrait(traitName, trait, pc) {
  switch (traitName) {
    case 'arcaneRecovery':
      return (
        <>
          <strong>
            <u>{trait}. </u>
          </strong>{' '}
          <span className={appStyles.smallText}>
            Recupera un nivel combinado de {Math.ceil(pc.level / 2)} en
            hechizos.
          </span>
        </>
      );

    case 'arcaneTradition':
      return (
        !getArcaneTradition(pc) && (
          <>
            <strong>{trait}</strong>
            <span className={sheetStyles.pendingTrait}>(!)</span>
          </>
        )
      );

    case 'schoolSavant':
      return (
        <span>
          {trait} {translateSchool(getArcaneTradition(pc))}
        </span>
      );

    default:
  }

  return null;
}
