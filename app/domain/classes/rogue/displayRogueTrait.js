import { SNEAK_ATTACK_DAMAGE, getRoguishArchetype } from './rogue';

import appStyles from '~/components/app.module.css';
import sheetStyles from '~/components/sheet.module.css';

export function displayRogueTrait(traitName, trait, pc) {
  switch (traitName) {
    case 'sneakAttack':
      return (
        <>
          <strong>
            <u>{trait}.</u>
          </strong>{' '}
          <span className={appStyles.smallText}>
            {SNEAK_ATTACK_DAMAGE[pc.level]}
          </span>
        </>
      );

    case 'roguishArchetype':
      return (
        !getRoguishArchetype(pc) && (
          <>
            <strong>{trait}</strong>
            <span className={sheetStyles.pendingTrait}>(!)</span>
          </>
        )
      );

    default:
  }

  return null;
}
