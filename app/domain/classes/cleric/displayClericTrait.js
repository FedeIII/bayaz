import { getStat, getStatMod, translateSkill } from '../../characters';

import sheetStyles from '~/components/sheet.module.css';
import appStyles from '~/components/app.module.css';

export function displayClericTrait(traitName, trait, pc) {
  switch (traitName) {
    case 'blessingsOfKnowledge': {
      return (
        <>
          <strong>{trait}</strong>
          {!!pc.classAttrs.skills.length && (
            <>: {pc.classAttrs.skills.map(translateSkill).join(', ')}</>
          )}
        </>
      );
    }

    case 'warPriest': {
      const times = getStatMod(getStat(pc, 'wis'));
      return (
        <>
          <u>{trait}.</u> {times > 0 ? times : 1} veces al día.
        </>
      );
    }

    case 'wardingFlare': {
      const times = getStatMod(getStat(pc, 'wis'));
      return (
        <>
          <u>
            {trait}
            {pc.level >= 6 ? ' Mejorado' : ''}.
          </u>{' '}
          {times > 0 ? times : 1} veces al día.
        </>
      );
    }

    case 'wrathOfTheStorm': {
      const times = getStatMod(getStat(pc, 'wis'));
      return (
        <>
          <u>{trait}.</u> {times > 0 ? times : 1} veces al día.
        </>
      );
    }

    case 'blessingOfTheTrickster':
      return (
        <>
          <u>{trait}.</u> Dura 1 hora.
        </>
      );

    case 'discipleOfLife':
      return (
        <>
          <u>{trait}.</u> Conjuros de sanación curan un extra de (2 + nivel del
          conjuro).
        </>
      );

    case 'channelDivinity':
      return (
        <>
          {trait}.{' '}
          <span className={appStyles.smallText}>
            {pc.level >= 18 ? '3 veces' : pc.level >= 6 ? '2 veces' : '1 vez'}{' '}
            entre descansos
          </span>
        </>
      );

    case 'turnUndead':
      return (
        <>
          {pc.level < 5 ? trait : 'Destruir Muertos Vivientes'}.{' '}
          {pc.level >= 5 && (
            <span className={appStyles.smallText}>
              CR{' '}
              {pc.level >= 17
                ? '4'
                : pc.level >= 14
                ? '3'
                : pc.level >= 11
                ? '2'
                : pc.level >= 8
                ? '1'
                : '1/2'}{' '}
              o menor
            </span>
          )}
        </>
      );

    case 'destroyUndead':
      return false;

    default:
  }

  return null;
}
