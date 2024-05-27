import { ChooseTrait } from '~/components/summary/skillStates';
import { CLASSES, hasToSelectExpertSkills } from '../../characters';
import {
  getBardCollege,
  getBardicInspiration,
  getLoreCollegeProficiencies,
  getLoreSpells,
  getMaxBardicInspiration,
  hasToLearnMagicalSecretsSpells,
} from './bard';

import styles from '~/components/sheet.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export function displayBardTrait(traitName, trait, pc) {
  switch (traitName) {
    case 'bardicInspiration': {
      const { level } = pc;
      const die =
        level >= 15
          ? '1d12'
          : level >= 10
          ? '1d10'
          : level >= 5
          ? '1d8'
          : '1d6';
      return (
        <>
          <u>Inspiración de Bardo:</u> {getBardicInspiration(pc)}/
          {getMaxBardicInspiration(pc)} veces{' '}
          {level >= 5 ? 'entre descansos' : 'al día'}. {die}.{' '}
          {level >= 5 && (
            <u>{CLASSES().bard.leveling[5].traits.fontOfInspiration}</u>
          )}
        </>
      );
    }

    case 'songOfRest':
      return (
        <>
          <u>{trait}.</u> +{' '}
          {pc.level >= 17
            ? '1d12'
            : pc.level >= 13
            ? '1d10'
            : pc.level >= 9
            ? '1d8'
            : '1d6'}{' '}
          Puntos de Golpe
        </>
      );

    case 'bardCollege':
      return (
        !getBardCollege(pc) && (
          <>
            <strong>{trait}</strong>
            <ChooseTrait />
          </>
        )
      );

    case 'loreBonusProficiencies':
      return (
        <>
          {trait}
          {!getLoreCollegeProficiencies(pc).length && <ChooseTrait />}
        </>
      );

    case 'expertise':
      return (
        <>
          {trait}
          {hasToSelectExpertSkills(pc) && <ChooseTrait />}
        </>
      );

    case 'fontOfInspiration':
      return false;

    case 'additionalMagicalSecrets':
      return (
        <>
          <strong>{trait}</strong>
          {!getLoreSpells(pc).length && <ChooseTrait />}
        </>
      );

    case 'magicalSecrets':
      return (
        <>
          <strong>{trait}</strong>
          {hasToLearnMagicalSecretsSpells(pc) && <ChooseTrait />}
        </>
      );

    default:
  }

  return null;
}
