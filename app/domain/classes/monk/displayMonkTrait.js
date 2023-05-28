import { getStat, getStatMod } from '~/domain/characters';
import { getMartialArtsDice } from './monk';

import appStyles from '~/components/app.module.css';
import sheetStyles from '~/components/sheet.module.css';

export function displayMonkTrait(traitName, trait, pc) {
  switch (traitName) {
    case 'unarmoredDefense':
      return (
        <>
          <strong>
            <u>{trait}.</u>
          </strong>{' '}
          <span className={appStyles.smallText}>
            AC{' '}
            {10 +
              getStatMod(getStat(pc, 'dex')) +
              getStatMod(getStat(pc, 'wis'))}
          </span>
        </>
      );

    case 'martialArts':
      return (
        <>
          <strong>
            <u>{trait}.</u>
          </strong>{' '}
          <span className={appStyles.smallText}>
            {getMartialArtsDice(pc)}. Ataque sin armas como una acción adicional
          </span>
        </>
      );

    // case 'arcaneTradition':
    //   return (
    //     !getArcaneTradition(pc) && (
    //       <>
    //         <strong>{trait}</strong>
    //         <span className={sheetStyles.pendingTrait}>(!)</span>
    //       </>
    //     )
    //   );

    // case 'durableSummons':
    //   return (
    //     <>
    //       <strong>
    //         <u>{trait}.</u>
    //       </strong>{' '}
    //       <span className={appStyles.smallText}>
    //         Todas las invocaciones tienen 30 HP temporales
    //       </span>
    //     </>
    //   );

    default:
  }

  return null;
}
