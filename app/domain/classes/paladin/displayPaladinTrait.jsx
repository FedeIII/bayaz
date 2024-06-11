import { getStat, getStatMod } from '~/domain/characters';
import {
  getDivineSense,
  getIsPaladinFightingStyleSettled,
  getLayOnHands,
  getMaxDivineSense,
  getMaxLayOnHands,
  getPaladinFightingStyle,
  getSacredOath,
} from './paladin';
import { increment } from '~/domain/display';
import { ChooseTrait } from '~/components/summary/skillStates';
import { t } from '~/domain/translations';

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
            18m, {getDivineSense(pc)}/{getMaxDivineSense(pc)} veces al día
          </span>
        </>
      );

    case 'layOnHands': {
      return (
        <>
          <strong>
            <u>{trait}.</u>
          </strong>{' '}
          <span className="app__small-text">
            {getLayOnHands(pc)}/{getMaxLayOnHands(pc)} HP
          </span>
        </>
      );
    }

    case 'paladinFightingStyle': {
      const fightingStyle = getPaladinFightingStyle(pc);
      return (
        <>
          <strong>
            <u>{trait}.</u>
          </strong>{' '}
          {!!fightingStyle && (
            <span className="app__small-text">{t(fightingStyle)}</span>
          )}
          {!getIsPaladinFightingStyleSettled(pc) && <ChooseTrait />}
        </>
      );
    }

    case 'sacredOath':
      return (
        !getSacredOath(pc) && (
          <>
            <strong>{trait}</strong>
            <ChooseTrait />
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
