import { getBonusCantrip, getDruidCircle, getDruidLandCircle } from './druid';

import sheetStyles from '~/components/sheet.module.css';

export function displayDruidTrait(traitName, trait, pc) {
  switch (traitName) {
    case 'wildShape': {
      return (
        <>
          <u>{trait}</u>.{' '}
          {getDruidCircle(pc) === 'moon'
            ? // moon
              pc.level >= 8
              ? `CR ${Math.floor(pc.level / 3)} o menor`
              : pc.level >= 6
              ? `CR ${Math.floor(pc.level / 3)} o menor sin vuelo`
              : pc.level >= 4
              ? 'CR 1 sin vuelo'
              : 'CR 1 sin vuelo ni nado'
            : // land
            pc.level >= 8
            ? 'CR 1 o menor'
            : pc.level >= 4
            ? 'CR 1/2 o menor sin vuelo'
            : 'CR 1/4 o menor sin vuelo ni nado'}
        </>
      );
    }

    case 'druidCircle':
      return (
        !getDruidCircle(pc) && (
          <>
            <strong>{trait}</strong>
            <span className={sheetStyles.pendingTrait}>(!)</span>
          </>
        )
      );

    case 'bonusCantrip':
      return (
        <>
          <strong>{trait}</strong>
          {!getBonusCantrip(pc) && (
            <span className={sheetStyles.pendingTrait}>(!)</span>
          )}
        </>
      );

    case 'landCircle':
      return (
        <>
          <strong>{trait}</strong>
          {!getDruidLandCircle(pc) && (
            <span className={sheetStyles.pendingTrait}>(!)</span>
          )}
        </>
      );

    default:
  }

  return null;
}
