import { getStat, getStatMod, translateSkill } from '../../characters';

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
          <span className="app__small-text">
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
            <span className="app__small-text">
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

    case 'invokeDuplicity':
      return (
        <>
          {trait}
          {pc.level >= 17 ? ' Mejorada' : ''}.
        </>
      );

    case 'divineStrike':
      return (
        <>
          {trait}.{' '}
          <span className="app__small-text">
            {pc.level >= 14 ? '+2d8' : '+1d8'}
          </span>
        </>
      );

    case 'divineIntervention':
      return (
        <>
          <u>{trait}</u>.{' '}
          <span className="app__small-text">
            {pc.level >= 20 ? 'Éxito automático' : `1d100 <= ${pc.level}`}
          </span>
        </>
      );

    case 'visionsOfThePast':
      return (
        <>
          <u>{trait}</u>.{' '}
          <span className="app__small-text">{getStat(pc, 'wis')} min.</span>
        </>
      );

    default:
  }

  return null;
}
