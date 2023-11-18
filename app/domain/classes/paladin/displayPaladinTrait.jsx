import { getStat, getStatMod } from '~/domain/characters';
import { getPaladinFightingStyle, getSacredOath } from './paladin';
import { translateFightingStyle } from '../fighter/fighter';
import { increment } from '~/domain/display';

import styles from '~/components/sheet.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export function displayPaladinTrait(traitName, trait, pc) {
  const chaMod = getStatMod(getStat(pc, 'cha'));

  switch (traitName) {
    case 'divineSense':
      return (
        <>
          <strong>
            <u>{trait}.</u>
          </strong>{' '}
          <span className="app__small-text">
            18m, {chaMod + 1} veces al día
          </span>
        </>
      );

    case 'layOnHands':
      return (
        <>
          <strong>
            <u>{trait}.</u>
          </strong>{' '}
          <span className="app__small-text">{pc.level * 5} HP</span>
        </>
      );

    case 'paladinFightingStyle': {
      const fightingStyle = getPaladinFightingStyle(pc);
      return (
        <>
          <strong>
            <u>{trait}.</u>
          </strong>{' '}
          {!fightingStyle && (
            <span className="sheet__pending-trait">(!)</span>
          )}
          {!!fightingStyle && (
            <span className="app__small-text">
              {translateFightingStyle(fightingStyle)}
            </span>
          )}
        </>
      );
    }

    case 'sacredOath':
      return (
        !getSacredOath(pc) && (
          <>
            <strong>{trait}</strong>
            <span className="sheet__pending-trait">(!)</span>
          </>
        )
      );

    case 'channelDivinity':
      return (
        <>
          {trait}.{' '}
          <span className="app__small-text">1 vez entre descansos</span>
        </>
      );

    case 'auraOfProtection':
      return (
        <>
          <strong>{trait}.</strong>{' '}
          <span className="app__small-text">
            {pc.level >= 18 ? '9m' : '3m'}. {increment(chaMod > 0 ? chaMod : 1)}
          </span>
        </>
      );

    case 'auraOfCourage':
    case 'auraOfDevotion':
    case 'auraOfWarding':
      return (
        <>
          {trait}.{' '}
          <span className="app__small-text">
            {pc.level >= 18 ? '9m' : '3m'}
          </span>
        </>
      );

    case 'divineSmite':
      return <>{pc.level >= 11 ? `${trait} Mejorado` : trait}</>;

    case 'cleansingTouch': {
      return (
        <>
          {trait}.{' '}
          <span className="app__small-text">
            {chaMod > 0 ? chaMod : 1} veces
          </span>
        </>
      );
    }

    default:
  }

  return null;
}
