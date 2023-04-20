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

    default:
  }

  return null;
}
