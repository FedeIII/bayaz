import { getBonusCantrip, getDruidCircle, getDruidLandCircle } from './druid';

import styles from '~/components/sheet.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

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
            <span className="sheet__pending-trait">(!)</span>
          </>
        )
      );

    case 'bonusCantrip':
      return (
        <>
          <strong>{trait}</strong>
          {!getBonusCantrip(pc) && (
            <span className="sheet__pending-trait">(!)</span>
          )}
        </>
      );

    case 'landCircle':
      return (
        <>
          <strong>{trait}</strong>
          {!getDruidLandCircle(pc) && (
            <span className="sheet__pending-trait">(!)</span>
          )}
        </>
      );

    case 'archdruid':
      return <u>{trait}</u>;

    default:
  }

  return null;
}
