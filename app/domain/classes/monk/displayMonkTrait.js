import { getStat, getStatMod } from '~/domain/characters';
import {
  getExtraUnarmoredMovement,
  getKiPoints,
  getMartialArtsDice,
} from './monk';
import { increment } from '~/domain/display';

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

    case 'ki':
      return (
        <>
          <strong>
            <u>{trait}.</u>
          </strong>{' '}
          <span className={appStyles.smallText}>
            {getKiPoints(pc)} puntos de Ki
          </span>
        </>
      );

    case 'flurryOfBlows':
      return (
        <>
          <strong>
            <u>{trait}.</u>
          </strong>{' '}
          <span className={appStyles.smallText}>1 punto de Ki</span>
        </>
      );

    case 'patientDefense':
      return (
        <>
          <strong>
            <u>{trait}.</u>
          </strong>{' '}
          <span className={appStyles.smallText}>1 punto de Ki</span>
        </>
      );

    case 'stepOfTheWind':
      return (
        <>
          <strong>
            <u>{trait}.</u>
          </strong>{' '}
          <span className={appStyles.smallText}>1 punto de Ki</span>
        </>
      );

    case 'stepOfTheWind':
      return (
        <>
          <strong>
            <u>{trait}.</u>
          </strong>{' '}
          <span className={appStyles.smallText}>1 punto de Ki</span>
        </>
      );

    case 'unarmoredMovement':
      return (
        <>
          <strong>
            <u>{trait}.</u>
          </strong>{' '}
          <span className={appStyles.smallText}>
            {increment(getExtraUnarmoredMovement(pc))}m
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
