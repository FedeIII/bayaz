import { SNEAK_ATTACK_DAMAGE, getRoguishArchetype } from './rogue';
import { hasToLearnArcaneTricksterSpell } from '~/domain/spells/rogue';
import { ChooseTrait } from '~/components/summary/skillStates';

import styles from '~/components/sheet.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export function displayRogueTrait(traitName, trait, pc) {
  switch (traitName) {
    case 'sneakAttack':
      return (
        <>
          <strong>
            <u>{trait}.</u>
          </strong>{' '}
          <span className="app__small-text">
            {SNEAK_ATTACK_DAMAGE[pc.level]}
          </span>
        </>
      );

    case 'thievesCant':
      return (
        <>
          <strong>
            <u>{trait}.</u>
          </strong>
        </>
      );

    case 'roguishArchetype':
      return (
        !getRoguishArchetype(pc) && (
          <>
            <strong>{trait}</strong>
            <ChooseTrait />
          </>
        )
      );

    case 'spellcasting':
      return (
        <>
          <strong>{trait}</strong>
          {hasToLearnArcaneTricksterSpell(pc) && <ChooseTrait />}
        </>
      );

    default:
  }

  return null;
}
